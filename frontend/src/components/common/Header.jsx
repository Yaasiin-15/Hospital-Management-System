import React, { useState } from 'react';
import { Search, User, LogOut, Menu, Sun, Moon, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              <span className="hidden sm:inline">Hospital Management System</span>
              <span className="sm:hidden">HMS</span>
            </h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <div className={`${showMobileSearch ? 'block absolute left-0 right-0 top-0 p-4 bg-white dark:bg-gray-800 z-20' : 'hidden'} md:relative md:block`}>
              <SearchInput 
                placeholder="Search..." 
                onChange={() => {}}
                onSearch={() => {}}
                responsive={true}
                className="w-full md:w-64"
              />
            </div>

            {!showMobileSearch && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setShowMobileSearch(true)}
                aria-label="Show search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {showMobileSearch && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden absolute right-4 top-3 z-30"
                onClick={() => setShowMobileSearch(false)}
                aria-label="Close search"
              >
                <Sun className="h-5 w-5" />
              </Button>
            )}

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 md:p-2" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative p-1 md:p-2"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center">
              <div className="hidden md:block mr-2">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{user?.username || 'Guest'}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{user?.role || 'User'}</p>
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
      </div>
    </header>
  );
};

export default Header;