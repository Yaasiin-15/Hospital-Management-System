import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// A mapping of paths to their readable names
const pathNames = {
  'admin': 'Admin Dashboard',
  'doctor': 'Doctor Dashboard',
  'nurse': 'Nurse Dashboard',
  'receptionist': 'Reception Dashboard',
  'patient': 'Patient Dashboard',
  'users': 'User Management',
  'reports': 'Reports & Analytics',
  'settings': 'System Settings',
  'appointments': 'Appointments',
  'patients': 'Patients',
  'schedule': 'Schedule',
  'records': 'Medical Records',
  'medications': 'Medications',
  'vitals': 'Vital Signs',
  'register': 'Patient Registration',
  'checkin': 'Check-In',
  'history': 'Medical History',
  'billing': 'Billing & Payments',
  'monitoring': 'System Monitoring',
  'audit-logs': 'Audit Logs',
  'departments': 'Department Management',
  'backup': 'Backup Management'
};

const BreadcrumbNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Skip rendering on the main dashboard pages
  if (['/admin', '/doctor', '/nurse', '/receptionist', '/patient'].includes(location.pathname)) {
    return null;
  }
  
  // Create breadcrumb items from the current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    return {
      name,
      url,
      isLast: index === pathSegments.length - 1
    };
  });
  
  // Get the role dashboard as the starting point
  const roleDashboard = `/${pathSegments[0]}`;
  const roleName = pathNames[pathSegments[0]];
  
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4">
      <Link to={roleDashboard} className="flex items-center hover:text-gray-700">
        <Home className="h-4 w-4 mr-1" />
        <span>{roleName}</span>
      </Link>
      
      {breadcrumbItems.slice(1).map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 mx-2" />
          {item.isLast ? (
            <span className="text-gray-900 font-medium">{item.name}</span>
          ) : (
            <Link to={item.url} className="hover:text-gray-700">
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;