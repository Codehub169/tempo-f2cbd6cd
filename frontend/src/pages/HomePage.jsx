import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getDoctors } from '../services/api';
import ServiceItem from '../components/ServiceItem'; // Assuming ServiceItem is created for reusability
import DoctorItem from '../components/DoctorItem'; // Assuming DoctorItem is created for reusability

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        setLoading(true);
        const [servicesData, doctorsData] = await Promise.all([
          getServices(), // Fetch top few or all services
          getDoctors() // Fetch top few or all doctors
        ]);
        setServices(servicesData.slice(0, 3)); // Displaying first 3 services as an example
        setDoctors(doctorsData.slice(0, 3)); // Displaying first 3 doctors as an example
        setError(null);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError('Failed to load page content. Please try again later.');
      }
      setLoading(false);
    };

    fetchHomePageData();
    document.title = 'Welcome - NayanJyoti Eye Clinic';
  }, []);

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-section text-white text-center py-32 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(0, 123, 138, 0.7), rgba(0, 95, 107, 0.85)), url('https://via.placeholder.com/1920x800.png?text=Modern+Eye+Clinic+View')" }}
      >
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4 font-display">Clear Vision, Brighter Life</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Welcome to NayanJyoti Eye Clinic, where we provide comprehensive eye care with compassion and expertise. Your vision is our priority.
          </p>
          <Link to="/book-appointment" className="btn btn-primary text-lg py-4 px-8 mr-4">Book an Appointment</Link>
          <Link to="/services" className="btn btn-outline-white text-lg py-4 px-8">Explore Services</Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="page-section intro-section">
        <div className="container flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary mb-6 font-display">Your Trusted Partner in Eye Health</h2>
            <p className="text-clinic-text-light leading-relaxed mb-4">
              NayanJyoti Eye Clinic is dedicated to offering state-of-the-art eye care services to the community in India. Our mission is to enhance quality of life through improved vision, employing advanced technology and a patient-centric approach.
            </p>
            <p className="text-clinic-text-light leading-relaxed mb-4">
              We believe in ethical practices, continuous learning, and providing personalized care to each patient who walks through our doors.
            </p>
            <Link to="/about" className="btn btn-primary mt-4">Learn More About Us</Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="https://via.placeholder.com/500x350.png?text=Friendly+Clinic+Staff" alt="Friendly clinic environment" className="rounded-lg shadow-clinic-card w-full" />
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      {services.length > 0 && (
        <section className="page-section bg-clinic-bg-light">
          <div className="container">
            <div className="section-header">
              <h2 className="text-clinic-primary">Our Key Services</h2>
              <p className="subtitle">Comprehensive eye care solutions tailored to your needs. From routine check-ups to advanced surgical procedures.</p>
            </div>
            <div className="card-grid">
              {services.map(service => (
                <ServiceItem 
                  key={service.id} 
                  id={service.id} 
                  name={service.name} 
                  description={service.description} // API provides short description
                  image={service.image_url}
                  // icon={service.icon_svg_content} // ServiceItem can handle icon if needed
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/services" className="btn btn-accent">View All Services</Link>
            </div>
          </div>
        </section>
      )}

      {/* Meet Our Expert Doctors Section */}
      {doctors.length > 0 && (
        <section className="page-section">
          <div className="container">
            <div className="section-header">
              <h2 className="text-clinic-primary">Meet Our Expert Doctors</h2>
              <p className="subtitle">Our team of experienced and compassionate ophthalmologists is dedicated to providing the highest standard of care.</p>
            </div>
            <div className="card-grid">
              {doctors.map(doctor => (
                <DoctorItem 
                  key={doctor.id} 
                  id={doctor.id} 
                  name={doctor.name} 
                  specialty={doctor.specialty} // API provides specialty (can include HTML)
                  bioExcerpt={doctor.bio ? doctor.bio.substring(0, 100) + '...' : 'Experienced specialist.'} // Create an excerpt if full bio is long
                  image={doctor.image_url}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/doctors" className="btn btn-accent">Meet The Team</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section bg-clinic-primary text-white text-center py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-white mb-4 font-display">Ready to See a Clearer Future?</h2>
          <p className="text-xl text-gray-200 max-w-xl mx-auto mb-8">
            Contact us today to schedule your consultation or learn more about how we can help you achieve optimal eye health.
          </p>
          <Link to="/book-appointment" className="btn btn-accent text-lg py-3 px-6 mr-4">Book Appointment Now</Link>
          <Link to="/contact" className="btn btn-outline-white text-lg py-3 px-6">Contact Us</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
