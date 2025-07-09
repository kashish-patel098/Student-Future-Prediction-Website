from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import StudentFuturePredictor
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class PredictStudentFutureView(APIView):
    permission_classes = [IsAuthenticated]
    
    def __init__(self):
        super().__init__()
        self.predictor = StudentFuturePredictor()
        # Try to load existing model, if not, train new one
        if not self.predictor.load_model():
            self.predictor.train()
    
    def post(self, request):
        try:
            # Extract student data from request
            student_data = {
                'gpa': float(request.data.get('gpa', 0)),
                'attendance_rate': float(request.data.get('attendance_rate', 0)),
                'extracurricular_activities': int(request.data.get('extracurricular_activities', 0)),
                'study_hours': float(request.data.get('study_hours', 0)),
                'previous_scores': float(request.data.get('previous_scores', 0))
            }
            
            # Validate input data
            if not all(0 <= student_data['gpa'] <= 4.0):
                return Response({'error': 'GPA must be between 0 and 4.0'}, 
                              status=status.HTTP_400_BAD_REQUEST)
            
            if not all(0 <= student_data['attendance_rate'] <= 1):
                return Response({'error': 'Attendance rate must be between 0 and 1'}, 
                              status=status.HTTP_400_BAD_REQUEST)
            
            if not all(0 <= student_data['study_hours'] <= 24):
                return Response({'error': 'Study hours must be between 0 and 24'}, 
                              status=status.HTTP_400_BAD_REQUEST)
            
            if not all(0 <= student_data['previous_scores'] <= 100):
                return Response({'error': 'Previous scores must be between 0 and 100'}, 
                              status=status.HTTP_400_BAD_REQUEST)
            
            # Make prediction
            prediction = self.predictor.predict(student_data)
            
            # Map prediction to human-readable result
            success_levels = ['Low', 'Medium', 'High']
            prediction['success_level'] = success_levels[prediction['prediction']]
            
            return Response(prediction, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
