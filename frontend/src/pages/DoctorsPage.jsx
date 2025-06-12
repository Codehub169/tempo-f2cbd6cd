import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Placeholder data for doctors - replace with API call
const doctorsData = [
  {
    id: 'dr-ananya-sharma',
    name: 'Dr. Ananya Sharma',
    specialty: 'MBBS, MS (Ophthalmology)',
    focus: 'Specialist in Cataract & Refractive Surgery',
    image: 'https://via.placeholder.com/400x250.png?text=Dr.+Ananya+Sharma',
    bioExcerpt: 'Dr. Sharma is a leading expert in advanced cataract surgery and LASIK procedures, dedicated to restoring and enhancing vision with precision and care.'
  },
  {
    id: 'dr-rohan-verma',
    name: 'Dr. Rohan Verma',
    specialty: 'MBBS, DNB (Ophthalmology)',
    focus: 'Specialist in Glaucoma & Medical Retina',
    image: 'https://via.placeholder.com/400x250.png?text=Dr.+Rohan+Verma',
    bioExcerpt: 'Dr. Verma focuses on the diagnosis and management of complex glaucoma cases and retinal disorders, employing the latest treatment modalities.'
  },
  {
    id: 'dr-priya-singh',
    name: 'Dr. Priya Singh',
    specialty: 'MBBS, DO, FICO',
    focus: 'Pediatric Ophthalmology & Strabismus Specialist',
    image: 'https://via.placeholder.com/400x250.png?text=Dr.+Priya+Singh',
    bioExcerpt: 'Dr. Singh is passionate about children\'s eye health, providing expert care for a range of pediatric eye conditions and strabismus.'
  },
  {
    id: 'dr-vikram-patel',
    name: 'Dr. Vikram Patel',
    specialty: 'MD, PhD (Ophthalmology)',
    focus: 'Cornea and External Disease Specialist',
    image: 'https://via.placeholder.com/400x250.png?text=Dr.+Vikram+Patel',
    bioExcerpt: 'Dr. Patel specializes in corneal transplants, infections, and other complex conditions of the anterior segment of the eye.'
  }
];

const DoctorsPage = () => {
  useEffect(() => {
    document.title = 'Our Doctors - NayanJyoti Eye Clinic';
  }, []);

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Meet Our Expert Doctors</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90">
            Experienced, compassionate, and dedicated to your eye health.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="breadcrumbs bg-clinic-light-gray py-4">
        <div className="container mx-auto">
          <ol className="list-none p-0 inline-flex font-medium text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-clinic-primary hover:text-clinic-primary-darker">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center text-gray-700">
              Doctors
            </li>
          </ol>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="section-header text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary">Our Team of Specialists</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">
              Get to know the dedicated ophthalmologists and optometrists at NayanJyoti Eye Clinic, committed to providing you with exceptional care.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorsData.map((doctor) => (
              <div key={doctor.id} className="card bg-white flex flex-col">
                <img src={doctor.image} alt={doctor.name} className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-clinic-primary mb-1">{doctor.name}</h3>
                  <p className="text-sm text-gray-500 mb-1" dangerouslySetInnerHTML={{ __html: doctor.specialty }} />
                  <p className="text-sm text-clinic-accent font-medium mb-3">{doctor.focus}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {doctor.bioExcerpt}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to={`/doctors/${doctor.id}`}
                      className="btn btn-primary w-full text-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-clinic-primary text-white py-16 text-center mt-12">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Meet Our Team?</h2>
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
