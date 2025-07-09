import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  UserPlusIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  MoonIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isFacultyPortal = location.pathname.startsWith('/faculty');
  const isStudentPortal = location.pathname.startsWith('/student');

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Load saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const featuresSection = document.getElementById('features');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#features');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`${
      (isFacultyPortal || isStudentPortal)
        ? 'bg-white dark:bg-[#1A1F2E] shadow-[0_4px_12px_rgba(79,70,229,0.15)] dark:shadow-[0_4px_12px_rgba(79,70,229,0.3)]' 
        : 'bg-white dark:bg-[#1A1F2E] shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                EduPortal
              </span>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden sm:flex sm:items-center sm:justify-center sm:flex-1">
            <div className="flex space-x-8">
              {isFacultyPortal ? (
                // Faculty Navigation Links
                <>
                  <Link
                    to="/faculty"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <HomeIcon className="h-5 w-5 mr-1" />
                    Home
                  </Link>
                  <Link
                    to="/faculty/add-info"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <UserPlusIcon className="h-5 w-5 mr-1" />
                    Add Information
                  </Link>
                  <Link
                    to="/faculty/students"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <UserGroupIcon className="h-5 w-5 mr-1" />
                    Students
                  </Link>
                  <Link
                    to={isFacultyPortal ? "/faculty/profile" : "/student/profile"}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <UserCircleIcon className="h-5 w-5  mr-1" />
                    Profile
                  </Link>
                </>
              ) : isStudentPortal ? (
                // Student Navigation Links
                <>
                  <Link
                    to="/student"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <HomeIcon className="h-5 w-5 mr-1" />
                    Home
                  </Link>
                  <Link
                    to="/student/academic"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <AcademicCapIcon className="h-5 w-5 mr-1" />
                    Academic Info
                  </Link>
                  <Link
                    to="/student/predict"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <ChartBarIcon className="h-5 w-5 mr-1" />
                    Predict Future
                  </Link>
                  <Link
                    to="/student/profile"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <UserCircleIcon className="h-5 w-5 mr-1" />
                    Profile
                  </Link>
                </>
              ) : (
                // Public Navigation Links
                <>
                  <Link
                    to="/"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <HomeIcon className="h-5 w-5 mr-1" />
                    Home
                  </Link>
                  <a
                    href="#features"
                    onClick={handleFeaturesClick}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <ChartBarIcon className="h-5 w-5 mr-1" />
                    Features
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Logout - Hide in mobile view for faculty portal */}
            {(isFacultyPortal || isStudentPortal) && !isMobileMenuOpen && (
              <div className="hidden sm:block">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            )}

            {/* Sign In/Sign Up buttons (only show on public pages and desktop) */}
            {!isFacultyPortal && !isStudentPortal && (
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <Link
                  to="/signin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isFacultyPortal ? (
              // Faculty Mobile Navigation Links
              <>
                <Link
                  to="/faculty"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <HomeIcon className="h-5 w-5 inline-block mr-2" />
                  Home
                </Link>
                <Link
                  to="/faculty/add-info"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <UserPlusIcon className="h-5 w-5 inline-block mr-2" />
                  Add Information
                </Link>
                <Link
                  to="/faculty/students"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <UserGroupIcon className="h-5 w-5 inline-block mr-2" />
                  Students
                </Link>
                <Link
                  to="/faculty/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <UserCircleIcon className="h-5 w-5 inline-block mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 inline-block mr-2" />
                  Logout
                </button>
              </>
            ) : isStudentPortal ? (
              // Student Mobile Navigation Links
              <>
                <Link
                  to="/student"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <HomeIcon className="h-5 w-5 inline-block mr-2" />
                  Home
                </Link>
                <Link
                  to="/student/academic"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <AcademicCapIcon className="h-5 w-5 inline-block mr-2" />
                  Academic Info
                </Link>
                <Link
                  to="/student/predict"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <ChartBarIcon className="h-5 w-5 inline-block mr-2" />
                  Predict Future
                </Link>
                <Link
                  to="/student/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <UserCircleIcon className="h-5 w-5 inline-block mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 inline-block mr-2" />
                  Logout
                </button>
              </>
            ) : (
              // Public Mobile Navigation Links
              <>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <HomeIcon className="h-5 w-5 inline-block mr-2" />
                  Home
                </Link>
                <a
                  href="#features"
                  onClick={(e) => {
                    handleFeaturesClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <ChartBarIcon className="h-5 w-5 inline-block mr-2" />
                  Features
                </a>
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-2 text-base font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 border-2 border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;