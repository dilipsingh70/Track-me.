import React from 'react';

const CoreIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M7.5 9h9M7.5 12h9M7.5 15h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 6C5.015 6 3 8.015 3 10.5S5.015 15 7.5 15h9c2.485 0 4.5-2.015 4.5-4.5S18.985 6 16.5 6h-9z" />
    </svg>
);

export default CoreIcon;