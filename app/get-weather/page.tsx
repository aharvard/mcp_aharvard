"use client";

import { useState } from "react";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
          <div className="max-w-2xl">
            <MCPUIResourceRenderer city={selectedCity} />
          </div>
        )}
      </div>
    </div>
  );
}
