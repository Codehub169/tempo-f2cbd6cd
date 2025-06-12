import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ 
  currentStep, 
  setCurrentStep, 
  formData, 
  setFormData, 
  servicesData, 
  doctorsData, 
  timeSlotsData, 
  onBookingSubmit 
}) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Basic validation example for step 1 (service selection)
    if (currentStep === 1 && !formData.service) {
      alert('Please select a service.');
      return;
    }
    // Basic validation for step 4 (patient details)
    if (currentStep === 4 && (!formData.patientName || !formData.patientContact)) {
        alert('Please enter your name and contact number.');
        return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.service || !formData.doctor || !formData.date || !formData.time || !formData.patientName || !formData.patientContact) {
        alert('Please ensure all fields are selected or filled before confirming.');
        return;
    }
    onBookingSubmit(formData);
  };

  const availableDoctors = formData.service 
    ? doctorsData.filter(doc => doc.services.includes(formData.service))
    : doctorsData;

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-clinic-card space-y-6 animate-fadeIn">
      {/* Step 1: Select Service */}
      {currentStep === 1 && (
        <div className="form-step">
          <h3 className="text-2xl font-semibold text-clinic-primary mb-4 font-display">Step 1: Select Service</h3>
          <div className="form-group">
            <label htmlFor="service" className="form-label">Service</label>
            <select id="service" name="service" value={formData.service} onChange={handleChange} className="form-control">
              <option value="">Choose a service...</option>
              {servicesData.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2: Select Doctor */}
      {currentStep === 2 && (
        <div className="form-step">
          <h3 className="text-2xl font-semibold text-clinic-primary mb-4 font-display">Step 2: Select Doctor (Optional)</h3>
          <div className="form-group">
            <label htmlFor="doctor" className="form-label">Doctor</label>
            <select id="doctor" name="doctor" value={formData.doctor} onChange={handleChange} className="form-control">
              <option value="">Any available doctor</option>
              {availableDoctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty.replace(/<br\s*\/?>/gi, ' ')}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Select Date & Time */}
      {currentStep === 3 && (
        <div className="form-step">
          <h3 className="text-2xl font-semibold text-clinic-primary mb-4 font-display">Step 3: Select Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="form-control" min={today} />
            </div>
            <div className="form-group">
              <label htmlFor="time" className="form-label">Time Slot</label>
              <select id="time" name="time" value={formData.time} onChange={handleChange} className="form-control" disabled={!formData.date}>
                <option value="">{formData.date ? 'Select a time...' : 'Select a date first...'}</option>
                {formData.date && timeSlotsData.map(slot => (
                  <option key={slot.id} value={slot.value}>{slot.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Patient Details */}
      {currentStep === 4 && (
        <div className="form-step">
          <h3 className="text-2xl font-semibold text-clinic-primary mb-4 font-display">Step 4: Your Details</h3>
          <div className="form-group">
            <label htmlFor="patientName" className="form-label">Full Name</label>
            <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="patientContact" className="form-label">Contact Number</label>
            <input type="tel" id="patientContact" name="patientContact" value={formData.patientContact} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="patientEmail" className="form-label">Email (Optional)</label>
            <input type="email" id="patientEmail" name="patientEmail" value={formData.patientEmail} onChange={handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="notes" className="form-label">Additional Notes (Optional)</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows="3" className="form-control"></textarea>
          </div>
        </div>
      )}

      {/* Step 5: Review & Confirm */}
      {currentStep === 5 && (
        <div className="form-step">
          <h3 className="text-2xl font-semibold text-clinic-primary mb-4 font-display">Step 5: Review & Confirm</h3>
          <div className="space-y-3 p-4 border border-clinic-border rounded-md bg-clinic-light-gray">
            <p><strong>Service:</strong> {formData.service ? servicesData.find(s => s.id === formData.service)?.name : <span className='text-red-500'>Not selected</span>}</p>
            <p><strong>Doctor:</strong> {formData.doctor ? doctorsData.find(d => d.id === formData.doctor)?.name : 'Any available'}</p>
            <p><strong>Date:</strong> {formData.date || <span className='text-red-500'>Not selected</span>}</p>
            <p><strong>Time:</strong> {formData.time ? timeSlotsData.find(t => t.value === formData.time)?.label : <span className='text-red-500'>Not selected</span>}</p>
            <p><strong>Name:</strong> {formData.patientName || <span className='text-red-500'>Not entered</span>}</p>
            <p><strong>Contact:</strong> {formData.patientContact || <span className='text-red-500'>Not entered</span>}</p>
            {formData.patientEmail && <p><strong>Email:</strong> {formData.patientEmail}</p>}
            {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="appointment-navigation flex justify-between items-center pt-6 border-t border-clinic-border">
        {currentStep > 1 && (
          <button type="button" onClick={handlePrevious} className="btn btn-outline-primary">
            Previous
          </button>
        )}
        {currentStep < 5 && (
          <button type="button" onClick={handleNext} className="btn btn-primary ml-auto">
            Next
          </button>
        )}
        {currentStep === 5 && (
          <button type="submit" className="btn btn-accent ml-auto">
            Confirm Booking
          </button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
