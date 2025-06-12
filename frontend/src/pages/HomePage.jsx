import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder data for services and doctors, will be fetched from API later
const services = [
  {
    id: 'eye-exam',
    title: 'Comprehensive Eye Exams',
    description: 'Regular eye check-ups are vital for maintaining good eye health and early detection of potential issues.',
    image: 'https://via.placeholder.com/400x250.png?text=Comprehensive+Eye+Exam',
  },
  {
    id: 'cataract',
    title: 'Cataract Surgery',
    description: 'Advanced, minimally invasive cataract surgery to restore clear vision with quick recovery times.',
    image: 'https://via.placeholder.com/400x250.png?text=Cataract+Surgery',
  },
  {
    id: 'lasik',
    title: 'LASIK & Refractive Surgery',
    description: 'Achieve freedom from glasses and contact lenses with our cutting-edge laser vision correction procedures.',
    image: 'https://via.placeholder.com/400x250.png?text=LASIK+&+Refractive+Surgery',
  },
];

const doctors = [
  {
    id: 'dr-sharma',
    name: 'Dr. Ananya Sharma',
    specialty: 'MBBS, MS (Ophthalmology)<br>Specialist in Cataract & Refractive Surgery',
    image: 'https://via.placeholder.com/400x250.png?text=Dr.+Ananya+Sharma',
  },
  {
    id: 'dr-verma',
    name: 'Dr. Rohan Verma',
    specialty: 'MBBS, DNB (Ophthalmology)<br>Specialist in Glaucoma & Medical Retina',
    image: 'https://via.placeholder.com/400x250.png?text=Dr.+Rohan+Verma',
  },
  {
    id: 'dr-singh',
    name: 'Dr. Priya Singh',
    specialty: 'MBBS, DO, FICO<br>Pediatric Ophthalmology & Strabismus Specialist',
    image: 'https://via.placeholder.com/400x250.png?text=Dr.+Priya+Singh',
  },
];

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-section text-white text-center py-32 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(0, 123, 138, 0.7), rgba(0, 95, 107, 0.85)), url('https://via.placeholder.com/1920x800.png?text=Modern+Eye+Clinic+View')" }}
      >
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">Clear Vision, Brighter Life</h1>
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
            <h2 className="text-clinic-primary">Your Trusted Partner in Eye Health</h2>
            <p>
              NayanJyoti Eye Clinic is dedicated to offering state-of-the-art eye care services to the community in India. Our mission is to enhance quality of life through improved vision, employing advanced technology and a patient-centric approach.
            </p>
            <p>
              We believe in ethical practices, continuous learning, and providing personalized care to each patient who walks through our doors.
            </p>
            <Link to="/about" className="btn btn-primary mt-4">Learn More About Us</Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="https://via.placeholder.com/500x350.png?text=Friendly+Clinic+Staff" alt="Friendly clinic environment" className="rounded-lg shadow-custom-card-hover w-full" />
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section className="page-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="text-clinic-primary">Our Key Services</h2>
            <p className="subtitle">Comprehensive eye care solutions tailored to your needs. From routine check-ups to advanced surgical procedures.</p>
          </div>
          <div className="card-grid">
            {services.map(service => (
              <div key={service.id} className="card">
                <img src={service.image} alt={service.title} className="card-image" />
                <div className="card-content">
                  <h3 className='text-clinic-primary'>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="card-actions">
                    <Link to={`/services/${service.id}`} className="btn btn-primary w-full sm:w-auto">Learn More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-accent">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Meet Our Expert Doctors Section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <h2 className="text-clinic-primary">Meet Our Expert Doctors</h2>
            <p className="subtitle">Our team of experienced and compassionate ophthalmologists is dedicated to providing the highest standard of care.</p>
          </div>
          <div className="card-grid">
            {doctors.map(doctor => (
              <div key={doctor.id} className="card">
                <img src={doctor.image} alt={doctor.name} className="card-image" />
                <div className="card-content">
                  <h3 className='text-clinic-primary'>{doctor.name}</h3>
                  <p dangerouslySetInnerHTML={{ __html: doctor.specialty }} />
                  <div className="card-actions">
                    <Link to={`/doctors/${doctor.id}`} className="btn btn-primary w-full sm:w-auto">View Profile</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/doctors" className="btn btn-accent">Meet The Team</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-clinic-primary text-white text-center py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to See a Clearer Future?</h2>
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
