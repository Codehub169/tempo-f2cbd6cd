import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    document.title = 'Contact Us - NayanJyoti Eye Clinic';
    window.scrollTo(0, 0); // Scroll to top on page load
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero bg-clinic-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">We're here to help. Reach out to us for any inquiries or to schedule an appointment.</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="breadcrumbs bg-clinic-neutral-lightest py-3">
        <div className="container mx-auto px-4 text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="hover:text-clinic-primary">Home</Link>
              <span className="mx-2 text-clinic-text-secondary">/</span>
            </li>
            <li className="text-clinic-text-secondary">Contact Us</li>
          </ol>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-display text-clinic-primary mb-6">Get In Touch</h2>
                <p className="text-clinic-text-secondary mb-6">
                  We welcome your questions and feedback. Please feel free to contact us through any of the methods below, or use the form to send us a direct message.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="h-8 w-8 text-clinic-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-clinic-primary font-display">Our Address</h3>
                    <p className="text-clinic-text-secondary">123 Vision Street, Tech Park Road<br />Bangalore, Karnataka 560001, India</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="h-8 w-8 text-clinic-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-clinic-primary font-display">Phone Number</h3>
                    <a href="tel:+919876543210" className="text-clinic-text-secondary hover:text-clinic-accent">+91 98765 43210</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="h-8 w-8 text-clinic-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-clinic-primary font-display">Email Address</h3>
                    <a href="mailto:info@nayanjyoti.in" className="text-clinic-text-secondary hover:text-clinic-accent">info@nayanjyoti.in</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ClockIcon className="h-8 w-8 text-clinic-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-clinic-primary font-display">Working Hours</h3>
                    <p className="text-clinic-text-secondary">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-clinic-text-secondary">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold font-display text-clinic-primary mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} className="form-control" required></textarea>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary w-full py-3">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="page-section bg-clinic-neutral-lightest py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-10">
            <h2 className="text-3xl font-bold font-display text-clinic-primary">Find Us Here</h2>
            <p className="subtitle text-clinic-text-secondary max-w-xl mx-auto mt-2">Visit our clinic located conveniently in Bangalore.</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            {/* Replace with actual map embed code or a React map component later */}
            <img src="https://via.placeholder.com/1200x600.png?text=Clinic+Location+Map+-+Interactive+Map+Here" alt="Clinic Location Map" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
