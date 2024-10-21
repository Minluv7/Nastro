interface HoroscopeDescription {
    general: string;
    traits: string[];
    strengths: string;
    challenges: string;
    zestForLife: string;
    relationships: {
        seeking: string;
        partnership: string;
    };
  }
  // eslint-disable-next-line
  interface Horoscope {
    sign: string;
    dateRange: string;
    image: string;
    symbol: string;
    description: HoroscopeDescription;
    summary: string;
  }
  