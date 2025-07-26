import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user] = useState({
    name: "John Doe",
    role: "Freelancer"
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;