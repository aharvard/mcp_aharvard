import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import UIActionCard from "../../netlify/mcp-server/tools/UIActionCard";

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
        <div className="min-h-screen py-8 bg-neutral-300">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6">
                    UI Actions MCP-UI Demo
                </h1>
                <MCPUIResourceRenderer
                    resource={createUIActionResource().resource}
                />
            </div>
        </div>
    );
}
