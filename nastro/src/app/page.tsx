"use client";
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
    const [result, setResult] = useState<HoroscopeResult | null>(null);
    const [houseData, setHouse] = useState<HouseResult | null>(null);
    const [fullName, setFullName] = useState<string | null>(null);


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
  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const data: FormData = {
            fullName: e.currentTarget.fullName.value,
            lat: parseFloat(e.currentTarget.lat.value),
            lon: parseFloat(e.currentTarget.lon.value),
            birthday: e.currentTarget.birthday.value,
            timeOfBirth: e.currentTarget.timeofbirth.value,
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

        const responseText = await houseResponse.text(); // Verkrijg de response als tekst
        console.log('House response text:', responseText); // Log de response tekst

        // Nu proberen te parseren als JSON
        try {
            const houseData: HouseResult = JSON.parse(responseText);
            setHouse(houseData);
        } catch (error) {
            console.error('Error parsing house response:', error);
        }
    }

    const getSignFromDegree = (degree: number): string => {
        if (degree >= 0 && degree < 30) return 'Ram';
        if (degree >= 30 && degree < 60) return 'Stier';
        if (degree >= 60 && degree < 90) return 'Tweelingen';
        if (degree >= 90 && degree < 120) return 'Kreeft';
        if (degree >= 120 && degree < 150) return 'Leeuw';
        if (degree >= 150 && degree < 180) return 'Maagd';
        if (degree >= 180 && degree < 210) return 'Weegschaal';
        if (degree >= 210 && degree < 240) return 'Schorpioen';
        if (degree >= 240 && degree < 270) return 'Boogschutter';
        if (degree >= 270 && degree < 300) return 'Steenbok';
        if (degree >= 300 && degree < 330) return 'Waterman';
        if (degree >= 330 && degree < 360) return 'Vissen';
        return '';
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
                        My name:
                        <input type="text" name="fullName" />

                        Latitude:
                        <input type="number" step="any" name="lat" placeholder='Latitude' />

                        Longitude:
                        <input type="number" step="any" name="lon" placeholder='Longitude' />

                        Birthday and time:
                        <input type="date" name="birthday" />

                        <input type="time" name="timeofbirth" />
                    </label>
                    <button type="submit">Calculate</button>
                </form>

                <h2>Hello {fullName}</h2>

                {result && (
                  
                    <div>
                        <h2>Horoscope Results:</h2>
                        <p>Sun Sign: {result.horoscope.sunSign}</p>
                    </div>
                )}
{houseData && houseData.houses && (
    <div className="my-4"> 
        <h2 className="text-xl font-bold text-blue-600">House Results:</h2> 
        <ul className="list-disc list-inside space-y-2"> 
            {Object.entries(houseData.houses).map(([key, degree], index) => {
                const degreeValue = parseFloat(degree); // Zet degree om naar een float
                return (
                    <li key={key} className="text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {degreeValue.toFixed(2)}° - {getSignFromDegree(degreeValue)} {/* Degree doorgeven als number */}
                    </li>
                );
            })}
        </ul>
    </div>
)}

            </div>
        </div>
    );
}
