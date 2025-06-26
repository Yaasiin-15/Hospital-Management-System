import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Plus, MapPin } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Input from '../../components/ui/Input.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';
import toast from 'react-hot-toast';

const PatientAppointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const [appointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      date: '2024-01-15',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Room 201, Cardiology Wing',
      notes: 'Bring previous test results'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Johnson',
      specialty: 'General Practitioner',
      date: '2024-01-22',
      time: '2:00 PM',
      type: 'Routine Checkup',
      status: 'confirmed',
      location: 'Room 105, Main Building',
      notes: 'Annual physical examination'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      specialty: 'Dermatologist',
      date: '2024-01-08',
      time: '11:00 AM',
      type: 'Consultation',
      status: 'completed',
      location: 'Room 301, Dermatology',
      notes: 'Skin examination completed'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    date: '',
    time: '',
    type: 'consultation',
    reason: ''
  });

  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiologist' },
    { id: 2, name: 'Dr. Michael Johnson', specialty: 'General Practitioner' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Dermatologist' },
    { id: 4, name: 'Dr. Robert Wilson', specialty: 'Orthopedics' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const upcomingAppointments = appointments.filter(apt => apt.status !== 'completed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed');

  const handleBookAppointment = () => {
    setIsModalOpen(true);
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    toast.success('Appointment request submitted! You will receive a confirmation shortly.');
    setIsModalOpen(false);
    setNewAppointment({
      doctor: '',
      date: '',
      time: '',
      type: 'consultation',
      reason: ''
    });
  };

  const handleInputChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentAppointments = selectedTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <Button onClick={handleBookAppointment} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Book Appointment</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Doctors Seen</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Appointments ({upcomingAppointments.length})
            </button>
            <button
              onClick={() => setSelectedTab('past')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Appointments ({pastAppointments.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Doctor</TableCell>
                <TableCell header>Date & Time</TableCell>
                <TableCell header>Type</TableCell>
                <TableCell header>Location</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900">{appointment.type}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{appointment.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'confirmed' && (
                        <>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600">
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book New Appointment"
        size="lg"
      >
        <form onSubmit={handleSubmitAppointment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Doctor
            </label>
            <select
              name="doctor"
              value={newAppointment.doctor}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              name="date"
              type="date"
              value={newAppointment.date}
              onChange={handleInputChange}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time
              </label>
              <select
                name="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Type
            </label>
            <select
              name="type"
              value={newAppointment.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="routine-checkup">Routine Checkup</option>
              <option value="urgent">Urgent Care</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              value={newAppointment.reason}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Please describe your symptoms or reason for the visit..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Request Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PatientAppointments;