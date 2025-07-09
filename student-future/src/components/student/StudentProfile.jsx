import React, { useState } from 'react';
import {
  UserCircleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Kashish Patel',
    studentId: '221040107035',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    email: 'patelkashish09@example.com',
    phone: '+91 94282 78608',
    address: 'GEPERI college, College Town',
    dateOfBirth: '2005-03-18',
    course: 'Computer Engineering',
    department: 'Computer Department',
    year: '3rd Year',
    parentName: 'Kiritbhai Patel',
    parentEmail: 'kiritbhai09@example.com',
    parentPhone: '+91 94282 78608',
    emergencyContact: '+91 94282 78608'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 mb-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            Student Profile
          </h1>
          <p className="text-xl text-white/90 max-w-2xl animate-slide-up">
            View and manage your personal information and academic details.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-6 -left-6 animate-float"></div>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-8 -right-8 animate-float delay-300"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Photo and Basic Info */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-[#1A1F2E] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-indigo-500">
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors">
                  <PencilIcon className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                    className="bg-transparent border-b-2 border-indigo-500 focus:outline-none text-center"
                  />
                ) : (
                  profile.name
                )}
              </h2>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                {profile.studentId}
              </p>
              <div className="flex justify-center space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2"
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-[#1A1F2E] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <UserCircleIcon className="h-8 w-8 text-indigo-500 mr-3" />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <EnvelopeIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.email}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <PhoneIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.phone}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedProfile.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <MapPinIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.address}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editedProfile.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <CalendarIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.dateOfBirth}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Course
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="course"
                      value={editedProfile.course}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <AcademicCapIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.course}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Department
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={editedProfile.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <BuildingOfficeIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.department}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Year
                  </label>
                  {isEditing ? (
                    <select
                      name="year"
                      value={editedProfile.year}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <CalendarIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.year}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="mt-8 bg-white dark:bg-[#1A1F2E] rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <UserGroupIcon className="h-8 w-8 text-indigo-500 mr-3" />
              Parent Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Parent Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="parentName"
                      value={editedProfile.parentName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <UserCircleIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.parentName}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Parent Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="parentEmail"
                      value={editedProfile.parentEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <EnvelopeIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.parentEmail}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Parent Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="parentPhone"
                      value={editedProfile.parentPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <PhoneIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      {profile.parentPhone}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={editedProfile.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-900 dark:text-white">
                      <PhoneIcon className="h-5 w-5 text-red-500 mr-2" />
                      {profile.emergencyContact}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;