import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Placeholder images - replace with actual images
const aboutImage = 'https://via.placeholder.com/500x400.png?text=Our+Clinic+Facility';
const teamImage = 'https://via.placeholder.com/500x350.png?text=Our+Dedicated+Team';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us - NayanJyoti Eye Clinic';
  }, []);

  const values = [
    { title: 'Patient-Centric Care', description: 'Prioritizing your comfort, needs, and well-being at every step of your journey with us.', icon: '❤️' },
    { title: 'Expertise & Innovation', description: 'Combining experienced professionals with advanced technology for top-tier eye care.', icon: '🔬' },
    { title: 'Integrity & Trust', description: 'Upholding the highest ethical standards in all our interactions and treatments.', icon: '🤝' },
    { title: 'Compassionate Service', description: 'Providing a supportive and understanding environment for all our patients.', icon: '😊' },
  ];

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About NayanJyoti Eye Clinic</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90">
            Dedicated to providing exceptional eye care with a personal touch.
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
              About Us
            </li>
          </ol>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary mb-6">Our Journey & Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                NayanJyoti Eye Clinic was founded with a singular vision: to offer comprehensive, accessible, and high-quality eye care to the community. We believe that clear vision is essential for a fulfilling life, and our dedicated team works tirelessly to achieve this for every patient.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our mission is to combine cutting-edge medical technology with compassionate patient care. We strive to create a welcoming and reassuring environment where patients feel heard, understood, and confident in the treatment they receive. From routine eye exams to complex surgical procedures, we are committed to excellence.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are deeply rooted in the community and are passionate about promoting eye health awareness and providing services that make a real difference in people's lives.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img src={aboutImage} alt="NayanJyoti Eye Clinic Facility" className="rounded-lg shadow-xl w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="page-section bg-clinic-light-gray py-12 md:py-20">
        <div className="container mx-auto">
          <div className="section-header text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary">Our Core Values</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">The principles that guide our practice every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card bg-white p-6 text-center items-center flex flex-col hover:shadow-2xl transition-shadow duration-300">
                <div className="text-4xl mb-4 text-clinic-accent">{value.icon}</div>
                <h3 className="text-xl font-semibold text-clinic-primary mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Team Teaser Section */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <img src={teamImage} alt="Our dedicated team at NayanJyoti" className="rounded-lg shadow-xl w-full h-auto object-cover" />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary mb-6">Our Dedicated Professionals</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At NayanJyoti, our strength lies in our team. Comprised of highly skilled ophthalmologists, optometrists, nurses, and support staff, we work collaboratively to provide you with the best possible care.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Each member of our team is committed to continuous learning and staying abreast of the latest advancements in eye care to ensure you benefit from modern and effective treatments.
              </p>
              <Link to="/doctors" className="btn btn-primary text-lg">
                Meet Our Doctors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience a Higher Standard of Eye Care</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Your vision is precious. Let us help you protect and enhance it. Schedule your appointment today.
          </p>
          <Link to="/book-appointment" className="btn btn-accent text-lg font-semibold py-3 px-8">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
