import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar, User, Activity } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [dateRange, setDateRange] = useState('today');
  const [selectedLog, setSelectedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      user: 'admin@hospital.com',
      action: 'LOGIN',
      resource: 'Authentication',
      details: 'User logged in successfully',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'info'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:25:12',
      user: 'dr.smith@hospital.com',
      action: 'CREATE',
      resource: 'Medical Record',
      details: 'Created medical record for patient P001',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      severity: 'info'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:20:45',
      user: 'nurse.johnson@hospital.com',
      action: 'UPDATE',
      resource: 'Patient Vitals',
      details: 'Updated vitals for patient in room 102',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:15:33',
      user: 'receptionist@hospital.com',
      action: 'DELETE',
      resource: 'Appointment',
      details: 'Cancelled appointment for patient P003',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
      severity: 'warning'
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:10:21',
      user: 'admin@hospital.com',
      action: 'CREATE',
      resource: 'User Account',
      details: 'Created new user account for Dr. Wilson',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'info'
    },
    {
      id: 6,
      timestamp: '2024-01-15 14:05:15',
      user: 'system',
      action: 'BACKUP',
      resource: 'Database',
      details: 'Automated database backup completed',
      ipAddress: 'localhost',
      userAgent: 'System Process',
      severity: 'info'
    },
    {
      id: 7,
      timestamp: '2024-01-15 13:55:42',
      user: 'unknown@external.com',
      action: 'LOGIN_FAILED',
      resource: 'Authentication',
      details: 'Failed login attempt - invalid credentials',
      ipAddress: '203.0.113.25',
      userAgent: 'curl/7.68.0',
      severity: 'error'
    },
    {
      id: 8,
      timestamp: '2024-01-15 13:50:30',
      user: 'dr.brown@hospital.com',
      action: 'VIEW',
      resource: 'Patient Record',
      details: 'Accessed patient record P005',
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'info'
    }
  ]);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || log.action === filterType;
    
    return matchesSearch && matchesType;
  });

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    console.log('Exporting audit logs...');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'CREATE': return 'bg-green-100 text-green-800';
      case 'UPDATE': return 'bg-blue-100 text-blue-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'VIEW': return 'bg-gray-100 text-gray-800';
      case 'LOGIN': return 'bg-purple-100 text-purple-800';
      case 'LOGIN_FAILED': return 'bg-red-100 text-red-800';
      case 'BACKUP': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { 
      name: 'Total Actions Today', 
      value: auditLogs.length, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      name: 'Failed Logins', 
      value: auditLogs.filter(log => log.action === 'LOGIN_FAILED').length, 
      color: 'text-red-600', 
      bg: 'bg-red-100' 
    },
    { 
      name: 'Data Modifications', 
      value: auditLogs.filter(log => ['CREATE', 'UPDATE', 'DELETE'].includes(log.action)).length, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100' 
    },
    { 
      name: 'Unique Users', 
      value: new Set(auditLogs.map(log => log.user)).size, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <Button onClick={handleExport} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Activity className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search logs by user, action, resource, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Actions</option>
                <option value="LOGIN">Login</option>
                <option value="LOGIN_FAILED">Failed Login</option>
                <option value="CREATE">Create</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
                <option value="VIEW">View</option>
                <option value="BACKUP">Backup</option>
              </select>
            </div>
            <div className="sm:w-48">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Timestamp</TableCell>
                <TableCell header>User</TableCell>
                <TableCell header>Action</TableCell>
                <TableCell header>Resource</TableCell>
                <TableCell header>Details</TableCell>
                <TableCell header>IP Address</TableCell>
                <TableCell header>Severity</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{log.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{log.resource}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 max-w-xs truncate block">{log.details}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-mono">{log.ipAddress}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewLog(log)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Log Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Audit Log Details"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Timestamp:</span> {selectedLog.timestamp}</p>
                  <p><span className="font-medium">User:</span> {selectedLog.user}</p>
                  <p><span className="font-medium">Action:</span> 
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(selectedLog.action)}`}>
                      {selectedLog.action}
                    </span>
                  </p>
                  <p><span className="font-medium">Resource:</span> {selectedLog.resource}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Technical Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">IP Address:</span> {selectedLog.ipAddress}</p>
                  <p><span className="font-medium">Severity:</span> 
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(selectedLog.severity)}`}>
                      {selectedLog.severity}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Details</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedLog.details}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">User Agent</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg font-mono text-sm">{selectedLog.userAgent}</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
                Export Details
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AuditLogs;