export type WeatherData = {
    location: string;
    temperature: number;
    unit: string;
    condition:
        | "Sunny"
        | "Partly Cloudy"
        | "Cloudy"
        | "Light Rain"
        | "Heavy Rain"
        | "Thunderstorm"
        | "Snow"
        | "Foggy"
        | "Windy"
        | "Clear"
        | "Overcast"
        | "Drizzle"
        | "Hail"
        | "Sleet";
    humidity: number;
    windSpeed: number;
    windUnit: string;
    description: string;
};
