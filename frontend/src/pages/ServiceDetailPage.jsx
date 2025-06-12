import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Placeholder data - replace with API call based on serviceId
const allServicesDetails = {
  'comprehensive-eye-exam': {
    name: 'Comprehensive Eye Exams',
    image: 'https://via.placeholder.com/800x400.png?text=Detailed+Eye+Examination',
    icon: '👁️',
    description: [
      'A comprehensive eye exam is a crucial part of preventive healthcare. It involves a series of tests to evaluate your vision and check for eye diseases. Many eye and vision problems have no obvious signs or symptoms, so early diagnosis and treatment are key to maintaining good vision and eye health, and when possible, preventing vision loss.',
      'Our exams include checks for refractive errors (nearsightedness, farsightedness, astigmatism), glaucoma, cataracts, macular degeneration, diabetic retinopathy, and other conditions. We use state-of-the-art diagnostic equipment to ensure accuracy.'
    ],
    whatToExpect: [
      'Discussion of your medical history and any vision problems.',
      'Visual acuity tests.',
      'Tests for eye muscle function and coordination.',
      'Refraction assessment.',
      'Eye health evaluation, possibly including pupil dilation.',
      'Glaucoma testing (tonometry).'
    ],
    benefits: [
      'Early detection of eye diseases.',
      'Updated prescriptions for glasses or contact lenses.',
      'Overall assessment of eye health.',
      'Recommendations for maintaining healthy vision.'
    ]
  },
  'cataract-surgery': {
    name: 'Cataract Surgery',
    image: 'https://via.placeholder.com/800x400.png?text=Advanced+Cataract+Surgery',
    icon: '🔪',
    description: [
      'Cataract surgery is a safe and effective procedure to remove the clouded lens of your eye (cataract) and replace it with a clear, artificial intraocular lens (IOL). This restores clear vision, often reducing or eliminating the need for glasses.',
      'We offer various advanced IOL options, including monofocal, multifocal, and toric lenses, tailored to your specific visual needs and lifestyle. Our surgeons use minimally invasive techniques for faster recovery.'
    ],
    whatToExpect: [
      'Pre-operative consultation and measurements.',
      'Outpatient procedure, typically taking less than an hour.',
      'Local anesthesia, so you are awake but comfortable.',
      'Post-operative care and follow-up appointments.'
    ],
    benefits: [
      'Improved clarity of vision.',
      'Enhanced color perception.',
      'Reduced glare and halos.',
      'Greater independence from glasses.'
    ]
  },
  // Add more service details here, matching IDs from ServicesPage
  'lasik-refractive-surgery': {
    name: 'LASIK & Refractive Surgery',
    image: 'https://via.placeholder.com/800x400.png?text=LASIK+Procedure',
    icon: '✨',
    description: [
        'LASIK (Laser-Assisted In Situ Keratomileusis) and other refractive surgeries aim to correct vision problems such as myopia (nearsightedness), hyperopia (farsightedness), and astigmatism. These procedures reshape the cornea, the front part of the eye, allowing light to focus properly on the retina.',
        'Our clinic offers a range of refractive surgery options, including bladeless LASIK, PRK, and ICLs (Implantable Collamer Lenses), to best suit your individual eye condition and lifestyle goals. A thorough evaluation will determine if you are a suitable candidate.'
    ],
    whatToExpect: [
        'Comprehensive pre-operative assessment to determine suitability.',
        'Quick, outpatient procedure using advanced laser technology.',
        'Minimal discomfort during and after the procedure.',
        'Follow-up visits to monitor healing and visual outcome.'
    ],
    benefits: [
        'Significant reduction or elimination of dependence on glasses or contact lenses.',
        'Rapid visual recovery for most patients.',
        'Long-lasting vision correction.',
        'Improved quality of life and freedom in daily activities.'
    ]
  }
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Simulate API call
    const foundService = allServicesDetails[serviceId] || 
                         Object.values(allServicesDetails).find(s => s.name.toLowerCase().replace(/\s+/g, '-') === serviceId) ||
                         {
                           name: 'Service Not Found',
                           image: 'https://via.placeholder.com/800x400.png?text=Service+Not+Found',
                           icon: '❓',
                           description: ['The requested service details could not be found. Please check the URL or navigate back to our services page.'],
                           whatToExpect: [],
                           benefits: []
                         };
    setService(foundService);
    document.title = `${foundService.name} - NayanJyoti Eye Clinic`;
  }, [serviceId]);

  if (!service) {
    return <div className="container mx-auto py-10 text-center">Loading service details...</div>;
  }

  return (
    <div className="bg-white">
      {/* Page Hero with Service Name and Icon */}
      <section className="page-hero bg-clinic-primary text-white py-16 text-center">
        <div className="container mx-auto">
          <div className="text-5xl mb-4">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{service.name}</h1>
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
            <li className="flex items-center">
              <Link to="/services" className="text-clinic-primary hover:text-clinic-primary-darker">Services</Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center text-gray-700">
              {service.name}
            </li>
          </ol>
        </div>
      </section>

      {/* Service Detail Content */}
      <section className="page-section py-12 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <img src={service.image} alt={service.name} className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg mb-8 md:mb-12" />
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {service.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {service.whatToExpect && service.whatToExpect.length > 0 && (
              <div className="mt-10 md:mt-12">
                <h3 className="text-2xl font-semibold text-clinic-primary mb-4">What to Expect</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  {service.whatToExpect.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.benefits && service.benefits.length > 0 && (
              <div className="mt-10 md:mt-12">
                <h3 className="text-2xl font-semibold text-clinic-primary mb-4">Benefits of this Service</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                  {service.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {service.name === 'Service Not Found' && (
                <div className="mt-10 text-center">
                    <Link to="/services" className="btn btn-primary text-lg">Explore Our Services</Link>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {service.name !== 'Service Not Found' && (
        <section className="cta-section bg-clinic-secondary text-white py-16 text-center mt-12">
            <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Interested in {service.name}?</h2>
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
      )}
    </div>
  );
};

export default ServiceDetailPage;
