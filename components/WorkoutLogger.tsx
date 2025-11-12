import React, { useState, useEffect } from 'react';
import { Exercise, SetEntry, WorkoutSession } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface WorkoutLoggerProps {
    selectedDate: string;
    initialExercises: Exercise[];
    onSaveWorkout: (workout: Exercise[]) => void;
    onBackToSelection: () => void;
    onResetWorkout: () => void;
    allWorkouts: Record<string, WorkoutSession>;
    selectedBodyPart: string | null;
    onSaveAsPlan: (planName: string, bodyPart: string, exercises: Exercise[]) => void;
}

const findLastPerformance = (exerciseName: string, allWorkouts: Record<string, WorkoutSession>, currentDate: string): SetEntry[] | null => {
    const sortedDates = Object.keys(allWorkouts)
        .filter(date => date < currentDate)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    for (const date of sortedDates) {
        const session = allWorkouts[date];
        const exercise = session.exercises.find(ex => ex.name === exerciseName);
        if (exercise && exercise.sets.length > 0 && exercise.sets.some(s => s.reps > 0 || s.weight > 0)) {
            return exercise.sets;
        }
    }
    return null;
};

// Memoized Exercise Card to prevent re-rendering when other exercises are updated
const ExerciseCard = React.memo(({ exercise, exIndex, lastPerformance, handleSetChange, handleRemoveSet, handleAddSet }: {
    exercise: Exercise;
    exIndex: number;
    lastPerformance: SetEntry[] | null;
    handleSetChange: (exIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => void;
    handleRemoveSet: (exIndex: number, setIndex: number) => void;
    handleAddSet: (exIndex: number) => void;
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const LastPerformanceDisplay: React.FC<{ sets: SetEntry[] | null }> = ({ sets }) => {
        if (!sets) return null;
        const performanceString = sets.map(set => `${set.weight}kg x ${set.reps}`).join(' | ');
        return (
            <p className="text-xs text-gray-400 mt-1 truncate">
                <span className="font-semibold">Last:</span> {performanceString}
            </p>
        );
    };

    return (
         <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center p-4 text-left">
                {exercise.imageUrl && <img src={exercise.imageUrl} alt={exercise.name} className="w-16 h-16 rounded-md object-cover mr-4"/>}
                <div className="flex-grow overflow-hidden">
                    <h3 className="text-lg font-bold text-red-400">{exercise.name}</h3>
                    <p className="text-sm text-gray-400">{exercise.bodyPart}</p>
                    <LastPerformanceDisplay sets={lastPerformance} />
                </div>
                 <svg className={`w-6 h-6 transform transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="p-4 pt-0 space-y-3">
                    {exercise.sets.map((set, setIndex) => (
                        <div key={set.id} className="flex items-center justify-between space-x-2 bg-gray-800 p-2 rounded-md">
                            <span className="font-bold text-gray-300 w-12 text-sm sm:text-base">Set {setIndex + 1}</span>
                            <div className="flex items-center space-x-2">
                                <input type="number" placeholder="Reps" value={set.reps || ''} onChange={(e) => handleSetChange(exIndex, setIndex, 'reps', parseInt(e.target.value) || 0)} className="w-16 sm:w-20 bg-gray-700 p-1 rounded-md text-center focus:ring-1 focus:ring-red-500 focus:outline-none" />
                                <span className="text-gray-400 text-sm">reps</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                 <input type="number" placeholder="Weight" value={set.weight || ''} onChange={(e) => handleSetChange(exIndex, setIndex, 'weight', parseInt(e.target.value) || 0)} className="w-16 sm:w-20 bg-gray-700 p-1 rounded-md text-center focus:ring-1 focus:ring-red-500 focus:outline-none" />
                                <span className="text-gray-400 text-sm">kg</span>
                            </div>
                            <button onClick={() => handleRemoveSet(exIndex, setIndex)} className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                     <button onClick={() => handleAddSet(exIndex)} className="w-full flex items-center justify-center py-1.5 px-4 bg-gray-700 hover:bg-gray-600 text-red-400 rounded-md transition-colors duration-200 text-sm font-semibold">
                        <PlusIcon className="w-5 h-5 mr-1" /> Add Set
                    </button>
                </div>
            )}
        </div>
    );
});


const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ selectedDate, initialExercises, onSaveWorkout, onBackToSelection, onResetWorkout, allWorkouts, selectedBodyPart, onSaveAsPlan }) => {
    const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
    const [isSaved, setIsSaved] = useState(false);
    
    const isMultiPartWorkout = selectedBodyPart?.includes(' & ') ?? false;

    useEffect(() => {
        setExercises(JSON.parse(JSON.stringify(initialExercises)));
        setIsSaved(Object.values(allWorkouts).some((w: WorkoutSession) => w.date === selectedDate));
    }, [initialExercises, selectedDate, allWorkouts]);

    const handleAddSet = (exIndex: number) => {
        const updatedExercises = [...exercises];
        updatedExercises[exIndex].sets.push({ id: `set-${Date.now()}`, reps: 0, weight: 0 });
        setExercises(updatedExercises);
        setIsSaved(false);
    };

    const handleSetChange = (exIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
        const updatedExercises = [...exercises];
        updatedExercises[exIndex].sets[setIndex][field] = value;
        setExercises(updatedExercises);
        setIsSaved(false);
    };

    const handleRemoveSet = (exIndex: number, setIndex: number) => {
        const updatedExercises = [...exercises];
        updatedExercises[exIndex].sets = updatedExercises[exIndex].sets.filter((_, index) => index !== setIndex);
        setExercises(updatedExercises);
        setIsSaved(false);
    };

    const handleSave = () => {
        if (exercises.length > 0) {
            onSaveWorkout(exercises);
            setIsSaved(true);
            alert('Workout saved successfully!');
        } else {
            alert('Please add at least one exercise.');
        }
    };
    
    const handleSavePlanClick = () => {
        if (selectedBodyPart && exercises.length > 0 && !isMultiPartWorkout) {
             const planName = prompt(`Enter a name for your new ${selectedBodyPart} plan:`, `${selectedBodyPart} Routine`);
            if (planName) {
                onSaveAsPlan(planName, selectedBodyPart, exercises);
            }
        } else {
            alert('Cannot save an empty or combined workout as a plan.');
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 tracking-wide">{selectedBodyPart || 'Log Your Workout'}</h2>
                <p className="text-gray-400">{new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <button onClick={onBackToSelection} className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg shadow-md transition-colors duration-200">
                    &larr; Add / Remove Exercises
            </button>

            {exercises.map((exercise, exIndex) => {
                const lastPerformance = findLastPerformance(exercise.name, allWorkouts, selectedDate);
                return <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise} 
                    exIndex={exIndex} 
                    lastPerformance={lastPerformance}
                    handleAddSet={handleAddSet}
                    handleRemoveSet={handleRemoveSet}
                    handleSetChange={handleSetChange}
                 />;
            })}
            
            {exercises.length > 0 && (
                <div className="space-y-3">
                    <button onClick={handleSave} className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105 ${isSaved ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={isSaved}>
                        {isSaved ? 'Workout Saved' : 'Save Workout'}
                    </button>
                    {selectedBodyPart && (
                        <div title={isMultiPartWorkout ? "Cannot save combined workouts as a single plan." : ""}>
                            <button
                                onClick={handleSavePlanClick}
                                disabled={isMultiPartWorkout}
                                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                Save as Plan
                            </button>
                        </div>
                    )}
                </div>
            )}
            <button onClick={onResetWorkout} className="w-full py-2 px-4 text-sm text-red-500 hover:bg-red-900/50 hover:text-red-400 rounded-lg transition-colors duration-200">
                Start a Different Workout
            </button>
        </div>
    );
};

export default WorkoutLogger;