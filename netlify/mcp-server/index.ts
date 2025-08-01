import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
    CallToolResult,
    GetPromptResult,
    ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import { WeatherData } from "../types";

export const setupMCPServer = (): McpServer => {
    const server = new McpServer(
        {
            name: "stateless-server",
            version: "1.0.0",
        },
        { capabilities: { logging: {} } }
    );

    // Register a tool for getting weather information
    server.tool(
        "get-weather",
        "Gets current weather information for a specified location",
        {
            location: z
                .string()
                .describe("City name or location to get weather for")
                .default("New York"),
            units: z
                .enum(["metric", "imperial"])
                .describe(
                    "Temperature units (metric for Celsius, imperial for Fahrenheit)"
                )
                .default("imperial"),
        },
        async ({ location, units }): Promise<CallToolResult> => {
            try {
                // Simulate weather data (in a real implementation, you'd call a weather API)
                const weatherData: WeatherData = {
                    location: location,
                    temperature: units === "metric" ? 22 : 72,
                    unit: units === "metric" ? "°C" : "°F",
                    condition: "Partly Cloudy",
                    humidity: 65,
                    windSpeed: units === "metric" ? 15 : 9,
                    windUnit: units === "metric" ? "km/h" : "mph",
                    description: `Current weather in ${location}`,
                };

                return {
                    content: [
                        {
                            type: "text",
                            text: `${weatherData.description}: ${weatherData.temperature}${weatherData.unit}, ${weatherData.condition}. Humidity: ${weatherData.humidity}%. Wind: ${weatherData.windSpeed} ${weatherData.windUnit}.`,
                        },
                    ],
                };
            } catch (error) {
                console.error("Error getting weather:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error getting weather for ${location}: ${
                                error instanceof Error
                                    ? error.message
                                    : "Unknown error"
                            }`,
                        },
                    ],
                };
            }
        }
    );

    return server;
};
