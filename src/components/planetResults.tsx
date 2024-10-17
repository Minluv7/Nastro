// components/PlanetResults.tsx
import { useState, useEffect } from 'react';

// Helper functie om af te ronden naar 2 decimalen
const roundToTwoDecimals = (num: number): number => {
    return Math.round(num * 100) / 100;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlanetResults = ({ formData }: { formData: any }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [planetData, setPlanetData] = useState<any | null>(null);

    useEffect(() => {
        const fetchPlanetData = async () => {
            if (!formData) return; // Wacht tot formData beschikbaar is

            try {
                const planetResponse = await fetch("/api/planets", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
        
                const planetResponseText = await planetResponse.text();
                const planetData = JSON.parse(planetResponseText);
                setPlanetData(planetData);
            } catch (error) {
                console.error('Error fetching planet data:', error);
            }
        };

        fetchPlanetData();
    }, [formData]);

    return (
        <div>
            {planetData && planetData.planets && (
                <div className="my-4 ">
                    <h2 className="text-xl font-bold text-green-600">Planet Horoscope:</h2>
                    <ul className="list-disc list-inside space-y-2">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {planetData.planets.map((planet: any, index: number) => (
                            <li key={index} className="text-gray-700">
                                {planet.planet.charAt(0).toUpperCase() + planet.planet.slice(1)}: {roundToTwoDecimals(planet.position)}° - {planet.sign}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PlanetResults;
