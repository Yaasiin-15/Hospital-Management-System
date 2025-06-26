import React from 'react';
import { Search, User, LogOut, Menu, Sun, Moon, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              <span className="hidden sm:inline">Hospital Management System</span>
              <span className="sm:hidden">HMS</span>
            </h1>
          </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" className="p-1 md:p-2" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-1 md:p-2">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
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
  )
}