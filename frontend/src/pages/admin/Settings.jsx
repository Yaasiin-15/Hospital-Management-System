import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Mail } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    hospitalName: 'City General Hospital',
    hospitalAddress: '123 Medical Center Drive, City, State 12345',
    hospitalPhone: '+1 (555) 123-4567',
    hospitalEmail: 'info@citygeneralhospital.com',
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    billingAlerts: true,
    passwordExpiry: '90',
    sessionTimeout: '30',
    twoFactorAuth: false,
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
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
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
      </div>
    </div>
  );
};

export default Settings;