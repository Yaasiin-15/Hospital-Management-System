import React from 'react';
import { Search, User, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
            Hospital Management System
          </h1>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white sm:hidden">

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" className="p-2" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
            />
          </div>

          {/* Notifications */}
          <NotificationDropdown />

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-400" />
              <div className="text-sm">
                <p className="font-medium text-gray-900 dark:text-white">{user?.username}</p>
                <p className="text-gray-500 dark:text-gray-400">{user?.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="p-2">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;