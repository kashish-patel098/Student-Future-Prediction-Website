import React, { useState } from 'react';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

const PredictFuture = () => {
  // const { token } = useAuth();
  const [formData, setFormData] = useState({
    gpa: '',
    attendance_rate: '',
    extracurricular_activities: '',
    study_hours: '',
    previous_scores: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/predictions/predict/',
        formData,
        {
          headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setPrediction(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Student Future Prediction</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">GPA (0-4.0)</label>
            <input
              type="number"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="4.0"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Attendance Rate (0-1)</label>
            <input
              type="number"
              name="attendance_rate"
              value={formData.attendance_rate}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="1"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Extracurricular Activities (0-5)</label>
            <input
              type="number"
              name="extracurricular_activities"
              value={formData.extracurricular_activities}
              onChange={handleChange}
              min="0"
              max="5"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Study Hours (0-24)</label>
            <input
              type="number"
              name="study_hours"
              value={formData.study_hours}
              onChange={handleChange}
              min="0"
              max="24"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Scores (0-100)</label>
            <input
              type="number"
              name="previous_scores"
              value={formData.previous_scores}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Predicting...' : 'Predict Future'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Prediction Results</h2>
          <div className="space-y-4">
            <div>
              <p className="text-lg">
                Predicted Success Level:{' '}
                <span className={`font-bold ${
                  prediction.success_level === 'High' ? 'text-green-600' :
                  prediction.success_level === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {prediction.success_level}
                </span>
              </p>
            </div>
            <div>
              <p className="text-lg">
                Confidence: <span className="font-bold">{Math.round(prediction.confidence * 100)}%</span>
              </p>
            </div>
            <div>
              <h3 className="text-md font-medium mb-2">Probability Distribution:</h3>
              <div className="flex space-x-4">
                {['Low', 'Medium', 'High'].map((level, index) => (
                  <div key={level} className="flex-1">
                    <div className="text-center text-sm font-medium">{level}</div>
                    <div className="mt-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${prediction.probabilities[index] * 100}%` }}
                      />
                    </div>
                    <div className="text-center text-sm mt-1">
                      {Math.round(prediction.probabilities[index] * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictFuture;