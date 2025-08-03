import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { WeatherData } from "./types";
import WeatherCard from "./tools/WeatherCard";
import { getWeather } from "./tools/getWeather";
import SeatSelection from "./tools/SeatSelection";
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
        // Get real weather data from OpenMeteo API
        const weatherData: WeatherData = await getWeather(location, units);
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
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
        };
      }
    }
  );

  // Register a tool for airplane seat selection
  server.tool(
    "pick-airplane-seat",
    "Interactive airplane seat selection tool",
    {
      flightNumber: z
        .string()
        .describe("Flight number for seat selection")
        .default("AA123"),
      destination: z.string().describe("Destination city").default("New York"),
    },
    async ({ flightNumber, destination }): Promise<CallToolResult> => {
      try {
        const seatData = {
          flightNumber,
          destination,
          availableSeats: Array.from({ length: 56 }, (_, i) => i + 1),
          timestamp: new Date().toISOString(),
        };

        return {
          content: [
            {
              type: "resource",
              resource: {
                uri: "http://mcp-aharvard/airplane-seat-data",
                text: JSON.stringify(seatData),
                mimeType: "application/json",
              },
            },
            {
              ...createUIResource({
                uri: "ui://mcp-aharvard/airplane-seat-selection",
                content: {
                  type: "rawHtml",
                  htmlString: SeatSelection(),
                },
                encoding: "text",
              }),
              annotations: {
                audience: ["user"],
              },
            },
            {
              type: "text",
              text: `Airplane seat selection interface loaded for flight ${flightNumber} to ${destination}. Please select your seat from the interactive map above.`,
            },
          ],
        };
      } catch (error) {
        console.error("Error with airplane seat selection:", error);
        return {
          content: [
            {
              type: "text",
              text: `Error with airplane seat selection for flight ${flightNumber}: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            },
          ],
        };
      }
    }
  );

  return server;
};
