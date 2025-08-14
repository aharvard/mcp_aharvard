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

// Weather code mapping for OpenMeteo API - Complete WMO codes
const weatherCodeMap: {
    [key: number]:
        | "Clear Sky"
        | "Mainly Clear"
        | "Partly Cloudy"
        | "Overcast"
        | "Fog"
        | "Depositing Rime Fog"
        | "Light Drizzle"
        | "Moderate Drizzle"
        | "Dense Drizzle"
        | "Light Freezing Drizzle"
        | "Dense Freezing Drizzle"
        | "Slight Rain"
        | "Moderate Rain"
        | "Heavy Rain"
        | "Light Freezing Rain"
        | "Heavy Freezing Rain"
        | "Slight Snow"
        | "Moderate Snow"
        | "Heavy Snow"
        | "Snow Grains"
        | "Slight Rain Showers"
        | "Moderate Rain Showers"
        | "Violent Rain Showers"
        | "Slight Snow Showers"
        | "Heavy Snow Showers"
        | "Slight Thunderstorm"
        | "Thunderstorm with Slight Hail"
        | "Thunderstorm with Heavy Hail";
} = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Slight Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail",
};

// Helper function to get weather condition from weather code
const getWeatherCondition = (
    weatherCode: number
):
    | "Clear Sky"
    | "Mainly Clear"
    | "Partly Cloudy"
    | "Overcast"
    | "Fog"
    | "Depositing Rime Fog"
    | "Light Drizzle"
    | "Moderate Drizzle"
    | "Dense Drizzle"
    | "Light Freezing Drizzle"
    | "Dense Freezing Drizzle"
    | "Slight Rain"
    | "Moderate Rain"
    | "Heavy Rain"
    | "Light Freezing Rain"
    | "Heavy Freezing Rain"
    | "Slight Snow"
    | "Moderate Snow"
    | "Heavy Snow"
    | "Snow Grains"
    | "Slight Rain Showers"
    | "Moderate Rain Showers"
    | "Violent Rain Showers"
    | "Slight Snow Showers"
    | "Heavy Snow Showers"
    | "Slight Thunderstorm"
    | "Thunderstorm with Slight Hail"
    | "Thunderstorm with Heavy Hail"
    | "weather data not found" => {
    return weatherCodeMap[weatherCode] || "Clear Sky";
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
        )}&count=5&language=en&format=json`;

        const geocodeResponse = await fetch(geocodeUrl);
        if (!geocodeResponse.ok) {
            throw new Error(`Geocoding failed: ${geocodeResponse.statusText}`);
        }

        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error(`Location not found: ${location}`);
        }

        // If the user supplied a state component (e.g. "Portland, OR"), prefer a result
        // whose admin1 matches the provided state or starts with it (case-insensitive)
        const [, statePart] = location.split(",").map((s) => s.trim()) as [
            string,
            string | undefined
        ];

        let selected = geocodeData.results[0];
        if (statePart) {
            const normalizedState = statePart.toLowerCase();
            const match = geocodeData.results.find(
                (r: any) =>
                    r.admin1 &&
                    typeof r.admin1 === "string" &&
                    (r.admin1.toLowerCase() === normalizedState ||
                        r.admin1.toLowerCase().startsWith(normalizedState))
            );
            if (match) selected = match;
        }

        const { latitude, longitude } = selected;

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

        // Check if it's a location not found error
        if (
            error instanceof Error &&
            error.message.includes("Location not found")
        ) {
            return {
                location: location,
                temperature: "?" as unknown as number,
                unit: units === "metric" ? "°C" : "°F",
                condition: "weather data not found",
                humidity: 0,
                windSpeed: 0,
                windUnit: units === "metric" ? "km/h" : "mph",
                description: `Location not found: ${location}`,
            };
        }

        // For other errors, return dashes as well
        return {
            location: location,
            temperature: 0,
            unit: units === "metric" ? "°C" : "°F",
            condition: "weather data not found",
            humidity: 0,
            windSpeed: 0,
            windUnit: units === "metric" ? "km/h" : "mph",
            description: `Error fetching weather data for ${location}`,
        };
    }
};
