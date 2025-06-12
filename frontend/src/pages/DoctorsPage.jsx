import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctors } from '../services/api';
import DoctorItem from '../components/DoctorItem';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        setDoctors(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError('Failed to load doctor profiles. Please try again later.');
      }
      setLoading(false);
    };

    fetchDoctors();
    document.title = 'Our Doctors - NayanJyoti Eye Clinic';
  }, []);

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Loading doctor profiles...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display">Meet Our Expert Doctors</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90">
            Experienced, compassionate, and dedicated to your eye health.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="breadcrumbs bg-clinic-neutral-lightest py-4">
        <div className="container mx-auto px-4">
          <ol className="list-none p-0 inline-flex font-medium text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-clinic-primary hover:text-clinic-primary-dark">Home</Link>
              <span className="mx-2 text-clinic-text-secondary">/</span>
            </li>
            <li className="flex items-center text-clinic-text-primary">
              Doctors
            </li>
          </ol>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="section-header text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary font-display">Our Team of Specialists</h2>
            <p className="text-lg text-clinic-text-light mt-2 max-w-xl mx-auto">
              Get to know the dedicated ophthalmologists at NayanJyoti Eye Clinic, committed to providing you with exceptional care.
            </p>
          </div>
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <DoctorItem
                  key={doctor.id}
                  id={doctor.id} // API uses integer IDs
                  name={doctor.name}
                  specialty={doctor.specialty} // API provides specialty, may contain HTML
                  image={doctor.image_url}
                  // Extract a bio excerpt if the full bio is too long for the card
                  bioExcerpt={doctor.bio ? `${doctor.bio.substring(0, 120)}...` : 'Dedicated and experienced specialist.'}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-clinic-text-secondary">No doctor profiles available at the moment. Please check back later.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-clinic-primary text-white py-16 text-center mt-12">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Ready to Meet Our Team?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Schedule a consultation today and experience personalized eye care from our experts.
          </p>
          <Link to="/book-appointment" className="btn btn-accent text-lg font-semibold py-3 px-8">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
