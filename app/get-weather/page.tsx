"use client";

import { useState, useEffect } from "react";
import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import WeatherCard from "../../netlify/mcp-server/tools/WeatherCard";
import { getWeather } from "../../netlify/mcp-server/tools/getWeather";

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
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Get Weather MCP-UI Demo</h1>

        <div className="mb-6">
          <label
            htmlFor="city-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select a city to view weather:
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a city...</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {selectedCity && (
          <div className="w-1/2">
            <MCPUIResourceRenderer
              resource={createWeatherResource().resource}
            />
          </div>
        )}
      </div>
    </div>
  );
}
