import React from 'react';

const LogoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 10h12v2H3v-2zm0 4h12v2H3v-2zm14-1.41V11.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v6.09l-1.65-1.65a.5.5 0 00-.7.7l2.5 2.5c.2.2.5.2.7 0l2.5-2.5a.5.5 0 00-.7-.7L17 19.59z" />
    </svg>
);

export default LogoIcon;