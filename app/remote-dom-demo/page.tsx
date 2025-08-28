"use client";

import React, { useState } from "react";
import { UIResourceRenderer, UIActionResult } from "@mcp-ui/client";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function RemoteDomDemoPage() {
  const [lastAction, setLastAction] = useState<any>(null);
  const [demoConfig, setDemoConfig] = useState({
    theme: "light" as "light" | "dark",
    showAdvanced: false,
  });

  // Mock MCP resource for the remote DOM demo
  const remoteDomResource = {
    type: "resource",
    resource: {
      uri: "ui://mcp-aharvard/remote-dom-demo",
      mimeType: "application/vnd.mcp-ui.remote-dom+javascript; framework=react",
      text: `
                // This is a placeholder - the actual script will come from the MCP server
                const container = document.createElement('div');
                container.innerHTML = '<h1>Remote DOM Demo</h1><p>This demo will be loaded from the MCP server.</p>';
                root.appendChild(container);
            `,
    },
  };

  const handleUIAction = async (result: UIActionResult) => {
    console.log("UI Action received:", result);

    if (result.type === "tool") {
      setLastAction({
        tool: result.payload.toolName,
        params: result.payload.params,
        timestamp: new Date().toISOString(),
      });
    }

    return { status: "handled" };
  };

  const handleThemeToggle = () => {
    setDemoConfig((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const handleAdvancedToggle = () => {
    setDemoConfig((prev) => ({
      ...prev,
      showAdvanced: !prev.showAdvanced,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 Remote DOM Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the power of MCP-UI Remote DOM with interactive
              components and dynamic content
            </p>
          </div>

          {/* Configuration Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Demo Configuration
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme:
                </label>
                <button
                  onClick={handleThemeToggle}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {demoConfig.theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Advanced Features:
                </label>
                <button
                  onClick={handleAdvancedToggle}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    demoConfig.showAdvanced
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  {demoConfig.showAdvanced ? "Enabled" : "Disabled"}
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> This is a demonstration page. To see the
                actual Remote DOM tool in action, use the MCP server tool{" "}
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  remote-dom-demo
                </code>
                with your preferred theme and advanced features settings.
              </p>
            </div>
          </div>

          {/* Remote DOM Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Remote DOM Interface
            </h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <UIResourceRenderer
                resource={remoteDomResource.resource}
                onUIAction={handleUIAction}
              />
            </div>
          </div>

          {/* Action Log */}
          {lastAction && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Last Action Received
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                  {JSON.stringify(lastAction, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              About Remote DOM
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Remote DOM is a powerful feature of MCP-UI that allows servers
                to define interactive UI components that are rendered using the
                host's native component library. This approach provides:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Security:</strong> Server scripts run in sandboxed
                  environments
                </li>
                <li>
                  <strong>Integration:</strong> UIs match the host application's
                  look and feel
                </li>
                <li>
                  <strong>Interactivity:</strong> Components can communicate
                  with the host via postMessage
                </li>
                <li>
                  <strong>Flexibility:</strong> Dynamic content updates and
                  theme switching
                </li>
                <li>
                  <strong>Performance:</strong> Efficient rendering using the
                  host's component system
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
