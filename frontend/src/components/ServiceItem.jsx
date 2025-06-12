import React from 'react';
import { Link } from 'react-router-dom';

const ServiceItem = ({ id, name, description, image, icon }) => {
  // Fallback for missing image
  const imageUrl = image || `https://via.placeholder.com/400x250.png?text=${encodeURIComponent(name)}`;
  const serviceLink = `/services/${id}`;

  return (
    <div className="card bg-white rounded-lg shadow-clinic-card hover:shadow-clinic-card-hover transition-shadow duration-300 flex flex-col overflow-hidden h-full">
      {icon && <div className="p-4 text-center text-clinic-primary">{icon}</div>} 
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-clinic-primary mb-2 font-display">{name}</h3>
        <p className="text-clinic-text-light text-sm mb-4 flex-grow">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <Link 
            to={serviceLink} 
            className="btn btn-primary w-full sm:w-auto"
            aria-label={`Learn more about ${name}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
