from flask import Flask, request, jsonify
import pandas as pd
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import os
from pytz import UTC

app = Flask(__name__)

# Initialize scaler and model
scaler = None
model = None

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
   
from pytz import UTC  # Import UTC timezone

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("The request data", data)
        
        # Convert JSON data to DataFrame
        new_data = pd.DataFrame([data])
        
        # Parse dueDate and paidDate into datetime and handle timezones
        new_data['dueDate'] = pd.to_datetime(new_data['dueDate'], utc=True).dt.tz_convert(None)
        new_data['paidDate'] = pd.to_datetime(new_data['paidDate'], errors='coerce', utc=True).dt.tz_convert(None)

        # Convert dates to days since epoch
        new_data['dueDate'] = (new_data['dueDate'] - pd.Timestamp("1970-01-01")).dt.days
        new_data['paidDate'] = (new_data['paidDate'] - pd.Timestamp("1970-01-01")).dt.days

        # Fill missing paidDate values with 0
        new_data['paidDate'].fillna(0, inplace=True)

        # Ensure only the necessary columns are used
        new_data = new_data[['amount', 'pendingAmount', 'dueDate', 'paidDate']]

        # Scale data and make predictions
        new_data_scaled = scaler.transform(new_data)
        new_prediction = model.predict(new_data_scaled)

        # Round prediction result
        rounded_new_prediction = int(round(new_prediction[0][0]))

        return jsonify({'prediction': rounded_new_prediction})

    except Exception as e:
        return jsonify({'error': str(e)}), 400



if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
