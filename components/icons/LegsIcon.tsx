import React from 'react';

const LegsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v18M15.75 3v18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3c-1.657 0-3 1.343-3 3v6c0 1.657 1.343 3 3 3s3-1.343 3-3V6c0-1.657-1.343-3-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3c1.657 0 3 1.343 3 3v6c0 1.657-1.343 3-3 3s-3-1.343-3-3V6c0-1.657 1.343-3 3-3z" />
    </svg>
);

export default LegsIcon;