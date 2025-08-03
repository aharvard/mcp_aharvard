import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import SeatSelection from "../../netlify/mcp-server/tools/SeatSelection";

export default function PickSeatPage() {
  // Create UI resource based on weather data state
  const createWeatherResource = () => {
    return createUIResource({
      uri: `ui://mcp-aharvard/weather-card`,
      content: {
        type: "rawHtml",
        htmlString: SeatSelection(),
      },
      encoding: "text",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Pick Seat MCP-UI Demo</h1>

        <MCPUIResourceRenderer resource={createWeatherResource().resource} />
      </div>
    </div>
  );
}
