import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorById } from '../services/api';

const DoctorDetailPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        const data = await getDoctorById(doctorId);
        setDoctor(data);
        document.title = `${data.name} - NayanJyoti Eye Clinic`;
        setError(null);
      } catch (err) {
        console.error(`Error fetching doctor ${doctorId}:`, err);
        setError('Doctor not found or an error occurred.');
        document.title = 'Doctor Not Found - NayanJyoti Eye Clinic';
      }
      setLoading(false);
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Loading doctor details...</div>;
  }

  if (error || !doctor) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold text-clinic-primary mb-4">Doctor Not Found</h1>
        <p className="text-clinic-text-secondary mb-6">{error || 'The doctor profile you are looking for does not exist.'}</p>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  // Helper to format clinic hours object
  const formatClinicHours = (hours) => {
    if (!hours || Object.keys(hours).length === 0) return <p>Not available.</p>;
    return (
      <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
        {Object.entries(hours).map(([day, time]) => (
          <li key={day}><strong>{day}:</strong> {time}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <section className="breadcrumbs bg-clinic-neutral-lightest py-4">
        <div className="container mx-auto px-4">
          <ol className="list-none p-0 inline-flex font-medium text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-clinic-primary hover:text-clinic-primary-dark">Home</Link>
              <span className="mx-2 text-clinic-text-secondary">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/doctors" className="text-clinic-primary hover:text-clinic-primary-dark">Doctors</Link>
              <span className="mx-2 text-clinic-text-secondary">/</span>
            </li>
            <li className="flex items-center text-clinic-text-primary">
              {doctor.name}
            </li>
          </ol>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="page-section py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden md:flex">
            {doctor.image_url && (
              <div className="md:w-1/3">
                <img src={doctor.image_url} alt={doctor.name} className="w-full h-auto md:h-full object-cover" />
              </div>
            )}
            <div className={`p-6 md:p-10 ${doctor.image_url ? 'md:w-2/3' : 'w-full'}`}>
              <h1 className="text-3xl md:text-4xl font-bold text-clinic-primary mb-2 font-display">{doctor.name}</h1>
              {doctor.specialty && 
                <div className="text-lg text-clinic-accent font-semibold mb-6" dangerouslySetInnerHTML={{ __html: doctor.specialty }} />
              }

              {doctor.bio && (
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6">
                  <h3 className="text-xl font-semibold text-clinic-primary mb-2 font-display">About {doctor.name.split(' ')[0]}</h3>
                  {doctor.bio.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}

              {doctor.areas_of_focus && doctor.areas_of_focus.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-clinic-primary mb-2 font-display">Areas of Focus</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                    {doctor.areas_of_focus.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {doctor.achievements && doctor.achievements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-clinic-primary mb-2 font-display">Key Achievements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                    {doctor.achievements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {doctor.clinic_hours && (
                 <div className="mb-8">
                    <h3 className="text-xl font-semibold text-clinic-primary mb-2 font-display">Clinic Hours</h3>
                    {formatClinicHours(doctor.clinic_hours)}
                 </div>
              )}
              
              <div className="mt-8 text-center md:text-left">
                  <Link to={`/book-appointment?doctor=${doctor.id}`} className="btn btn-accent text-lg font-semibold py-3 px-6">
                  Book Appointment with {doctor.name.split(' ').slice(0,2).join(' ')}
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
       <section className="cta-section bg-clinic-secondary text-white py-16 text-center mt-12">
            <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Need Eye Care?</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Our team of specialists is ready to assist you. Explore other doctors or book a general consultation.
            </p>
            <Link to="/doctors" className="btn btn-primary text-lg font-semibold py-3 px-8 mr-4">
                View All Doctors
            </Link>
            <Link to="/book-appointment" className="btn btn-outline-white text-lg font-semibold py-3 px-8">
                Book General Appointment
            </Link>
            </div>
        </section>
    </div>
  );
};

export default DoctorDetailPage;
