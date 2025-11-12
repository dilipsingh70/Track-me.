import { PredefinedExercise } from '../types';

export const bodyParts = ['Warm-up', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Running', 'Cool-down'];

const imageUrl = (keywords: string) => `https://source.unsplash.com/150x150/?${encodeURIComponent(keywords)}`;

export const exercisesByBodyPart: Record<string, PredefinedExercise[]> = {
    'Warm-up': [
        { name: 'Jumping Jacks', imageUrl: imageUrl('jumping jacks,fitness') },
        { name: 'Arm Circles', imageUrl: imageUrl('arm circles,warmup') },
        { name: 'Leg Swings', imageUrl: imageUrl('leg swings,stretching') },
        { name: 'High Knees', imageUrl: imageUrl('high knees,exercise') },
        { name: 'Butt Kicks', imageUrl: imageUrl('butt kicks,exercise') },
    ],
    'Chest': [
        { name: 'Bench Press', imageUrl: imageUrl('bench press,gym') },
        { name: 'Push-up', imageUrl: imageUrl('pushup,fitness') },
        { name: 'Dumbbell Flyes', imageUrl: imageUrl('dumbbell flyes,chest workout') },
        { name: 'Incline Dumbbell Press', imageUrl: imageUrl('incline dumbbell press,gym') },
        { name: 'Cable Crossover', imageUrl: imageUrl('cable crossover,gym') },
        { name: 'Dips (Chest Focus)', imageUrl: imageUrl('chest dips,bodyweight exercise') },
        { name: 'Machine Chest Press', imageUrl: imageUrl('chest press machine,gym') },
    ],
    'Back': [
        { name: 'Pull-up', imageUrl: imageUrl('pull-up,fitness') },
        { name: 'Deadlift', imageUrl: imageUrl('deadlift,powerlifting') },
        { name: 'Bent-over Row', imageUrl: imageUrl('barbell row,gym') },
        { name: 'Lat Pulldown', imageUrl: imageUrl('lat pulldown,gym machine') },
        { name: 'Seated Cable Row', imageUrl: imageUrl('cable row,gym') },
        { name: 'T-Bar Row', imageUrl: imageUrl('t-bar row,back workout') },
        { name: 'Good Mornings', imageUrl: imageUrl('good morning exercise,barbell') },
    ],
    'Legs': [
        { name: 'Squat', imageUrl: imageUrl('barbell squat,legs') },
        { name: 'Lunge', imageUrl: imageUrl('dumbbell lunge,legs') },
        { name: 'Leg Press', imageUrl: imageUrl('leg press,gym') },
        { name: 'Romanian Deadlift', imageUrl: imageUrl('romanian deadlift,hamstrings') },
        { name: 'Calf Raise', imageUrl: imageUrl('calf raise,gym') },
        { name: 'Hip Thrust', imageUrl: imageUrl('hip thrust,glutes') },
        { name: 'Goblet Squat', imageUrl: imageUrl('goblet squat,kettlebell') },
        { name: 'Leg Extension', imageUrl: imageUrl('leg extension machine,quads') },
        { name: 'Hamstring Curl', imageUrl: imageUrl('hamstring curl machine,legs') },
    ],
    'Shoulders': [
        { name: 'Overhead Press', imageUrl: imageUrl('overhead press,shoulders') },
        { name: 'Lateral Raise', imageUrl: imageUrl('lateral raise,dumbbell') },
        { name: 'Front Raise', imageUrl: imageUrl('front raise,shoulders') },
        { name: 'Face Pull', imageUrl: imageUrl('face pull,cable machine') },
        { name: 'Arnold Press', imageUrl: imageUrl('arnold press,dumbbell') },
        { name: 'Shrugs', imageUrl: imageUrl('dumbbell shrugs,traps') },
    ],
    'Arms': [
        { name: 'Bicep Curl', imageUrl: imageUrl('bicep curl,dumbbell') },
        { name: 'Hammer Curl', imageUrl: imageUrl('hammer curl,biceps') },
        { name: 'Chin-up', imageUrl: imageUrl('chin-up,bodyweight') },
        { name: 'Preacher Curl', imageUrl: imageUrl('preacher curl,gym') },
        { name: 'Tricep Dips', imageUrl: imageUrl('tricep dips,bodyweight') },
        { name: 'Tricep Pushdown', imageUrl: imageUrl('tricep pushdown,cable machine') },
        { name: 'Skull Crusher', imageUrl: imageUrl('skull crusher,triceps') },
        { name: 'Close Grip Bench Press', imageUrl: imageUrl('close grip bench press,triceps') },
    ],
    'Core': [
        { name: 'Plank', imageUrl: imageUrl('plank,core exercise') },
        { name: 'Crunches', imageUrl: imageUrl('crunches,abs') },
        { name: 'Leg Raises', imageUrl: imageUrl('leg raises,core') },
        { name: 'Russian Twist', imageUrl: imageUrl('russian twist,abs') },
        { name: 'Cable Crunches', imageUrl: imageUrl('cable crunch,gym') },
        { name: 'Hanging Knee Raises', imageUrl: imageUrl('hanging knee raises,abs') },
    ],
    'Running': [
        { name: 'Treadmill Run', imageUrl: imageUrl('treadmill,running') },
        { name: 'Outdoor Run', imageUrl: imageUrl('outdoor running,trail') },
        { name: 'Sprints', imageUrl: imageUrl('sprinting,track') },
    ],
    'Cool-down': [
        { name: 'Quad Stretch', imageUrl: imageUrl('quad stretch,stretching') },
        { name: 'Hamstring Stretch', imageUrl: imageUrl('hamstring stretch,flexibility') },
        { name: 'Cat-Cow Stretch', imageUrl: imageUrl('cat cow pose,yoga') },
        { name: 'Downward Dog', imageUrl: imageUrl('downward dog,yoga') },
        { name: 'Pigeon Pose', imageUrl: imageUrl('pigeon pose,yoga hip stretch') },
        { name: 'Child\'s Pose', imageUrl: imageUrl('childs pose,yoga') },
    ]
};