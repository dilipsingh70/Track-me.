import React from 'react';
import LogoIcon from './icons/LogoIcon';

const Header: React.FC = () => {
    return (
        <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-center">
                <LogoIcon className="text-red-500 h-8 w-8 mr-3" />
                <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-gray-100">
                    Track<span className="text-red-500">Me</span>
                </h1>
            </div>
        </header>
    );
};

export default Header;