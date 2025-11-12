import React, { useState } from 'react';
import { WorkoutSession } from '../types';
import WorkoutDetails from './WorkoutDetails';

interface CalendarViewProps {
    workouts: Record<string, WorkoutSession>;
    onDateSelect: (date: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ workouts, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalDate, setModalDate] = useState<string | null>(null);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const days = Array.from({ length: startDay }, (_, i) => <div key={`empty-${i}`} className="p-1"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateString = date.toISOString().split('T')[0];
        const hasWorkout = !!workouts[dateString];
        const isToday = new Date().toISOString().split('T')[0] === dateString;

        days.push(
            <div
                key={day}
                className={`flex items-center justify-center p-2 sm:p-3 md:h-16 rounded-lg cursor-pointer transition-transform duration-200 transform hover:scale-105 
                    ${isToday ? 'bg-red-600 text-white font-bold ring-2 ring-red-400' : 'bg-gray-800'} 
                    ${hasWorkout ? 'border-2 border-red-500' : 'border border-gray-700'}
                    ${!hasWorkout && !isToday ? 'hover:bg-gray-700' : ''}
                `}
                onClick={() => hasWorkout ? setModalDate(dateString) : onDateSelect(dateString)}
            >
                {day}
            </div>
        );
    }

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };
    
    return (
        <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-red-500">Workout History</h2>
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200">&lt;</button>
                    <h3 className="text-lg font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                    <button onClick={() => changeMonth(1)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-bold text-gray-400 text-xs sm:text-sm">{day}</div>)}
                    {days}
                </div>
            </div>

            {modalDate && workouts[modalDate] && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-red-500">Workout Details</h3>
                             <button onClick={() => setModalDate(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                        </div>
                        <WorkoutDetails workout={workouts[modalDate]} />
                         <button onClick={() => { onDateSelect(modalDate); setModalDate(null); }} className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200">
                            View/Edit in Logger
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;