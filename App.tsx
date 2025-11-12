import React, { useState, useEffect, useCallback } from 'react';
import { WorkoutSession, View, Exercise, WorkoutPlan, WorkoutSplit } from './types';
import Header from './components/Header';
import WorkoutLogger from './components/WorkoutLogger';
import CalendarView from './components/CalendarView';
import ProgressTracker from './components/ProgressTracker';
import WorkoutIcon from './components/icons/WorkoutIcon';
import HistoryIcon from './components/icons/HistoryIcon';
import ProgressIcon from './components/icons/ProgressIcon';
import BodyPartSelector from './components/BodyPartSelector';
import ExerciseSelector from './components/ExerciseSelector';
import PlanConfirmation from './components/PlanConfirmation';
import SplitEditor from './components/SplitEditor';
import { bodyParts } from './data/predefinedExercises';


type LoggerStep = 'bodyPart' | 'planConfirmation' | 'exerciseSelection' | 'logging';

const MemoizedCalendarView = React.memo(CalendarView);
const MemoizedProgressTracker = React.memo(ProgressTracker);

const App: React.FC = () => {
    const [workouts, setWorkouts] = useState<Record<string, WorkoutSession>>({});
    const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
    const [workoutPlans, setWorkoutPlans] = useState<Record<string, WorkoutPlan>>({});
    const [workoutSplit, setWorkoutSplit] = useState<WorkoutSplit>({});
    const [currentView, setCurrentView] = useState<View>('logger');
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isSplitEditorOpen, setIsSplitEditorOpen] = useState(false);

    // State for the new workout flow
    const [loggerStep, setLoggerStep] = useState<LoggerStep>('bodyPart');
    const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[]>([]);
    const [loadedFromSplit, setLoadedFromSplit] = useState(false);

    // Load all data from localStorage on initial render
    useEffect(() => {
        try {
            const savedWorkouts = localStorage.getItem('trackMeWorkouts');
            if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts));

            const savedCustomExercises = localStorage.getItem('trackMeCustomExercises');
            if (savedCustomExercises) setCustomExercises(JSON.parse(savedCustomExercises));

            const savedWorkoutPlans = localStorage.getItem('trackMeWorkoutPlans');
            if (savedWorkoutPlans) setWorkoutPlans(JSON.parse(savedWorkoutPlans));
            
            const savedWorkoutSplit = localStorage.getItem('trackMeWorkoutSplit');
            if (savedWorkoutSplit) setWorkoutSplit(JSON.parse(savedWorkoutSplit));

        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => { localStorage.setItem('trackMeWorkouts', JSON.stringify(workouts)); }, [workouts]);
    useEffect(() => { localStorage.setItem('trackMeCustomExercises', JSON.stringify(customExercises)); }, [customExercises]);
    useEffect(() => { localStorage.setItem('trackMeWorkoutPlans', JSON.stringify(workoutPlans)); }, [workoutPlans]);
    useEffect(() => { localStorage.setItem('trackMeWorkoutSplit', JSON.stringify(workoutSplit)); }, [workoutSplit]);

    // Auto-load workout based on today's split
    useEffect(() => {
        // Only run on the logger screen, for today's date, if a workout isn't already loaded
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const dayOfWeek = today.toLocaleString('en-US', { weekday: 'long' });
        
        if (currentView === 'logger' && selectedDate === todayString && !workouts[todayString] && loggerStep === 'bodyPart' && !loadedFromSplit) {
            const todaysBodyParts = workoutSplit[dayOfWeek];

            if (Array.isArray(todaysBodyParts) && todaysBodyParts.length > 0) {
                const plansToUse = Object.values(workoutPlans).filter(p => todaysBodyParts.includes(p.bodyPart));
                
                if (plansToUse.length > 0) {
                    const combinedExercisesSet = new Set<string>();
                    const combinedExercises: Exercise[] = [];

                    plansToUse.forEach(plan => {
                        plan.exercises.forEach(exTemplate => {
                            if (!combinedExercisesSet.has(exTemplate.name)) {
                                combinedExercisesSet.add(exTemplate.name);
                                combinedExercises.push({
                                    ...exTemplate,
                                    id: `${exTemplate.name}-${Date.now()}`,
                                    sets: [{ id: `set-${Date.now()}`, reps: 0, weight: 0 }]
                                });
                            }
                        });
                    });

                    setSelectedBodyPart(todaysBodyParts.join(' & '));
                    setCurrentWorkout(combinedExercises);
                    setLoggerStep('logging');
                    setLoadedFromSplit(true); // Flag that we auto-loaded
                }
            }
        }
    }, [currentView, selectedDate, workouts, workoutSplit, workoutPlans, loggerStep, loadedFromSplit]);

    
    // Reset logger flow when date changes
    useEffect(() => {
        const existingWorkout = workouts[selectedDate];
        if (existingWorkout && existingWorkout.exercises.length > 0) {
            setCurrentWorkout(existingWorkout.exercises);
            if (!selectedBodyPart && existingWorkout.exercises[0]) {
                 // Try to reconstruct the combined body part name if it was a split workout
                const uniqueBodyParts = [...new Set(existingWorkout.exercises.map(ex => ex.bodyPart))];
                setSelectedBodyPart(uniqueBodyParts.join(' & '));
            }
            setLoggerStep('logging');
        } else {
            handleResetWorkout();
        }
    }, [selectedDate, workouts]);


    const handleSaveWorkout = useCallback((workoutExercises: Exercise[]) => {
        if (workoutExercises.length === 0) return;
        const workout: WorkoutSession = {
            date: selectedDate,
            exercises: workoutExercises
        };
        setWorkouts(prevWorkouts => ({
            ...prevWorkouts,
            [selectedDate]: workout
        }));
    }, [selectedDate]);

    const handleDateSelect = useCallback((date: string) => {
        setSelectedDate(date);
        setCurrentView('logger');
    }, []);

    const handleBodyPartSelect = (bodyPart: string) => {
        setSelectedBodyPart(bodyPart);
        const relevantPlans = Object.values(workoutPlans).filter(plan => plan.bodyPart === bodyPart);
        if (relevantPlans.length > 0) {
            setLoggerStep('planConfirmation');
        } else {
            setLoggerStep('exerciseSelection');
        }
    };

    const handleUsePlan = (plan: WorkoutPlan) => {
        if (!selectedBodyPart) return;
        
        const planExercises = plan.exercises.map(ex => ({
            ...ex,
            id: `${ex.name}-${Date.now()}`,
            sets: [{ id: `set-${Date.now()}`, reps: 0, weight: 0 }]
        }));

        setCurrentWorkout(planExercises);
        setLoggerStep('logging');
    };

    const handleStartFresh = () => {
        setCurrentWorkout([]);
        setLoggerStep('exerciseSelection');
    };

    const handleExercisesSelected = (exercises: Exercise[]) => {
        setCurrentWorkout(exercises);
        setLoggerStep('logging');
    };

    const handleAddCustomExercise = (exercise: Exercise) => {
        setCustomExercises(prev => [...prev, exercise]);
    };

    const handleSavePlan = (planName: string, bodyPart: string, exercises: Exercise[]) => {
        const planTemplate = exercises.map(({ id, sets, ...rest }) => rest);
        const newPlan: WorkoutPlan = {
            id: `plan-${Date.now()}`,
            name: planName,
            bodyPart: bodyPart,
            exercises: planTemplate
        };
        setWorkoutPlans(prev => ({
            ...prev,
            [newPlan.id]: newPlan
        }));
        alert(`Plan "${planName}" saved!`);
    };

    const handleSaveSplit = (split: WorkoutSplit) => {
        setWorkoutSplit(split);
        setIsSplitEditorOpen(false);
        alert('Weekly split saved!');
    };

    const handleBackToExerciseSelection = () => {
        setLoggerStep('exerciseSelection');
    };
    
    const handleResetWorkout = useCallback(() => {
        setCurrentWorkout([]);
        setSelectedBodyPart(null);
        setLoggerStep('bodyPart');
        setLoadedFromSplit(false);
    }, []);

    const renderView = () => {
        switch (currentView) {
            case 'calendar':
                return <MemoizedCalendarView workouts={workouts} onDateSelect={handleDateSelect} />;
            case 'progress':
                return <MemoizedProgressTracker workouts={workouts} />;
            case 'logger':
            default:
                switch (loggerStep) {
                    case 'bodyPart':
                        return <BodyPartSelector onSelectBodyPart={handleBodyPartSelect} onOpenSplitEditor={() => setIsSplitEditorOpen(true)} />;
                    case 'planConfirmation':
                         return (
                            <PlanConfirmation
                                bodyPart={selectedBodyPart!}
                                plans={Object.values(workoutPlans).filter(p => p.bodyPart === selectedBodyPart)}
                                onUsePlan={handleUsePlan}
                                onStartFresh={handleStartFresh}
                                onBack={() => setLoggerStep('bodyPart')}
                            />
                        );
                    case 'exerciseSelection':
                        return (
                            <ExerciseSelector
                                bodyPart={selectedBodyPart!}
                                customExercises={customExercises}
                                onExercisesSelected={handleExercisesSelected}
                                onAddCustomExercise={handleAddCustomExercise}
                                onBack={() => setLoggerStep('bodyPart')}
                                existingWorkout={currentWorkout}
                            />
                        );
                    case 'logging':
                        return (
                            <WorkoutLogger 
                                selectedDate={selectedDate} 
                                initialExercises={currentWorkout}
                                onSaveWorkout={handleSaveWorkout}
                                onBackToSelection={handleBackToExerciseSelection}
                                onResetWorkout={handleResetWorkout}
                                allWorkouts={workouts}
                                selectedBodyPart={selectedBodyPart}
                                onSaveAsPlan={handleSavePlan}
                            />
                        );
                    default:
                        return <BodyPartSelector onSelectBodyPart={handleBodyPartSelect} onOpenSplitEditor={() => setIsSplitEditorOpen(true)} />;
                }
        }
    };

    const NavButton: React.FC<{ view: View; label: string; icon: React.ReactNode }> = ({ view, label, icon }) => (
        <button
            onClick={() => {
                if (view === 'logger' && currentView !== 'logger') {
                    const todayString = new Date().toISOString().split('T')[0];
                    if(selectedDate !== todayString) {
                       setSelectedDate(todayString);
                    } else {
                       const existingWorkout = workouts[selectedDate];
                        if (!existingWorkout) {
                           handleResetWorkout();
                        }
                    }
                }
                setCurrentView(view);
            }}
            className={`flex flex-col items-center justify-center w-full py-2 px-1 transition-colors duration-200 ${currentView === view ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
        >
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6 pb-24">
                 {isSplitEditorOpen && (
                    <SplitEditor
                        currentSplit={workoutSplit}
                        bodyParts={bodyParts}
                        onSave={handleSaveSplit}
                        onClose={() => setIsSplitEditorOpen(false)}
                    />
                )}
                {renderView()}
            </main>
            <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 shadow-lg z-10">
                <div className="flex justify-around max-w-lg mx-auto">
                    <NavButton view="logger" label="Workout" icon={<WorkoutIcon />} />
                    <NavButton view="calendar" label="History" icon={<HistoryIcon />} />
                    <NavButton view="progress" label="Progress" icon={<ProgressIcon />} />
                </div>
            </nav>
        </div>
    );
};

export default App;