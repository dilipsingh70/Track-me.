import React, { useState, useMemo } from 'react';
import { Exercise, PredefinedExercise } from '../types';
import { exercisesByBodyPart } from '../data/predefinedExercises';
import AddCustomExerciseModal from './AddCustomExerciseModal';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface ExerciseSelectorProps {
    bodyPart: string;
    customExercises: Exercise[];
    onExercisesSelected: (exercises: Exercise[]) => void;
    onAddCustomExercise: (exercise: Exercise) => void;
    onBack: () => void;
    existingWorkout: Exercise[];
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ bodyPart, customExercises, onExercisesSelected, onAddCustomExercise, onBack, existingWorkout }) => {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(existingWorkout);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const availableExercises = useMemo(() => {
        const predefined = exercisesByBodyPart[bodyPart] || [];
        const custom = customExercises.filter(ex => ex.bodyPart === bodyPart);
        const all = [...predefined, ...custom].filter(ex => 
            ex.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const unique = all.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i);
        return unique;
    }, [bodyPart, customExercises, searchTerm]);

    const handleAddExercise = (exercise: PredefinedExercise | Exercise) => {
        if (selectedExercises.some(e => e.name === exercise.name)) return;
        
        const newExercise: Exercise = {
            id: `${exercise.name}-${Date.now()}`,
            name: exercise.name,
            bodyPart: bodyPart,
            imageUrl: exercise.imageUrl,
            isCustom: 'isCustom' in exercise ? exercise.isCustom : false,
            sets: [{ id: `set-${Date.now()}`, reps: 0, weight: 0 }]
        };
        setSelectedExercises(prev => [...prev, newExercise]);
    };

    const handleRemoveExercise = (exerciseId: string) => {
        setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    };

    const handleConfirm = () => {
        if(selectedExercises.length > 0) {
            onExercisesSelected(selectedExercises);
        } else {
            alert("Please select at least one exercise.");
        }
    };
    
    const handleSaveCustomExercise = (exercise: Exercise) => {
        onAddCustomExercise(exercise);
        handleAddExercise(exercise);
        setIsModalOpen(false);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <button onClick={onBack} className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg">&larr; Back</button>
                <h2 className="text-xl font-bold text-red-500">{bodyPart} Day</h2>
                <div/>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800 space-y-4">
                <h3 className="font-semibold text-lg">Selected Exercises ({selectedExercises.length})</h3>
                {selectedExercises.length > 0 ? (
                    <div className="space-y-2">
                        {selectedExercises.map(ex => (
                            <div key={ex.id} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
                                <span className="text-gray-200">{ex.name}</span>
                                <button onClick={() => handleRemoveExercise(ex.id)} className="text-red-500 hover:text-red-400">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-gray-400 text-sm">Add exercises from the list below.</p>}
                
                <button onClick={handleConfirm} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                    Start Logging &rarr;
                </button>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800 space-y-4">
                 <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                     {availableExercises.map(ex => (
                         <div key={ex.name} className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                            <div className="flex items-center min-w-0">
                                <img src={ex.imageUrl} alt={ex.name} className="w-12 h-12 rounded object-cover mr-3 flex-shrink-0"/>
                                <span className="truncate">{ex.name}</span>
                            </div>
                            <button onClick={() => handleAddExercise(ex)} className="p-1.5 bg-gray-700 hover:bg-red-600 rounded-full text-white transition-colors flex-shrink-0 ml-2">
                                <PlusIcon className="w-5 h-5"/>
                            </button>
                         </div>
                     ))}
                </div>
                 <button onClick={() => setIsModalOpen(true)} className="w-full mt-2 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors">
                    Add Custom Exercise
                </button>
            </div>
            
            {isModalOpen && (
                <AddCustomExerciseModal 
                    bodyPart={bodyPart}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveCustomExercise}
                />
            )}
        </div>
    );
};

export default ExerciseSelector;