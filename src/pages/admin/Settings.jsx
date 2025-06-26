import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Mail } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    hospitalName: 'City General Hospital',
    hospitalAddress: '123 Medical Center Drive, City, State 12345',
    hospitalPhone: '+1 (555) 123-4567',
    hospitalEmail: 'info@citygeneralhospital.com',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    billingAlerts: true,
    
    // Security Settings
    passwordExpiry: '90',
    sessionTimeout: '30',
    twoFactorAuth: false,
    
    // System Settings
    appointmentSlotDuration: '30',
    workingHoursStart: '08:00',
    workingHoursEnd: '18:00',
    maxAppointmentsPerDay: '50',
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      toast.success('Settings reset to default values');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            </div>
            <div className="space-y-4">
              <Input
                label="Hospital Name"
                value={settings.hospitalName}
                onChange={(e) => handleInputChange('hospitalName', e.target.value)}
              />
              <Input
                label="Address"
                value={settings.hospitalAddress}
                onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
              />
              <Input
                label="Phone Number"
                value={settings.hospitalPhone}
                onChange={(e) => handleInputChange('hospitalPhone', e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={settings.hospitalEmail}
                onChange={(e) => handleInputChange('hospitalEmail', e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Appointment Reminders</label>
                <input
                  type="checkbox"
                  checked={settings.appointmentReminders}
                  onChange={(e) => handleInputChange('appointmentReminders', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Billing Alerts</label>
                <input
                  type="checkbox"
                  checked={settings.billingAlerts}
                  onChange={(e) => handleInputChange('billingAlerts', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Expiry (days)
                </label>
                <select
                  value={settings.passwordExpiry}
                  onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (minutes)
                </label>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Slot Duration (minutes)
                </label>
                <select
                  value={settings.appointmentSlotDuration}
                  onChange={(e) => handleInputChange('appointmentSlotDuration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Working Hours Start"
                  type="time"
                  value={settings.workingHoursStart}
                  onChange={(e) => handleInputChange('workingHoursStart', e.target.value)}
                />
                <Input
                  label="Working Hours End"
                  type="time"
                  value={settings.workingHoursEnd}
                  onChange={(e) => handleInputChange('workingHoursEnd', e.target.value)}
                />
              </div>
              <Input
                label="Max Appointments Per Day"
                type="number"
                value={settings.maxAppointmentsPerDay}
                onChange={(e) => handleInputChange('maxAppointmentsPerDay', e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;