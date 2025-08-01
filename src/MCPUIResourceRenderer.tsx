import React, { useCallback, useEffect, useState } from "react";
import { UIActionResult, UIResourceRenderer } from "@mcp-ui/client";
import { createUIResource } from "@mcp-ui/server";
import WeatherCard from "../netlify/mcp-server/tools/WeatherCard";
import { getWeather } from "../netlify/mcp-server/tools/getWeather";

// Extend UIActionResult to include size-change type
type ExtendedUIActionResult =
    | UIActionResult
    | {
          type: "size-change";
          payload: {
              height: string;
          };
      };

interface MCPUIResourceRendererProps {
    city: string;
}

const MCPUIResourceRenderer: React.FC<MCPUIResourceRendererProps> = ({
    city,
}) => {
    const [iframeHeight, setIframeHeight] = useState("100px");
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const UIResources = (cityName: string) => {
        useEffect(() => {
            setError(null); // Clear any previous errors
            getWeather(city, "imperial")
                .then(setWeatherData)
                .catch((err) => {
                    console.error("Error fetching weather data:", err);
                    setError(err.message || "Failed to fetch weather data");
                });
        }, [city]);

        // Show error if there was an error fetching data
        if (error) {
            return createUIResource({
                uri: `ui://mcp-aharvard/weather-card`,
                content: {
                    type: "rawHtml",
                    htmlString: `
                        <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif; color: #e74c3c;">
                            <p>Error: ${error}</p>
                        </div>
                    `,
                },
                encoding: "text",
            });
        }

        // Don't render WeatherCard if weatherData is null
        if (!weatherData) {
            return createUIResource({
                uri: `ui://mcp-aharvard/weather-card`,
                content: {
                    type: "rawHtml",
                    htmlString: `
                        <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
                            <p>Loading weather data for ${city}...</p>
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

    const handleUIAction = useCallback(
        async (result: ExtendedUIActionResult) => {
            console.log("Handle action from MCP UI Action:", result);

            // Handle UI actions here
            switch (result.type) {
                case "intent":
                    // TODO: Implement intent handling
                    break;

                case "link":
                    // TODO: Implement link handling
                    break;

                case "notify":
                    // TODO: Implement notification handling
                    break;

                case "prompt":
                    // TODO: Implement prompt handling
                    break;

                case "tool":
                    // TODO: Implement tool handling
                    break;

                // Currently, `size-change` is non-standard
                case "size-change": {
                    // We expect the height to be a string with a unit
                    console.log(
                        "Setting iframe height to:",
                        result.payload.height
                    );
                    setIframeHeight(result.payload.height);
                    break;
                }
            }

            return { status: "handled" };
        },
        []
    );

    return (
        <UIResourceRenderer
            resource={UIResources(city).resource}
            onUIAction={handleUIAction}
            htmlProps={{
                style: { minHeight: iframeHeight },
            }}
        />
    );
};

export default MCPUIResourceRenderer;
