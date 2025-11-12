import React from 'react';

const ArmIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L9 6m0 0l4.5 4.5M9 6v13.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 4.97-4.03 9-9 9s-9-4.03-9-9" />
    </svg>
);

export default ArmIcon;