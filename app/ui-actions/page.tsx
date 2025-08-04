import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import UIActionCard from "../../netlify/mcp-server/tools/UIActionCard";
import {
    MousePointer,
    Zap,
    Settings,
    MessageSquare,
    Link,
    Bell,
    Target,
} from "lucide-react";

export default function UIActionsPage() {
    // Create UI resource based on weather data state
    const createUIActionResource = () => {
        return createUIResource({
            uri: `ui://mcp-aharvard/ui-action-card`,
            content: {
                type: "rawHtml",
                htmlString: UIActionCard(),
            },
            encoding: "text",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-indigo-50/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        Dynamic UI Interactions
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <MousePointer className="w-10 h-10 text-purple-600" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                            UI Actions Demo
                        </h1>
                        <Zap className="w-10 h-10 text-purple-600" />
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Test different types of MCP-UI message actions and
                        explore dynamic user interactions
                    </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Target className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            MCP-UI Actions Resource Preview
                        </h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        This section displays an interactive UI actions
                        interface as rendered by MCP-UI. The content below is
                        generated from an MCP-UI resource that can be embedded
                        in any MCP client.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="font-medium">
                                MCP-UI Resource:
                            </span>
                            <code className="bg-white px-2 py-1 rounded text-xs">
                                ui://mcp-aharvard/ui-action-card
                            </code>
                        </div>
                    </div>
                    <MCPUIResourceRenderer
                        resource={createUIActionResource().resource}
                    />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquare className="w-8 h-8 text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Tool Calls
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Execute specific tools and functions with parameter
                            passing
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-8 h-8 text-green-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Prompts
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Send prompts to AI models and receive intelligent
                            responses
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Link className="w-8 h-8 text-purple-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Links
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Open external URLs and navigate to web resources
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-8 h-8 text-orange-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Intents
                            </h3>
                        </div>
                        <p className="text-gray-600">
                            Trigger specific intents and handle complex
                            workflows
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
