import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import MoodTripPlanner from "../../netlify/mcp-server/tools/MoodTripPlanner";
import { Heart, Compass, MapPin, Sparkles } from "lucide-react";

export default function MoodTripPlannerPage() {
    // Create UI resource for mood trip planner
    const createMoodTripResource = () => {
        return createUIResource({
            uri: `ui://mcp-aharvard/mood-trip-planner`,
            content: {
                type: "rawHtml",
                htmlString: MoodTripPlanner(),
            },
            encoding: "text",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-indigo-50/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
                        <Heart className="w-4 h-4" />
                        Mood-Based Trip Planning
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <Compass className="w-10 h-10 text-purple-600" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                            Mood Trip Planner Demo
                        </h1>
                        <Sparkles className="w-10 h-10 text-purple-600" />
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Plan your perfect trip based on how you're feeling! Select your mood with big emoji buttons and discover amazing destinations with beautiful animations.
                    </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            MCP-UI Mood Trip Planner Resource Preview
                        </h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        This section displays an interactive mood-based trip planner interface as rendered by MCP-UI. Choose from 6 different moods with large emoji buttons, enjoy smooth animations, and get personalized destination recommendations!
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">🏔️</div>
                            <div className="font-semibold text-purple-700">Adventurous</div>
                            <div className="text-sm text-gray-600">Seeking thrills</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">🏖️</div>
                            <div className="font-semibold text-blue-700">Relaxed</div>
                            <div className="text-sm text-gray-600">Need peace</div>
                        </div>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">🏛️</div>
                            <div className="font-semibold text-amber-700">Cultural</div>
                            <div className="text-sm text-gray-600">Explore history</div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="font-medium">
                                MCP-UI Resource:
                            </span>
                            <code className="bg-white px-2 py-1 rounded text-xs">
                                ui://mcp-aharvard/mood-trip-planner
                            </code>
                        </div>
                    </div>
                    
                    <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-l-4 border-purple-500">
                        <h3 className="font-semibold text-purple-800 mb-2">✨ Interactive Features:</h3>
                        <ul className="text-sm text-purple-700 space-y-1">
                            <li>• Big emoji buttons with hover animations</li>
                            <li>• Loading spinner with sparkle effects</li>
                            <li>• Smooth destination reveal animations</li>
                            <li>• Curated destinations based on mood</li>
                            <li>• Responsive design for all devices</li>
                        </ul>
                    </div>
                    
                    <MCPUIResourceRenderer
                        resource={createMoodTripResource().resource}
                    />
                </div>
            </div>
        </div>
    );
}
