"use client";
import React, { useState, useEffect } from 'react';
import { undergraduateMajors } from '@/lib/majors';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    major: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState(user.major);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [show, setShow] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const unsaved = name !== user.name || password !== '' || major !== user.major;
    setHasUnsavedChanges(unsaved);
    if (major !== user.major) {
      setShowRecaptcha(true);
    } else {
      setShowRecaptcha(false);
    }
  }, [name, password, major, user.name, user.major]);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800); // Duration of the animation
    } else {
      setShow(false);
      setTimeout(onClose, 300); // Wait for animation to finish
    }
  };
  
  const handleSave = () => {
    if (major !== user.major) {
      // Here you would typically verify the reCAPTCHA token
      alert("Please confirm you're not a robot to change your major.");
      return;
    }
    // Save the changes
    alert(`Saving changes for ${name}...`);
    setShow(false);
    setTimeout(onClose, 300);
  }

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 transition-colors duration-300 ${show ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent backdrop-blur-none'}`}>
      <div 
        className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 ${isShaking ? 'animate-shake-glow' : ''} ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {undergraduateMajors.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          
          {showRecaptcha && (
            <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-400">
              <p className="text-sm text-yellow-800 mb-2">To change your major, please complete the reCAPTCHA.</p>
              {/* Placeholder for reCAPTCHA */}
              <div className="w-full h-16 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">reCAPTCHA placeholder</p>
              </div>
              <button className="mt-2 text-sm text-blue-600 hover:underline">I'm not a robot</button>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400"
            disabled={!hasUnsavedChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
