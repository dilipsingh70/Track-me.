import React from 'react';
import { WorkoutSession } from '../types';

interface WorkoutDetailsProps {
    workout: WorkoutSession;
}

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
    return (
        <div className="space-y-4">
            <p className="text-gray-400 text-center font-semibold">{new Date(workout.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            {workout.exercises.map((exercise, exIndex) => (
                <div key={exIndex} className="bg-gray-800 p-3 rounded-md flex items-start space-x-4">
                    {exercise.imageUrl && (
                        <img src={exercise.imageUrl} alt={exercise.name} className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
                    )}
                    <div className="flex-grow">
                        <h4 className="font-bold text-lg text-red-400">{exercise.name}</h4>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
                            {exercise.sets.map((set, setIndex) => (
                                <li key={setIndex}>
                                    <span className="font-semibold">{set.weight} kg</span> x <span className="font-semibold">{set.reps} reps</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkoutDetails;