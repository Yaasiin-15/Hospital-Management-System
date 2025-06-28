import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button';

const SystemMonitoring = () => {
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkStatus: 'stable',
    activeUsers: 142,
    systemUptime: '7 days, 14 hours',
    lastBackup: '2024-01-15 02:00:00'
  });

  const [alerts, setAlerts] = useState([
    { id: 1, level: 'warning', message: 'High disk usage detected', timestamp: '2024-01-15 10:30:00' },
    { id: 2, level: 'info', message: 'System backup completed successfully', timestamp: '2024-01-15 02:00:00' },
    { id: 3, level: 'error', message: 'Database connection timeout', timestamp: '2024-01-15 09:15:00' }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(20, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        activeUsers: Math.max(50, Math.min(200, prev.activeUsers + Math.floor((Math.random() - 0.5) * 10)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (level) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsageColor = (usage) => {
    if (usage >= 80) return 'bg-red-500';
    if (usage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
        <Button onClick={() => window.location.reload()}>
          Refresh Data
        </Button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">CPU Usage</h3>
          <div className="mt-2 flex items-center">
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemStats.cpuUsage)}`}
                  style={{ width: `${systemStats.cpuUsage}%` }}
                ></div>
              </div>
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">{systemStats.cpuUsage}%</span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Memory Usage</h3>
          <div className="mt-2 flex items-center">
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemStats.memoryUsage)}`}
                  style={{ width: `${systemStats.memoryUsage}%` }}
                ></div>
              </div>
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">{systemStats.memoryUsage}%</span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Disk Usage</h3>
          <div className="mt-2 flex items-center">
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getUsageColor(systemStats.diskUsage)}`}
                  style={{ width: `${systemStats.diskUsage}%` }}
                ></div>
              </div>
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">{systemStats.diskUsage}%</span>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <div className="mt-2">
            <span className="text-2xl font-bold text-gray-900">{systemStats.activeUsers}</span>
          </div>
          <Badge variant="success" className="mt-1">Online</Badge>
        </Card>
      </div>

      {/* System Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Network Status:</span>
              <Badge variant="success">{systemStats.networkStatus}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">System Uptime:</span>
              <span className="font-medium">{systemStats.systemUptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Backup:</span>
              <span className="font-medium">{systemStats.lastBackup}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3">
                <Badge className={getStatusColor(alert.level)}>
                  {alert.level}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">99.9%</div>
            <div className="text-sm text-gray-500">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">2.3s</div>
            <div className="text-sm text-gray-500">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-gray-500">Requests/min</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemMonitoring;