import React, { useState, useMemo, useCallback } from 'react';
import { WorkoutSession, Exercise } from '../types';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { analyzeProgress } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

interface ProgressTrackerProps {
    workouts: Record<string, WorkoutSession>;
}

type ChartData = {
    date: string;
    maxWeight: number;
    totalVolume: number;
    maxReps: number;
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ workouts }) => {
    const [selectedExercise, setSelectedExercise] = useState<string>('');
    const [aiFeedback, setAiFeedback] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { uniqueExercises, overallStats, personalRecords, bodyPartData } = useMemo(() => {
        const exerciseSet = new Set<string>();
        let totalWorkouts = 0;
        let totalVolume = 0;
        let totalSets = 0;
        let totalReps = 0;
        const prs: Record<string, { maxWeight: number; date: string }> = {};
        const bodyPartCounts: Record<string, number> = {};

        const allSessions = Object.values(workouts);
        totalWorkouts = allSessions.length;

        allSessions.forEach((session: WorkoutSession) => {
            session.exercises.forEach((ex: Exercise) => {
                if (!ex.name) return;
                exerciseSet.add(ex.name);

                if (ex.bodyPart) {
                    bodyPartCounts[ex.bodyPart] = (bodyPartCounts[ex.bodyPart] || 0) + 1;
                }

                totalSets += ex.sets.length;
                ex.sets.forEach(set => {
                    totalVolume += (set.reps || 0) * (set.weight || 0);
                    totalReps += (set.reps || 0);
                    
                    if ((set.weight || 0) > (prs[ex.name]?.maxWeight || 0)) {
                        prs[ex.name] = { maxWeight: set.weight, date: session.date };
                    }
                });
            });
        });

        const sortedPRs = Object.entries(prs)
            .map(([exerciseName, data]) => ({ exerciseName, ...data }))
            .sort((a, b) => b.maxWeight - a.maxWeight);

        const bodyPartChartData = Object.entries(bodyPartCounts).map(([name, value]) => ({ name, value }));
        
        return {
            uniqueExercises: Array.from(exerciseSet).sort(),
            overallStats: { totalWorkouts, totalVolume, totalSets, totalReps },
            personalRecords: sortedPRs,
            bodyPartData: bodyPartChartData,
        };
    }, [workouts]);

    const chartData = useMemo<ChartData[]>(() => {
        if (!selectedExercise) return [];

        return Object.values(workouts)
            .filter((session: WorkoutSession) => session.exercises.some(ex => ex.name === selectedExercise))
            .map((session: WorkoutSession) => {
                const exercise = session.exercises.find(ex => ex.name === selectedExercise);
                if (!exercise) return null;

                const maxWeight = Math.max(...exercise.sets.map(s => s.weight), 0);
                const totalVolume = exercise.sets.reduce((sum, s) => sum + s.reps * s.weight, 0);
                const maxReps = Math.max(...exercise.sets.map(s => s.reps), 0);
                
                return { date: session.date, maxWeight, totalVolume, maxReps };
            })
            .filter((item): item is ChartData => item !== null)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [workouts, selectedExercise]);
    
    const handleGetAIFeedback = useCallback(async () => {
        if (!selectedExercise || chartData.length < 2) {
            alert("Please select an exercise with at least two data points to get feedback.");
            return;
        }
        setIsLoading(true);
        setAiFeedback('');
        try {
            const feedback = await analyzeProgress(selectedExercise, chartData);
            setAiFeedback(feedback);
        } catch (error) {
            console.error("Error getting AI feedback:", error);
            setAiFeedback("Sorry, I couldn't get feedback at this time. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, [selectedExercise, chartData]);

    const COLORS = ['#dc2626', '#3b82f6', '#b91c1c', '#2563eb', '#991b1b', '#1d4ed8'];

    const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800 text-center">
            <h4 className="text-sm font-medium text-gray-400">{title}</h4>
            <p className="text-xl sm:text-2xl font-bold text-red-500">{value.toLocaleString()}</p>
        </div>
    );

    return (
        <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-red-500">Progress Dashboard</h2>
            
            {/* Overall Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Workouts" value={overallStats.totalWorkouts} />
                <StatCard title="Total Volume (kg)" value={overallStats.totalVolume} />
                <StatCard title="Total Sets" value={overallStats.totalSets} />
                <StatCard title="Total Reps" value={overallStats.totalReps} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Personal Records */}
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-100">Personal Records (PRs)</h3>
                    {personalRecords.length > 0 ? (
                        <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
                            {personalRecords.map(pr => (
                                <li key={pr.exerciseName} className="flex justify-between items-center bg-gray-800 p-2 rounded-md text-sm sm:text-base">
                                    <span className="font-medium text-gray-300 truncate pr-2">{pr.exerciseName}</span>
                                    <span className="font-bold text-red-400 flex-shrink-0">{pr.maxWeight} kg</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">Log some workouts to see your PRs here!</p>
                    )}
                </div>

                {/* Body Part Distribution */}
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800">
                     <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-100">Body Part Split</h3>
                     {bodyPartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={bodyPartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {bodyPartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-400 flex items-center justify-center h-full">No workout data for chart.</p>
                    )}
                </div>
            </div>

            {/* Exercise-specific progress */}
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-100">Track Specific Exercise</h3>
                <select
                    id="exercise-select"
                    value={selectedExercise}
                    onChange={(e) => {
                        setSelectedExercise(e.target.value);
                        setAiFeedback('');
                    }}
                    className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                    <option value="">-- Choose an exercise --</option>
                    {uniqueExercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                </select>
            

                {selectedExercise && chartData.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4 text-center">{selectedExercise} Progress</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                <YAxis yAxisId="left" stroke="#dc2626" tick={{ fontSize: 10 }} label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', fill: '#dc2626' }} />
                                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" tick={{ fontSize: 10 }} label={{ value: 'Reps', angle: 90, position: 'insideRight', fill: '#3b82f6' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="maxWeight" name="Max Weight (kg)" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
                                <Line yAxisId="right" type="monotone" dataKey="maxReps" name="Max Reps" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
                            </LineChart>
                        </ResponsiveContainer>

                        <div className="mt-6">
                            <button 
                                onClick={handleGetAIFeedback}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-2 px-4 bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white font-bold rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SparklesIcon className="mr-2" />
                                {isLoading ? 'Analyzing...' : 'Get AI Feedback'}
                            </button>
                        </div>

                        {aiFeedback && (
                            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                <h4 className="font-bold text-lg text-red-400 mb-2">AI Analysis:</h4>
                                <p className="text-gray-300 whitespace-pre-wrap">{aiFeedback}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressTracker;