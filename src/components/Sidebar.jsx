import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => (
  <aside 
    className={`fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-6 space-y-8 transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 transition-transform duration-300 ease-in-out z-20 shadow-xl`}
  >
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-white">Freelance Admin</h2>
        <p className="text-xs text-indigo-200 mt-1">Manage your projects & clients</p>
      </div>
      <button 
        onClick={closeSidebar}
        className="md:hidden text-indigo-300 hover:text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <nav className="space-y-1">
      {[
        { id: 'overview', label: 'Overview', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ) },
        { id: 'projects', label: 'Projects', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        ) },
        { id: 'clients', label: 'Clients', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ) },
        { id: 'profile', label: 'Profile Settings', icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ) }
      ].map(item => (
        <NavLink
          key={item.id}
          to={`/${item.id === 'overview' ? '' : item.id}`}
          onClick={closeSidebar}
          className={({ isActive }) => 
            `flex items-center w-full text-left p-3 rounded-lg transition-all ${
              isActive 
                ? 'bg-white/10 text-white shadow-md border-l-4 border-indigo-300' 
                : 'text-indigo-200 hover:bg-white/5'
            }`
          }
        >
          <span className="mr-3">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
    
    <div className="absolute bottom-6 left-0 right-0 px-6">
      <div className="bg-indigo-700/50 rounded-lg p-3">
        <p className="text-xs text-indigo-200">Need help?</p>
        <p className="text-sm font-medium text-white">Contact Support</p>
      </div>
    </div>
  </aside>
);

export default Sidebar; 