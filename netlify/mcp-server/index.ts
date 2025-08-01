import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { WeatherData } from "./types";
import WeatherCard from "./tools/WeatherCard";
import { getWeather } from "./tools/getWeather";
import { createUIResource } from "@mcp-ui/server";

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
                const weatherData: WeatherData = getWeather(location, units);
                return {
                    content: [
                        {
                            type: "resource",
                            resource: {
                                uri: "http://mcp-aharvard/weather-data",
                                text: JSON.stringify(weatherData),
                                mimeType: "application/json",
                            },
                        },
                        {
                            ...createUIResource({
                                uri: "ui://mcp-aharvard/weather-card",
                                content: {
                                    type: "rawHtml",
                                    htmlString: WeatherCard(weatherData),
                                },
                                encoding: "text",
                            }),
                            annotations: {
                                audience: ["user"],
                            },
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
