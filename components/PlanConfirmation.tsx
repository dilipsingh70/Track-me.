import React from 'react';
import { WorkoutPlan } from '../types';
import WorkoutIcon from './icons/WorkoutIcon';

interface PlanConfirmationProps {
    bodyPart: string;
    plans: WorkoutPlan[];
    onUsePlan: (plan: WorkoutPlan) => void;
    onStartFresh: () => void;
    onBack: () => void;
}

const PlanConfirmation: React.FC<PlanConfirmationProps> = ({ bodyPart, plans, onUsePlan, onStartFresh, onBack }) => {
    // If there's only one plan, show the simple confirmation
    if (plans.length === 1) {
        const plan = plans[0];
        return (
             <div className="space-y-6 text-center">
                <button onClick={onBack} className="absolute top-20 left-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">&larr; Back</button>
                <h2 className="text-2xl font-bold text-red-500">You have a plan for {bodyPart}!</h2>
                <p className="text-gray-400">Use your "{plan.name}" plan or start a new workout?</p>

                <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800 text-left max-w-md mx-auto">
                    <h3 className="font-semibold text-lg mb-3 text-red-400">Plan includes:</h3>
                    <ul className="space-y-2">
                        {plan.exercises.map((ex, index) => (
                            <li key={index} className="flex items-center bg-gray-800 p-2 rounded-md">
                                <WorkoutIcon className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                <span>{ex.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        onClick={() => onUsePlan(plan)}
                        className="w-full md:w-auto flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors"
                    >
                        Use This Plan
                    </button>
                    <button
                        onClick={onStartFresh}
                        className="w-full md:w-auto flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg shadow-md transition-colors"
                    >
                        Start New Workout
                    </button>
                </div>
            </div>
        );
    }
    
    // If there are multiple plans, show a list to choose from
    return (
         <div className="space-y-6">
            <button onClick={onBack} className="absolute top-20 left-4 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">&larr; Back</button>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-500">Choose a {bodyPart} Plan</h2>
                <p className="text-gray-400">You have multiple plans for this body part. Select one to start.</p>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
                {plans.map(plan => (
                    <button 
                        key={plan.id}
                        onClick={() => onUsePlan(plan)}
                        className="w-full p-4 bg-gray-800 rounded-lg text-left hover:bg-gray-700 border border-gray-700 hover:border-red-500 transition-colors"
                    >
                        <h3 className="font-bold text-lg text-red-400">{plan.name}</h3>
                        <p className="text-sm text-gray-400">{plan.exercises.length} exercises</p>
                    </button>
                ))}
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={onStartFresh}
                    className="py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg shadow-md transition-colors"
                >
                    ... or Start a Fresh Workout
                </button>
            </div>
        </div>
    );
};

export default PlanConfirmation;