import React from 'react';

interface BrandCardProps {
  name: string;
  logo: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ name, logo }) => (
  <div
    className={
      `flex flex-col items-center justify-center w-full max-w-[220px] mx-auto !bg-white rounded-xl shadow-lg p-3 text-black cursor-pointer hover:scale-105 transition-transform duration-200 brand-card`
    }
  >
    <img
      src={logo || ''}
      alt={name}
      className="h-16 object-contain mb-2 logo-image"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
      }}
    />
    <span className="font-semibold text-center uppercase">{name === 'AutoID+' ? 'AutoID+' : name}</span>
  </div>
);

export default BrandCard;
