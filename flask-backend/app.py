from flask import Flask, request, jsonify
import pandas as pd
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import os

app = Flask(__name__)

# Initialize scaler and model
scaler = None
model = None

# Global variable to hold the trained model
model = None
scaler = None

# Function to load and preprocess the dataset
def preprocess_data():
    dataset = pd.read_csv(r'D:\Users\Brian\Downloads\updated_invoice_data_2000.csv')
    # Convert date columns to datetime
    dataset['dueDate'] = pd.to_datetime(dataset['dueDate'])
    dataset['paidDate'] = pd.to_datetime(dataset['paidDate'], errors='coerce')

    # Calculate days to payment
    dataset['days_to_payment'] = (dataset['paidDate'] - dataset['dueDate']).dt.days

    # Handle missing values for unpaid invoices
    dataset['days_to_payment'].fillna(-1, inplace=True)  # -1 indicates unpaid invoices

    # Separate features and target variable
    x = dataset.drop(columns=['studentId', 'username', 'email', 'status', 'days_to_payment'])
    y = dataset['days_to_payment']

    # Converts dates to numeric timestamps
    if 'dueDate' in x.columns:
        x['dueDate'] = (x['dueDate'] - pd.Timestamp("1970-01-01")).dt.days
    if 'paidDate' in x.columns:
        x['paidDate'] = (x['paidDate'] - pd.Timestamp("1970-01-01")).dt.days
        x['paidDate'].fillna(0, inplace=True)  # Replace NaT with 0

    # Drop non-numeric columns
    non_numeric_columns = x.select_dtypes(include=['object']).columns
    x = x.drop(columns=non_numeric_columns)

    # Scale the data
    global scaler
    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(x)

    return x_scaled, y

# Train model function
def train_model():
    x_scaled, y = preprocess_data()

    # Train-test split
    x_train, x_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.2, random_state=42)

    # Build the regression model
    global model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(256, input_dim=x_train.shape[1], activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dense(1)  # Output layer with no activation for regression
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='mse')

    # Train the model
    model.fit(x_train, y_train, epochs=100, batch_size=32, verbose=1)

    # Evaluate the model
    loss = model.evaluate(x_test, y_test, verbose=0)
    return loss

# API to train the model
@app.route('/train', methods=['GET'])
def train():
    loss = train_model()
    return jsonify({'message': 'Model trained successfully', 'loss': loss})
    


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Step 1: Get data from the request
        data = request.get_json()
        
        # Step 2: Convert data to DataFrame (same structure as training data)
        new_data = pd.DataFrame(data)
        
        # Step 3: Preprocess the new data - Convert 'dueDate' and 'paidDate' to datetime
        new_data['dueDate'] = pd.to_datetime(new_data['dueDate'])
        new_data['paidDate'] = pd.to_datetime(new_data['paidDate'], errors='coerce')

        # Step 4: Convert 'dueDate' and 'paidDate' to numeric timestamps
        new_data['dueDate'] = (new_data['dueDate'] - pd.Timestamp("1970-01-01")).dt.days
        new_data['paidDate'] = (new_data['paidDate'] - pd.Timestamp("1970-01-01")).dt.days

        # Step 5: Handle missing 'paidDate' by filling NaT with 0 (for unpaid invoices)
        new_data['paidDate'].fillna(0, inplace=True)

        # Step 6: Select relevant columns for prediction (same as used in training)
        new_data = new_data[['amount', 'pendingAmount', 'dueDate', 'paidDate']]  # Adjust column names if needed

        # Step 7: Scale the new data using the same scaler used during training
        new_data_scaled = scaler.transform(new_data)

        # Step 8: Predict using the trained model
        new_prediction = model.predict(new_data_scaled)

        # Step 9: Round the prediction to the nearest day (as the model output is continuous)
        rounded_new_prediction = int(round(new_prediction[0][0]))  # Round to nearest day

        # Step 10: Return the prediction
        return jsonify({'prediction': rounded_new_prediction})

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
     # Change the host and port here
    app.run(host="127.0.0.1", port=8080, debug=True)
