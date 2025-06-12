import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

// Placeholder for the actual Footer component that will be implemented later
const FooterPlaceholder = () => (
  <footer className="bg-clinic-primary-dark text-clinic-neutral-lighten py-12 mt-auto">
    <div className="container mx-auto text-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-left">
        <div>
          <h4 className="text-white text-lg font-semibold mb-3 font-display">NayanJyoti Eye Clinic</h4>
          <p className="text-sm text-clinic-neutral-lighten/80">123 Vision Street, Tech Park Road<br />Bangalore, Karnataka 560001, India</p>
          <p className="text-sm text-clinic-neutral-lighten/80 mt-2">Dedicated to providing exceptional eye care.</p>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-3 font-display">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">About Us</a></li>
            <li><a href="/services" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">Services</a></li>
            <li><a href="/doctors" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">Doctors</a></li>
            <li><a href="/contact" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">Contact Us</a></li>
            <li><a href="/book-appointment" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-3 font-display">Contact Info</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+919876543210" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">+91 98765 43210</a></li>
            <li><a href="mailto:info@nayanjyoti.in" className="hover:text-white text-clinic-neutral-lighten/80 transition-colors">info@nayanjyoti.in</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-lg font-semibold mb-3 font-display">Working Hours</h4>
          <p className="text-sm text-clinic-neutral-lighten/80">Mon - Sat: 9:00 AM - 7:00 PM</p>
          <p className="text-sm text-clinic-neutral-lighten/80">Sunday: Closed</p>
        </div>
      </div>
      <div className="border-t border-clinic-neutral-darken pt-8">
        <p className="text-sm text-clinic-neutral-lighten/80">&copy; {new Date().getFullYear()} NayanJyoti Eye Clinic. All Rights Reserved.</p>
        <p className="text-xs text-clinic-neutral-lighten/60 mt-1">Designed for prototype purposes. Actual Footer component will be implemented later.</p>
      </div>
    </div>
  </footer>
);

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-clinic-background text-clinic-text-primary">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This is where the page content will be rendered */}
      </main>
      <FooterPlaceholder />
    </div>
  );
};

export default Layout;
