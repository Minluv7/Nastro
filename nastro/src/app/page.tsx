"use client";
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
    const [result, setResult] = useState<HoroscopeResult | null>(null);
    const [houseData, setHouse] = useState<HouseResult | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);
    const [planetData, setPlanetData] = useState<PlanetResult | null>(null); 

    interface FormData {
        fullName: string;
        lat: number;
        lon: number;
        birthday: string;
        timeOfBirth: string;
    }

    interface HoroscopeResult {
        horoscope: {
            sunSign: string;
        };
    }

    interface HouseResult {
        houses: {
            house1: number;
            house2: number;
            house3: number;
            house4: number;
            house5: number;
            house6: number;
            house7: number;
            house8: number;
            house9: number;
            house10: number;
            house11: number;
            house12: number;
        };
    }

    interface PlanetResult {
        planets: {
            planet: string;
            position: number;
            sign: string;
        }[];
    }

    // Nominatim-geocoder functie om plaatsnaam om te zetten naar lat/lon
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
        const placeName = e.currentTarget.placeName.value; // Haal plaatsnaam uit het formulier
        const birthday = e.currentTarget.birthday.value;
        const timeOfBirth = e.currentTarget.timeofbirth.value;

        try {
            const location = await geocodePlaceName(placeName);
            console.log('Gevonden coördinaten:', location);

            const data: FormData = {
                fullName,
                lat: location.lat,
                lon: location.lon,
                birthday,
                timeOfBirth,
            };

            setFullName(data.fullName);
            console.log('Form data:', data);

            // Fetch horoscope result
            const horoscopeResponse = await fetch("/api/horoscope", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const horoscopeResult: HoroscopeResult = await horoscopeResponse.json();
            setResult(horoscopeResult);
            console.log('Horoscope response:', horoscopeResponse);

            // Fetch house result
            const houseResponse = await fetch("/api/houses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseText = await houseResponse.text(); 
            console.log('House response text:', responseText); 

           

               // Fetch planet result
         const planetResponse = await fetch("/api/planets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    
        const planetResponseText = await planetResponse.text();
        console.log('Planet response text:', planetResponseText);
        
        try {
            const planetData: PlanetResult = JSON.parse(planetResponseText);
            setPlanetData(planetData);
        
        } catch (error) {
            console.error('Error parsing planet response:', error);
        };
        try {
            const houseData: HouseResult = JSON.parse(responseText);
            setHouse(houseData);
        } catch (error) {
            console.error('Error parsing house response:', error);
        };
        }
        catch (error) {
            console.error('Error fetching horoscope:', error);
        }
    }
      
    
 
    const getSignFromDegree = (degree: number): string => {
        if (degree >= 0 && degree < 30) return 'Aries';
        if (degree >= 30 && degree < 60) return 'Taurus';
        if (degree >= 60 && degree < 90) return 'Gemini';
        if (degree >= 90 && degree < 120) return 'Cancer';
        if (degree >= 120 && degree < 150) return 'Leo';
        if (degree >= 150 && degree < 180) return 'Virgo';
        if (degree >= 180 && degree < 210) return 'Libra';
        if (degree >= 210 && degree < 240) return 'Scorpio';
        if (degree >= 240 && degree < 270) return 'Sagittarius';
        if (degree >= 270 && degree < 300) return 'Capricorn';
        if (degree >= 300 && degree < 330) return 'Aquarius';
        if (degree >= 330 && degree < 360) return 'Pisces';        
        return '';
    };

    const roundToTwoDecimals = (num: number): number => {
        return Math.round(num * 100) / 100;
    };

console.log('Planet data:', planetData);

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

                {result && (
                    <div>
                        <h2>Horoscope Results:</h2>
                        <p>Full name: {fullName}</p>
                        <p>Sun Sign: {result.horoscope.sunSign}</p>
                    </div>
                )}

                {houseData && houseData.houses && (
                    <div className="my-4">
                        <h2 className="text-xl font-bold text-blue-600">House Results:</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {Object.entries(houseData.houses).map(([key, degree]) => {
                                const degreeValue = roundToTwoDecimals(degree as number);
                                return (
                                    <li key={key} className="text-gray-700">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}: {degreeValue}° - {getSignFromDegree(degreeValue)}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

{planetData && planetData.planets && (
    <div className="my-4">
        <h2 className="text-xl font-bold text-green-600">Planet Horoscope:</h2>
        <ul className="list-disc list-inside space-y-2">
            {planetData.planets.map((planet, index) => (
                <li key={index} className="text-gray-700">
                    {planet.planet.charAt(0).toUpperCase() + planet.planet.slice(1)}: {roundToTwoDecimals(planet.position)}° - {planet.sign}
                </li>
            ))}
        </ul>
    </div>
)}

            </div>
        </div>
    );
}
