from django.urls import path
from .views import PredictStudentFutureView

urlpatterns = [
    path('predict/', PredictStudentFutureView.as_view(), name='predict-student-future'),
] 