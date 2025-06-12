import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Placeholder data for services - replace with API call
const servicesData = [
  {
    id: 'comprehensive-eye-exam',
    name: 'Comprehensive Eye Exams',
    shortDescription: 'Thorough assessments of vision and eye health, detecting issues early for timely treatment.',
    image: 'https://via.placeholder.com/400x250.png?text=Eye+Examination',
    icon: '👁️'
  },
  {
    id: 'cataract-surgery',
    name: 'Cataract Surgery',
    shortDescription: 'Advanced, minimally invasive procedures to restore clear vision clouded by cataracts.',
    image: 'https://via.placeholder.com/400x250.png?text=Cataract+Surgery',
    icon: '🔪'
  },
  {
    id: 'lasik-refractive-surgery',
    name: 'LASIK & Refractive Surgery',
    shortDescription: 'State-of-the-art laser vision correction to reduce dependency on glasses or contact lenses.',
    image: 'https://via.placeholder.com/400x250.png?text=LASIK',
    icon: '✨'
  },
  {
    id: 'glaucoma-treatment',
    name: 'Glaucoma Treatment',
    shortDescription: 'Comprehensive management and treatment options for glaucoma to preserve your vision.',
    image: 'https://via.placeholder.com/400x250.png?text=Glaucoma+Care',
    icon: '💧'
  },
  {
    id: 'retina-services',
    name: 'Retina Services',
    shortDescription: 'Specialized care for retinal conditions including diabetic retinopathy and macular degeneration.',
    image: 'https://via.placeholder.com/400x250.png?text=Retina+Scan',
    icon: '🎯'
  },
  {
    id: 'pediatric-eye-care',
    name: 'Pediatric Eye Care',
    shortDescription: 'Dedicated eye care for children, ensuring healthy vision development from an early age.',
    image: 'https://via.placeholder.com/400x250.png?text=Child+Eye+Test',
    icon: '🧸'
  },
  {
    id: 'cornea-services',
    name: 'Cornea Services',
    shortDescription: 'Treatment for corneal diseases and conditions, including infections and dystrophies.',
    image: 'https://via.placeholder.com/400x250.png?text=Cornea+Health',
    icon: '🛡️'
  },
  {
    id: 'optical-services',
    name: 'Optical Services',
    shortDescription: 'A wide range of eyeglasses, contact lenses, and expert fitting services.',
    image: 'https://via.placeholder.com/400x250.png?text=Eyeglasses+Selection',
    icon: '👓'
  }
];

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'Our Services - NayanJyoti Eye Clinic';
  }, []);

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Our Eye Care Services</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90">
            Comprehensive solutions for all your vision and eye health needs.
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
              Services
            </li>
          </ol>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="section-header text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary">Explore Our Specialized Services</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">
              We offer a wide range of advanced eye care services, tailored to meet your individual needs using the latest technologies and techniques.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <div key={service.id} className="card bg-white flex flex-col">
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-3xl mb-3 text-clinic-accent">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-clinic-primary mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {service.shortDescription}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to={`/services/${service.id}`}
                      className="btn btn-primary w-full text-center"
                    >
                      Learn More
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Discuss Your Eye Health?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our team is here to answer your questions and help you find the right service for your needs.
          </p>
          <Link to="/book-appointment" className="btn btn-accent text-lg font-semibold py-3 px-8">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
