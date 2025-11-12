import React, { useState, useRef } from 'react';
import { Exercise } from '../types';
import { bodyParts } from '../data/predefinedExercises';
import { fileToBase64 } from '../utils/imageUtils';
import PhotoIcon from './icons/PhotoIcon';

interface AddCustomExerciseModalProps {
    bodyPart: string;
    onClose: () => void;
    onSave: (exercise: Exercise) => void;
}

const AddCustomExerciseModal: React.FC<AddCustomExerciseModalProps> = ({ bodyPart: initialBodyPart, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [bodyPart, setBodyPart] = useState(initialBodyPart);
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setImage(base64);
            } catch (error) {
                console.error("Error converting file to base64", error);
                alert("Could not load image. Please try another file.");
            }
        }
    };

    const handleSave = () => {
        if (!name.trim() || !bodyPart) {
            alert('Please fill in the exercise name and select a body part.');
            return;
        }
        const newExercise: Exercise = {
            id: `custom-${name.replace(/\s+/g, '-')}-${Date.now()}`,
            name: name.trim(),
            bodyPart,
            imageUrl: image || undefined,
            isCustom: true,
            sets: [{ id: `set-${Date.now()}`, reps: 0, weight: 0 }]
        };
        onSave(newExercise);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-red-500">Add Custom Exercise</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Exercise Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Body Part</label>
                        <select value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none">
                            {bodyParts.map(bp => <option key={bp} value={bp}>{bp}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Image (Optional)</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden"/>
                        <button onClick={() => fileInputRef.current?.click()} className="w-full p-4 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center hover:border-red-500">
                            {image ? (
                                <img src={image} alt="Preview" className="w-24 h-24 rounded-md object-cover"/>
                            ) : (
                                <>
                                    <PhotoIcon className="w-10 h-10 text-gray-400 mb-2"/>
                                    <span className="text-gray-400">Click to upload</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">Save Exercise</button>
                </div>
            </div>
        </div>
    );
};

export default AddCustomExerciseModal;