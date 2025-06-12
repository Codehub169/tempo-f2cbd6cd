import React from 'react';
import { Link } from 'react-router-dom';

const DoctorItem = ({ id, name, specialty, image, bioExcerpt }) => {
  // Fallback for missing image
  const imageUrl = image || `https://via.placeholder.com/400x250.png?text=${encodeURIComponent(name)}`;
  const doctorLink = `/doctors/${id}`;

  return (
    <div className="card bg-white rounded-lg shadow-clinic-card hover:shadow-clinic-card-hover transition-shadow duration-300 flex flex-col overflow-hidden h-full">
      <img src={imageUrl} alt={`Photo of ${name}`} className="w-full h-60 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-clinic-primary mb-1 font-display">{name}</h3>
        {specialty && (
          <div 
            className="text-clinic-accent text-sm mb-2"
            dangerouslySetInnerHTML={{ __html: specialty }} 
          />
        )}
        {bioExcerpt && (
          <p className="text-clinic-text-light text-sm mb-4 flex-grow">
            {bioExcerpt}
          </p>
        )}
        <div className="mt-auto pt-4">
          <Link 
            to={doctorLink} 
            className="btn btn-primary w-full sm:w-auto"
            aria-label={`View profile of ${name}`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorItem;
