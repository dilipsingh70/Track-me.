import React from 'react';

const ProgressIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l1.5 1.5L15 9.75l2.25 2.25L21.75 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21V6" />
    </svg>
);

export default ProgressIcon;