import axios from 'axios';

// Function to get CSRF cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift() || '';
    return '';
}

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000',  // Your Django backend URL
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
    },
    withCredentials: true,
});

export default api;