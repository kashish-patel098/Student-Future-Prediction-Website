import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Auth services
export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login/', { username, password });
        return response.data;
    },
    logout: async () => {
        await api.post('/auth/logout/');
    },
    register: async (userData) => {
        const response = await api.post('/auth/register/', userData);
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/auth/profile/');
        return response.data;
    },
};

// Student services
export const studentService = {
    getProfile: async () => {
        const response = await api.get('/students/me/');
        return response.data;
    },
    getAcademicInfo: async () => {
        const response = await api.get('/students/me/academic_info/');
        return response.data;
    },
    getSubjects: async () => {
        const response = await api.get('/students/me/subjects/');
        return response.data;
    },
    getCareerPrediction: async () => {
        const response = await api.get('/students/me/career_prediction/');
        return response.data;
    },
};

// Faculty services
export const facultyService = {
    getAssignedStudents: async () => {
        const response = await api.get('/faculty/me/assigned_students/');
        return response.data;
    },
    addStudent: async (studentData) => {
        const response = await api.post('/students/', studentData);
        return response.data;
    },
    updateStudentAcademicInfo: async (studentId, academicInfo) => {
        const response = await api.put(`/academic-info/${studentId}/`, academicInfo);
        return response.data;
    },
    addAttendance: async (attendanceData) => {
        const response = await api.post('/attendance-records/', attendanceData);
        return response.data;
    },
};

// Subject services
export const subjectService = {
    getAllSubjects: async () => {
        const response = await api.get('/subjects/');
        return response.data;
    },
    getStudentSubjects: async () => {
        const response = await api.get('/student-subjects/');
        return response.data;
    },
};

// Career prediction services
export const careerService = {
    getCareerPredictions: async () => {
        const response = await api.get('/career-predictions/');
        return response.data;
    },
    updateCareerPrediction: async (studentId, predictionData) => {
        const response = await api.put(`/career-predictions/${studentId}/`, predictionData);
        return response.data;
    },
};

export default api;