import React from 'react';

const WarmupIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.364 5.025A9.75 9.75 0 0121.75 12c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12a9.75 9.75 0 016.386-9.025M12 21V12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 3 12 3s4.5 2.015 4.5 4.5S14.485 12 12 12z" />
    </svg>
);

export default WarmupIcon;