import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';
import ServiceItem from '../components/ServiceItem';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError('Failed to load services. Please try again later.');
      }
      setLoading(false);
    };

    fetchServices();
    document.title = 'Our Services - NayanJyoti Eye Clinic';
  }, []);

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Loading services...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="page-hero bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display">Our Eye Care Services</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto opacity-90">
            Comprehensive solutions for all your vision and eye health needs.
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
              Services
            </li>
          </ol>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="section-header text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-clinic-primary font-display">Explore Our Specialized Services</h2>
            <p className="text-lg text-clinic-text-light mt-2 max-w-xl mx-auto">
              We offer a wide range of advanced eye care services, tailored to meet your individual needs using the latest technologies and techniques.
            </p>
          </div>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceItem
                  key={service.id}
                  id={service.id} // Pass full ID for linking, API uses integer IDs
                  name={service.name}
                  description={service.description} // API provides short description
                  image={service.image_url}
                  // Pass icon if available and ServiceItem supports it
                  // icon={service.icon_svg_content ? <div dangerouslySetInnerHTML={{ __html: service.icon_svg_content }} /> : null}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-clinic-text-secondary">No services available at the moment. Please check back later.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-clinic-primary text-white py-16 text-center mt-12">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Ready to Discuss Your Eye Health?</h2>
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
