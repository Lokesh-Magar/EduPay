'use client'
import { useState } from 'react';
import axios from 'axios';

const FeeGroupList = () => {
  const [inputData, setInputData] = useState({
    feature1: '',
    feature2: '',
    // Add more fields based on your model inputs
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', inputData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setPrediction(response.data.prediction); // Assuming Flask returns `{ "prediction": value }`
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching the prediction.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Invoice Payment Prediction</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="feature1">Feature 1:</label>
          <input
            type="text"
            id="feature1"
            name="feature1"
            value={inputData.feature1}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="feature2">Feature 2:</label>
          <input
            type="text"
            id="feature2"
            name="feature2"
            value={inputData.feature2}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        {/* Add more input fields as necessary */}

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Get Prediction
        </button>
      </form>

      {prediction !== null && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <h2>Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FeeGroupList;
