import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Context Providers
import { AuthProvider } from './context/AuthContext';

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
              {/* Auth Routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* Protected Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="doctor" element={<DoctorDashboard />} />
                <Route path="nurse" element={<NurseDashboard />} />
                <Route path="receptionist" element={<ReceptionistDashboard />} />
                <Route path="patient" element={<PatientDashboard />} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;