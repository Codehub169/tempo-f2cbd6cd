import React from 'react';
import { Link } from 'react-router-dom';

// Inline SVGs for icons as per HTML preview
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm.155 0L16 4.697v7.104l-5.803-3.558z"/></svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-clinic-primary-dark text-clinic-ternary-light pt-12 pb-4 mt-16 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start gap-8 mb-8">
          {/* Column 1: Clinic Info */}
          <div className="footer-column flex-1 min-w-[200px] md:min-w-[250px]">
            <h4 className="text-white text-lg font-semibold mb-4 font-display">NayanJyoti Eye Clinic</h4>
            <p className="text-sm leading-relaxed">
              123 Vision Street, Tech Park Road<br />
              Bangalore, Karnataka 560001, India
            </p>
            <p className="text-sm mt-2">Dedicated to providing exceptional eye care.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column flex-1 min-w-[150px]">
            <h4 className="text-white text-lg font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:text-white hover:underline">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white hover:underline">Services</Link></li>
              <li><Link to="/doctors" className="hover:text-white hover:underline">Doctors</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline">Contact Us</Link></li>
              <li><Link to="/book-appointment" className="hover:text-white hover:underline">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-column flex-1 min-w-[200px]">
            <h4 className="text-white text-lg font-semibold mb-4 font-display">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+919876543210" className="flex items-center hover:text-white hover:underline">
                  <PhoneIcon />
                  <span className="ml-2">+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@nayanjyoti.in" className="flex items-center hover:text-white hover:underline">
                  <EmailIcon />
                  <span className="ml-2">info@nayanjyoti.in</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Working Hours */}
          <div className="footer-column flex-1 min-w-[180px]">
            <h4 className="text-white text-lg font-semibold mb-4 font-display">Working Hours</h4>
            <p className="text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
            <p className="text-sm">Sunday: Closed</p>
          </div>
        </div>

        <div className="footer-bottom text-center mt-8 pt-6 border-t border-clinic-primary-darker text-xs text-clinic-ternary-DEFAULT">
          <p>&copy; {currentYear} NayanJyoti Eye Clinic. All Rights Reserved. Prototype.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
