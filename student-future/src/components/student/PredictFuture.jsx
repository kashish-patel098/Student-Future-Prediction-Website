import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  ChartBarIcon,
  AcademicCapIcon,
  CalendarIcon,
  SparklesIcon,
  ArrowPathIcon,
  BookOpenIcon,
  UserGroupIcon,
  BriefcaseIcon,
  BeakerIcon,
  CodeBracketIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  XMarkIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

// Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.2,
//       duration: 0.3
//     }
//   },
//   exit: {
//     opacity: 0,
//     transition: {
//       when: "afterChildren",
//       staggerChildren: 0.1,
//       staggerDirection: -1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 10
//     }
//   },
//   exit: {
//     y: -20,
//     opacity: 0
//   }
// };

// const cardVariants = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 10
//     }
//   },
//   hover: {
//     scale: 1.05,
//     boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 10
//     }
//   },
//   tap: {
//     scale: 0.95
//   }
// };

// const progressVariants = {
//   hidden: { width: 0 },
//   visible: width => ({
//     width: `${width}%`,
//     transition: {
//       duration: 1,
//       ease: "easeOut"
//     }
//   })
// };

// const floatingAnimation = {
//   initial: { y: 0 },
//   animate: {
//     y: [0, -10, 0],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       repeatType: "reverse",
//       ease: "easeInOut"
//     }
//   }
// };

