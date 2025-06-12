import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceById } from '../services/api';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const data = await getServiceById(serviceId);
        setService(data);
        document.title = `${data.name} - NayanJyoti Eye Clinic`;
        setError(null);
      } catch (err) {
        console.error(`Error fetching service ${serviceId}:`, err);
        setError('Service not found or an error occurred.');
        document.title = 'Service Not Found - NayanJyoti Eye Clinic';
      }
      setLoading(false);
    };

    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId]);

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Loading service details...</div>;
  }

  if (error || !service) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold text-clinic-primary mb-4">Service Not Found</h1>
        <p className="text-clinic-text-secondary mb-6">{error || 'The service you are looking for does not exist.'}</p>
        <Link to="/services" className="btn btn-primary">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Page Hero with Service Name and Icon */}
      <section className="page-hero bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          {service.icon_svg_content && (
            <div 
              className="text-5xl mb-4 h-12 w-12 mx-auto text-white" 
              dangerouslySetInnerHTML={{ __html: service.icon_svg_content }}
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display">{service.name}</h1>
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
            <li className="flex items-center">
              <Link to="/services" className="text-clinic-primary hover:text-clinic-primary-dark">Services</Link>
              <span className="mx-2 text-clinic-text-secondary">/</span>
            </li>
            <li className="flex items-center text-clinic-text-primary">
              {service.name}
            </li>
          </ol>
        </div>
      </section>

      {/* Service Detail Content */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {service.image_url && 
              <img src={service.image_url} alt={service.name} className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg mb-8 md:mb-12" />
            }
            
            {service.detailed_description && (
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                <h2 className="text-2xl font-semibold text-clinic-primary mb-3 font-display">About {service.name}</h2>
                {/* Assuming detailed_description is a single string with paragraphs separated by newlines, or just one block */}
                {service.detailed_description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            {service.what_to_expect && service.what_to_expect.length > 0 && (
              <div className="mt-10 md:mt-12">
                <h3 className="text-2xl font-semibold text-clinic-primary mb-4 font-display">What to Expect</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  {service.what_to_expect.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.benefits && service.benefits.length > 0 && (
              <div className="mt-10 md:mt-12">
                <h3 className="text-2xl font-semibold text-clinic-primary mb-4 font-display">Benefits of this Service</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  {service.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-clinic-secondary text-white py-16 text-center mt-12">
          <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Interested in {service.name}?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more or to schedule a consultation with one of our specialists.
          </p>
          <Link to="/book-appointment" className="btn btn-accent text-lg font-semibold py-3 px-8 mr-4">
              Book an Appointment
          </Link>
          <Link to="/contact" className="btn btn-outline-white text-lg font-semibold py-3 px-8">
              Contact Us
          </Link>
          </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
