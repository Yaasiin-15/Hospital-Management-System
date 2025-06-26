import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';

const DoctorAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments] = useState([
    {
      id: 1,
      patient: 'John Doe',
      time: '09:00',
      type: 'Consultation',
      status: 'confirmed',
      phone: '+1 (555) 123-4567',
      notes: 'Follow-up for hypertension'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      time: '09:30',
      type: 'Check-up',
      status: 'confirmed',
      phone: '+1 (555) 234-5678',
      notes: 'Annual physical examination'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      time: '10:00',
      type: 'Follow-up',
      status: 'pending',
      phone: '+1 (555) 345-6789',
      notes: 'Post-surgery follow-up'
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      time: '10:30',
      type: 'Consultation',
      status: 'confirmed',
      phone: '+1 (555) 456-7890',
      notes: 'New patient consultation'
    },
    {
      id: 5,
      patient: 'Robert Brown',
      time: '11:00',
      type: 'Emergency',
      status: 'urgent',
      phone: '+1 (555) 567-8901',
      notes: 'Chest pain evaluation'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Emergency': return 'bg-red-100 text-red-800';
      case 'Consultation': return 'bg-blue-100 text-blue-800';
      case 'Follow-up': return 'bg-green-100 text-green-800';
      case 'Check-up': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log(`Changing appointment ${appointmentId} status to ${newStatus}`);
  };

  const todayAppointments = appointments.filter(apt => apt.status !== 'cancelled');
  const upcomingCount = appointments.filter(apt => apt.status === 'confirmed').length;
  const pendingCount = appointments.filter(apt => apt.status === 'pending').length;
  const urgentCount = appointments.filter(apt => apt.status === 'urgent').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Total</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">{urgentCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Appointments Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Appointments for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Time</TableCell>
                <TableCell header>Patient</TableCell>
                <TableCell header>Type</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Contact</TableCell>
                <TableCell header>Notes</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{appointment.patient}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(appointment.type)}`}>
                      {appointment.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{appointment.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{appointment.notes}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                      )}
                      {appointment.status === 'confirmed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(appointment.id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        className="text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default DoctorAppointments;