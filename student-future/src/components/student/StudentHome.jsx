import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, AcademicCapIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const StudentHome = () => {
  return (
    <div className="py-6 animate-fade-in">
      {/* Welcome Section with Gradient */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 mb-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4 animate-slide-up">
            Welcome back, Student!
          </h1>
          <p className="text-xl text-white/90 max-w-2xl animate-slide-up delay-100">
            Your journey to academic excellence continues. Let's explore your progress and future possibilities.
          </p>
        </div>
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-6 -left-6 animate-float"></div>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-8 -right-8 animate-float delay-300"></div>
          <div className="absolute w-16 h-16 bg-white/10 rounded-full top-1/2 left-1/4 animate-float delay-500"></div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Academic Progress Card */}
        <Link
          to="/student/academic"
          className="group bg-white dark:bg-[#1A1F2E] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <AcademicCapIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Academic Progress</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Track your academic journey and view your latest achievements
              </p>
              <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                View Progress
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Future Prediction Card */}
        <Link
          to="/student/predict"
          className="group bg-white dark:bg-[#1A1F2E] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up delay-100"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <ChartBarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Career Insights</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Discover potential career paths based on your profile
              </p>
              <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-medium">
                Explore Careers
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Profile Card */}
        <Link
          to="/student/profile"
          className="group bg-white dark:bg-[#1A1F2E] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up delay-200"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <StarIcon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Profile</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Update your information and preferences
              </p>
              <div className="mt-4 flex items-center text-pink-600 dark:text-pink-400 font-medium">
                View Profile
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white dark:bg-[#1A1F2E] rounded-xl shadow-lg p-6 animate-slide-up delay-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
          <ClockIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 animate-pulse" />
        </div>
        
        <div className="space-y-4">
          {/* Activity Items */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-fade-in delay-100">
            <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-gray-900 dark:text-white font-medium">Academic Profile Updated</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-fade-in delay-200">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-gray-900 dark:text-white font-medium">Career Assessment Completed</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-fade-in delay-300">
            <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full"></div>
            <div>
              <p className="text-gray-900 dark:text-white font-medium">New Course Recommendations</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;