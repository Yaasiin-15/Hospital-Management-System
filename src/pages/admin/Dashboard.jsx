import React from 'react';
import Card from '../../components/ui/Card';
import { Users, Calendar, FileText, DollarSign, TrendingUp, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { name: 'Total Patients', value: '2,651', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Appointments Today', value: '47', icon: Calendar, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Medical Records', value: '1,234', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Revenue This Month', value: '$45,231', icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ];

  const recentActivities = [
    { id: 1, action: 'New patient registered', user: 'Dr. Smith', time: '2 minutes ago' },
    { id: 2, action: 'Appointment scheduled', user: 'Nurse Johnson', time: '5 minutes ago' },
    { id: 3, action: 'Medical record updated', user: 'Dr. Brown', time: '10 minutes ago' },
    { id: 4, action: 'Payment processed', user: 'Admin', time: '15 minutes ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activities */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/admin/users" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block text-center">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium">Manage Users</span>
              </a>
              <a href="/admin/reports" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block text-center">
                <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium">View Reports</span>
              </a>
              <a href="/admin/departments" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block text-center">
                <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium">Departments</span>
              </a>
              <a href="/admin/monitoring" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors block text-center">
                <TrendingUp className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <span className="text-sm font-medium">System Monitor</span>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;