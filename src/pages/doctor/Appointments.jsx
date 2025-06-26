import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import toast from 'react-hot-toast';

const DoctorAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: 'John Doe',
      patientId: 'P001',
      time: '09:00',
      type: 'Consultation',
      status: 'confirmed',
      phone: '+1 (555) 123-4567',
      notes: 'Follow-up for hypertension',
      duration: 30,
      symptoms: 'Chest pain, shortness of breath'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 'P002',
      time: '09:30',
      type: 'Check-up',
      status: 'confirmed',
      phone: '+1 (555) 234-5678',
      notes: 'Annual physical examination',
      duration: 45,
      symptoms: 'Routine checkup'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      patientId: 'P003',
      time: '10:00',
      type: 'Follow-up',
      status: 'pending',
      phone: '+1 (555) 345-6789',
      notes: 'Post-surgery follow-up',
      duration: 30,
      symptoms: 'Post-operative care'
    },
    {
      id: 4,
      patient: 'Sarah Wilson',
      patientId: 'P004',
      time: '10:30',
      type: 'Consultation',
      status: 'confirmed',
      phone: '+1 (555) 456-7890',
      notes: 'New patient consultation',
      duration: 60,
      symptoms: 'Joint pain, fatigue'
    },
    {
      id: 5,
      patient: 'Robert Brown',
      patientId: 'P005',
      time: '11:00',
      type: 'Emergency',
      status: 'urgent',
      phone: '+1 (555) 567-8901',
      notes: 'Chest pain evaluation',
      duration: 45,
      symptoms: 'Severe chest pain'
    }
  ]);

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
    
    const appointment = appointments.find(apt => apt.id === appointmentId);
    toast.success(`${appointment.patient}'s appointment ${newStatus}`);
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const todayAppointments = filteredAppointments.filter(apt => apt.status !== 'cancelled');
  const upcomingCount = appointments.filter(apt => apt.status === 'confirmed').length;
  const pendingCount = appointments.filter(apt => apt.status === 'pending').length;
  const urgentCount = appointments.filter(apt => apt.status === 'urgent').length;
  const completedCount = appointments.filter(apt => apt.status === 'completed').length;

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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="urgent">Urgent</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

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
                <TableCell header>Duration</TableCell>
                <TableCell header>Contact</TableCell>
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
                      <div>
                        <span className="font-medium">{appointment.patient}</span>
                        <p className="text-sm text-gray-500">{appointment.patientId}</p>
                      </div>
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
                    <span className="text-sm">{appointment.duration} min</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{appointment.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        View
                      </Button>
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

      {/* Appointment Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Appointment Details"
        size="lg"
      >
        {selectedAppointment && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Patient Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedAppointment.patient}</p>
                  <p><span className="font-medium">Patient ID:</span> {selectedAppointment.patientId}</p>
                  <p><span className="font-medium">Phone:</span> {selectedAppointment.phone}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Appointment Details</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Time:</span> {selectedAppointment.time}</p>
                  <p><span className="font-medium">Type:</span> {selectedAppointment.type}</p>
                  <p><span className="font-medium">Duration:</span> {selectedAppointment.duration} minutes</p>
                  <p><span className="font-medium">Status:</span> {selectedAppointment.status}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Symptoms</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedAppointment.symptoms}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedAppointment.notes}</p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
                Start Consultation
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorAppointments;