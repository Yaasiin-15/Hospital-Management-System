import React, { useState } from 'react';
import { Search, Clock, CheckCircle, User, Phone } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';
import toast from 'react-hot-toast';

const CheckIn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'John Doe',
      doctor: 'Dr. Smith',
      time: '09:00',
      type: 'Consultation',
      status: 'waiting',
      phone: '+1 (555) 123-4567',
      checkedIn: false,
      arrivalTime: null
    },
    {
      id: 2,
      patient: 'Jane Smith',
      doctor: 'Dr. Johnson',
      time: '09:30',
      type: 'Follow-up',
      status: 'checked-in',
      phone: '+1 (555) 234-5678',
      checkedIn: true,
      arrivalTime: '09:25'
    },
    {
      id: 3,
      patient: 'Mike Wilson',
      doctor: 'Dr. Brown',
      time: '10:00',
      type: 'Check-up',
      status: 'waiting',
      phone: '+1 (555) 345-6789',
      checkedIn: false,
      arrivalTime: null
    },
    {
      id: 4,
      patient: 'Sarah Davis',
      doctor: 'Dr. Smith',
      time: '10:30',
      type: 'Consultation',
      status: 'in-progress',
      phone: '+1 (555) 456-7890',
      checkedIn: true,
      arrivalTime: '10:20'
    }
  ]);

  const filteredAppointments = appointments.filter(apt =>
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.phone.includes(searchTerm)
  );

  const handleCheckIn = (appointmentId) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { 
            ...apt, 
            checkedIn: true, 
            status: 'checked-in', 
            arrivalTime: currentTime 
          }
        : apt
    ));

    const patient = appointments.find(apt => apt.id === appointmentId);
    toast.success(`${patient.patient} checked in successfully!`);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));

    const patient = appointments.find(apt => apt.id === appointmentId);
    toast.success(`${patient.patient} status updated to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'checked-in': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'no-show': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'waiting': return <Clock className="h-4 w-4" />;
      case 'checked-in': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <User className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const todayAppointments = appointments.length;
  const checkedInCount = appointments.filter(apt => apt.checkedIn).length;
  const waitingCount = appointments.filter(apt => apt.status === 'waiting').length;
  const inProgressCount = appointments.filter(apt => apt.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patient Check-In</h1>
        <div className="text-sm text-gray-500">
          Today: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Checked In</p>
              <p className="text-2xl font-bold text-gray-900">{checkedInCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Waiting</p>
              <p className="text-2xl font-bold text-gray-900">{waitingCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by patient name, doctor, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Check-In Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Time</TableCell>
                <TableCell header>Patient</TableCell>
                <TableCell header>Doctor</TableCell>
                <TableCell header>Type</TableCell>
                <TableCell header>Contact</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Arrival</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{appointment.patient}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{appointment.doctor}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{appointment.type}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{appointment.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{appointment.status}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {appointment.arrivalTime || '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {!appointment.checkedIn && (
                        <Button
                          size="sm"
                          onClick={() => handleCheckIn(appointment.id)}
                        >
                          Check In
                        </Button>
                      )}
                      {appointment.status === 'checked-in' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(appointment.id, 'in-progress')}
                        >
                          Start Visit
                        </Button>
                      )}
                      {appointment.status === 'in-progress' && (
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
                        onClick={() => handleStatusChange(appointment.id, 'no-show')}
                        className="text-red-600"
                      >
                        No Show
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

export default CheckIn;