const PredictFuture = () => {
  const [selectedStandard, setSelectedStandard] = useState('');
  const [formData, setFormData] = useState({
    standard9: {
      subjects: {
        maths: '',
        hindi: '',
        gujarati: '',
        english: '',
        science: '',
        socialScience: ''
      },
      lastExamResult: '',
    },
    standard11: {
      subjects: {
        maths: '',
        physics: '',
        chemistry: '',
        english: '',
        computer: ''
      },
      lastExamResult: '',
    },
    patScore: '',
    satScore: '',
    attendance: ''
  });

  const [activeView, setActiveView] = useState('form');

  const handleSubjectChange = (standard, subject, value) => {
    setFormData(prev => ({
      ...prev,
      [standard]: {
        ...prev[standard],
        subjects: {
          ...prev[standard].subjects,
          [subject]: value
        }
      }
    }));
  };

  const handleLastExamResultChange = (standard, value) => {
    setFormData(prev => ({
      ...prev,
      [standard]: {
        ...prev[standard],
        lastExamResult: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // const [selectedCourse, setSelectedCourse] = useState(null);
  // const [showEntryTest, setShowEntryTest] = useState(false);
  // const [testAnswers, setTestAnswers] = useState({});
  // const [testResult, setTestResult] = useState(null);

  const controls = useAnimation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    controls.start("visible");
  }, [chatMessages, controls]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsChatLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your academic data to provide personalized insights. What specific aspects would you like to know more about?",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, assistantMessage]);
      setIsChatLoading(false);
    }, 1000);
  };

  // Sample academic data (replace with actual data from your backend)
  // const academicData = {
  //   subjects: {
  //     Mathematics: {
  //       currentScore: 85,
  //       predictedScore: 89,
  //       confidence: 85,
  //       trend: 'up'
  //     },
  //     Science: {
  //       currentScore: 78,
  //       predictedScore: 82,
  //       confidence: 80,
  //       trend: 'up'
  //     },
  //     English: {
  //       currentScore: 92,
  //       predictedScore: 90,
  //       confidence: 75,
  //       trend: 'down'
  //     }
  //   },
  //   behavior: {
  //     classParticipation: 75,
  //     assignmentCompletion: 90,
  //     attendance: 95
  //   }
  // };

  // const courseRecommendations = [
  //   {
  //     title: 'Computer Science',
  //     match: 85,
  //     description: 'Based on your strong performance in mathematics and analytical subjects',
  //     requirements: ['Strong Mathematics', 'Problem Solving', 'Programming Skills'],
  //     entryTest: [
  //       {
  //         question: 'What is the time complexity of binary search?',
  //         options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
  //         correct: 1
  //       },
  //       {
  //         question: 'Which data structure uses LIFO principle?',
  //         options: ['Queue', 'Stack', 'Array', 'Tree'],
  //         correct: 1
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Data Science',
  //     match: 80,
  //     description: 'Your pattern recognition and mathematical abilities suggest a good fit',
  //     requirements: ['Statistics', 'Programming', 'Analytical Thinking'],
  //     entryTest: [
  //       {
  //         question: 'What is the primary purpose of data normalization?',
  //         options: ['Speed up calculations', 'Standardize data scale', 'Reduce data size', 'Increase accuracy'],
  //         correct: 1
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Engineering',
  //     match: 75,
  //     description: 'Your problem-solving skills and technical aptitude align well',
  //     requirements: ['Physics', 'Mathematics', 'Design Thinking'],
  //     entryTest: [
  //       {
  //         question: 'What is the SI unit of force?',
  //         options: ['Watt', 'Newton', 'Joule', 'Pascal'],
  //         correct: 1
  //       }
  //     ]
  //   }
  // ];

  // const handleCourseSelect = (course) => {
  //   setSelectedCourse(course);
  //   setShowEntryTest(true);
  //   setTestAnswers({});
  //   setTestResult(null);
  // };

  // const handleTestSubmit = () => {
  //   if (!selectedCourse) return;
    
  //   const totalQuestions = selectedCourse.entryTest.length;
  //   const correctAnswers = selectedCourse.entryTest.filter(
  //     (q, idx) => testAnswers[idx] === q.correct
  //   ).length;
    
  //   const score = (correctAnswers / totalQuestions) * 100;
  //   setTestResult({
  //     score,
  //     feedback: score >= 70 
  //       ? "Excellent! You show strong aptitude for this course."
  //       : "Keep learning! Consider reviewing the prerequisites."
  //   });
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Performance Analysis</h1>
          <p className="text-xl text-gray-600">Enter your academic data to get personalized predictions</p>
        </motion.div>

        <motion.div className="flex justify-center space-x-4 mb-8">
          <motion.button
            onClick={() => setActiveView('form')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeView === 'form'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={activeView === 'form' ? {
                  rotate: [0, 360],
                  transition: { duration: 0.5 }
                } : {}}
              >
                <AcademicCapIcon className="h-5 w-5" />
              </motion.div>
              <span>Academic Performance</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => setActiveView('assistant')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeView === 'assistant'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={activeView === 'assistant' ? {
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  transition: { duration: 0.5 }
                } : {}}
              >
                <SparklesIcon className="h-5 w-5" />
              </motion.div>
              <span>AI Assistant</span>
            </div>
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === 'form' ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              // onSubmit={handleSubmit}
              method="POST" 
              action="{{url_for('home')}}"
              className="space-y-8"
            >
              {/* Standard Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Select Your Previous Standard</h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedStandard('standard9')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedStandard === 'standard9'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    9th Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStandard('standard11')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedStandard === 'standard11'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    11th Standard
                  </button>
                </div>
              </div>

              {/* Subject Scores */}
              {selectedStandard && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subject Scores</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStandard === 'standard9' ? (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Mathematics</label>
                          <input
                            type="number"
                            value={formData.standard9.subjects.maths}
                            onChange={(e) => handleSubjectChange('standard9', 'maths', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Hindi</label>
                          <input
                            type="number"
                            value={formData.standard9.subjects.hindi}
                            onChange={(e) => handleSubjectChange('standard9', 'hindi', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Gujarati</label>
                          <input
                            type="number"
                            value={formData.standard9.subjects.gujarati}
                            onChange={(e) => handleSubjectChange('standard9', 'gujarati', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">English</label>
                          <input
                            type="number"
                            value={formData.standard9.subjects.english}
                            onChange={(e) => handleSubjectChange('standard9', 'english', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Science</label>
                          <input
                            type="number"
                            value={formData.standard9.subjects.science}
                            onChange={(e) => handleSubjectChange('standard9', 'science', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Social Science</label>
                          <input
                            type="number"
                            value={formData.standard9.subjects.socialScience}
                            onChange={(e) => handleSubjectChange('standard9', 'socialScience', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Mathematics</label>
                          <input
                            type="number"
                            value={formData.standard11.subjects.maths}
                            onChange={(e) => handleSubjectChange('standard11', 'maths', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Physics</label>
                          <input
                            type="number"
                            value={formData.standard11.subjects.physics}
                            onChange={(e) => handleSubjectChange('standard11', 'physics', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Chemistry</label>
                          <input
                            type="number"
                            value={formData.standard11.subjects.chemistry}
                            onChange={(e) => handleSubjectChange('standard11', 'chemistry', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">English</label>
                          <input
                            type="number"
                            value={formData.standard11.subjects.english}
                            onChange={(e) => handleSubjectChange('standard11', 'english', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Computer</label>
                          <input
                            type="number"
                            value={formData.standard11.subjects.computer}
                            onChange={(e) => handleSubjectChange('standard11', 'computer', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter score"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Last Exam Result */}
              {selectedStandard && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exam Result</h2>
                  <div className="space-y-2">
                    <input
                      type="number"
                      value={selectedStandard === 'standard9' ? formData.standard9.lastExamResult : formData.standard11.lastExamResult}
                      onChange={(e) => handleLastExamResultChange(selectedStandard, e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter last exam result percentage"
                    />
                  </div>
                </div>
              )}

              {/* PAT and SAT Scores */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">PAT & SAT Scores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">PAT Score</label>
                    <input
                      type="number"
                      value={formData.patScore}
                      onChange={(e) => setFormData(prev => ({ ...prev, patScore: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Enter PAT score"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">SAT Score</label>
                    <input
                      type="number"
                      value={formData.satScore}
                      onChange={(e) => setFormData(prev => ({ ...prev, satScore: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Enter SAT score"
                    />
                  </div>
                </div>
              </div>

              {/* Attendance */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Attendance</h2>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={formData.attendance}
                    onChange={(e) => setFormData(prev => ({ ...prev, attendance: e.target.value }))}
                    className="w-full p-2 border rounded"
                    placeholder="Enter attendance percentage(without % sign)"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Generate Predictions
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                >
                  <SparklesIcon className="h-6 w-6 text-purple-600 mr-2" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900">AI Career Assistant</h2>
              </div>

              <motion.div 
                className="h-[600px] overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg"
              >
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.sender === 'user' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'assistant' && (
                          <SparklesIcon className="h-5 w-5 text-purple-500 mt-1" />
                        )}
                        <div>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isChatLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360],
                            transition: { duration: 1, repeat: Infinity }
                          }}
                        >
                          <SparklesIcon className="h-5 w-5 text-purple-500" />
                        </motion.div>
                        <motion.div
                          animate={{
                            rotate: 360,
                            transition: { duration: 1, repeat: Infinity }
                          }}
                        >
                          <ArrowPathIcon className="h-4 w-4 text-purple-500" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>

              <motion.form 
                onSubmit={handleSendMessage} 
                className="flex space-x-4"
              >
                <motion.input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about your career path..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  disabled={isChatLoading || !inputMessage.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </motion.button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PredictFuture;