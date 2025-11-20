"use client";

import { useState } from 'react';
import Link from 'next/link';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          {/* You can replace this with a user's profile picture */}
          <span className="text-lg font-bold text-gray-600">U</span>
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
