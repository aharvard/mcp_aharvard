import React, { useCallback, useState } from "react";
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

    const UIResources = (cityName: string) => {
        return createUIResource({
            uri: `ui://mcp-aharvard/weather-card`,
            content: {
                type: "rawHtml",
                htmlString: WeatherCard(getWeather(cityName, "imperial")),
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
