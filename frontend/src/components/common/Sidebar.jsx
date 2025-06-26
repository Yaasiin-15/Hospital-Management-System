import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Settings,
  Activity,
  UserCheck,
  Stethoscope,
  Database,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { UserRole } from '../../types';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Close sidebar on navigation for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname, setSidebarOpen]);

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: `/${user?.role?.toLowerCase()}`, icon: Home }
    ];

    switch (user?.role) {
      case UserRole.ADMIN:
        return [
          ...baseItems,
          { name: 'System Monitoring', href: '/admin/monitoring', icon: Activity },
          { name: 'Audit Logs', href: '/admin/audit-logs', icon: FileText },
          { name: 'Departments', href: '/admin/departments', icon: Users },
          { name: 'Backup Management', href: '/admin/backup', icon: Database },
          { name: 'User Management', href: '/admin/users', icon: Users },
          { name: 'Reports', href: '/admin/reports', icon: FileText },
          { name: 'Settings', href: '/admin/settings', icon: Settings }
        ];
      
      case UserRole.DOCTOR:
        return [
          ...baseItems,
          { name: 'Appointments', href: '/doctor/appointments', icon: Calendar },
          { name: 'Patients', href: '/doctor/patients', icon: Users },
          { name: 'Medical Records', href: '/doctor/records', icon: FileText },
          { name: 'Schedule', href: '/doctor/schedule', icon: Activity }
        ];
      
      case UserRole.NURSE:
        return [
          ...baseItems,
          { name: 'Patient Care', href: '/nurse/patients', icon: UserCheck },
          { name: 'Medications', href: '/nurse/medications', icon: Activity },
          { name: 'Vitals', href: '/nurse/vitals', icon: Stethoscope }
        ];
      
      case UserRole.RECEPTIONIST:
        return [
          ...baseItems,
          { name: 'Patient Registration', href: '/receptionist/register', icon: Users },
          { name: 'Appointments', href: '/receptionist/appointments', icon: Calendar },
          { name: 'Check-in', href: '/receptionist/checkin', icon: UserCheck }
        ];
      
      case UserRole.PATIENT:
        return [
          ...baseItems,
          { name: 'My Appointments', href: '/patient/appointments', icon: Calendar },
          { name: 'Medical History', href: '/patient/history', icon: FileText },
          { name: 'Billing', href: '/patient/billing', icon: DollarSign }
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="bg-white dark:bg-gray-800 w-64 h-full shadow-lg flex flex-col overflow-hidden relative">
      {/* Mobile close button */}
      <button 
        className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="p-4 md:p-6">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">HMS</span>
        </div>
      </div>
      
      <nav className="mt-2 md:mt-6 flex-1 overflow-y-auto">
        <div className="px-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      
      <div className="p-4 text-xs text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        Hospital Management System<br />v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;