import React from 'react';
import NotificationDropdown from './NotificationDropdown';

const Header = ({ toggleSidebar, user }) => (
  <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm p-4 flex justify-between items-center z-10">
    <div className="flex items-center">
      <button 
        onClick={toggleSidebar}
        className="md:hidden text-gray-600 focus:outline-none mr-3"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard</h1>
    </div>
    
    <div className="flex items-center space-x-4">
      <NotificationDropdown />
      <div className="flex items-center">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
          {user.name.charAt(0)}
        </div>
        <div className="ml-2 hidden md:block">
          <p className="text-sm font-medium text-gray-800">{user.name}</p>
          <p className="text-xs text-gray-500">Freelancer</p>
        </div>
      </div>
    </div>
  </header>
);

export default Header; 