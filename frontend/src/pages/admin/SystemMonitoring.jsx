import React, { useState, useEffect } from 'react';
import { Activity, Server, Database, Users, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SystemMonitoring = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    serverStatus: 'healthy',
    dbStatus: 'healthy',
    apiStatus: 'healthy',
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [performanceData] = useState([
    { time: '00:00', cpu: 45, memory: 62, disk: 30, network: 25 },
    { time: '04:00', cpu: 35, memory: 58, disk: 32, network: 20 },
    { time: '08:00', cpu: 75, memory: 70, disk: 35, network: 60 },
    { time: '12:00', cpu: 85, memory: 75, disk: 40, network: 80 },
    { time: '16:00', cpu: 65, memory: 68, disk: 42, network: 55 },
    { time: '20:00', cpu: 45, memory: 60, disk: 38, network: 35 }
  ]);

  const [systemHealth] = useState([
    { component: 'Web Server', status: 'healthy', uptime: '99.9%', lastCheck: '2 min ago' },
    { component: 'Database', status: 'healthy', uptime: '99.8%', lastCheck: '1 min ago' },
    { component: 'API Gateway', status: 'healthy', uptime: '99.9%', lastCheck: '1 min ago' },
    { component: 'File Storage', status: 'warning', uptime: '98.5%', lastCheck: '5 min ago' },
    { component: 'Email Service', status: 'healthy', uptime: '99.7%', lastCheck: '3 min ago' },
    { component: 'Backup System', status: 'healthy', uptime: '99.9%', lastCheck: '1 min ago' }
  ]);

  const [activeUsers] = useState([
    { role: 'Doctors', count: 15, percentage: 30 },
    { role: 'Nurses', count: 25, percentage: 50 },
    { role: 'Receptionists', count: 5, percentage: 10 },
    { role: 'Patients', count: 5, percentage: 10 }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'error': return <AlertTriangle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Last updated: {systemMetrics.lastUpdate}</span>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Server className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Server Status</p>
              <p className={`text-lg font-bold ${getStatusColor(systemMetrics.serverStatus)}`}>
                {systemMetrics.serverStatus.toUpperCase()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Database</p>
              <p className={`text-lg font-bold ${getStatusColor(systemMetrics.dbStatus)}`}>
                {systemMetrics.dbStatus.toUpperCase()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">API Status</p>
              <p className={`text-lg font-bold ${getStatusColor(systemMetrics.apiStatus)}`}>
                {systemMetrics.apiStatus.toUpperCase()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-lg font-bold text-gray-900">
                {activeUsers.reduce((sum, user) => sum + user.count, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke="#10B981" name="Memory" strokeWidth={2} />
                <Line type="monotone" dataKey="disk" stroke="#F59E0B" name="Disk" strokeWidth={2} />
                <Line type="monotone" dataKey="network" stroke="#EF4444" name="Network" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Active Users Distribution */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Users by Role</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activeUsers}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ role, count }) => `${role}: ${count}`}
                >
                  {activeUsers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* System Health Status */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemHealth.map((component, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{component.component}</h4>
                  <div className={`flex items-center space-x-1 ${getStatusColor(component.status)}`}>
                    {getStatusIcon(component.status)}
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Uptime: {component.uptime}</p>
                  <p>Last check: {component.lastCheck}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full">
              <Server className="h-4 w-4 mr-2" />
              Restart Services
            </Button>
            <Button variant="outline" className="w-full">
              <Database className="h-4 w-4 mr-2" />
              Database Backup
            </Button>
            <Button variant="outline" className="w-full">
              <Activity className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            <Button variant="outline" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemMonitoring;