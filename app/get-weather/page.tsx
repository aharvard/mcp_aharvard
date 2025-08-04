"use client";

import { useState, useEffect } from "react";
import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import WeatherCard from "../../netlify/mcp-server/tools/WeatherCard";
import { getWeather } from "../../netlify/mcp-server/tools/getWeather";
import {
    Cloud,
    CloudRain,
    MapPin,
    Thermometer,
    Droplets,
    Wind,
} from "lucide-react";

export default function GetWeatherPage() {
    const cities = [
        "New York",
        "Los Angeles",
        "Chicago",
        "Dallas",
        "Houston",
        "Washington",
        "Philadelphia",
        "Miami",
        "Atlanta",
        "Phoenix",
        "Boston",
        "San Francisco",
        "Riverside",
        "Detroit",
        "Seattle",
        "Minneapolis",
        "San Diego",
        "Tampa",
        "Denver",
        "Baltimore",
        "St. Louis",
        "Charlotte",
        "Orlando",
        "San Antonio",
        "Portland",
    ];

    const [selectedCity, setSelectedCity] = useState<string>("Atlanta");
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch weather data when city changes
    useEffect(() => {
        if (!selectedCity) return;

        setError(null);
        setWeatherData(null);

        getWeather(selectedCity, "imperial")
            .then((data) => {
                setWeatherData(data);
            })
            .catch((err) => {
                console.error("Error fetching weather data:", err);
                setError(err.message || "Failed to fetch weather data");
            });
    }, [selectedCity]);

    // Create UI resource based on weather data state
    const createWeatherResource = () => {
        if (error) {
            return createUIResource({
                uri: `ui://mcp-aharvard/weather-card`,
                content: {
                    type: "rawHtml",
                    htmlString: `
            <div class="p-5 text-center font-sans text-red-500 bg-red-50 rounded-lg border border-red-200">
                <p>Error: ${error}</p>
            </div>
          `,
                },
                encoding: "text",
            });
        }

        if (!weatherData) {
            return createUIResource({
                uri: `ui://mcp-aharvard/weather-card`,
                content: {
                    type: "rawHtml",
                    htmlString: `
            <div class="p-5 text-center font-sans text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                <p>Loading weather data for ${selectedCity}...</p>
            </div>
          `,
                },
                encoding: "text",
            });
        }

        return createUIResource({
            uri: `ui://mcp-aharvard/weather-card`,
            content: {
                type: "rawHtml",
                htmlString: WeatherCard(weatherData),
            },
            encoding: "text",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                        <Cloud className="w-4 h-4" />
                        Real-time Weather Data
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <Cloud className="w-10 h-10 text-blue-600" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Weather Demo
                        </h1>
                        <CloudRain className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Get real-time weather information from Open-Meteo API
                        with beautiful visualizations and detailed metrics
                    </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Select a City
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                    selectedCity === city
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                                }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Thermometer className="w-6 h-6 text-orange-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Weather Information
                        </h2>
                    </div>
                    <MCPUIResourceRenderer
                        resource={createWeatherResource().resource}
                    />
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Thermometer className="w-8 h-8 text-orange-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Temperature
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Real-time temperature data with both Celsius and
                            Fahrenheit support
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Droplets className="w-8 h-8 text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Humidity
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Current humidity levels and precipitation
                            probability
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Wind className="w-8 h-8 text-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Wind
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Wind speed and direction information
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
