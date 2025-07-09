import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ChartBarIcon,
  CalendarIcon,
  BookOpenIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const FacultyHome = () => {
  // Mock data - replace with actual data from your backend
  const facultyName = "Mr. Jigneshkumar S. Kolcha";
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const quickActions = [
    {
      title: 'View Students',
      icon: UserGroupIcon,
      link: '/faculty/students',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800',
      iconColor: 'from-blue-200 to-white dark:from-blue-300 dark:to-white',
      hoverEffect: 'hover:scale-105 hover:shadow-blue-200 dark:hover:shadow-blue-900'
    },
    {
      title: 'Performance Analytics',
      icon: ChartBarIcon,
      link: '/faculty/analytics',
      bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800',
      iconColor: 'from-purple-200 to-white dark:from-purple-300 dark:to-white',
      hoverEffect: 'hover:scale-105 hover:shadow-purple-200 dark:hover:shadow-purple-900'
    },
    {
      title: 'Schedule Classes',
      icon: CalendarIcon,
      link: '/faculty/schedule',
      bgColor: 'bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-800',
      iconColor: 'from-green-200 to-white dark:from-green-300 dark:to-white',
      hoverEffect: 'hover:scale-105 hover:shadow-green-200 dark:hover:shadow-green-900'
    },
    {
      title: 'Course Management',
      icon: BookOpenIcon,
      link: '/faculty/courses',
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800',
      iconColor: 'from-orange-200 to-white dark:from-orange-300 dark:to-white',
      hoverEffect: 'hover:scale-105 hover:shadow-orange-200 dark:hover:shadow-orange-900'
    }
  ];

  const todaySchedule = [
    {
      subject: 'Advanced Mathematics',
      time: '09:00 AM - 10:30 AM',
      location: 'Room 201',
      students: 35
    },
    {
      subject: 'Computer Science',
      time: '11:00 AM - 12:30 PM',
      location: 'Lab 101',
      students: 42
    },
    {
      subject: 'Physics',
      time: '02:00 PM - 03:30 PM',
      location: 'Room 305',
      students: 28
    }
  ];

  const performanceMetrics = {
    averageAttendance: 92,
    studentPerformance: 87,
    courseCompletion: 95
  };

  const recentAchievements = [
    '100% attendance in Advanced Mathematics',
    'Top performing class in Computer Science',
    'Research paper accepted at EdTech Conference'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 relative overflow-hidden rounded-xl shadow-lg"
        >
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-pink-600/20 backdrop-blur-sm" />
          
          {/* Content container */}
          <div className="relative bg-white/80 dark:bg-gray-800/80 p-8 backdrop-blur-lg">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-400/20 dark:to-purple-400/20 rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 dark:from-purple-400/20 dark:to-pink-400/20 rounded-full blur-3xl transform -translate-x-20 translate-y-20" />

            {/* Content */}
            <div className="relative">
              <motion.h1 
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome back, {facultyName}
              </motion.h1>
              <motion.p 
                className="mt-2 text-gray-600 dark:text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Today's a great day to make an impact
              </motion.p>

              {/* Time and Date Container */}
              <div className="mt-4 inline-flex items-center space-x-4 bg-white dark:bg-gray-700 rounded-lg p-3 shadow-md">
                <motion.div 
                  className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xl font-semibold"
                  variants={pulseVariants}
                  initial="initial"
                  animate="pulse"
                >
                  <ClockIcon className="h-5 w-5" />
                  <span className="tabular-nums">{formattedTime}</span>
                </motion.div>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
                <div className="text-gray-600 dark:text-gray-300">
                  {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={action.link}
                className={`${action.bgColor} ${action.hoverEffect} p-6 rounded-xl shadow-lg backdrop-blur-lg transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] group relative overflow-hidden`}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon with gradient */}
                <div className="relative bg-gradient-to-br p-3 rounded-lg">
                  <action.icon className={`h-12 w-12 bg-gradient-to-br ${action.iconColor} group-hover:scale-110 transition-transform duration-300`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                </div>
                
                <h3 className="mt-4 text-lg font-medium text-white text-center relative z-10">
                  {action.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <ClockIcon className="h-6 w-6 mr-2 text-indigo-500 dark:text-indigo-400" />
                Today's Schedule
              </h2>
              <Link
                to="/faculty/schedule"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {todaySchedule.map((class_, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {class_.subject}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {class_.time} • {class_.location}
                    </p>
                  </div>
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                    <UserGroupIcon className="h-5 w-5 mr-1" />
                    <span>{class_.students} students</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Stats */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
          >
            {/* Performance Overview */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <ChartBarIcon className="h-6 w-6 mr-2 text-indigo-500 dark:text-indigo-400" />
                Performance Overview
              </h2>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                {Object.entries(performanceMetrics).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600"
                  >
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex items-center">
                      <motion.span 
                        className="text-lg font-semibold text-indigo-600 dark:text-indigo-400"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {value}%
                      </motion.span>
                      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 ml-1" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <AcademicCapIcon className="h-6 w-6 mr-2 text-indigo-500 dark:text-indigo-400" />
                Recent Achievements
              </h2>
              <motion.ul 
                className="space-y-4"
                variants={containerVariants}
              >
                {recentAchievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="flex items-start group"
                  >
                    <motion.div 
                      className="flex-shrink-0 h-3 w-3 mt-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 mr-3 group-hover:scale-125 transition-transform duration-300"
                      animate={{
                        scale: [1, 1.2, 1],
                        transition: { duration: 2, repeat: Infinity }
                      }}
                    />
                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {achievement}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FacultyHome;