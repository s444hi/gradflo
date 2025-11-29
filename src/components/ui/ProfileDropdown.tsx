"use client";

import { useState } from 'react';
import ProfileModal from './ProfileModal';

const ProfileDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hardcoded user data, this should come from your auth context or user state
  const user = {
    name: 'Alex',
    major: 'Computer Science and Linguistics, BS',
  };
  
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border-2 border-primary/20">
          <span className="text-lg font-bold">{userInitial}</span>
        </div>
      </button>
      
      <ProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default ProfileDropdown;
