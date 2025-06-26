import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';
import NurseDashboard from './pages/nurse/Dashboard';
import ReceptionistDashboard from './pages/receptionist/Dashboard';
import PatientDashboard from './pages/patient/Dashboard';

// Admin Pages
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// Doctor Pages
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPatients from './pages/doctor/Patients';
import MedicalRecords from './pages/doctor/MedicalRecords';
import DoctorSchedule from './pages/doctor/Schedule';

// Nurse Pages
import PatientCare from './pages/nurse/PatientCare';
import Medications from './pages/nurse/Medications';
import Vitals from './pages/nurse/Vitals';

// Receptionist Pages
import PatientRegistration from './pages/receptionist/PatientRegistration';
import AppointmentBooking from './pages/receptionist/AppointmentBooking';
import CheckIn from './pages/receptionist/CheckIn';

// Patient Pages
import PatientAppointments from './pages/patient/Appointments';
import MedicalHistory from './pages/patient/MedicalHistory';
import Billing from './pages/patient/Billing';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/admin" replace />} />
                
                {/* Admin Routes */}
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/users" element={<UserManagement />} />
                <Route path="admin/reports" element={<Reports />} />
                <Route path="admin/settings" element={<Settings />} />
                
                {/* Doctor Routes */}
                <Route path="doctor" element={<DoctorDashboard />} />
                <Route path="doctor/appointments" element={<DoctorAppointments />} />
                <Route path="doctor/patients" element={<DoctorPatients />} />
                <Route path="doctor/records" element={<MedicalRecords />} />
                <Route path="doctor/schedule" element={<DoctorSchedule />} />
                
                {/* Nurse Routes */}
                <Route path="nurse" element={<NurseDashboard />} />
                <Route path="nurse/patients" element={<PatientCare />} />
                <Route path="nurse/medications" element={<Medications />} />
                <Route path="nurse/vitals" element={<Vitals />} />
                
                {/* Receptionist Routes */}
                <Route path="receptionist" element={<ReceptionistDashboard />} />
                <Route path="receptionist/register" element={<PatientRegistration />} />
                <Route path="receptionist/appointments" element={<AppointmentBooking />} />
                <Route path="receptionist/checkin" element={<CheckIn />} />
                
                {/* Patient Routes */}
                <Route path="patient" element={<PatientDashboard />} />
                <Route path="patient/appointments" element={<PatientAppointments />} />
                <Route path="patient/history" element={<MedicalHistory />} />
                <Route path="patient/billing" element={<Billing />} />
              </Route>

              {/* Redirect to login */}
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;