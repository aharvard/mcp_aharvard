import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { WeatherData, GooseConfig } from "./types";
import WeatherCard from "./tools/WeatherCard";
import { getWeather } from "./tools/getWeather";
import SeatSelection from "./tools/SeatSelection";
import UIActionCard from "./tools/UIActionCard";
import MoodTripPlanner from "./tools/MoodTripPlanner";
import { createUIResource } from "@mcp-ui/server";

export const setupMCPServer = (): McpServer => {
    const server = new McpServer(
        {
            name: "stateless-server",
            version: "1.0.0",
            description: "This demos MCP-UI examples.",
        },
        { capabilities: { logging: {} } }
    );

    // Register a tool for getting weather information
    server.tool(
        "get-weather",
        "Gets current weather information for a specified location. Use this tool when the user asks you to get the weather for a specific location.",
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
                const weatherData: WeatherData = await getWeather(
                    location,
                    units
                );
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

    // Register a tool for airplane seat selection
    server.tool(
        "pick-airplane-seat",
        "A demo of an interactive airplane seat selection tool that helps you pick a seat on a flight. Use this tool when the user asks you to pick a seat on a flight.",
        {
            flightNumber: z
                .string()
                .describe("Flight number for seat selection")
                .default("AA123"),
            destination: z
                .string()
                .describe("Destination city")
                .default("New York"),
            origin: z.string().describe("Origin city").default("San Francisco"),
            date: z
                .string()
                .describe("Date of flight")
                .default("3 weeks from now"),
        },
        async ({
            flightNumber,
            destination,
            origin,
        }): Promise<CallToolResult> => {
            try {
                // Create flight data with date 3 weeks from now
                const now = new Date();
                const threeWeeksFromNow = new Date(
                    now.getTime() + 21 * 24 * 60 * 60 * 1000
                ); // 21 days
                const flightData = {
                    flightNumber,
                    destination,
                    origin,
                    date: threeWeeksFromNow.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    }),
                    departureTime: now.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    }),
                };

                return {
                    content: [
                        {
                            ...createUIResource({
                                uri: "ui://mcp-aharvard/airplane-seat-selection",
                                content: {
                                    type: "rawHtml",
                                    htmlString: SeatSelection(flightData),
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
                            annotations: {
                                audience: ["assistant"],
                            },
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

    // Register a tool for MCP UI Actions demo
    server.tool(
        "demo-mcp-ui-actions",
        "A demo of MCP UI Actions that showcases different types of interactive actions. Use this tool when the user asks for an MCP UI Action demo or wants to see UI action examples.",
        {},
        async (): Promise<CallToolResult> => {
            try {
                return {
                    content: [
                        {
                            ...createUIResource({
                                uri: "ui://mcp-aharvard/ui-actions-demo",
                                content: {
                                    type: "rawHtml",
                                    htmlString: UIActionCard(),
                                },
                                encoding: "text",
                            }),
                            annotations: {
                                audience: ["user"],
                            },
                        },
                        {
                            type: "text",
                            text: "MCP UI Actions demo loaded! This interactive panel demonstrates various types of UI actions including tool execution, intent handling, prompts, notifications, and link navigation. Click on any action to see how it works.",
                            annotations: {
                                audience: ["assistant"],
                            },
                        },
                    ],
                };
            } catch (error) {
                console.error("Error with MCP UI Actions demo:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error loading MCP UI Actions demo: ${
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

    // Register a tool to show user Goose website
    server.tool(
        "show-goose-website",
        "A demo of the Goose website. Use this tool when the user asks you to show the Goose website.",
        {},
        async (): Promise<CallToolResult> => {
            const gooseConfig: GooseConfig = {
                type: "inline",
                height: "100vh",
            };
            return {
                content: [
                    {
                        ...createUIResource({
                            uri: "ui://mcp-aharvard/goose-website",
                            content: {
                                type: "externalUrl",
                                iframeUrl: "https://block.github.io/goose/",
                            },
                            encoding: "text",
                        }),
                        annotations: {
                            gooseConfig,
                            audience: ["user", "something else"],
                        },
                    },
                    {
                        type: "text",
                        text: "TBD",
                        annotations: {
                            audience: ["assistant"],
                        },
                    },
                ],
            };
        }
    );

    // Register a tool for mood-based trip planning
    server.tool(
        "plan-trip-by-mood",
        "A mood-based trip planner that suggests destinations based on how you're feeling. Features big emoji buttons and animated destination reveals. Use this tool when the user wants to plan a trip based on their mood or feelings.",
        {
            userPreferences: z
                .string()
                .describe("Any specific user preferences or requirements")
                .optional(),
            budget: z
                .string()
                .describe("Budget range for the trip")
                .optional(),
            duration: z
                .string()
                .describe("Preferred trip duration")
                .optional(),
        },
        async ({ userPreferences, budget, duration }): Promise<CallToolResult> => {
            try {
                const tripData = {
                    userPreferences,
                    budget,
                    duration,
                };

                return {
                    content: [
                        {
                            ...createUIResource({
                                uri: "ui://mcp-aharvard/mood-trip-planner",
                                content: {
                                    type: "rawHtml",
                                    htmlString: MoodTripPlanner(tripData),
                                },
                                encoding: "text",
                            }),
                            annotations: {
                                audience: ["user"],
                            },
                        },
                        {
                            type: "text",
                            text: "Mood-based trip planner loaded! Select how you're feeling using the emoji buttons above, and I'll suggest the perfect destination with a beautiful animation reveal.",
                            annotations: {
                                audience: ["assistant"],
                            },
                        },
                    ],
                };
            } catch (error) {
                console.error("Error with mood trip planner:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error loading mood trip planner: ${
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
