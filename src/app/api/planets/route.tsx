import { NextResponse } from 'next/server';
import swe from 'sweph';


// Hulpfunctie om sterrenbeeld op basis van graden te krijgen
const getSignFromDegree = (degree: number) => {
    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo',
        'Virgo', 'Libra', 'Scorpio', 'Sagittarius',
        'Capricorn', 'Aquarius', 'Pisces',
    ];
    return signs[Math.floor(degree / 30)];
};

export async function POST(req: Request) {
    const { birthday, timeOfBirth } = await req.json();
    try {
       

        // Omzetten van de geboortedatum en tijd naar een juliaanse datum
        const year = new Date(birthday).getFullYear();
        const month = new Date(birthday).getMonth() + 1; // maanden zijn 0-gebaseerd
        const day = new Date(birthday).getDate();

        const timeParts = timeOfBirth.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const time = hours + minutes / 60;

        const gregflag = 1; // Gregoriaanse kalender

        const julianDate = swe.julday(year, month, day, time, gregflag);

        // Bepaal de planeten
        const planetCodes = {
            SUN: 0,
            MOON: 1,
            MERCURY: 2,
            VENUS: 3,
            MARS: 4,
            JUPITER: 5,
            SATURN: 6,
            URANUS: 7,
            NEPTUNUS: 8,
            PLUTO: 9,
        };

        const results = await Promise.all(
            Object.entries(planetCodes).map(async ([planetName, code]) => {
                const result = swe.calc(julianDate, code, 0);
                return {
                    planet: planetName,
                    position: result.data[0], // Graad
                    sign: getSignFromDegree(result.data[0]), // Sterrenbeeld
                };
            })
        );

        return NextResponse.json({ planets: results });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Error processing request', error }, { status: 500 });
    }
}

