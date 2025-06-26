import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useState, useEffect } from 'react';
import { useWindowSize } from '../hooks/useApi';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { width } = useWindowSize();
  
  useEffect(() => {
    if (width < 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [width]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed inset-y-0 z-20 ${width < 768 && sidebarOpen ? 'inset-0 bg-black bg-opacity-50' : ''}`}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;