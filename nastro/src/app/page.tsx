"use client"
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  const [result, setResult] = useState<HoroscopeResult | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const data: FormData = {
      fullName: e.currentTarget.fullName.value,
      lat: parseFloat(e.currentTarget.lat.value),
      lon: parseFloat(e.currentTarget.lon.value),
      birthday: e.currentTarget.birthday.value,
      timeOfBirth: e.currentTarget.timeofbirth.value,
    };

    console.log('Form data:', data);

    const response = await fetch("api/horoscope", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result: HoroscopeResult = await response.json();
    setResult(result);
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

        {result && (
          <div>
            <h2>Horoscope Results:</h2>
            <p>Sun Sign: {result.horoscope.sunSign}</p>
         
          </div>
        )}
      </div>
    </div>
  );
}
