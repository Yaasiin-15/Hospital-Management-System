import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Settings,
  Activity,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { UserRole } from '../../types/index.js';

const Sidebar = () => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: `/${user?.role.toLowerCase()}`, icon: Home }
    ];

    switch (user?.role) {
      case UserRole.ADMIN:
        return [
          ...baseItems,
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
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">HMS</span>
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;