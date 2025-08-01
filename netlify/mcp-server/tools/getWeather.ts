import { WeatherData } from "../types";

interface OpenMeteoResponse {
    current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        weather_code: number;
    };
    current_units: {
        temperature_2m: string;
        wind_speed_10m: string;
    };
}

// Weather code mapping for OpenMeteo API
const weatherCodeMap: {
    [key: number]:
        | "Clear"
        | "Partly Cloudy"
        | "Cloudy"
        | "Foggy"
        | "Light Rain"
        | "Heavy Rain"
        | "Snow"
        | "Thunderstorm"
        | "Sunny"
        | "Windy"
        | "Overcast"
        | "Drizzle"
        | "Hail"
        | "Sleet";
} = {
    0: "Clear",
    1: "Partly Cloudy",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Foggy",
    48: "Foggy",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    56: "Drizzle",
    57: "Drizzle",
    61: "Light Rain",
    63: "Heavy Rain",
    65: "Heavy Rain",
    66: "Light Rain",
    67: "Heavy Rain",
    71: "Snow",
    73: "Snow",
    75: "Snow",
    77: "Snow",
    80: "Light Rain",
    81: "Light Rain",
    82: "Heavy Rain",
    85: "Snow",
    86: "Snow",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm",
};

// Helper function to get weather condition from weather code
const getWeatherCondition = (
    weatherCode: number
):
    | "Clear"
    | "Partly Cloudy"
    | "Cloudy"
    | "Foggy"
    | "Light Rain"
    | "Heavy Rain"
    | "Snow"
    | "Thunderstorm"
    | "Sunny"
    | "Windy"
    | "Overcast"
    | "Drizzle"
    | "Hail"
    | "Sleet" => {
    return weatherCodeMap[weatherCode] || "Clear";
};

// Helper function to convert temperature units
const convertTemperature = (temp: number, targetUnit: string): number => {
    if (targetUnit === "°F") {
        return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
};

// Helper function to convert wind speed units
const convertWindSpeed = (speed: number, targetUnit: string): number => {
    if (targetUnit === "mph") {
        return Math.round(speed * 0.621371); // km/h to mph
    }
    return Math.round(speed);
};

export const getWeather = async (
    location: string,
    units: string
): Promise<WeatherData> => {
    try {
        // First, we need to geocode the location to get coordinates
        // Using a free geocoding service
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            location
        )}&count=1&language=en&format=json`;

        const geocodeResponse = await fetch(geocodeUrl);
        if (!geocodeResponse.ok) {
            throw new Error(`Geocoding failed: ${geocodeResponse.statusText}`);
        }

        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error(`Location not found: ${location}`);
        }

        const { latitude, longitude } = geocodeData.results[0];

        // Now get weather data using coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error(
                `Weather API failed: ${weatherResponse.statusText}`
            );
        }

        const weatherData: OpenMeteoResponse = await weatherResponse.json();

        console.log({ location, weatherData });

        // Extract and convert data
        const temperature = convertTemperature(
            weatherData.current.temperature_2m,
            units === "metric" ? "°C" : "°F"
        );

        const windSpeed = convertWindSpeed(
            weatherData.current.wind_speed_10m,
            units === "metric" ? "km/h" : "mph"
        );

        const condition = getWeatherCondition(weatherData.current.weather_code);

        return {
            location: location,
            temperature: temperature,
            unit: units === "metric" ? "°C" : "°F",
            condition: condition,
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: windSpeed,
            windUnit: units === "metric" ? "km/h" : "mph",
            description: `Current weather in ${location}`,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);

        // Fallback to mock data if API fails
        const baseTemp = units === "metric" ? 20 : 68;
        const tempVariation = units === "metric" ? 15 : 27;
        const temperature =
            Math.floor(Math.random() * (tempVariation * 2 + 1)) +
            (baseTemp - tempVariation);

        return {
            location: location,
            temperature: temperature,
            unit: units === "metric" ? "°C" : "°F",
            condition: "Clear",
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            windUnit: units === "metric" ? "km/h" : "mph",
            description: `Current weather in ${location} (fallback data)`,
        };
    }
};
