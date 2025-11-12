import React from 'react';
import ChestIcon from './icons/ChestIcon';
import BackIcon from './icons/BackIcon';
import LegsIcon from './icons/LegsIcon';
import ShouldersIcon from './icons/ShouldersIcon';
import ArmIcon from './icons/ArmIcon';
import CoreIcon from './icons/CoreIcon';
import FullBodyIcon from './icons/FullBodyIcon';
import WarmupIcon from './icons/WarmupIcon';
import RunningIcon from './icons/RunningIcon';
import YogaIcon from './icons/YogaIcon';

interface GetBodyPartIconProps {
    bodyPart: string;
    className?: string;
}

const GetBodyPartIcon: React.FC<GetBodyPartIconProps> = ({ bodyPart, className }) => {
    switch (bodyPart) {
        case 'Warm-up':
            return <WarmupIcon className={className} />;
        case 'Chest':
            return <ChestIcon className={className} />;
        case 'Back':
            return <BackIcon className={className} />;
        case 'Legs':
            return <LegsIcon className={className} />;
        case 'Shoulders':
            return <ShouldersIcon className={className} />;
        case 'Arms':
        case 'Biceps':
        case 'Triceps':
            return <ArmIcon className={className} />;
        case 'Core':
            return <CoreIcon className={className} />;
        case 'Running':
            return <RunningIcon className={className} />;
        case 'Cool-down':
            return <YogaIcon className={className} />;
        case 'Full Body':
        default:
            return <FullBodyIcon className={className} />;
    }
};

export default GetBodyPartIcon;
