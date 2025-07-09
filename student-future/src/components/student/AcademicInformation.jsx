import React from 'react';
import { BookOpenIcon, AcademicCapIcon, CalendarIcon } from '@heroicons/react/24/outline';

const AcademicInformation = () => {
  return (
    <div className="py-6 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-8 mb-8">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4 animate-slide-up">
            Academic Information
          </h1>
          <p className="text-xl text-white/90 max-w-2xl animate-slide-up delay-100">
            Track your academic progress and achievements throughout your educational journey.
          </p>
        </div>
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-6 -left-6 animate-float"></div>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-8 -right-8 animate-float delay-300"></div>
        </div>
      </div>

      {/* Previous Academic Records */}
      <div className="bg-white dark:bg-[#1A1F2E] rounded-xl shadow-lg p-6 mb-8 animate-slide-up">
        <div className="flex items-center mb-6">
          <BookOpenIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Previous Academic Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Standard</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1A1F2E] divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">10th</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2020</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">70%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">BC</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Okey</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">12th</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2022</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">80%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">BB</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Good</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Current Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* PAT Scores */}
        <div className="bg-white dark:bg-[#1A1F2E] rounded-xl shadow-lg p-6 animate-slide-up delay-100">
          <div className="flex items-center mb-6">
            <AcademicCapIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">PAT Scores</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300">Math</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">80%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full animate-width-expand"
                  style={{ width: '80%' }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">10-03-2025</span>
                <span className="text-gray-500 dark:text-gray-400">Keep it up</span>
              </div>
            </div>
          </div>
        </div>

        {/* SAT Scores */}
        <div className="bg-white dark:bg-[#1A1F2E] rounded-xl shadow-lg p-6 animate-slide-up delay-200">
          <div className="flex items-center mb-6">
            <AcademicCapIcon className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">SAT Scores</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300">Science</span>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">70%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 dark:bg-purple-400 rounded-full animate-width-expand"
                  style={{ width: '70%' }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">20-3-2025</span>
                <span className="text-gray-500 dark:text-gray-400">Improve like this</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Section */}
      <div className="bg-white dark:bg-[#1A1F2E] rounded-xl shadow-lg p-6 animate-slide-up delay-300">
        <div className="flex items-center mb-6">
          <CalendarIcon className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance</h2>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Days</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">40 Days</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Present Days</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">35 Days</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center transform hover:scale-105 transition-transform">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Attendance Percentage</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">85%</p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1A1F2E] divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">10-3-2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Present
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Academic Achievements */}
      <div className="bg-white dark:bg-[#1A1F2E] rounded-xl shadow-lg p-6 mt-8 animate-slide-up delay-400">
        <div className="flex items-center mb-6">
          <AcademicCapIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Achievements</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Science Project Winner</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">First place in the district level science exhibition</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2024</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mathematics Olympiad</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">State level participation with distinction</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicInformation;