import React from 'react';
import { Link } from 'react-router-dom';
import Stats from './Stats';

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Shape Your Future with{' '}
              <span className="text-indigo-600 dark:text-indigo-400 animate-pulse">AI-Powered</span> Career Predictions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in delay-100">
              Discover your potential career paths and make informed decisions about your academic journey with our advanced AI prediction system.
            </p>
            <div className="flex space-x-4 animate-fade-in delay-200">
              <Link to="/signin" className="btn-primary transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Get Started
              </Link>
              <button 
                onClick={scrollToFeatures}
                className="btn-secondary transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="relative animate-fade-in delay-300">
            <div className="w-full h-[400px] bg-indigo-900 rounded-full opacity-10 absolute transform -rotate-6 animate-rotate"></div>
            <div className="w-full h-[400px] bg-indigo-800 rounded-full opacity-20 absolute transform rotate-3 animate-rotate"></div>
            <div className="w-full h-[400px] bg-indigo-600 rounded-full relative animate-float">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-white rounded-full absolute top-0 left-0 animate-pulse-ring"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 dark:bg-gray-800 py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Empowering your educational journey with cutting-edge technology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4 animate-float">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {['Career Path Analysis', 'Skill Gap Analysis', 'Industry Insights'][index]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {[
                    'Advanced analytics to predict optimal career paths based on your academic performance and interests.',
                    'Identify and bridge the gap between your current skills and industry requirements.',
                    'Real-time market trends and industry requirements to guide your career decisions.'
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Simple steps to unlock your potential</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {['Create Profile', 'AI Analysis', 'Get Insights', 'Take Action'][index]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {[
                    'Sign up and complete your academic profile',
                    'Our AI analyzes your profile and preferences',
                    'Receive personalized career predictions',
                    'Follow guided steps to achieve your goals'
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '95%', label: 'Student Success Rate' },
              { number: '10K+', label: 'Active Students' },
              { number: '500+', label: 'Partner Institutions' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-white transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-5xl font-bold mb-2 animate-float">{stat.number}</div>
                <div className="text-indigo-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div> 
      </div>*/}
      <Stats />
    </div>
  );
};

export default Hero;
