import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button';
import { Users, Calendar, FileText, DollarSign, TrendingUp, Activity } from 'lucide-react';
import mockData from '../../utils/mock';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await api.get('/dashboard/stats');
        
        // Using mock data for demo
        setTimeout(() => {
          setStats([
            { name: 'Total Patients', value: mockData.patients.length || '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
            { name: 'Appointments Today', value: mockData.appointments.length || '0', icon: Calendar, color: 'text-green-600', bg: 'bg-green-100' },
            { name: 'Medical Records', value: mockData.medicalRecords.length || '0', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
            { name: 'Revenue This Month', value: '$' + (mockData.billingRecords.reduce((sum, record) => sum + record.amount, 0) || '0'), icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-100' },
          ]);
          
          setRecentActivity([
            { id: 1, action: 'New patient registered', user: 'Dr. Smith', time: '2 minutes ago' },
            { id: 2, action: 'Appointment scheduled', user: 'Nurse Johnson', time: '5 minutes ago' },
            { id: 3, action: 'Medical record updated', user: 'Dr. Brown', time: '10 minutes ago' },
            { id: 4, action: 'Payment processed', user: user?.username || 'Admin', time: 'Just now' },
          ]);
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast.error("Failed to load dashboard data");
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, [user]);

  // Function to refresh dashboard data
  const refreshDashboard = () => {
    toast.success("Dashboard refreshed!");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshDashboard} 
          className="flex items-center space-x-2"
          loading={isLoading}
        >
          <Activity className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Skeleton loaders for stats
          Array(4).fill(0).map((_, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="ml-4 space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                </div>
              </div>
            </Card>
          ))
        ) : stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          // Skeleton loaders for cards
          Array(2).fill(0).map((_, index) => (
            <Card key={index}>
              <div className="p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3 mb-6"></div>
                <div className="space-y-4">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1.5"></div>
                      <div className="ml-3 space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <>
            {/* Recent Activities */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-gray-100">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">by {activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="/admin/users" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors block text-center">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">Manage Users</span>
                  </a>
                  <a href="/admin/reports" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors block text-center">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">View Reports</span>
                  </a>
                  <a href="/admin/departments" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors block text-center">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">Departments</span>
                  </a>
                  <a href="/admin/monitoring" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors block text-center">
                    <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-500 mx-auto mb-2" />
                    <span className="text-sm font-medium">System Monitor</span>
                  </div>
                </div>
              </button>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;