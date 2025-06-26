import React, { useState } from 'react';
import { Download, Calendar, Users, DollarSign, Activity } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');

  const stats = [
    { name: 'Total Patients', value: '2,651', change: '+12%', icon: Users, color: 'text-blue-600' },
    { name: 'Monthly Revenue', value: '$67,231', change: '+8%', icon: DollarSign, color: 'text-green-600' },
    { name: 'Appointments', value: '1,234', change: '+15%', icon: Calendar, color: 'text-purple-600' },
    { name: 'Bed Occupancy', value: '85%', change: '+3%', icon: Activity, color: 'text-yellow-600' },
  ];

  const handleExportReport = (type) => {
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

      {/* Quick Reports */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
};

export default Reports;