from django.db import models
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Create your models here.

class StudentFuturePredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        
    def generate_dummy_data(self, n_samples=1000):
        """Generate dummy student data for training"""
        np.random.seed(42)
        
        data = {
            'gpa': np.random.normal(3.0, 0.5, n_samples),
            'attendance_rate': np.random.normal(0.85, 0.1, n_samples),
            'extracurricular_activities': np.random.randint(0, 5, n_samples),
            'study_hours': np.random.normal(6, 2, n_samples),
            'previous_scores': np.random.normal(75, 10, n_samples),
            'future_success': np.random.randint(0, 3, n_samples)  # 0: Low, 1: Medium, 2: High
        }
        
        # Ensure values are within reasonable ranges
        data['gpa'] = np.clip(data['gpa'], 0, 4.0)
        data['attendance_rate'] = np.clip(data['attendance_rate'], 0, 1)
        data['study_hours'] = np.clip(data['study_hours'], 0, 24)
        data['previous_scores'] = np.clip(data['previous_scores'], 0, 100)
        
        return pd.DataFrame(data)
    
    def train(self):
        """Train the model with dummy data"""
        if not self.is_trained:
            # Generate dummy data
            df = self.generate_dummy_data()
            
            # Prepare features and target
            X = df.drop('future_success', axis=1)
            y = df['future_success']
            
            # Scale features
            X_scaled = self.scaler.fit_transform(X)
            
            # Train model
            self.model.fit(X_scaled, y)
            self.is_trained = True
            
            # Save the model
            self.save_model()
    
    def predict(self, student_data):
        """Make prediction for a single student"""
        if not self.is_trained:
            self.train()
            
        # Convert input to DataFrame
        df = pd.DataFrame([student_data])
        
        # Scale features
        X_scaled = self.scaler.transform(df)
        
        # Make prediction
        prediction = self.model.predict(X_scaled)[0]
        probabilities = self.model.predict_proba(X_scaled)[0]
        
        return {
            'prediction': int(prediction),
            'probabilities': probabilities.tolist(),
            'confidence': float(max(probabilities))
        }
    
    def save_model(self):
        """Save the trained model"""
        model_dir = 'models'
        if not os.path.exists(model_dir):
            os.makedirs(model_dir)
            
        joblib.dump(self.model, os.path.join(model_dir, 'student_predictor.joblib'))
        joblib.dump(self.scaler, os.path.join(model_dir, 'scaler.joblib'))
    
    def load_model(self):
        """Load the trained model"""
        model_path = os.path.join('models', 'student_predictor.joblib')
        scaler_path = os.path.join('models', 'scaler.joblib')
        
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            self.is_trained = True
            return True
        return False
