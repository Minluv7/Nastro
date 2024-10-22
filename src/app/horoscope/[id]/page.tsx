"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correcte import voor route parameters
import Image from 'next/image';

export default function HoroscopeDetailPage() {
    const { id: sign } = useParams();// Haal de 'sign' parameter correct uit de URL

  console.log('Sign from URL:', sign); // Log de sign voor debugging

  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const response = await fetch('/database/horoscopes.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Log de volledige data voor debugging
        console.log('Fetched horoscopes data:', data);

        // Zoek de horoscoop op basis van de 'sign' uit de query string
        const foundHoroscope = data.horoscopes.find((h: Horoscope) => h.sign === sign);

        console.log('Found Horoscope:', foundHoroscope); // Log de gevonden horoscoop

        if (foundHoroscope) {
          setHoroscope(foundHoroscope);
        } else {
          setError('Horoscope not found');
        }
      } catch (error) {
        console.error('Error fetching horoscope:', error);
        setError('Failed to fetch horoscope.');
      }
    };

    if (sign) {
      fetchHoroscope();
    }
  }, [sign]); // Alleen opnieuw fetchen als 'sign' verandert

  if (error) {
    return <p>{error}</p>;
  }

  if (!horoscope) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{horoscope.sign}</h1>
      <Image
        width={400}
        height={400}
        src={horoscope.image}
        alt={horoscope.sign}
        className="mb-4"
      />
      <p className="text-xl font-semibold">{horoscope.dateRange}</p>
      <p className="mt-4">{horoscope.description.general}</p>
      <h2 className="text-2xl font-bold mt-6">Traits</h2>
      <ul className="list-disc ml-6 mt-2">
        {horoscope.description.traits.map((trait, index) => (
          <li key={index}>{trait}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-6">Strengths</h2>
      <p>{horoscope.description.strengths}</p>
      <h2 className="text-2xl font-bold mt-6">Challenges</h2>
      <p>{horoscope.description.challenges}</p>
    </div>
  );
}
