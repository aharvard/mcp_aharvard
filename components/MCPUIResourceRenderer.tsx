"use client";

import React, { useCallback, useEffect, useState } from "react";
import { UIActionResult, UIResourceRenderer } from "@mcp-ui/client";
import { createUIResource } from "@mcp-ui/server";
import WeatherCard from "../netlify/mcp-server/tools/WeatherCard";
import { getWeather } from "../netlify/mcp-server/tools/getWeather";
import { useToast } from "./ToastContainer";

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
  const { showToast } = useToast();

  const UIResources = () => {
    useEffect(() => {
      setError(null); // Clear any previous errors

      getWeather(city, "imperial")
        .then((data) => {
          setWeatherData(data);
        })
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
                        <div class="p-5 text-center font-sans text-red-500 bg-red-50 rounded-lg border border-red-200">
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
                        <div class="p-5 text-center font-sans text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
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

  const handleUIAction = useCallback(async (result: ExtendedUIActionResult) => {
    console.log("Handle action from MCP UI Action:", result);

    // Handle UI actions here
    switch (result.type) {
      case "intent":
        showToast({
          type: "info",
          title: "Intent Received",
          message: "An intent action was triggered from the UI resource",
          duration: 4000,
        });
        break;

      case "link":
        showToast({
          type: "info",
          title: "Link Action",
          message: "A link action was triggered from the UI resource",
          duration: 4000,
        });
        break;

      case "notify":
        showToast({
          type: "success",
          title: "Notification",
          message: "A notification action was triggered from the UI resource",
          duration: 5000,
        });
        break;

      case "prompt":
        showToast({
          type: "warning",
          title: "Prompt Action",
          message: "A prompt action was triggered from the UI resource",
          duration: 6000,
        });
        break;

      case "tool":
        showToast({
          type: "info",
          title: "Tool Action",
          message: "A tool action was triggered from the UI resource",
          duration: 4000,
        });
        break;

      // Currently, `size-change` is non-standard
      case "size-change": {
        // We expect the height to be a string with a unit
        console.log("Setting iframe height to:", result.payload.height);
        setIframeHeight(result.payload.height);
        showToast({
          type: "success",
          title: "Size Updated",
          message: `Iframe height changed to ${result.payload.height}`,
          duration: 3000,
        });
        break;
      }
    }

    return { status: "handled" };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <UIResourceRenderer
        resource={UIResources().resource}
        onUIAction={handleUIAction}
        htmlProps={{
          style: { minHeight: iframeHeight },
        }}
      />
    </div>
  );
};

export default MCPUIResourceRenderer;
