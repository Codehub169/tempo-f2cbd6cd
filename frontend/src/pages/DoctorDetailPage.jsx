import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Placeholder data - replace with API call based on doctorId
const allDoctorsDetails = {
  'dr-ananya-sharma': {
    id: 'dr-ananya-sharma',
    name: 'Dr. Ananya Sharma',
    specialty: 'MBBS, MS (Ophthalmology)',
    focus: 'Specialist in Cataract & Refractive Surgery',
    image: 'https://via.placeholder.com/400x400.png?text=Dr.+Ananya+Sharma',
    fullBio: [
      'Dr. Ananya Sharma is a distinguished ophthalmologist with over 12 years of experience in advanced cataract surgery and laser vision correction. She completed her MS in Ophthalmology from the prestigious All India Institute of Medical Sciences (AIIMS), New Delhi, and has since performed thousands of successful procedures.',
      'Dr. Sharma is known for her meticulous surgical skills and her compassionate approach to patient care. She believes in thoroughly educating her patients about their conditions and treatment options, empowering them to make informed decisions. Her areas of expertise include phacoemulsification, premium IOL implantation (multifocal, toric), LASIK, PRK, and SMILE procedures.',
      'She is an active member of several national and international ophthalmological societies and regularly participates in conferences to stay updated with the latest advancements in her field.'
    ],
    achievements: [
      'Gold Medalist in MS Ophthalmology.',
      'Published over 20 research papers in peer-reviewed journals.',
      'Invited speaker at numerous national ophthalmology conferences.'
    ],
    clinicHours: 'Mon - Fri: 9 AM - 5 PM, Sat: 9 AM - 1 PM'
  },
  'dr-rohan-verma': {
    id: 'dr-rohan-verma',
    name: 'Dr. Rohan Verma',
    specialty: 'MBBS, DNB (Ophthalmology)',
    focus: 'Specialist in Glaucoma & Medical Retina',
    image: 'https://via.placeholder.com/400x400.png?text=Dr.+Rohan+Verma',
    fullBio: [
      'Dr. Rohan Verma is a highly skilled ophthalmologist specializing in the medical and surgical management of glaucoma and various retinal disorders, including diabetic retinopathy and age-related macular degeneration. He earned his DNB in Ophthalmology from Sankara Nethralaya, Chennai, one of India\'s premier eye care institutions.',
      'With a patient-first philosophy, Dr. Verma is dedicated to providing comprehensive care, utilizing the latest diagnostic tools and treatment techniques such as OCT, retinal lasers, and intravitreal injections. He is committed to preserving and improving the vision of his patients through personalized treatment plans.',
      'He actively engages in clinical research and has contributed to several studies on glaucoma management and retinal diseases.'
    ],
    achievements: [
      'Fellowship in Glaucoma from L V Prasad Eye Institute.',
      'Recipient of the Young Ophthalmologist Award.',
      'Expert in advanced glaucoma diagnostic techniques.'
    ],
    clinicHours: 'Tue, Thu, Sat: 10 AM - 6 PM'
  },
  // Add more doctor details here, matching IDs from DoctorsPage
};

const DoctorDetailPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Simulate API call
    const foundDoctor = allDoctorsDetails[doctorId] || 
                        Object.values(allDoctorsDetails).find(d => d.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '') === doctorId) ||
                        {
                            name: 'Doctor Not Found',
                            image: 'https://via.placeholder.com/400x400.png?text=Doctor+Not+Found',
                            specialty: '',
                            focus: '',
                            fullBio: ['The requested doctor details could not be found. Please check the URL or navigate back to our doctors page.'],
                            achievements: [],
                            clinicHours: ''
                        };
    setDoctor(foundDoctor);
    document.title = `${foundDoctor.name} - NayanJyoti Eye Clinic`;
  }, [doctorId]);

  if (!doctor) {
    return <div className="container mx-auto py-10 text-center">Loading doctor details...</div>;
  }

  return (
    <div className="bg-white">
      {/* Breadcrumbs - Placed before hero for better context on page load */}
      <section className="breadcrumbs bg-clinic-light-gray py-4">
        <div className="container mx-auto">
          <ol className="list-none p-0 inline-flex font-medium text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-clinic-primary hover:text-clinic-primary-darker">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/doctors" className="text-clinic-primary hover:text-clinic-primary-darker">Doctors</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center text-gray-700">
              {doctor.name}
            </li>
          </ol>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="page-section py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden md:flex">
            <div className="md:w-1/3">
              <img src={doctor.image} alt={doctor.name} className="w-full h-auto md:h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-6 md:p-10">
              <h1 className="text-3xl md:text-4xl font-bold text-clinic-primary mb-2">{doctor.name}</h1>
              <p className="text-md text-gray-600 mb-1" dangerouslySetInnerHTML={{ __html: doctor.specialty }} />
              <p className="text-lg text-clinic-accent font-semibold mb-6">{doctor.focus}</p>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6">
                {doctor.fullBio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {doctor.achievements && doctor.achievements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-clinic-primary mb-2">Key Achievements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
                    {doctor.achievements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {doctor.clinicHours && (
                 <div className="mb-8">
                    <h3 className="text-xl font-semibold text-clinic-primary mb-2">Clinic Hours</h3>
                    <p className="text-gray-700">{doctor.clinicHours}</p>
                 </div>
              )}
              
              {doctor.name === 'Doctor Not Found' ? (
                <div className="mt-8 text-center md:text-left">
                    <Link to="/doctors" className="btn btn-primary text-lg">View Our Doctors</Link>
                </div>
               ) : (
                <div className="mt-8 text-center md:text-left">
                    <Link to={`/book-appointment?doctor=${doctor.id}`} className="btn btn-accent text-lg font-semibold py-3 px-6">
                    Book Appointment with {doctor.name.split(' ').slice(0,2).join(' ')}
                    </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
       {/* CTA for general booking if not found or other doctors */}
       {doctor.name !== 'Doctor Not Found' && (
        <section className="cta-section bg-clinic-secondary text-white py-16 text-center mt-12">
            <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Eye Care?</h2>
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
      )}
    </div>
  );
};

export default DoctorDetailPage;
