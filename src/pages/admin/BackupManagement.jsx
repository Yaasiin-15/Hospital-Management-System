import React, { useState } from 'react';
import { Database, Download, Upload, Calendar, Clock, Check, AlertTriangle, Play, Pause } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import toast from 'react-hot-toast';

const BackupManagement = () => {
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);

  const [backupHistory] = useState([
    {
      id: 1,
      name: 'Full_Backup_2024_01_15_02_00',
      type: 'Full Backup',
      size: '2.4 GB',
      date: '2024-01-15',
      time: '02:00:00',
      status: 'completed',
      duration: '45 minutes',
      location: 'AWS S3 - us-east-1'
    },
    {
      id: 2,
      name: 'Incremental_Backup_2024_01_14_14_30',
      type: 'Incremental',
      size: '156 MB',
      date: '2024-01-14',
      time: '14:30:00',
      status: 'completed',
      duration: '8 minutes',
      location: 'Local Storage'
    },
    {
      id: 3,
      name: 'Full_Backup_2024_01_14_02_00',
      type: 'Full Backup',
      size: '2.3 GB',
      date: '2024-01-14',
      time: '02:00:00',
      status: 'completed',
      duration: '42 minutes',
      location: 'AWS S3 - us-east-1'
    },
    {
      id: 4,
      name: 'Emergency_Backup_2024_01_13_16_45',
      type: 'Manual',
      size: '2.2 GB',
      date: '2024-01-13',
      time: '16:45:00',
      status: 'completed',
      duration: '38 minutes',
      location: 'Azure Blob Storage'
    },
    {
      id: 5,
      name: 'Incremental_Backup_2024_01_13_08_15',
      type: 'Incremental',
      size: '89 MB',
      date: '2024-01-13',
      time: '08:15:00',
      status: 'failed',
      duration: '5 minutes',
      location: 'Local Storage'
    }
  ]);

  const [schedules] = useState([
    {
      id: 1,
      name: 'Daily Full Backup',
      type: 'Full Backup',
      schedule: 'Daily at 2:00 AM',
      retention: '30 days',
      destination: 'AWS S3',
      status: 'active',
      nextRun: '2024-01-16 02:00:00'
    },
    {
      id: 2,
      name: 'Hourly Incremental',
      type: 'Incremental',
      schedule: 'Every 4 hours',
      retention: '7 days',
      destination: 'Local Storage',
      status: 'active',
      nextRun: '2024-01-15 18:00:00'
    },
    {
      id: 3,
      name: 'Weekly Archive',
      type: 'Archive',
      schedule: 'Weekly on Sunday',
      retention: '1 year',
      destination: 'Azure Blob',
      status: 'paused',
      nextRun: 'Paused'
    }
  ]);

  const [backupConfig, setBackupConfig] = useState({
    type: 'full',
    destination: 'aws-s3',
    compression: true,
    encryption: true,
    description: ''
  });

  const handleStartBackup = () => {
    toast.success('Backup started successfully');
    setIsBackupModalOpen(false);
  };

  const handleRestoreBackup = (backup) => {
    setSelectedBackup(backup);
    setIsRestoreModalOpen(true);
  };

  const handleConfirmRestore = () => {
    toast.success(`Restore initiated from backup: ${selectedBackup.name}`);
    setIsRestoreModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Check className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      case 'running': return <Play className="h-4 w-4" />;
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = [
    { 
      name: 'Total Backups', 
      value: backupHistory.length, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      name: 'Successful Backups', 
      value: backupHistory.filter(b => b.status === 'completed').length, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
    { 
      name: 'Total Storage Used', 
      value: '12.8 GB', 
      color: 'text-purple-600', 
      bg: 'bg-purple-100' 
    },
    { 
      name: 'Active Schedules', 
      value: schedules.filter(s => s.status === 'active').length, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100' 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Backup Management</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Backup
          </Button>
          <Button onClick={() => setIsBackupModalOpen(true)}>
            <Database className="h-4 w-4 mr-2" />
            Start Backup
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Database className={`h-6 w-6 ${stat.color}`} />
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
        {/* Backup History */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Backups</h3>
            <div className="space-y-4">
              {backupHistory.slice(0, 5).map((backup) => (
                <div key={backup.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-sm">{backup.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}>
                        {getStatusIcon(backup.status)}
                        <span className="ml-1">{backup.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Size:</span> {backup.size}</p>
                    <p><span className="font-medium">Date:</span> {backup.date} {backup.time}</p>
                    <p><span className="font-medium">Duration:</span> {backup.duration}</p>
                    <p><span className="font-medium">Location:</span> {backup.location}</p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRestoreBackup(backup)}
                    >
                      Restore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Backup Schedules */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Schedules</h3>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(schedule.status)}`}>
                      {getStatusIcon(schedule.status)}
                      <span className="ml-1">{schedule.status}</span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Type:</span> {schedule.type}</p>
                    <p><span className="font-medium">Schedule:</span> {schedule.schedule}</p>
                    <p><span className="font-medium">Retention:</span> {schedule.retention}</p>
                    <p><span className="font-medium">Destination:</span> {schedule.destination}</p>
                    <p><span className="font-medium">Next Run:</span> {schedule.nextRun}</p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      {schedule.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* All Backups Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Backups</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Name</TableCell>
                <TableCell header>Type</TableCell>
                <TableCell header>Size</TableCell>
                <TableCell header>Date/Time</TableCell>
                <TableCell header>Duration</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backupHistory.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell>
                    <span className="text-sm font-medium">{backup.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{backup.type}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{backup.size}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{backup.date} {backup.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{backup.duration}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}>
                      {getStatusIcon(backup.status)}
                      <span className="ml-1">{backup.status}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRestoreBackup(backup)}
                      >
                        Restore
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Start Backup Modal */}
      <Modal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        title="Start Manual Backup"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Backup Type
            </label>
            <select
              value={backupConfig.type}
              onChange={(e) => setBackupConfig({...backupConfig, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="full">Full Backup</option>
              <option value="incremental">Incremental Backup</option>
              <option value="differential">Differential Backup</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <select
              value={backupConfig.destination}
              onChange={(e) => setBackupConfig({...backupConfig, destination: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="aws-s3">AWS S3</option>
              <option value="azure-blob">Azure Blob Storage</option>
              <option value="local">Local Storage</option>
              <option value="google-cloud">Google Cloud Storage</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={backupConfig.compression}
                onChange={(e) => setBackupConfig({...backupConfig, compression: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Enable compression</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={backupConfig.encryption}
                onChange={(e) => setBackupConfig({...backupConfig, encryption: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Enable encryption</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={backupConfig.description}
              onChange={(e) => setBackupConfig({...backupConfig, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Add a description for this backup..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={() => setIsBackupModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStartBackup}>
              Start Backup
            </Button>
          </div>
        </div>
      </Modal>

      {/* Restore Confirmation Modal */}
      <Modal
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
        title="Confirm Restore"
        size="md"
      >
        {selectedBackup && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Warning: Data Restore Operation
                  </h3>
                  <p className="mt-2 text-sm text-yellow-700">
                    This operation will restore the database to the state from the selected backup. 
                    All current data will be replaced. Please ensure you have a current backup before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Backup Details:</h4>
              <div className="bg-gray-50 p-3 rounded-md space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {selectedBackup.name}</p>
                <p><span className="font-medium">Type:</span> {selectedBackup.type}</p>
                <p><span className="font-medium">Size:</span> {selectedBackup.size}</p>
                <p><span className="font-medium">Date:</span> {selectedBackup.date} {selectedBackup.time}</p>
                <p><span className="font-medium">Location:</span> {selectedBackup.location}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setIsRestoreModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmRestore}>
                Confirm Restore
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BackupManagement;