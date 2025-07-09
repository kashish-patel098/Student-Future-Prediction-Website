import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    user_type: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Split full name into first and last name
      const nameParts = userData.first_name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Create username from email (before @)
      const username = userData.email.split('@')[0];

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password length
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Validate name
      if (!firstName) {
        throw new Error('Please enter your full name');
      }

      // Log to console for debugging
      console.log('Attempting to register with:', {
        username,
        email: userData.email,
        password: userData.password,
        first_name: firstName,
        last_name: lastName,
        user_type: userData.user_type
      });

      const response = await authService.register({
        username,
        email: userData.email,
        password: userData.password,
        first_name: firstName,
        last_name: lastName,
        user_type: userData.user_type
      });
      console.log('Registration successful:', response);

      // Redirect to login page after successful registration
      navigate('/signin');
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.response?.data) {
        // Handle backend validation errors
        const errorData = err.response.data;
        console.log('Backend error data:', errorData);
        
        if (typeof errorData === 'object') {
          // Convert error object to array of messages
          const errorMessages = Object.entries(errorData).map(
            ([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
          );
          setError(errorMessages.join('; '));
        } else {
          setError(String(errorData));
        }
      } else if (err.message) {
        // Handle frontend validation errors or network errors
        setError(err.message);
      } else {
        // Generic error
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Create your account</h1>
      
      <div className="w-full max-w-md bg-white dark:bg-[#1A1F2E] rounded-lg p-10 shadow-lg">
        <div className="flex justify-center space-x-6 mb-10">
          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              userData.user_type === 'student'
                ? 'bg-[#6366F1] text-white shadow-lg shadow-indigo-500/25'
                : 'bg-gray-100 dark:bg-[#1F2937] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#374151]'
            }`}
            onClick={() => setUserData(prev => ({ ...prev, user_type: 'student' }))}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            Student
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              userData.user_type === 'faculty'
                ? 'bg-[#6366F1] text-white shadow-lg shadow-indigo-500/25'
                : 'bg-gray-100 dark:bg-[#1F2937] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#374151]'
            }`}
            onClick={() => setUserData(prev => ({ ...prev, user_type: 'faculty' }))}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            </svg>
            Faculty
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1F2937] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-300"
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1F2937] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-300"
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1F2937] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-300"
              required
              placeholder="Enter your password (min 8 characters)"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={userData.user_type === 'faculty'}
              onChange={(e) => setUserData(prev => ({
                ...prev,
                user_type: e.target.checked ? 'faculty' : 'student'
              }))}
            />
            <label>Register as Faculty</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366F1] text-white py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-indigo-500/25 mt-8 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <div className="pt-8 text-center border-t border-gray-200 dark:border-gray-700 mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#6366F1] hover:text-indigo-500 transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;