import React from 'react';

const WorkoutIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15.75l-3.75-3.75L15 8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15.75l3.75-3.75L9 8.25" />
    </svg>
);

export default WorkoutIcon;