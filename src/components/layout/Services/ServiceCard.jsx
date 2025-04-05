import React from 'react';

const ServiceCard = ({ title, description, animationData }) => {
  return (
    <div
      className="flex flex-col max-w-sm p-6 m-4 w-[300px] text-center"
    >
      <h3 className="text-3xl font-medium mb-4">
        {title}
      </h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
