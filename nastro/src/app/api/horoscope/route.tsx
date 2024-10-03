export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { birthday } = data;
    
    // Parse the birthday string into a Date object
    const birthDate = new Date(birthday);
    const month = birthDate.getUTCMonth() + 1;  // Get month (1-12)
    const day = birthDate.getUTCDate();  // Get day (1-31)

    // Horoscope calculation logic
    let sunSign = "";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      sunSign = "Aries";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      sunSign = "Taurus";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      sunSign = "Gemini";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
      sunSign = "Cancer";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      sunSign = "Leo";
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      sunSign = "Virgo";
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      sunSign = "Libra";
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      sunSign = "Scorpio";
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      sunSign = "Sagittarius";
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
      sunSign = "Capricorn";
    } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      sunSign = "Aquarius";
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      sunSign = "Pisces";
    }
    
    // Return the horoscope result
    const result = { horoscope: { sunSign } };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 500 });
  }
}
