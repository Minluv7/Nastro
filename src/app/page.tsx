"use client";
import { useState } from 'react';
import PlanetResults from '@/components/planetResults'; 
import Popup from '@/components/popup';
import HouseResults from '@/components/houseResults';
import { Environment, OrbitControls } from '@react-three/drei';
import { Moon } from '@/components/moon';
import { Canvas } from '@react-three/fiber';

export default function Home() {
    const [fullName, setFullName] = useState<string | null>(null);
    const [placeName, setPlaceName] = useState<string | null>(null);
    const [birthday, setBirthday] = useState<string | null>(null);
    const [timeOfBirth, setTimeOfBirth] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [formData, setFormData] = useState<any | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [loading, setLoading] = useState(true); // Nieuw: loading state

    const handleMoonLoad = () => {
        setLoading(false); // Stel loading in op false als de maan geladen is
    };

    const geocodePlaceName = async (placeName: string) => {
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
        } else {
            throw new Error('No results found for this place name');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const fullName = e.currentTarget.fullName.value;
        const placeName = e.currentTarget.placeName.value;
        const birthday = e.currentTarget.birthday.value;
        const timeOfBirth = e.currentTarget.timeofbirth.value;

        try {
            const location = await geocodePlaceName(placeName);
            const formData = {
                fullName,
                lat: location.lat,
                lon: location.lon,
                birthday,
                timeOfBirth,
            };

            setFullName(formData.fullName);
            setPlaceName(placeName);
            setBirthday(birthday);
            setTimeOfBirth(timeOfBirth);
            setFormData(formData);
            setIsPopupOpen(true); // Open the popup with results

        } catch (error) {
            console.error('Error fetching horoscope:', error);
        }
    };


    
    return (
    <div> 
        <h1 className="text-3xl uppercase font-bold mb-6">Calculate your horoscopes</h1>
        {loading && 
         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
         <p className="text-white text-xl">Loading...</p>
       </div>
        }
        <div className="flex flex-wrap justify-center items-center">
            <div className='w-100 my-8'>
            <Canvas>
                <Environment preset="sunset" />
                <OrbitControls
                    minDistance={150} // Zoom distances suitable for desktop
                    maxDistance={500}
                />
                <Moon onLoad={handleMoonLoad} />
            </Canvas>
            </div>
            <div className="w-full md:w-auto flex flex-wrap justify-center">
                <form 
                    className="bg-white p-6 md:p-14 w-[90%] md:w-[35rem] flex flex-col items-center rounded-[1rem] md:rounded-[1rem_10rem] transition-all duration-300"
                    onSubmit={handleSubmit}
                >
                    <label className="flex flex-col w-full text-gray-700 space-y-4">
                        <div className="flex flex-col">
                            <span>Your name:</span>
                            <input 
                                className="mt-2 p-3 rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition-all duration-300"
                                type="text" 
                                name="fullName" 
                                required 
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span>Birthplace:</span>
                            <input 
                                className="mt-2 p-3 rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition-all duration-300"
                                type="text" 
                                name="placeName" 
                                placeholder="Enter your birthplace" 
                                required
                            />
                        </div>
                            <div className="flex flex-col w-[100%] md:w-[40%]">
                                <span className="mb-2">Birthday</span>
                                <input 
                                    className="mt-2 p-3 border-b-2 border-gray-400 bg-transparent text-center text-xl focus:outline-none focus:border-blue-400 transition-all duration-300 placeholder-gray-500"
                                    type="date" 
                                    name="birthday"
                                    placeholder='DD/MM/YYYY'
                                    required
                                />
                            </div>
                            <div className='flex flex-col md:flex-row justify-between gap-4'>
                                <div className="flex flex-col w-full md:w-[40%]">
                                    <span className="mb-2">Time of birth</span>
                                    <input 
                                        className="mt-2 p-3 border-t-2 border-b-2 border-gray-400 bg-transparent text-center text-xl focus:outline-none focus:border-blue-400 transition-all duration-300"
                                        type="time" 
                                        name="timeofbirth" 
                                        required 
                                        placeholder='HH:MM'
                                    />
                                </div>
                                <button 
                                    className="mt-4 p-4 md:mt-8 w-full md:w-[40%] bg-gradient-to-r tracking-widest hover:from-black hover:to-black bg-background text-textColor uppercase rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
                                    type="submit"
                                >
                                    Calculate
                                </button>
                            </div>
                    </label>
                </form>
                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <h2 className='text-background text-2xl font-semibold'>Horoscope Results:</h2>
                    <p className='text-background'>{fullName}</p>
                    <p className='text-background'>{placeName}</p>
                    <p className='text-background'>{birthday} {timeOfBirth}</p>
                    {/* Container for planet and house results */}
                    <div className="flex flex-col md:flex-row">
                        <PlanetResults formData={formData} />
                        <HouseResults formData={formData} />
                    </div>
                </Popup>
            </div>
        </div>
    </div>
    );
    
}
