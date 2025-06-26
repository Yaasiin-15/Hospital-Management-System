import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { useState, useEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useApi.js';
import BreadcrumbNav from '../components/common/BreadcrumbNav';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { width } = useWindowSize();
  const mainContentRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    if (width < 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [width]);

  // Scroll to top when route changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && width < 768 && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity md:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
        />
        
        <main 
          ref={mainContentRef}
          className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <BreadcrumbNav />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;