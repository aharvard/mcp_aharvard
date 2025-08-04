export type WeatherData = {
    location: string;
    temperature: number;
    unit: string;
    condition:
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
        | "weather data not found";
    humidity: number;
    windSpeed: number;
    windUnit: string;
    description: string;
};
