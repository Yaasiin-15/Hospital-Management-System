import React, { useState } from 'react';
import { DollarSign, Calendar, FileText, CreditCard, Download, Eye } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../../components/ui/Table.jsx';

const Billing = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('pending');

  const [bills] = useState([
    {
      id: 1,
      date: '2024-01-01',
      description: 'Cardiology Consultation - Dr. Sarah Smith',
      amount: 250.00,
      status: 'pending',
      dueDate: '2024-01-31',
      services: [
        { name: 'Consultation Fee', amount: 200.00 },
        { name: 'EKG Test', amount: 50.00 }
      ]
    },
    {
      id: 2,
      date: '2023-12-15',
      description: 'Annual Physical - Dr. Michael Johnson',
      amount: 180.00,
      status: 'paid',
      paidDate: '2023-12-20',
      services: [
        { name: 'Physical Examination', amount: 150.00 },
        { name: 'Blood Work', amount: 30.00 }
      ]
    },
    {
      id: 3,
      date: '2023-11-20',
      description: 'Dermatology Consultation - Dr. Emily Brown',
      amount: 320.00,
      status: 'overdue',
      dueDate: '2023-12-20',
      services: [
        { name: 'Consultation Fee', amount: 200.00 },
        { name: 'Skin Biopsy', amount: 120.00 }
      ]
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      last4: '4532',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'Bank Account',
      last4: '7890',
      brand: 'Checking',
      isDefault: false
    }
  ]);

  const pendingBills = bills.filter(bill => bill.status === 'pending' || bill.status === 'overdue');
  const paidBills = bills.filter(bill => bill.status === 'paid');

  const totalPending = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalPaid = paidBills.reduce((sum, bill) => sum + bill.amount, 0);
  const overdueBills = bills.filter(bill => bill.status === 'overdue');

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handlePayBill = (billId) => {
    console.log(`Processing payment for bill ${billId}`);
    // Here you would integrate with a payment processor
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentBills = selectedTab === 'pending' ? pendingBills : paidBills;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <Button className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4" />
          <span>Add Payment Method</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Balance</p>
              <p className="text-2xl font-bold text-gray-900">${totalPending.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900">${totalPaid.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Bills</p>
              <p className="text-2xl font-bold text-gray-900">{overdueBills.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Year</p>
              <p className="text-2xl font-bold text-gray-900">${(totalPending + totalPaid).toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{method.brand} •••• {method.last4}</p>
                      <p className="text-sm text-gray-500">{method.type}</p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Bills Table */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending Bills ({pendingBills.length})
            </button>
            <button
              onClick={() => setSelectedTab('paid')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'paid'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment History ({paidBills.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell header>Date</TableCell>
                <TableCell header>Description</TableCell>
                <TableCell header>Amount</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Due Date</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(bill.date).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{bill.description}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">${bill.amount.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">
                      {bill.status === 'paid' 
                        ? `Paid: ${new Date(bill.paidDate).toLocaleDateString()}`
                        : new Date(bill.dueDate).toLocaleDateString()
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewBill(bill)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {bill.status !== 'paid' && (
                        <Button
                          size="sm"
                          onClick={() => handlePayBill(bill.id)}
                        >
                          Pay Now
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Bill Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Bill Details"
        size="lg"
      >
        {selectedBill && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Bill Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Date:</span> {new Date(selectedBill.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Description:</span> {selectedBill.description}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedBill.status)}`}>
                      {selectedBill.status}
                    </span>
                  </p>
                  <p><span className="font-medium">Due Date:</span> {new Date(selectedBill.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Amount Details</h4>
                <div className="space-y-2">
                  {selectedBill.services.map((service, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{service.name}</span>
                      <span>${service.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total Amount</span>
                      <span>${selectedBill.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {selectedBill.status !== 'paid' && (
                <Button onClick={() => handlePayBill(selectedBill.id)}>
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Billing;