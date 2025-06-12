import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { getServices, getDoctors, getAvailableSlots, submitBooking } from '../services/api';

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
    serviceId: '', // store ID for API
    serviceName: '', // store name for display
    doctorId: '', // store ID for API
    doctorName: '', // store name for display
    appointmentDate: '',
    appointmentTime: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientSymptoms: '', // Renamed from notes to match backend model
  });

  const [availableServices, setAvailableServices] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  const [loading, setLoading] = useState({ services: false, doctors: false, slots: false, submission: false });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation(); // To get doctorId from query params

  useEffect(() => {
    // Pre-fill doctor if passed in query params (e.g., from doctor detail page)
    const queryParams = new URLSearchParams(location.search);
    const preSelectedDoctorId = queryParams.get('doctor');
    if (preSelectedDoctorId) {
      setFormData(prev => ({ ...prev, doctorId: preSelectedDoctorId }));
    }
  }, [location.search]);

  useEffect(() => {
    document.title = `Step ${currentStep} - Book Appointment - NayanJyoti Eye Clinic`;
    window.scrollTo(0, 0);

    if (currentStep === 1 && availableServices.length === 0) {
      setLoading(prev => ({ ...prev, services: true }));
      getServices()
        .then(data => setAvailableServices(data))
        .catch(err => {
          console.error("Failed to load services", err);
          setError('Could not load services. Please try again.');
        })
        .finally(() => setLoading(prev => ({ ...prev, services: false })));
    }
    if (currentStep === 2 && availableDoctors.length === 0) {
      setLoading(prev => ({ ...prev, doctors: true }));
      getDoctors()
        .then(data => {
            // Add "Any Available Doctor" option
            const doctorsWithOptions = [{ id: '', name: 'Any Available Doctor', specialty: 'General Checkup' }, ...data];
            setAvailableDoctors(doctorsWithOptions);
            // If a doctor was pre-selected and is in the list, set their name for review
            if (formData.doctorId) {
                const selectedDoc = doctorsWithOptions.find(d => d.id.toString() === formData.doctorId.toString());
                if (selectedDoc) setFormData(prev => ({ ...prev, doctorName: selectedDoc.name }));
            }
        })
        .catch(err => {
          console.error("Failed to load doctors", err);
          setError('Could not load doctors. Please try again.');
        })
        .finally(() => setLoading(prev => ({ ...prev, doctors: false })));
    }
  }, [currentStep, formData.doctorId]); // Rerun if doctorId changes for pre-selection name

  useEffect(() => {
    if (currentStep === 3 && formData.appointmentDate) {
      setLoading(prev => ({ ...prev, slots: true }));
      setError(''); // Clear previous slot errors
      setAvailableTimeSlots([]); // Clear old slots
      getAvailableSlots(formData.appointmentDate, formData.serviceId || null, formData.doctorId || null)
        .then(slots => {
            setAvailableTimeSlots(slots);
            if (slots.length === 0) {
                setError('No time slots available for the selected date/doctor. Please try another date or doctor.');
            }
        })
        .catch(err => {
          console.error("Failed to load time slots", err);
          setError('Could not load time slots. Please check your selection or try again.');
        })
        .finally(() => setLoading(prev => ({ ...prev, slots: false })));
    }
  }, [currentStep, formData.appointmentDate, formData.serviceId, formData.doctorId]);

  const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;
    setError(''); // Clear error on change

    if (name === "serviceId") {
        const serviceName = options && selectedIndex > 0 ? options[selectedIndex].text : '';
        setFormData(prev => ({ ...prev, serviceId: value, serviceName: serviceName, doctorId: '', doctorName: '' })); // Reset doctor if service changes
    } else if (name === "doctorId") {
        const doctorName = options && selectedIndex > 0 ? options[selectedIndex].text.split(' (')[0] : (value === '' ? 'Any Available Doctor' : '');
        setFormData(prev => ({ ...prev, doctorId: value, doctorName: doctorName }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    // If date is cleared, clear time slots
    if (name === "appointmentDate" && !value) {
        setAvailableTimeSlots([]);
        setFormData(prev => ({...prev, appointmentTime: ''}));
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.serviceId) {
      setError('Please select a service.'); return;
    }
    // Doctor selection is optional (defaults to 'Any')
    // if (currentStep === 2 && !formData.doctorId) {
    //   setError('Please select a doctor or choose "Any Available Doctor".'); return;
    // }
    if (currentStep === 3 && (!formData.appointmentDate || !formData.appointmentTime)) {
      setError('Please select both date and time.'); return;
    }
    if (currentStep === 4 && (!formData.patientName || !formData.patientEmail || !formData.patientPhone)) {
      setError('Please fill in all required patient details (Name, Email, Phone).'); return;
    }
    setError(''); // Clear errors before proceeding
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, submission: true }));
    setError('');

    const bookingPayload = {
        patient_name: formData.patientName,
        patient_phone: formData.patientPhone,
        patient_email: formData.patientEmail,
        service_id: formData.serviceId ? parseInt(formData.serviceId) : null,
        doctor_id: formData.doctorId ? parseInt(formData.doctorId) : null,
        appointment_date: formData.appointmentDate,
        appointment_time: formData.appointmentTime, // Assuming this is in HH:MM format from API
        patient_symptoms: formData.patientSymptoms
    };

    try {
      const response = await submitBooking(bookingPayload);
      console.log('Booking Submitted:', response);
      // Pass all necessary details for confirmation page, including names
      const confirmationDetails = {
          ...formData, // includes names and IDs
          bookingId: response.booking_id, // from API response
          status: response.status
      };
      navigate('/appointment-confirmation', { state: { bookingDetails: confirmationDetails } });
    } catch (err) {
      console.error('Failed to submit booking:', err);
      setError(err.response?.data?.detail || 'Failed to submit booking. The time slot might have been taken or an error occurred. Please try again.');
    }
    setLoading(prev => ({ ...prev, submission: false }));
  };

  const progressPercentage = ((currentStep -1) / (steps.length -1)) * 100;
  const today = new Date().toISOString().split("T")[0];

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

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
            {error && <p className="text-red-500 text-center mb-4 p-3 bg-red-100 rounded-md">{error}</p>}
            <form onSubmit={handleSubmitBooking}>
              {currentStep === 1 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 1: Select Service</h2>
                  {loading.services && <p>Loading services...</p>}
                  <div className="form-group">
                    <label htmlFor="serviceId" className="form-label">Choose a service:</label>
                    <select name="serviceId" id="serviceId" value={formData.serviceId} onChange={handleChange} className="form-control" required>
                      <option value="" disabled>-- Select Service --</option>
                      {availableServices.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 2: Select Doctor (Optional)</h2>
                  {loading.doctors && <p>Loading doctors...</p>}
                  <div className="form-group">
                    <label htmlFor="doctorId" className="form-label">Choose a doctor:</label>
                    <select name="doctorId" id="doctorId" value={formData.doctorId} onChange={handleChange} className="form-control">
                      {/* Option for 'Any Available Doctor' is added in useEffect */}
                      {availableDoctors.map(doctor => (
                        <option key={doctor.id || 'any'} value={doctor.id}>{doctor.name} ({doctor.specialty.replace(/<br\s*\/?>/gi, ' ')})</option>
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
                      <label htmlFor="appointmentDate" className="form-label">Preferred Date:</label>
                      <input type="date" name="appointmentDate" id="appointmentDate" value={formData.appointmentDate} onChange={handleChange} className="form-control" required min={today} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="appointmentTime" className="form-label">Preferred Time:</label>
                      {loading.slots && <p>Loading slots...</p>}
                      <select name="appointmentTime" id="appointmentTime" value={formData.appointmentTime} onChange={handleChange} className="form-control" required disabled={!formData.appointmentDate || loading.slots || availableTimeSlots.length === 0}>
                        <option value="" disabled>{!formData.appointmentDate ? '-- Select Date First --' : (availableTimeSlots.length === 0 && !loading.slots ? '-- No Slots Available --' : '-- Select Time --')}</option>
                        {availableTimeSlots.map(slot => (
                          <option key={slot} value={slot}>{new Date(`1970-01-01T${slot}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</option> // Display as AM/PM
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
                    <label htmlFor="patientSymptoms" className="form-label">Symptoms/Notes (Optional):</label>
                    <textarea name="patientSymptoms" id="patientSymptoms" rows="4" value={formData.patientSymptoms} onChange={handleChange} className="form-control"></textarea>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="step-content animate-fadeIn">
                  <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Step 5: Review & Confirm</h2>
                  <div className="space-y-4 bg-clinic-neutral-lightest p-6 rounded-md border border-clinic-neutral-lighter">
                    <h3 className="text-xl font-semibold text-clinic-primary mb-3 font-display">Booking Summary:</h3>
                    <p><strong>Service:</strong> {formData.serviceName || <span className="text-red-500">Not selected</span>}</p>
                    <p><strong>Doctor:</strong> {formData.doctorName || 'Any Available Doctor'}</p>
                    <p><strong>Date:</strong> {formData.appointmentDate ? new Date(formData.appointmentDate + 'T00:00:00').toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : <span className="text-red-500">Not selected</span>}</p>
                    <p><strong>Time:</strong> {formData.appointmentTime ? new Date(`1970-01-01T${formData.appointmentTime}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : <span className="text-red-500">Not selected</span>}</p>
                    <hr className="my-3"/>
                    <h4 className="text-lg font-semibold text-clinic-primary mb-2 font-display">Patient Information:</h4>
                    <p><strong>Name:</strong> {formData.patientName || <span className="text-red-500">Not provided</span>}</p>
                    <p><strong>Email:</strong> {formData.patientEmail || <span className="text-red-500">Not provided</span>}</p>
                    <p><strong>Phone:</strong> {formData.patientPhone || <span className="text-red-500">Not provided</span>}</p>
                    {formData.patientSymptoms && <p><strong>Symptoms/Notes:</strong> {formData.patientSymptoms}</p>}
                  </div>
                  <p className="text-xs text-clinic-text-secondary mt-4">By clicking "Confirm Booking", you agree to our terms and conditions.</p>
                </div>
              )}

              <div className="mt-10 flex justify-between items-center">
                <button 
                  type="button" 
                  onClick={handlePrev} 
                  disabled={currentStep === 1 || loading.submission}
                  className="btn btn-outline-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-1" /> Previous
                </button>
                
                {currentStep < steps.length ? (
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    disabled={loading.submission}
                    className="btn btn-primary flex items-center disabled:opacity-50"
                  >
                    Next <ChevronRightIcon className="h-5 w-5 ml-1" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={loading.submission}
                    className="btn btn-accent flex items-center disabled:opacity-50"
                  >
                    {loading.submission ? 'Confirming...' : 'Confirm Booking'}
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
