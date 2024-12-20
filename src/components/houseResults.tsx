// components/HouseResults.tsx
import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HouseResults = ({ formData }: { formData: any }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [houseData, setHouseData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetchHouseData = async () => {
            if (!formData) return;  // Wait for formData before fetching data
            setLoading(true); // Start loading

            try {
                const houseResponse = await fetch("/api/houses", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
    
                const responseText = await houseResponse.text();
                const houseData = JSON.parse(responseText);
                setHouseData(houseData);
            } catch (error) {
                console.error('Error fetching house data:', error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchHouseData();
    }, [formData]);

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

    if (loading) {
        return <p className='text-background'>Loading house data...</p>; // Display loading message
    }

    return (
        <div>
            {houseData && houseData.houses && (
                <div className="m-8">
                    <h2 className="text-xl font-bold text-background">House Results:</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {Object.entries(houseData.houses).map(([key, degree]) => {
                            const degreeValue = roundToTwoDecimals(degree as number);
                            return (
                                <li key={key} className="text-background">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {degreeValue}° - {getSignFromDegree(degreeValue)}
                                </li>
                            );
                        })}
                    </ul>
                    <p className="text-background mt-4">
                        Your ascendant is: {getSignFromDegree(roundToTwoDecimals(houseData.houses.house1 as number))}
                    </p>
                </div>
            )}
        </div>
    );
};

export default HouseResults;
