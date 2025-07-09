import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

const FacultyProfile = () => {
  const [profile, setProfile] = useState({
    id: '1',
    name: 'Mr. Jigneshkumar S. Kolcha',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    contactNumber: '+91 95869 14134',
    email: 'jigneshkolcha123@faculty.edu',
    department: 'Computer Engineering',
    designation: 'Associate Professor',
    specialization: 'Computer Science',
    experience: 8,
    batches: [
      {
        id: '1',
        name: 'CS-2020',
        semester: 6,
        branch: 'Computer Science',
        studentCount: 60
      },
      {
        id: '2',
        name: 'CS-2021',
        semester: 4,
        branch: 'Computer Science',
        studentCount: 65
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('/api/faculty/upload-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const data = await response.json();
      setEditedProfile(prev => ({ ...prev, photo: data.photoUrl }));
      setProfile(prev => ({ ...prev, photo: data.photoUrl }));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setUploadError('Failed to upload photo. Please try again.');
      console.error('Photo upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50"
          >
            <CheckIcon className="h-5 w-5" />
            <span>Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50"
          >
            <XMarkIcon className="h-5 w-5" />
            <span>{uploadError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-purple-600 to-indigo-600">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg flex items-center space-x-2 hover:bg-white/30 transition-colors"
            >
              {isEditing ? (
                <>
                  <XMarkIcon className="h-5 w-5" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <PencilSquareIcon className="h-5 w-5" />
                  <span>Edit Profile</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className={`w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover ${isEditing ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                  onClick={handlePhotoClick}
                />
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <PhotoIcon className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <PencilSquareIcon className="h-5 w-5" />
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-20">
              <div className="space-y-6">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-0 w-full"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {profile.name}
                    </h2>
                  )}
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <PhoneIcon className="h-5 w-5 text-purple-500" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.contactNumber}
                            onChange={(e) => setEditedProfile({ ...editedProfile, contactNumber: e.target.value })}
                            className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-0"
                          />
                        ) : (
                          <span>{profile.contactNumber}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <EnvelopeIcon className="h-5 w-5 text-purple-500" />
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedProfile.email}
                            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                            className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-0"
                          />
                        ) : (
                          <span>{profile.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <AcademicCapIcon className="h-5 w-5 text-purple-500" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.department}
                            onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                            className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-0"
                          />
                        ) : (
                          <span>{profile.department}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <UserCircleIcon className="h-5 w-5 text-purple-500" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedProfile.designation}
                            onChange={(e) => setEditedProfile({ ...editedProfile, designation: e.target.value })}
                            className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-0"
                          />
                        ) : (
                          <span>{profile.designation}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Specialization
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.specialization}
                          onChange={(e) => setEditedProfile({ ...editedProfile, specialization: e.target.value })}
                          className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-0"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{profile.specialization}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Years of Experience
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editedProfile.experience}
                          onChange={(e) => setEditedProfile({ ...editedProfile, experience: parseInt(e.target.value) })}
                          className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-0"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{profile.experience} years</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Batches Under Supervision
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.batches.map((batch) => (
                      <div
                        key={batch.id}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2"
                      >
                        <h4 className="font-medium text-purple-600 dark:text-purple-400">
                          {batch.name}
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>Branch: {batch.branch}</p>
                          <p>Semester: {batch.semester}</p>
                          <p>Students: {batch.studentCount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-lg shadow-purple-500/20 flex items-center space-x-2"
                    >
                      <CheckIcon className="h-5 w-5" />
                      <span>Save Changes</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;