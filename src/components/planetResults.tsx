// components/PlanetResults.tsx
import { useState, useEffect } from 'react';

// Helper function to round to 2 decimal places
const roundToTwoDecimals = (num: number): number => {
    return Math.round(num * 100) / 100;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlanetResults = ({ formData }: { formData: any }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [planetData, setPlanetData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetchPlanetData = async () => {
            if (!formData) return; // Wait until formData is available
            setLoading(true); // Start loading
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
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchPlanetData();
    }, [formData]);

    if (loading) {
        return <p className='text-background'>Loading planet data...</p>; // Display loading message
    }

    return (
        <div>
            {planetData && planetData.planets && (
                <div className="m-8">
                    <h2 className="text-xl font-bold text-background">Planet Horoscope:</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {planetData.planets.map((planet: any, index: number) => (
                            <li key={index} className="text-background">
                                {planet.planet.charAt(0).toUpperCase() + planet.planet.slice(1)}: {roundToTwoDecimals(planet.position)}° - {planet.sign}
                            </li>
                        ))}
                    </ul>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {planetData.planets.map((planet: any) => (
                        planet.planet.toLowerCase() === 'sun' && (
                            <p key="sun-info" className="text-background mt-4">
                                Your Horoscope is a: {planet.sign}
                            </p>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlanetResults;
