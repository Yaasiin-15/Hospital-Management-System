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
import DoctorDashboard from './pages/doctor/Dashboard.jsx';
import NurseDashboard from './pages/nurse/Dashboard.jsx';
import ReceptionistDashboard from './pages/receptionist/Dashboard.jsx';
import PatientDashboard from './pages/patient/Dashboard.jsx';

// Context Providers
import { AuthProvider } from './context/AuthContext.jsx';
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
                
                {/* Doctor Routes */}
                <Route path="doctor" element={<DoctorDashboard />} />
                
                {/* Nurse Routes */}
                <Route path="nurse" element={<NurseDashboard />} />
                
                {/* Receptionist Routes */}
                <Route path="receptionist" element={<ReceptionistDashboard />} />
                
                {/* Patient Routes */}
                <Route path="patient" element={<PatientDashboard />} />
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