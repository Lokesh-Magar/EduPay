from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import joblib  # For saving and loading the scaler
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize model and scaler
scaler = None
model = None

# Function to load and preprocess the dataset
def preprocess_data():
    dataset = pd.read_csv(r'D:\Users\Brian\Downloads\updated_invoice_data_2000.csv')
    dataset['dueDate'] = pd.to_datetime(dataset['dueDate'])
    dataset['paidDate'] = pd.to_datetime(dataset['paidDate'], errors='coerce')
    dataset['days_to_payment'] = (dataset['paidDate'] - dataset['dueDate']).dt.days
    dataset['days_to_payment'].fillna(-1, inplace=True)

    x = dataset.drop(columns=['studentId', 'username', 'email', 'status', 'days_to_payment'])
    y = dataset['days_to_payment']

    if 'dueDate' in x.columns:
        x['dueDate'] = (x['dueDate'] - pd.Timestamp("1970-01-01")).dt.days
    if 'paidDate' in x.columns:
        x['paidDate'] = (x['paidDate'] - pd.Timestamp("1970-01-01")).dt.days
        x['paidDate'].fillna(0, inplace=True)

    non_numeric_columns = x.select_dtypes(include=['object']).columns
    x = x.drop(columns=non_numeric_columns)

    global scaler
    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(x)

    # Save the scaler after fitting
    joblib.dump(scaler, r'D:\Users\scaler.pkl')

    return x_scaled, y

# Train model function
def train_model():
    x_scaled, y = preprocess_data()
    x_train, x_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.2, random_state=42)

    global model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(256, input_dim=x_train.shape[1], activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(x_train, y_train, epochs=100, batch_size=32, verbose=1)
    model.save_weights(r'D:\Users\inv.weights.h5')
    loss = model.evaluate(x_test, y_test, verbose=0)
    return loss

# API to train the model
@app.route('/train', methods=['GET'])
def train():
    loss = train_model()
    return jsonify({'message': 'Model trained successfully', 'loss': loss})

# Function to manually load the model architecture and weights
def load_model_weights():
    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(256, input_dim=4, activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dense(1)
    ])
    model.load_weights(r'D:\Users\inv.weights.h5')  # Provide the correct path to your saved weights file
    return model

# API to predict based on new data
@app.route('/predict', methods=['POST'])
def predict():
    try:
        model = load_model_weights()

        # Load the saved scaler
        scaler = joblib.load(r'D:\Users\scaler.pkl')

        data = request.get_json()
        new_data = pd.DataFrame([data])
        
        new_data['dueDate'] = pd.to_datetime(new_data['dueDate'], utc=True).dt.tz_convert(None)
        new_data['paidDate'] = pd.to_datetime(new_data['paidDate'], errors='coerce', utc=True).dt.tz_convert(None)
        new_data['dueDate'] = (new_data['dueDate'] - pd.Timestamp("1970-01-01")).dt.days
        new_data['paidDate'] = (new_data['paidDate'] - pd.Timestamp("1970-01-01")).dt.days
        new_data['paidDate'].fillna(0, inplace=True)
        new_data = new_data[['amount', 'pendingAmount', 'dueDate', 'paidDate']]

        new_data_scaled = scaler.transform(new_data)
        new_prediction = model.predict(new_data_scaled)

        rounded_new_prediction = int(round(new_prediction[0][0]))

        return jsonify({'prediction': rounded_new_prediction}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
