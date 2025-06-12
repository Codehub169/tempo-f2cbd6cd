import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const mockServices = [
  { id: 'eye-exam', name: 'Comprehensive Eye Exam' },
  { id: 'cataract-surgery', name: 'Cataract Surgery' },
  { id: 'lasik', name: 'LASIK & Refractive Surgery' },
  { id: 'glaucoma-care', name: 'Glaucoma Care' },
  { id: 'retina-services', name: 'Retina Services' },
  { id: 'pediatric-ophthalmology', name: 'Pediatric Ophthalmology' },
];

const mockDoctors = [
  { id: 'dr-ananya-sharma', name: 'Dr. Ananya Sharma', specialty: 'Cataract & Refractive Surgery' },
  { id: 'dr-rohan-verma', name: 'Dr. Rohan Verma', specialty: 'Glaucoma & Medical Retina' },
  { id: 'dr-priya-singh', name: 'Dr. Priya Singh', specialty: 'Pediatric Ophthalmology' },
  { id: 'any', name: 'Any Available Doctor', specialty: 'General Checkup' },
];

const mockTimeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];

const steps = [
  { id: 1, name: 'Select Service' },
  { id: 2, name: 'Select Doctor' },
  { id: 3, name: 'Choose Date & Time' },
  { id: 4, name: 'Patient Details' },
  { id: 5, name: 'Review & Confirm' },
];

const AppointmentBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    doctor: '',
    date: '',
    time: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Step ${currentStep} - Book Appointment - NayanJyoti Eye Clinic`;
    window.scrollTo(0, 0); // Scroll to top on step change or load
  }, [currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Basic validation example for current step before proceeding
    if (currentStep === 1 && !formData.service) {
      alert('Please select a service.'); return;
    }
    if (currentStep === 2 && !formData.doctor) {
      alert('Please select a doctor or choose "Any Available Doctor".'); return;
    }
    if (currentStep === 3 && (!formData.date || !formData.time)) {
      alert('Please select both date and time.'); return;
    }
    if (currentStep === 4 && (!formData.patientName || !formData.patientEmail || !formData.patientPhone)) {
      alert('Please fill in all required patient details (Name, Email, Phone).'); return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    console.log('Booking Submitted:', formData);
    // Navigate to confirmation page with booking details
    navigate('/appointment-confirmation', { state: { bookingDetails: formData } });
  };

  const progressPercentage = ((currentStep -1) / (steps.length -1)) * 100;

  return (
    <>
      <section className="page-hero bg-clinic-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Book Your Appointment</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Follow the steps below to schedule your visit with us.</p>
        </div>
      </section>

      <section className="breadcrumbs bg-clinic-neutral-lightest py-3">
        <div className="container mx-auto px-4 text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="hover:text-clinic-primary">Home</Link>
              <span className="mx-2 text-clinic-text-secondary">/</span>
            </li>
            <li className="text-clinic-text-secondary">Book Appointment</li>
          </ol>
        </div>
      </section>

      <section className="page-section py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                {steps.map(step => (
                  <div key={step.id} className={`text-xs text-center w-1/5 ${currentStep >= step.id ? 'text-clinic-primary font-semibold' : 'text-clinic-text-secondary'}`}>
                    Step {step.id}
                  </div>
                ))}
              </div>
              <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-clinic-accent/20">
                <div style={{ width: `${progressPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-clinic-accent transition-all duration-500 ease-out"></div>
              </div>
              <div className="flex mb-2 items-center justify-between">
                {steps.map(step => (
                  <div key={step.id} className={`text-xs text-center w-1/5 ${currentStep >= step.id ? 'text-clinic-primary font-semibold' : 'text-clinic-text-secondary'}`}>
                    {step.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
            <form onSubmit={handleSubmitBooking}>
              {currentStep === 1 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 1: Select Service</h2>
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Choose a service:</label>
                    <select name="service" id="service" value={formData.service} onChange={handleChange} className="form-control" required>
                      <option value="" disabled>-- Select Service --</option>
                      {mockServices.map(service => (
                        <option key={service.id} value={service.name}>{service.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 2: Select Doctor</h2>
                  <div className="form-group">
                    <label htmlFor="doctor" className="form-label">Choose a doctor:</label>
                    <select name="doctor" id="doctor" value={formData.doctor} onChange={handleChange} className="form-control" required>
                      <option value="" disabled>-- Select Doctor --</option>
                      {mockDoctors.map(doctor => (
                        <option key={doctor.id} value={doctor.name}>{doctor.name} ({doctor.specialty})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 3: Choose Date & Time</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="date" className="form-label">Preferred Date:</label>
                      <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="form-control" required min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="time" className="form-label">Preferred Time:</label>
                      <select name="time" id="time" value={formData.time} onChange={handleChange} className="form-control" required>
                        <option value="" disabled>-- Select Time --</option>
                        {mockTimeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 4: Patient Details</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label htmlFor="patientName" className="form-label">Full Name:</label>
                      <input type="text" name="patientName" id="patientName" value={formData.patientName} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="patientEmail" className="form-label">Email Address:</label>
                      <input type="email" name="patientEmail" id="patientEmail" value={formData.patientEmail} onChange={handleChange} className="form-control" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="patientPhone" className="form-label">Phone Number:</label>
                    <input type="tel" name="patientPhone" id="patientPhone" value={formData.patientPhone} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes" className="form-label">Additional Notes (Optional):</label>
                    <textarea name="notes" id="notes" rows="4" value={formData.notes} onChange={handleChange} className="form-control"></textarea>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 5: Review & Confirm</h2>
                  <div className="space-y-4 bg-clinic-neutral-lightest p-6 rounded-md border border-clinic-neutral-lighter">
                    <h3 className="text-xl font-semibold text-clinic-primary mb-3 font-display">Booking Summary:</h3>
                    <p><strong>Service:</strong> {formData.service || <span className="text-red-500">Not selected</span>}</p>
                    <p><strong>Doctor:</strong> {formData.doctor || <span className="text-red-500">Not selected</span>}</p>
                    <p><strong>Date:</strong> {formData.date ? new Date(formData.date + 'T00:00:00').toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : <span className="text-red-500">Not selected</span>}</p>
                    <p><strong>Time:</strong> {formData.time || <span className="text-red-500">Not selected</span>}</p>
                    <hr className="my-3"/>
                    <h4 className="text-lg font-semibold text-clinic-primary mb-2 font-display">Patient Information:</h4>
                    <p><strong>Name:</strong> {formData.patientName || <span className="text-red-500">Not provided</span>}</p>
                    <p><strong>Email:</strong> {formData.patientEmail || <span className="text-red-500">Not provided</span>}</p>
                    <p><strong>Phone:</strong> {formData.patientPhone || <span className="text-red-500">Not provided</span>}</p>
                    {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
                  </div>
                  <p className="text-xs text-clinic-text-secondary mt-4">By clicking "Confirm Booking", you agree to our terms and conditions (link to terms can be added here).</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-between items-center">
                <button 
                  type="button" 
                  onClick={handlePrev} 
                  disabled={currentStep === 1}
                  className="btn btn-outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-1" /> Previous
                </button>
                
                {currentStep < steps.length ? (
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="btn btn-primary flex items-center"
                  >
                    Next <ChevronRightIcon className="h-5 w-5 ml-1" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-accent flex items-center"
                  >
                    Confirm Booking
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppointmentBookingPage;
