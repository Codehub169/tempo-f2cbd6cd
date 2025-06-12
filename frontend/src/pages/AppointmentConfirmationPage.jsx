import React, { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const AppointmentConfirmationPage = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  useEffect(() => {
    document.title = 'Appointment Confirmed - NayanJyoti Eye Clinic';
    window.scrollTo(0, 0); // Scroll to top on page load
  }, []);

  if (!bookingDetails) {
    // If no booking details, redirect to booking page or show minimal error
    // Redirecting to booking page might be better UX than showing an error here without context
    return <Navigate to="/book-appointment" replace />;
  }

  return (
    <>
      <section className="page-hero bg-clinic-success text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <CheckCircleIcon className="h-20 w-20 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Appointment Confirmed!</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Thank you for booking with NayanJyoti Eye Clinic. Your appointment has been successfully scheduled.</p>
        </div>
      </section>

      <section className="page-section py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6 text-center">Your Appointment Details</h2>
            <div className="space-y-3 text-clinic-text-secondary">
              <p><strong>Service:</strong> {bookingDetails.service}</p>
              <p><strong>Doctor:</strong> {bookingDetails.doctor || 'Any available doctor'}</p>
              <p><strong>Date:</strong> {bookingDetails.date ? new Date(bookingDetails.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</p>
              <p><strong>Time:</strong> {bookingDetails.time}</p>
              <hr className="my-4" />
              <h3 className="text-xl font-semibold text-clinic-primary font-display">Patient Information:</h3>
              <p><strong>Name:</strong> {bookingDetails.patientName}</p>
              <p><strong>Email:</strong> {bookingDetails.patientEmail}</p>
              <p><strong>Phone:</strong> {bookingDetails.patientPhone}</p>
              {bookingDetails.notes && <p><strong>Notes:</strong> {bookingDetails.notes}</p>}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-clinic-text-secondary mb-6">You will receive an email confirmation shortly. If you need to make any changes, please contact us at <a href="tel:+919876543210" className="text-clinic-primary hover:underline">+91 98765 43210</a> or <a href="mailto:info@nayanjyoti.in" className="text-clinic-primary hover:underline">info@nayanjyoti.in</a>.</p>
              <Link to="/" className="btn btn-primary mr-4 mb-2 sm:mb-0">Back to Homepage</Link>
              <Link to="/book-appointment" className="btn btn-outline-primary">Book Another Appointment</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AppointmentConfirmationPage;
