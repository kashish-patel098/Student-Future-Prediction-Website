from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, 
    AcademicInfo, 
    Attendance, 
    Assignment, 
    ExamResult,
    Course,
    Department,
    StudentProfile,
    FacultyProfile
)

admin.site.register(User, UserAdmin)
admin.site.register(AcademicInfo)
admin.site.register(Attendance)
admin.site.register(Assignment)
admin.site.register(ExamResult)
admin.site.register(Course)
admin.site.register(Department)
admin.site.register(StudentProfile)
admin.site.register(FacultyProfile)
