/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import moonPhasesImages from '../../../public/database/moonPhases.json';
import moonData from '../../../public/database/moon.json';

export default function MoonPhase() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [moonPhase, setMoonPhase] = useState<string | null>(null);
  const [moonPhaseImage, setMoonPhaseImage] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocation({ latitude: 50.8503, longitude: 4.3517 }); // Default coordinates for Brussels, Belgium
        }
      );
    } else {
      setLocation({ latitude: 50.8503, longitude: 4.3517 });
    }
  }, []);

  useEffect(() => {
    if (location) {
      const fetchAstronomyData = async () => {
        const currentDate = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `https://api.weatherapi.com/v1/astronomy.json?key=2ae991b82f364bbfbc9172923242310&q=${location.latitude},${location.longitude}&dt=${currentDate}`
        );
        const data = await response.json();
        const phase = data.astronomy?.astro?.moon_phase || null;
        setMoonPhase(phase);
        setMoonPhaseImage(moonPhasesImages[phase as keyof typeof moonPhasesImages] || null);
      };
      fetchAstronomyData();
    }
  }, [location]);

  return (
    <div>
      {moonPhase && moonPhaseImage ? (
        <div>
          <h1 className="text-3xl uppercase font-bold mb-6">8 Phases of the Moon</h1>
          <div className='flex items-center justify-center gap-12 flex-wrap mb-8'>
            <h2 className="text-l font-semibold">Current Moon Phase: {moonPhase}</h2>
            <Image width={100} height={100} src={moonPhaseImage} alt={moonPhase} style={{ width: '12.5rem', height: '12.5rem' }} />
          </div>
        
          <p className='text-l mb-6'>{moonData.Moon.description.general}</p>
          <ol className='text-l mb-6'>
            {Object.entries(moonData.Moon.description.phases).map(([phaseName, phaseDesc]) => (
              <li className='pb-2' key={phaseName}> <strong>{phaseName}</strong>: {phaseDesc}</li>
            ))}
          </ol>
          <p className='text-l mb-6'>{moonData.Moon.description.days}</p>
          
          <div className='flex justify-center mb-6'>
            <Image width={200} height={200} src={moonData.Moon.image} alt='moon' />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
