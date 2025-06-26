import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, Users, Activity } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [selectedView, setSelectedView] = useState('day');

  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00', status: 'active' },
    { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00', status: 'active' },
    { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00', status: 'active' },
    { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00', status: 'active' },
    { id: 5, day: 'Friday', startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00', status: 'active' },
    { id: 6, day: 'Saturday', startTime: '09:00', endTime: '13:00', breakStart: null, breakEnd: null, status: 'off' },
    { id: 7, day: 'Sunday', startTime: '', endTime: '', breakStart: null, breakEnd: null, status: 'off' }
  ]);

  const [timeSlots, setTimeSlots] = useState([
    { 
      id: 1, 
      date: '2024-01-15', 
      time: '09:00', 
      duration: 30, 
      patient: 'John Doe', 
      type: 'Consultation',
      status: 'confirmed',
      patientPhone: '+1 (555) 123-4567',
      notes: 'Follow-up for hypertension'
    },
    { 
      id: 2, 
      date: '2024-01-15', 
      time: '09:30', 
      duration: 30, 
      patient: 'Jane Smith', 
      type: 'Follow-up',
      status: 'confirmed',
      patientPhone: '+1 (555) 234-5678',
      notes: 'Diabetes check-up'
    },
    { 
      id: 3, 
      date: '2024-01-15', 
      time: '10:00', 
      duration: 30, 
      patient: null, 
      type: 'Available',
      status: 'available',
      patientPhone: null,
      notes: null
    },
    { 
      id: 4, 
      date: '2024-01-15', 
      time: '10:30', 
      duration: 30, 
      patient: 'Mike Johnson', 
      type: 'Check-up',
      status: 'confirmed',
      patientPhone: '+1 (555) 345-6789',
      notes: 'Post-surgery follow-up'
    },
    { 
      id: 5, 
      date: '2024-01-15', 
      time: '11:00', 
      duration: 30, 
      patient: null, 
      type: 'Available',
      status: 'available',
      patientPhone: null,
      notes: null
    },
    { 
      id: 6, 
      date: '2024-01-15', 
      time: '14:00', 
      duration: 30, 
      patient: 'Sarah Wilson', 
      type: 'Consultation',
      status: 'confirmed',
      patientPhone: '+1 (555) 456-7890',
      notes: 'Arthritis management'
    },
    { 
      id: 7, 
      date: '2024-01-15', 
      time: '14:30', 
      duration: 30, 
      patient: null, 
      type: 'Available',
      status: 'available',
      patientPhone: null,
      notes: null
    },
    { 
      id: 8, 
      date: '2024-01-15', 
      time: '15:00', 
      duration: 60, 
      patient: null, 
      type: 'Blocked',
      status: 'blocked',
      patientPhone: null,
      notes: 'Administrative time'
    }
  ]);

  const [slotForm, setSlotForm] = useState({
    date: selectedDate,
    time: '',
    duration: 30,
    type: 'Available',
    notes: ''
  });

  const selectedDateSlots = timeSlots.filter(slot => slot.date === selectedDate);

  const handleAddTimeSlot = () => {
    setEditingSlot(null);
    setSlotForm({
      date: selectedDate,
      time: '',
      duration: 30,
      type: 'Available',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setSlotForm({
      date: slot.date,
      time: slot.time,
      duration: slot.duration,
      type: slot.type,
      notes: slot.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveSlot = (e) => {
    e.preventDefault();
    
    if (editingSlot) {
      setTimeSlots(timeSlots.map(slot =>
        slot.id === editingSlot.id
          ? { ...slot, ...slotForm, patient: null, status: slotForm.type === 'Available' ? 'available' : 'blocked' }
          : slot
      ));
      toast.success('Time slot updated successfully');
    } else {
      const newSlot = {
        id: Date.now(),
        ...slotForm,
        patient: null,
        status: slotForm.type === 'Available' ? 'available' : 'blocked',
        patientPhone: null
      };
      setTimeSlots([...timeSlots, newSlot]);
      toast.success('Time slot added successfully');
    }
    
    setIsModalOpen(false);
  };

  const handleDeleteSlot = (slotId) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      setTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
      toast.success('Time slot deleted successfully');
    }
  };

  const handleInputChange = (e) => {
    setSlotForm({
      ...slotForm,
      [e.target.name]: e.target.value
    });
  };

  const getSlotColor = (slot) => {
    if (!slot.patient && slot.status === 'available') return 'bg-green-100 text-green-800 border-green-200';
    if (slot.status === 'blocked') return 'bg-gray-100 text-gray-800 border-gray-200';
    if (slot.type === 'Emergency') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getSlotIcon = (slot) => {
    if (!slot.patient && slot.status === 'available') return '🟢';
    if (slot.status === 'blocked') return '🚫';
    if (slot.type === 'Emergency') return '🚨';
    return '👤';
  };

  const stats = [
    { name: 'Today\'s Appointments', value: selectedDateSlots.filter(s => s.patient).length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Available Slots', value: selectedDateSlots.filter(s => s.status === 'available').length, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Blocked Time', value: selectedDateSlots.filter(s => s.status === 'blocked').length, color: 'text-gray-600', bg: 'bg-gray-100' },
    { name: 'Total Hours', value: Math.round(selectedDateSlots.reduce((sum, slot) => sum + slot.duration, 0) / 60), color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <div className="flex items-center space-x-4">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`px-3 py-1 text-sm ${selectedView === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setSelectedView('day')}
            >
              Day
            </button>
            <button
              className={`px-3 py-1 text-sm ${selectedView === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setSelectedView('week')}
            >
              Week
            </button>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleAddTimeSlot} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Block Time</span>
          </Button>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Schedule */}
        <Card className="lg:col-span-1">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
            <div className="space-y-4">
              {schedule.map((day) => (
                <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{day.day}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${day.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {day.status === 'active' ? 'Working' : 'Off'}
                      </span>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {day.status === 'active' && (
                    <div className="text-sm text-gray-600">
                      <p className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{day.startTime} - {day.endTime}</span>
                      </p>
                      {day.breakStart && (
                        <p className="flex items-center space-x-2 mt-1">
                          <span className="w-4 h-4 flex items-center justify-center">☕</span>
                          <span>Break: {day.breakStart} - {day.breakEnd}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Daily Time Slots */}
        <Card className="lg:col-span-2">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Schedule for {new Date(selectedDate).toLocaleDateString()}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDateSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${getSlotColor(slot)}`}
                  onClick={() => handleEditSlot(slot)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getSlotIcon(slot)}</span>
                      <span className="font-medium">{slot.time}</span>
                    </div>
                    <span className="text-xs font-medium">
                      {slot.duration} min
                    </span>
                  </div>
                  <div>
                    {slot.patient ? (
                      <div>
                        <p className="font-medium">{slot.patient}</p>
                        <p className="text-sm opacity-75">{slot.type}</p>
                        {slot.notes && <p className="text-xs mt-1 opacity-75">{slot.notes}</p>}
                      </div>
                    ) : (
                      <p className="font-medium">{slot.type}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Time Slot Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSlot ? 'Edit Time Slot' : 'Block Time Slot'}
        size="md"
      >
        <form onSubmit={handleSaveSlot} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={slotForm.date}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Time"
              name="time"
              type="time"
              value={slotForm.time}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <select
                name="duration"
                value={slotForm.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={slotForm.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Available">Available</option>
                <option value="Blocked">Blocked</option>
                <option value="Break">Break</option>
                <option value="Meeting">Meeting</option>
                <option value="Administrative">Administrative</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={slotForm.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Add any notes..."
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            {editingSlot && (
              <Button 
                type="button" 
                variant="danger"
                onClick={() => {
                  handleDeleteSlot(editingSlot.id);
                  setIsModalOpen(false);
                }}
              >
                Delete
              </Button>
            )}
            <Button type="submit">
              {editingSlot ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorSchedule;