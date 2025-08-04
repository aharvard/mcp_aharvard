import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import SeatSelection from "../../netlify/mcp-server/tools/SeatSelection";
import { User, Users, Ticket, MapPin, Clock, Star } from "lucide-react";

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
                            Seat Selection Interface
                        </h2>
                    </div>
                    <MCPUIResourceRenderer
                        resource={createWeatherResource().resource}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-8 h-8 text-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                User Experience
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Intuitive seat selection with visual feedback and
                            confirmation
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-8 h-8 text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Real-time Updates
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Live seat availability and instant status updates
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Star className="w-8 h-8 text-yellow-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Premium Features
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Advanced selection options and premium seat
                            categories
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
