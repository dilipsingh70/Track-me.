import React, { useState } from 'react';
import { WorkoutSplit } from '../types';

interface SplitEditorProps {
    currentSplit: WorkoutSplit;
    bodyParts: string[];
    onSave: (split: WorkoutSplit) => void;
    onClose: () => void;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SplitEditor: React.FC<SplitEditorProps> = ({ currentSplit, bodyParts, onSave, onClose }) => {
    const [split, setSplit] = useState<WorkoutSplit>(currentSplit);

    const handleAddBodyPart = (day: string, bodyPart: string) => {
        if (!bodyPart) return; // Ignore placeholder
        const currentParts = split[day] || [];
        if (!currentParts.includes(bodyPart)) {
            setSplit(prev => ({
                ...prev,
                [day]: [...currentParts, bodyPart],
            }));
        }
    };
    
    const handleRemoveBodyPart = (day: string, bodyPartToRemove: string) => {
        const currentParts = split[day] || [];
        setSplit(prev => ({
            ...prev,
            [day]: currentParts.filter(bp => bp !== bodyPartToRemove),
        }));
    };

    const handleSave = () => {
        onSave(split);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-700 flex flex-col max-h-[90vh]">
                <div className="flex-shrink-0">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-red-500">Set Your Weekly Split</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                    </div>
                    <p className="text-gray-400 text-sm mt-2 mb-4">Assign one or more workout focuses for each day. The app will automatically combine your plans on the correct day.</p>
                </div>

                <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                    {daysOfWeek.map(day => (
                        <div key={day} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <label className="font-semibold text-gray-200 w-full sm:w-1/4 mb-2 sm:mb-0">{day}</label>
                            <div className="w-full sm:w-3/4 flex flex-wrap items-center gap-2 bg-gray-800 p-2 rounded-md border border-gray-700 min-h-[40px]">
                                {(split[day] || []).map(bp => (
                                    <div key={bp} className="flex items-center bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded-full">
                                        <span>{bp}</span>
                                        <button onClick={() => handleRemoveBodyPart(day, bp)} className="ml-1.5 text-red-100 hover:text-white">&times;</button>
                                    </div>
                                ))}
                                <select
                                    value=""
                                    onChange={(e) => handleAddBodyPart(day, e.target.value)}
                                    className="bg-transparent text-gray-300 focus:outline-none flex-grow"
                                >
                                    <option value="">+ Add...</option>
                                    {bodyParts
                                        .filter(bp => !(split[day] || []).includes(bp))
                                        .map(bp => <option key={bp} value={bp}>{bp}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-2 pt-4 flex-shrink-0">
                    <button onClick={onClose} className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200">Cancel</button>
                    <button onClick={handleSave} className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200">Save Split</button>
                </div>
            </div>
        </div>
    );
};

export default SplitEditor;