import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

// Auth Pages
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';

// Dashboard Pages
import AdminDashboard from './pages/admin/Dashboard.jsx';
import SystemMonitoring from './pages/admin/SystemMonitoring.jsx';
import AuditLogs from './pages/admin/AuditLogs.jsx';
import DepartmentManagement from './pages/admin/DepartmentManagement.jsx';
import BackupManagement from './pages/admin/BackupManagement.jsx';
import DoctorDashboard from './pages/doctor/Dashboard.jsx';
import NurseDashboard from './pages/nurse/Dashboard.jsx';
import ReceptionistDashboard from './pages/receptionist/Dashboard.jsx';
import PatientDashboard from './pages/patient/Dashboard.jsx';

// Admin Pages
import UserManagement from './pages/admin/UserManagement.jsx';
import Reports from './pages/admin/Reports.jsx';
import Settings from './pages/admin/Settings.jsx';

// Doctor Pages
import DoctorAppointments from './pages/doctor/Appointments.jsx';
import DoctorPatients from './pages/doctor/Patients.jsx';
import MedicalRecords from './pages/doctor/MedicalRecords.jsx';
import DoctorSchedule from './pages/doctor/Schedule.jsx';

// Nurse Pages
import PatientCare from './pages/nurse/PatientCare.jsx';
import Medications from './pages/nurse/Medications.jsx';
import Vitals from './pages/nurse/Vitals.jsx';

// Receptionist Pages
import PatientRegistration from './pages/receptionist/PatientRegistration.jsx';
import AppointmentBooking from './pages/receptionist/AppointmentBooking.jsx';
import CheckIn from './pages/receptionist/CheckIn.jsx';

// Patient Pages
import PatientAppointments from './pages/patient/Appointments.jsx';
import MedicalHistory from './pages/patient/MedicalHistory.jsx';
import Billing from './pages/patient/Billing.jsx';

// Context Providers
import { AuthProvider } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <React.Suspense fallback={<LoadingScreen />}>
            <AuthProvider>
              <NotificationProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
                    <Route path="admin/monitoring" element={<SystemMonitoring />} />
                    <Route path="admin/audit-logs" element={<AuditLogs />} />
                    <Route path="admin/departments" element={<DepartmentManagement />} />
                    <Route path="admin/backup" element={<BackupManagement />} />
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
                  </div>
                </Router>
              </NotificationProvider>
            </AuthProvider>
          </React.Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;