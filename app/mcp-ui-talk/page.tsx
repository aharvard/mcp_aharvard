import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import { MCPUITalk } from "../../netlify/mcp-server/tools/MCPUITalk";

export default function UIActionsPage() {
    // Create UI resource based on weather data state
    const createUIActionResource = () => {
        return createUIResource({
            uri: `ui://mcp-aharvard/mcp-ui-talk`,
            content: {
                type: "rawHtml",
                htmlString: MCPUITalk(),
            },
            encoding: "text",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-indigo-50/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                    <MCPUIResourceRenderer
                        resource={createUIActionResource().resource}
                    />
                </div>
            </div>
        </div>
    );
}
