from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'academic-info', views.AcademicInfoViewSet, basename='academic-info')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.UserViewSet.as_view({'post': 'create'}), name='register'),
    path('auth/login/', obtain_auth_token, name='login'),
] 