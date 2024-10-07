// src/app/api/houses/route.ts
import { NextResponse } from 'next/server';
import swe from 'sweph';

export async function POST(req: Request) {
    const { lat, lon, birthday, timeOfBirth } = await req.json();

    // Verifieer of alle vereiste velden aanwezig zijn
    if (lat === undefined || lon === undefined || !birthday || !timeOfBirth) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Controleer of latitude en longitude binnen het bereik zijn
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return NextResponse.json({ message: "Invalid latitude or longitude" }, { status: 400 });
    }

    const year = new Date(birthday).getFullYear();
    const month = new Date(birthday).getMonth() + 1; // maanden beginnen bij 0
    const day = new Date(birthday).getDate();

    // Parse timeOfBirth naar decimale tijd
    const timeParts = timeOfBirth.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const time = hours + minutes / 60; // Zorg ervoor dat het in decimale vorm is

    const gregflag = 1;

    try {
        const julianDate = swe.julday(year, month, day, time, gregflag);
        const result = swe.houses(julianDate, lat, lon, 'P') as unknown as { flag: number, data: { houses: number[], points: number[] } };

        if (!result || !result.data || result.data.houses.length < 12) {
            return NextResponse.json({ message: "Invalid houses data" }, { status: 400 });
        }

        const houses = result.data.houses;

        const response = {
            houses: {
                house1: houses[0].toString(),
                house2: houses[1].toString(),
                house3: houses[2].toString(),
                house4: houses[3].toString(),
                house5: houses[4].toString(),
                house6: houses[5].toString(),
                house7: houses[6].toString(),
                house8: houses[7].toString(),
                house9: houses[8].toString(),
                house10: houses[9].toString(),
                house11: houses[10].toString(),
                house12: houses[11].toString(),
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error processing house request:", error);
        return NextResponse.json({ message: "Error processing request" }, { status: 500 });
    }
}
