from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from .models import AcademicInfo, Attendance, Assignment, ExamResult
from .serializers import UserSerializer, UserRegistrationSerializer, AcademicInfoSerializer, AttendanceSerializer, AssignmentSerializer, ExamResultSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserRegistrationSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

class AcademicInfoViewSet(viewsets.ModelViewSet):
    serializer_class = AcademicInfoSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'faculty':
            return AcademicInfo.objects.all()
        return AcademicInfo.objects.filter(student=user)

    @action(detail=False, methods=['get'])
    def my_academic_info(self, request):
        try:
            academic_info = AcademicInfo.objects.get(student=request.user)
            serializer = self.get_serializer(academic_info)
            return Response(serializer.data)
        except AcademicInfo.DoesNotExist:
            return Response(
                {"detail": "Academic information not found"},
                status=status.HTTP_404_NOT_FOUND
            )

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user_type = request.data.get('user_type')

        if not email or not password:
            return Response({
                'error': 'Please provide both email and password'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)

        if user is not None:
            # Check if user type matches
            if user_type == 'student' and not user.is_student:
                return Response({
                    'error': 'This account is not registered as a student. Please select the correct account type.',
                    'suggested_type': 'faculty'
                }, status=status.HTTP_401_UNAUTHORIZED)
            elif user_type == 'faculty' and not user.is_faculty:
                return Response({
                    'error': 'This account is not registered as faculty. Please select the correct account type.',
                    'suggested_type': 'student'
                }, status=status.HTTP_401_UNAUTHORIZED)

            # If user type matches, create/get token and return response
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_type': user_type,
                'user_id': user.id,
                'email': user.email
            })
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

class AddStudentDataView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data_type = request.data.get('type')
        data = request.data.get('data')
        
        try:
            # Get student instance
            student = User.objects.get(id=data['student_id'])
            
            # Add student to data
            data['student'] = student.id
            
            if data_type == 'results':
                serializer = AcademicInfoSerializer(data=data)
            elif data_type == 'assessment':
                serializer = AssignmentSerializer(data=data)
            elif data_type == 'attendance':
                serializer = AttendanceSerializer(data=data)
            elif data_type == 'pat':
                serializer = ExamResultSerializer(data=data)
            else:
                return Response(
                    {'error': 'Invalid data type'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'message': 'Data added successfully', 'data': serializer.data}, 
                    status=status.HTTP_201_CREATED
                )
            return Response(
                {'error': serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except User.DoesNotExist:
            return Response(
                {'error': 'Student not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
