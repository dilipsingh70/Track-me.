import React from 'react';

const ChestIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-4.243-9.993C5.176 10.557 3 12.98 3 16.5 3 18.985 5.015 21 7.5 21c2.01 0 3.737-1.332 4.243-3.243m.514 0A4.5 4.5 0 0116.5 21c2.485 0 4.5-2.015 4.5-4.5 0-3.52-2.176-5.943-4.757-7.05" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-2.485 0-4.5 2.015-4.5 4.5S9.515 13.5 12 13.5s4.5-2.015 4.5-4.5S14.485 4.5 12 4.5z" />
    </svg>
);

export default ChestIcon;