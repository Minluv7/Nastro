// pages/Home.tsx
"use client";
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import HouseResults from '@/components/houseResults'; 
import PlanetResults from '@/components/planetResults'; 
import Popup from '@/components/popup'; // Vergeet niet de Popup te importeren

export default function Home() {
    const [fullName, setFullName] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [formData, setFormData] = useState<any | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Voor de popup

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
            throw new Error('Geen resultaten gevonden voor deze plaatsnaam');
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
            setFormData(formData);
            setIsPopupOpen(true); // Open de popup met de resultaten

        } catch (error) {
            console.error('Error fetching horoscope:', error);
        }
    };

    return (
        <div>
            <h1>What&apos;s your horoscope?</h1>
            <DotLottieReact
                src="https://lottie.host/25e4cfe2-7935-4ff5-b534-8e4106ba61a2/TWME2CFNAO.json"
                loop
                autoplay
            />
            <div>
                <form className="bg-[#EDEDED] h-[25rem] w-[39rem] flex flex-col justify-evenly items-center"
                    style={{ borderRadius: "1rem 10rem" }} onSubmit={handleSubmit}>
                    <label htmlFor='' className='flex flex-col'>
                        Your name:
                        <input type="text" name="fullName" required />

                        Birthplace:
                        <input type="text" name="placeName" placeholder='Birthplace' required />

                        Birthday and time:
                        <input type="date" name="birthday" required />
                        <input type="time" name="timeofbirth" required />
                    </label>
                    <button type="submit">Calculate</button>
                </form>

                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <h2>Horoscope Results:</h2>
                    <p>Full name: {fullName}</p>
                    <PlanetResults formData={formData} />
                    <HouseResults formData={formData} />
                </Popup>
            </div>
        </div>
    );
}
