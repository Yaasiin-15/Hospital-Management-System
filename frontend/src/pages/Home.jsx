import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, FileText, Award, CheckCircle, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", 
                  mixBlendMode: "overlay", opacity: 0.2 }}
        ></div>
        
        {/* Nav */}
        <div className="relative z-10">
          <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-white flex items-center">
                <span className="text-xl font-bold mr-1">HMS</span>
                <span className="hidden md:inline-block text-xl font-bold">Hospital Management</span>
              </div>
            </div>
            <div>
              <Link to="/auth/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
            </div>
          </nav>
          
          {/* Hero Content */}
          <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-start">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-2xl leading-tight">
              Advanced Healthcare Management System
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mb-8">
              Streamlining healthcare operations to provide better patient care and efficient hospital management
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register">
                <Button size="lg" className="font-medium">
                  Register Now
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-medium">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Comprehensive Healthcare Solutions</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our hospital management system provides robust solutions for all healthcare stakeholders
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center text-center transition duration-300 hover:shadow-md">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Patient Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Effortlessly manage patient records, appointments, and medical history to provide better care
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center text-center transition duration-300 hover:shadow-md">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Calendar className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Appointment Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intelligent scheduling system to optimize doctor availability and minimize patient wait times
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center text-center transition duration-300 hover:shadow-md">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <FileText className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Medical Records</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Secure, comprehensive and accessible electronic medical records for better healthcare delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Hospital */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900" id="about">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Our Hospital</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Founded in 2000, our hospital has been committed to providing exceptional healthcare services to our community. 
                With state-of-the-art facilities and a dedicated team of healthcare professionals, we aim to deliver the highest standard of care to our patients.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">Advanced Diagnostic Equipment</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">Specialized Treatment Programs</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">Experienced Medical Professionals</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">Patient-Centered Care Approach</p>
                </div>
              </div>
              
              <Link to="/auth/login">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  rightIcon={<ArrowRight className="h-4 w-4 ml-2" />}
                >
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Hospital building" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-white dark:bg-gray-800" id="departments">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Departments</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Specialized healthcare departments equipped with modern technology and expert professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Cardiology', icon: '❤️', description: 'Specialized care for heart and cardiovascular diseases' },
              { name: 'Neurology', icon: '🧠', description: 'Diagnosis and treatment of disorders of the nervous system' },
              { name: 'Orthopedics', icon: '🦴', description: 'Care for musculoskeletal system, bones, and joints' },
              { name: 'Pediatrics', icon: '👶', description: 'Specialized healthcare for infants, children, and adolescents' },
              { name: 'Dermatology', icon: '🧬', description: 'Diagnosis and treatment of skin disorders' },
              { name: 'Emergency Medicine', icon: '🚑', description: 'Immediate care for acute illnesses and injuries' }
            ].map((dept, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition duration-300 hover:shadow-md">
                <div className="text-3xl mb-4">{dept.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{dept.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Patients Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Read testimonials from patients who experienced our care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', role: 'Patient', quote: 'The care I received was exceptional. The staff was attentive and the doctors were knowledgeable and compassionate.' },
              { name: 'Sarah Johnson', role: 'Patient', quote: 'The online appointment system made scheduling so easy. I was able to see my doctor quickly and received excellent care.' },
              { name: 'Michael Brown', role: 'Patient', quote: 'The hospital\'s electronic medical records system ensured that all my doctors had access to my complete medical history.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 dark:bg-blue-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '20+', label: 'Years of Experience' },
              { value: '50+', label: 'Expert Doctors' },
              { value: '10k+', label: 'Happy Patients' },
              { value: '24/7', label: 'Emergency Service' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to experience quality healthcare?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Register on our platform to schedule appointments, view medical records, and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="font-medium w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline" size="lg" className="font-medium w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions or need assistance? Get in touch with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Contact Information</h4>
                      <p className="text-gray-600 dark:text-gray-400">Phone: +1 (555) 123-4567</p>
                      <p className="text-gray-600 dark:text-gray-400">Email: info@hospital.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Hospital Hours</h4>
                      <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-400">Saturday: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-400">Sunday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">Emergency Services: 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Message subject"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <Button type="button" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;