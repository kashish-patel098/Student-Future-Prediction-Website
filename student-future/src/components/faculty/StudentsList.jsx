import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { sendAcademicData } from '../../services/emailService';

const StudentsList = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [retryCount, setRetryCount] = useState({});

  // Mock data - Replace with actual API call
  const students = [
    {
      id: '1',
      name: 'John Doe',
      rollNumber: '20CS001',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      contactNumber: '+91 9876543210',
      parentNumber: '+91 9876543211',
      parentEmail: 'parent.doe@email.com',
      branch: 'Computer Science',
      semester: 4,
      academicData: [
        {
          subject: 'Mathematics',
          marks: 85,
          attendance: 90,
          assessment: 88,
          patScore: 92
        },
        {
          subject: 'Physics',
          marks: 78,
          attendance: 85,
          assessment: 82,
          patScore: 88
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      rollNumber: '20CS002',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      contactNumber: '+91 9876543212',
      parentNumber: '+91 9876543213',
      parentEmail: 'parent.smith@email.com',
      branch: 'Computer Science',
      semester: 4,
      academicData: [
        {
          subject: 'Mathematics',
          marks: 80,
          attendance: 85,
          assessment: 82,
          patScore: 88
        },
        {
          subject: 'Physics',
          marks: 75,
          attendance: 80,
          assessment: 78,
          patScore: 85
        }
      ]
    },
    // Add more mock students as needed
  ];

  // Get unique branches and semesters for filters
  const branches = useMemo(() => Array.from(new Set(students.map(s => s.branch))), []);
  const semesters = useMemo(() => Array.from(new Set(students.map(s => s.semester))), []);

  // Filter and search students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = searchTerm === '' || 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBranch = filterBranch === '' || student.branch === filterBranch;
      const matchesSemester = filterSemester === '' || student.semester.toString() === filterSemester;
      
      return matchesSearch && matchesBranch && matchesSemester;
    });
  }, [searchTerm, filterBranch, filterSemester]);

  const handleSendEmail = async (studentId) => {
    setIsLoading(studentId);
    const student = students.find(s => s.id === studentId);
    const currentRetryCount = retryCount[studentId] || 0;
    
    if (!student) {
      setIsLoading(null);
      setShowEmailError(true);
      setTimeout(() => setShowEmailError(false), 3000);
      return;
    }

    const attemptSend = async (attempt) => {
      try {
        const success = await sendAcademicData({
          name: student.name,
          rollNumber: student.rollNumber,
          parentEmail: student.parentEmail,
          academicData: student.academicData
        });

        if (success) {
          setShowEmailSuccess(true);
          setTimeout(() => setShowEmailSuccess(false), 3000);
          setRetryCount({ ...retryCount, [studentId]: 0 });
          return true;
        }
        throw new Error('Failed to send email');
      } catch (error) {
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          return attemptSend(attempt + 1);
        }
        setShowEmailError(true);
        setTimeout(() => setShowEmailError(false), 3000);
        setRetryCount({ ...retryCount, [studentId]: currentRetryCount + 1 });
        return false;
      }
    };

    try {
      await attemptSend(1);
    } finally {
      setIsLoading(null);
    }
  };

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

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="min-h-screen py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 mb-4">
          Students List
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and view information for students under your guidance
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg space-y-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem.toString()}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {showEmailSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50"
          >
            <CheckCircleIcon className="h-5 w-5" />
            <span>Academic data sent successfully!</span>
          </motion.div>
        )}
        {showEmailError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50"
          >
            <XCircleIcon className="h-5 w-5" />
            <span>Failed to send academic data. Please try again.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Students Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
      >
        {filteredStudents.map((student) => (
          <motion.div
            key={student.id}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            layoutId={student.id}
            onClick={() => setSelectedStudent(student.id)}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer relative group"
          >
            {/* Card Content */}
            <div className="p-6">
              {/* Student Photo and Basic Info */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500/20"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {student.rollNumber}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <PhoneIcon className="h-5 w-5 text-purple-500" />
                  <span>{student.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <PhoneIcon className="h-5 w-5 text-indigo-500" />
                  <span>Parent: {student.parentNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <EnvelopeIcon className="h-5 w-5 text-pink-500" />
                  <span>{student.parentEmail}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <AcademicCapIcon className="h-5 w-5 text-purple-500" />
                  <span>{student.branch} - Semester {student.semester}</span>
                </div>
              </div>

              {/* Send Email Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendEmail(student.id);
                }}
                disabled={isLoading === student.id}
                className={`mt-6 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isLoading === student.id ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading === student.id ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <EnvelopeIcon className="h-5 w-5" />
                )}
                <span>
                  {isLoading === student.id ? 'Sending...' : 'Send Academic Data'}
                </span>
              </motion.button>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              layoutId={selectedStudent}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {(() => {
                const student = students.find(s => s.id === selectedStudent);
                if (!student) return null;

                return (
                  <div className="space-y-6">
                    {/* Student Header */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-500/20"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {student.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {student.rollNumber}
                        </p>
                      </div>
                    </div>

                    {/* Academic Performance */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <ChartBarIcon className="h-5 w-5 mr-2 text-purple-500" />
                        Academic Performance
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {student.academicData.map((data, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                          >
                            <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">
                              {data.subject}
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Marks:</span>
                                <span className="font-medium">{data.marks}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Attendance:</span>
                                <span className="font-medium">{data.attendance}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Assessment:</span>
                                <span className="font-medium">{data.assessment}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>PAT Score:</span>
                                <span className="font-medium">{data.patScore}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Contact Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <PhoneIcon className="h-5 w-5 text-purple-500" />
                            <span>{student.contactNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <AcademicCapIcon className="h-5 w-5 text-purple-500" />
                            <span>{student.branch} - Semester {student.semester}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <PhoneIcon className="h-5 w-5 text-indigo-500" />
                            <span>Parent: {student.parentNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <EnvelopeIcon className="h-5 w-5 text-pink-500" />
                            <span>{student.parentEmail}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setSelectedStudent(null)}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        Close
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendEmail(student.id);
                        }}
                        disabled={isLoading === student.id}
                        className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-lg shadow-purple-500/20 flex items-center space-x-2 ${
                          isLoading === student.id ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading === student.id ? (
                          <ArrowPathIcon className="h-5 w-5 animate-spin" />
                        ) : (
                          <EnvelopeIcon className="h-5 w-5" />
                        )}
                        <span>
                          {isLoading === student.id
                            ? `Sending${'.'.repeat((retryCount[student.id] || 0) + 1)}`
                            : 'Send Academic Data'}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentsList;