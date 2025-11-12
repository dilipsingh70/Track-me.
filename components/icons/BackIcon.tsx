import React from 'react';

const BackIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V3M12 6c-2.485 0-4.5 2.015-4.5 4.5S9.515 15 12 15s4.5-2.015 4.5-4.5S14.485 6 12 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6m-3-6c-1.333 1-2.5 2.5-2.5 4.5v1.5h11v-1.5c0-2-1.167-3.5-2.5-4.5" />
    </svg>
);

export default BackIcon;