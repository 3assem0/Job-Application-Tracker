import React, { useState, useRef, useEffect } from 'react';
import { mockActivities } from './mockData';

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-30">
          <div className="p-4 border-b border-gray-100 font-semibold text-gray-800">Notifications</div>
          <ul className="divide-y divide-gray-100">
            {mockActivities.slice(0, 3).map((activity) => (
              <li key={activity.id} className="flex items-start px-4 py-3 hover:bg-gray-50 transition">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-sm">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-2 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View all</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown; 