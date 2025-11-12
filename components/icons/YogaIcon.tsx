import React from 'react';

const YogaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M3.75 12a8.25 8.25 0 0116.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-3.442 0-6.43-2.017-7.747-4.839" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.747 16.911A8.223 8.223 0 0012 21.75" />
    </svg>
);

export default YogaIcon;