"use client";
import React, { useState, useEffect } from 'react';
import { undergraduateMajors } from '@/lib/majors';
import { useAuth } from '@/context/AuthContext';
import { Button } from './Button';
import { Input } from './Input';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    major: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  const { updateUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [major, setMajor] = useState(user.major);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setName(user.name);
      setMajor(user.major);
    } else {
      setShow(false);
    }
  }, [isOpen, user]);

  const handleSave = () => {
    updateUser({ name, major });
    handleClose();
  }

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 transition-all duration-300 ${show ? 'bg-black/30 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none pointer-events-none'}`}>
      <div
        className={`glass-panel rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 ${show ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-[var(--ios-gray-6)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--ios-gray-1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--ios-gray-1)] ml-1">Major</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--ios-gray-6)] rounded-xl text-[17px] outline-none border-2 border-transparent focus:border-[var(--ios-blue)] focus:bg-white transition-all appearance-none"
            >
              {undergraduateMajors.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
