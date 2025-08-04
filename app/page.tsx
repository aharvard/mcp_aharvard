"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">
                        MCP-UI Sandbox Demos
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Visualize and test MCP-UI components in a convenient
                        sandbox environment
                    </p>
                    <div className="flex justify-center gap-4 mb-8">
                        <a
                            href="https://github.com/aharvard/mcp_aharvard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            View on GitHub
                        </a>
                        <a
                            href="https://github.com/idosal/mcp-ui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            MCP-UI Documentation
                        </a>
                    </div>
                </div>

                {/* What is this section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        What is this Sandbox?
                    </h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 mb-4">
                            This is a <strong>visualization sandbox</strong> for
                            testing MCP-UI components and interactions. It
                            provides a convenient environment to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                            <li>
                                Test UI components that can be rendered by
                                MCP-UI clients
                            </li>
                            <li>Simulate tool calls and user interactions</li>
                            <li>
                                Debug message passing between MCP servers and UI
                                clients
                            </li>
                            <li>
                                Prototype new UI patterns for MCP applications
                            </li>
                        </ul>
                        <p className="text-gray-700">
                            The sandbox runs on{" "}
                            <strong>Netlify serverless functions</strong>,
                            making it easy to deploy and share with others
                            without managing infrastructure.
                        </p>
                    </div>
                </div>

                {/* Demo Links */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Link href="/get-weather" className="group">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">🌤️</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                Weather Demo
                            </h3>
                            <p className="text-gray-600">
                                Test the weather tool with real API calls to
                                Open-Meteo
                            </p>
                        </div>
                    </Link>
                    <Link href="/pick-seat" className="group">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">🎫</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                Seat Selection
                            </h3>
                            <p className="text-gray-600">
                                Interactive seat picker with visual feedback
                            </p>
                        </div>
                    </Link>
                    <Link href="/ui-actions" className="group">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-3xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                UI Actions
                            </h3>
                            <p className="text-gray-600">
                                Test different types of MCP-UI message actions
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Netlify Serverless Architecture */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                        Netlify Serverless Architecture
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                How it Works
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    <strong>Serverless Functions:</strong> The
                                    MCP server runs as a Netlify Function at
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        /mcp
                                    </code>{" "}
                                    endpoint.
                                </p>
                                <p>
                                    <strong>Express Integration:</strong> Uses
                                    Express.js wrapped with
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        serverless-http
                                    </code>{" "}
                                    for HTTP request handling.
                                </p>
                                <p>
                                    <strong>Stateless Design:</strong> Each
                                    request creates a new MCP server instance to
                                    ensure complete isolation between concurrent
                                    clients.
                                </p>
                                <p>
                                    <strong>Streaming Transport:</strong> Uses
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        StreamableHTTPServerTransport
                                    </code>
                                    for real-time communication.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                File Structure
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
                                <div className="text-gray-600">netlify/</div>
                                <div className="ml-4">
                                    <div className="text-gray-600">
                                        functions/
                                    </div>
                                    <div className="ml-4 text-gray-800">
                                        express-mcp-server.ts
                                    </div>
                                    <div className="text-gray-600">
                                        mcp-server/
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-gray-800">
                                            index.ts
                                        </div>
                                        <div className="text-gray-800">
                                            types.ts
                                        </div>
                                        <div className="text-gray-600">
                                            tools/
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-gray-800">
                                                getWeather.ts
                                            </div>
                                            <div className="text-gray-800">
                                                SeatSelection.ts
                                            </div>
                                            <div className="text-gray-800">
                                                UIActionCard.ts
                                            </div>
                                            <div className="text-gray-800">
                                                WeatherCard.ts
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tool Calls Documentation */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                        Available Tool Calls
                    </h2>

                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                getWeather
                            </h3>
                            <p className="text-gray-700 mb-3">
                                Fetches real-time weather data from Open-Meteo
                                API
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
                                <div className="text-gray-600">Parameters:</div>
                                <div className="ml-4">
                                    <div>
                                        <span className="text-blue-600">
                                            location
                                        </span>
                                        : string (city name)
                                    </div>
                                    <div>
                                        <span className="text-blue-600">
                                            units
                                        </span>
                                        : "metric" | "imperial"
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                SeatSelection
                            </h3>
                            <p className="text-gray-700 mb-3">
                                Interactive seat selection interface with visual
                                feedback
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
                                <div className="text-gray-600">Features:</div>
                                <div className="ml-4">
                                    <div>• Visual seat grid</div>
                                    <div>• Real-time availability</div>
                                    <div>• Selection confirmation</div>
                                </div>
                            </div>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                UIActionCard
                            </h3>
                            <p className="text-gray-700 mb-3">
                                Demonstrates various MCP-UI message types
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 text-sm font-mono">
                                <div className="text-gray-600">
                                    Message Types:
                                </div>
                                <div className="ml-4">
                                    <div>• tool - Execute specific tools</div>
                                    <div>• prompt - Send prompts to AI</div>
                                    <div>• link - Open external URLs</div>
                                    <div>
                                        • intent - Trigger specific intents
                                    </div>
                                    <div>• notify - Show notifications</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Usage Instructions */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                        How to Use
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                For Developers
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    1. <strong>Clone the repo:</strong>{" "}
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        git clone
                                        https://github.com/aharvard/mcp_aharvard
                                    </code>
                                </p>
                                <p>
                                    2. <strong>Install dependencies:</strong>{" "}
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        pnpm install
                                    </code>
                                </p>
                                <p>
                                    3. <strong>Run locally:</strong>{" "}
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        pnpm dev
                                    </code>
                                </p>
                                <p>
                                    4. <strong>Test MCP server:</strong>{" "}
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        pnpm inspect
                                    </code>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                For MCP Clients
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    1. <strong>Add as extension</strong> in your
                                    MCP client
                                </p>
                                <p>
                                    2. <strong>Endpoint:</strong>{" "}
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                        https://mcp-aharvard.netlify.app/mcp
                                    </code>
                                </p>
                                <p>
                                    3. <strong>Timeout:</strong> 300 seconds
                                </p>
                                <p>
                                    4. <strong>Test:</strong> Ask for weather in
                                    any city!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
