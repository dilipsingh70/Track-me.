import React from 'react';

const FullBodyIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12M5.25 12.75L12 18l6.75-5.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21L9 15m6 6l-3-6" />
    </svg>
);

export default FullBodyIcon;