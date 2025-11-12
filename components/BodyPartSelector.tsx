import React from 'react';
import { bodyParts } from '../data/predefinedExercises';
import GetBodyPartIcon from './GetBodyPartIcon';

interface BodyPartSelectorProps {
    onSelectBodyPart: (bodyPart: string) => void;
    onOpenSplitEditor: () => void;
}

const BodyPartSelector: React.FC<BodyPartSelectorProps> = ({ onSelectBodyPart, onOpenSplitEditor }) => {
    return (
        <div className="space-y-8 text-center animate-fade-in">
            <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-red-500 tracking-wide">What are you training today?</h2>
                 <p className="text-gray-400 mt-2">Select a body part to start or set up your weekly routine.</p>
            </div>

            <button
                onClick={onOpenSplitEditor}
                className="w-full max-w-md mx-auto py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105"
            >
                Set Weekly Split
            </button>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bodyParts.map(part => (
                    <button
                        key={part}
                        onClick={() => onSelectBodyPart(part)}
                        className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800 hover:bg-gray-800 hover:border-red-600 transition-colors,border-color,transform duration-200 transform hover:scale-105 group"
                    >
                        <GetBodyPartIcon bodyPart={part} className="w-12 h-12 mb-3 text-red-500 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-semibold text-lg text-gray-100">{part}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default React.memo(BodyPartSelector);