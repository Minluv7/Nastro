"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [horoscopes, setHoroscopes] = useState<Horoscope[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        const response = await fetch('/database/horoscopes.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Fetched data:', data);

        if (data.horoscopes && Array.isArray(data.horoscopes)) {
          setHoroscopes(data.horoscopes);
        } else {
          console.error('Fetched data is not an array:', data);
          setHoroscopes([]);
        }
      } catch (error) {
        console.error('Error fetching horoscopes:', error);
        setError('Failed to fetch horoscopes.');
        setHoroscopes([]);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchHoroscopes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl uppercase font-bold mb-6">Horoscopes</h1>
      {loading && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-xl">Loading...</p>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && horoscopes.map((horoscope) => (
          <Link href={`/horoscope/${horoscope.sign}`} key={horoscope.sign}>
            <li
              className="flex flex-col items-center shadow-md p-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                width={400}
                height={400}
                src={horoscope.image}
                alt={horoscope.sign}
                className="w-32 h-40"
              />
              <h2 className="text-xl font-semibold mt-4">{horoscope.sign}</h2>
              <p className="text-gray-600">{horoscope.dateRange}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
