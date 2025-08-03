"use client";

import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";

export default function GetWeatherPage() {
  const cities = [
    "Wichita Falls",
    "Covington",
    "Atlanta",
    "Sioux City",
    "Santa Fe",
    "Houston",
    "Knoxville",
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Get Weather MPC-UI Demo</h1>
        <div className="flex flex-col gap-4">
          {cities.map((city) => (
            <MCPUIResourceRenderer key={city} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
}
