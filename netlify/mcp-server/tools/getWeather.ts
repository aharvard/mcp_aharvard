import { WeatherData } from "../types";

// Weather conditions categorized by temperature ranges
const weatherConditionsByTemp = {
    // Cold weather conditions (below freezing)
    cold: ["Snow", "Sleet", "Hail", "Foggy"],
    // Cool weather conditions (near freezing to cool)
    cool: ["Cloudy", "Overcast", "Drizzle", "Light Rain", "Foggy"],
    // Moderate weather conditions (comfortable temperatures)
    moderate: ["Partly Cloudy", "Cloudy", "Light Rain", "Clear", "Windy"],
    // Warm weather conditions (pleasant temperatures)
    warm: ["Sunny", "Partly Cloudy", "Clear", "Windy"],
    // Hot weather conditions (high temperatures)
    hot: ["Sunny", "Clear", "Thunderstorm"],
    // Rainy conditions (can occur in various temperatures)
    rainy: ["Light Rain", "Heavy Rain", "Thunderstorm", "Drizzle"],
};

// Helper function to get random number between min and max
const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random element from array
const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get appropriate weather conditions based on temperature
const getWeatherConditionsForTemp = (temp: number, units: string): string[] => {
    const isMetric = units === "metric";
    const freezingPoint = isMetric ? 0 : 32;
    const coolTemp = isMetric ? 10 : 50;
    const moderateTemp = isMetric ? 20 : 68;
    const warmTemp = isMetric ? 25 : 77;

    let conditions: string[] = [];

    if (temp <= freezingPoint) {
        // Cold weather - snow, sleet, hail more likely
        conditions = [
            ...weatherConditionsByTemp.cold,
            ...weatherConditionsByTemp.cool,
        ];
    } else if (temp <= coolTemp) {
        // Cool weather - cloudy, drizzle more likely
        conditions = [
            ...weatherConditionsByTemp.cool,
            ...weatherConditionsByTemp.moderate,
        ];
    } else if (temp <= moderateTemp) {
        // Moderate weather - mix of conditions
        conditions = [
            ...weatherConditionsByTemp.moderate,
            ...weatherConditionsByTemp.warm,
        ];
    } else if (temp <= warmTemp) {
        // Warm weather - sunny, clear more likely
        conditions = [
            ...weatherConditionsByTemp.warm,
            ...weatherConditionsByTemp.moderate,
        ];
    } else {
        // Hot weather - sunny, thunderstorms more likely
        conditions = [
            ...weatherConditionsByTemp.hot,
            ...weatherConditionsByTemp.rainy,
        ];
    }

    // Add some randomness - occasionally allow "unusual" conditions
    if (Math.random() < 0.1) {
        // 10% chance for unusual weather
        const allConditions = Object.values(weatherConditionsByTemp).flat();
        conditions = [...conditions, ...allConditions];
    }

    return conditions;
};

export const getWeather = (location: string, units: string): WeatherData => {
    // Generate random temperature based on units
    const baseTemp = units === "metric" ? 20 : 68; // Base temperature
    const tempVariation = units === "metric" ? 15 : 27; // ±15°C or ±27°F
    const temperature = getRandomNumber(
        baseTemp - tempVariation,
        baseTemp + tempVariation
    );

    // Get weather conditions appropriate for this temperature
    const availableConditions = getWeatherConditionsForTemp(temperature, units);
    const condition = getRandomElement(
        availableConditions
    ) as WeatherData["condition"];

    // Adjust humidity based on weather condition
    let humidity: number;
    if (
        ["Heavy Rain", "Thunderstorm", "Drizzle", "Light Rain"].includes(
            condition
        )
    ) {
        humidity = getRandomNumber(70, 95); // High humidity for rain
    } else if (["Snow", "Sleet", "Hail"].includes(condition)) {
        humidity = getRandomNumber(60, 85); // Moderate-high humidity for frozen precip
    } else if (["Foggy", "Cloudy", "Overcast"].includes(condition)) {
        humidity = getRandomNumber(50, 80); // Moderate humidity for cloudy conditions
    } else {
        humidity = getRandomNumber(30, 70); // Lower humidity for clear/sunny conditions
    }

    // Adjust wind speed based on weather condition
    let windSpeed: number;
    const baseWindSpeed = units === "metric" ? 10 : 6;
    const windVariation = units === "metric" ? 20 : 12;

    if (["Windy", "Thunderstorm"].includes(condition)) {
        windSpeed = getRandomNumber(
            baseWindSpeed + 10,
            baseWindSpeed + windVariation + 15
        ); // Higher winds
    } else if (["Heavy Rain", "Snow"].includes(condition)) {
        windSpeed = getRandomNumber(
            baseWindSpeed + 5,
            baseWindSpeed + windVariation + 10
        ); // Moderate-high winds
    } else {
        windSpeed = getRandomNumber(
            baseWindSpeed,
            baseWindSpeed + windVariation
        ); // Normal winds
    }

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
