import React, { useState, useRef } from 'react';
import { Search, User, LogOut, Menu, Sun, Moon, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button.jsx';
import SearchInput from '../ui/SearchInput.jsx';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const userMenuRef = useRef(null);
  
  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center">
          <Button 
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="mr-2 md:mr-3 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>

          <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white hidden md:block">
            Hospital Management System
          </h1>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white md:hidden">
            HMS
          </h1>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Search */}
          <div className="hidden md:block w-64 lg:w-80">
            <SearchInput placeholder="Search..." />
          </div>
          
          {/* Mobile Search Toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2" 
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Mobile Search Expanded */}
          {showMobileSearch && (
            <div className="absolute top-16 left-0 right-0 p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 md:hidden">
              <SearchInput 
                placeholder="Search..." 
                autoFocus={true}
                onBlur={() => setShowMobileSearch(false)}
              />
            </div>
          )}

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>
          
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2" 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              <p className="font-medium text-gray-900 dark:text-white text-sm">{user?.username || 'User'}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{user?.role || 'Role'}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout} 
              className="p-2"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;