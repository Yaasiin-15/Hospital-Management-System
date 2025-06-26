import React, { useState } from 'react';
import { Download, Calendar, Users, DollarSign, Activity } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');

  const appointmentData = [
    { name: 'Mon', appointments: 24 },
    { name: 'Tue', appointments: 32 },
    { name: 'Wed', appointments: 28 },
    { name: 'Thu', appointments: 35 },
    { name: 'Fri', appointments: 42 },
    { name: 'Sat', appointments: 18 },
    { name: 'Sun', appointments: 12 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 67000 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 35, color: '#3B82F6' },
    { name: 'Neurology', value: 25, color: '#10B981' },
    { name: 'Orthopedics', value: 20, color: '#F59E0B' },
    { name: 'Pediatrics', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' },
  ];

  const stats = [
    { name: 'Total Patients', value: '2,651', change: '+12%', icon: Users, color: 'text-blue-600' },
    { name: 'Monthly Revenue', value: '$67,231', change: '+8%', icon: DollarSign, color: 'text-green-600' },
    { name: 'Appointments', value: '1,234', change: '+15%', icon: Calendar, color: 'text-purple-600' },
    { name: 'Bed Occupancy', value: '85%', change: '+3%', icon: Activity, color: 'text-yellow-600' },
  ];

  const handleExportReport = (type) => {
    // Mock export functionality
    console.log(`Exporting ${type} report...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <Button onClick={() => handleExportReport('summary')} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Chart */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Appointments</h3>
              <Button variant="ghost" size="sm" onClick={() => handleExportReport('appointments')}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
              <Button variant="ghost" size="sm" onClick={() => handleExportReport('revenue')}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
              <Button variant="ghost" size="sm" onClick={() => handleExportReport('departments')}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Reports */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleExportReport('patient-summary')}
              >
                <Users className="h-4 w-4 mr-2" />
                Patient Summary Report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleExportReport('financial')}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleExportReport('staff-performance')}
              >
                <Activity className="h-4 w-4 mr-2" />
                Staff Performance
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleExportReport('inventory')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Inventory Report
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;