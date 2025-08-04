import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import SeatSelection from "../../netlify/mcp-server/tools/SeatSelection";
import { User, Users, Ticket, MapPin } from "lucide-react";

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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-6">
                        <Ticket className="w-4 h-4" />
                        Interactive Seat Selection
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <User className="w-10 h-10 text-green-600" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Pick Seat Demo
                        </h1>
                        <Users className="w-10 h-10 text-green-600" />
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Interactive seat selection with real-time visual
                        feedback and dynamic updates
                    </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-6 h-6 text-green-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            MCP-UI Seat Selection Resource Preview
                        </h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        This section displays an interactive seat selection
                        interface as rendered by MCP-UI. The content below is
                        generated from an MCP-UI resource that can be embedded
                        in any MCP client.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="font-medium">
                                MCP-UI Resource:
                            </span>
                            <code className="bg-white px-2 py-1 rounded text-xs">
                                ui://mcp-aharvard/seat-selection
                            </code>
                        </div>
                    </div>
                    <MCPUIResourceRenderer
                        resource={createWeatherResource().resource}
                    />
                </div>
            </div>
        </div>
    );
}
