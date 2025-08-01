import { WeatherData } from "../types";

// Weather conditions for variety
const weatherConditions: WeatherData["condition"][] = [
    "Sunny",
    "Partly Cloudy",
    "Cloudy",
    "Light Rain",
    "Heavy Rain",
    "Thunderstorm",
    "Snow",
    "Foggy",
    "Windy",
    "Clear",
    "Overcast",
    "Drizzle",
    "Hail",
    "Sleet",
];

// Helper function to get random number between min and max
const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random element from array
const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

export const getWeather = (location: string, units: string): WeatherData => {
    // Generate random temperature based on units
    const baseTemp = units === "metric" ? 20 : 68; // Base temperature
    const tempVariation = units === "metric" ? 15 : 27; // ±15°C or ±27°F
    const temperature = getRandomNumber(
        baseTemp - tempVariation,
        baseTemp + tempVariation
    );

    // Generate random wind speed
    const baseWindSpeed = units === "metric" ? 10 : 6; // Base wind speed
    const windVariation = units === "metric" ? 20 : 12; // ±20 km/h or ±12 mph
    const windSpeed = getRandomNumber(
        baseWindSpeed,
        baseWindSpeed + windVariation
    );

    // Generate random humidity (30-90%)
    const humidity = getRandomNumber(30, 90);

    // Get random weather condition
    const condition = getRandomElement(weatherConditions);

    return {
        location: location,
        temperature: temperature,
        unit: units === "metric" ? "°C" : "°F",
        condition: condition,
        humidity: humidity,
        windSpeed: windSpeed,
        windUnit: units === "metric" ? "km/h" : "mph",
        description: `Current weather in ${location}`,
    };
};
