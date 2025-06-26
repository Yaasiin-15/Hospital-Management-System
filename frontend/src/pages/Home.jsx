import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Calendar, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Hospital Management</span>{' '}
                  <span className="block text-indigo-600 xl:inline">System</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your healthcare operations with our comprehensive hospital management solution. 
                  Manage patients, appointments, medical records, and staff efficiently.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/auth/login">
                      <Button size="lg" className="w-full flex items-center justify-center">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/auth/register">
                      <Button variant="outline" size="lg" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to manage your hospital
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Patient Management</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Comprehensive patient records and registration system
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Appointment Scheduling</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Easy appointment booking and management
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Medical Records</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Secure digital medical record management
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Security & Privacy</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  HIPAA compliant with advanced security features
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;