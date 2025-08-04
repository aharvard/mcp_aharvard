"use client";

import Link from "next/link";
import {
    Github,
    FileText,
    ArrowRight,
    Code,
    CheckCircle,
    Database,
    FolderOpen,
    Zap,
    Cloud,
    Settings,
    Sparkles,
    Globe,
    Users,
    User,
    Terminal,
} from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
            <div className="container mx-auto px-6 py-16 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        MCP-UI Sandbox
                    </div>
                    <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight leading-tight">
                        MCP-UI Demos
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Preview MCP-UI examples: real-time weather data,
                        interactive seat selection, and dynamic UI actions.
                    </p>
                    <div className="flex justify-center gap-6 mb-16">
                        <a
                            href="https://github.com/aharvard/mcp_aharvard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl border border-gray-200"
                        >
                            <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            View on GitHub
                        </a>
                        <a
                            href="https://github.com/idosal/mcp-ui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
                        >
                            <FileText className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            Read MCP-UI Docs
                        </a>
                    </div>
                </div>

                {/* Demo Links */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    <Link href="/get-weather" className="group block">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 hover:border-blue-200 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Cloud className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                    Weather Demo
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Preview an MCP-UI resource that displays
                                    real-time weather data from Open-Meteo API
                                    with beautiful visualizations
                                </p>
                                <div className="flex items-center text-blue-500 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                    Explore Demo
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/pick-seat" className="group block">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 hover:border-green-200 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                                    Seat Selection
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Preview an MCP-UI resource that provides an
                                    interactive seat picker with visual feedback
                                    and real-time updates
                                </p>
                                <div className="flex items-center text-green-500 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                    Explore Demo
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/ui-actions" className="group block">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 hover:border-purple-200 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                                    UI Actions
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Preview an MCP-UI resource that demonstrates
                                    different types of message actions and user
                                    interactions
                                </p>
                                <div className="flex items-center text-purple-500 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                    Explore Demo
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* What is this site? */}
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            What is this site?
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        This is a sandbox for exploring and showcasing MCP-UI
                        examples. It provides a hands-on environment to test and
                        visualize the capabilities of Model Context Protocol UI
                        components.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg flex-shrink-0">
                                    <Code className="w-4 h-4 text-blue-600" />
                                </div>
                                <p className="text-gray-700">
                                    View UI components that can be rendered by
                                    MCP-UI clients
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg flex-shrink-0">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-gray-700">
                                    Simulate tool calls and user interactions
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg flex-shrink-0">
                                    <Database className="w-4 h-4 text-purple-600" />
                                </div>
                                <p className="text-gray-700">
                                    Debug message passing between MCP servers
                                    and UI clients
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg flex-shrink-0">
                                    <FolderOpen className="w-4 h-4 text-orange-600" />
                                </div>
                                <p className="text-gray-700">
                                    Prototype new UI patterns for MCP
                                    applications
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg flex-shrink-0">
                                    <Zap className="w-4 h-4 text-red-600" />
                                </div>
                                <p className="text-gray-700">
                                    Test real-time data flows and state
                                    management
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg flex-shrink-0">
                                    <Settings className="w-4 h-4 text-indigo-600" />
                                </div>
                                <p className="text-gray-700">
                                    Explore advanced MCP-UI features and
                                    capabilities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How to Use */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                                <Terminal className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                For Developers
                            </h3>
                        </div>
                        <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="text-gray-400 ml-2">
                                    Terminal
                                </span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400 font-bold">
                                        $
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-white mb-1">
                                            # Clone the repository
                                        </div>
                                        <code className="block text-green-400">
                                            git clone
                                            https://github.com/aharvard/mcp_aharvard
                                        </code>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400 font-bold">
                                        $
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-white mb-1">
                                            # Install dependencies
                                        </div>
                                        <code className="block text-green-400">
                                            pnpm install
                                        </code>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400 font-bold">
                                        $
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-white mb-1">
                                            # Launch Next.js development server
                                        </div>
                                        <code className="block text-green-400">
                                            pnpm dev
                                        </code>
                                        <div className="text-gray-400 text-xs mt-1">
                                            → Starts the development server at
                                            localhost:3000
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400 font-bold">
                                        $
                                    </span>
                                    <div className="flex-1">
                                        <div className="text-white mb-1">
                                            # Launch MCP Inspector
                                        </div>
                                        <code className="block text-green-400">
                                            pnpm inspect
                                        </code>
                                        <div className="text-gray-400 text-xs mt-1">
                                            → Opens the MCP Inspector to test
                                            the MCP server
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                For MCP Clients
                            </h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold">
                                    1
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 mb-3">
                                        Add as extension in your MCP client
                                    </p>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-blue-900">
                                                For Goose users:
                                            </span>
                                            <a
                                                href="https://block.github.io/goose/docs/getting-started/using-extensions"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                View extension setup guide
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold">
                                    2
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 mb-2">
                                        HTTP Endpoint:
                                    </p>
                                    <code className="block bg-gray-100 rounded-lg px-3 py-2 text-sm font-mono text-gray-800 mb-2">
                                        https://mcp-aharvard.netlify.app/mcp
                                    </code>
                                    <p className="text-gray-600 text-sm">
                                        HTTP type MCP server with streaming
                                        transport
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold">
                                    3
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        Timeout: 300 seconds
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold">
                                    4
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 mb-4">
                                        Test with these examples:
                                    </p>
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Cloud className="w-5 h-5 text-blue-500" />
                                                <h4 className="text-base font-semibold text-gray-900">
                                                    Weather Demo:
                                                </h4>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                                    <code className="text-sm font-mono text-gray-800">
                                                        "What's the weather in
                                                        New York?"
                                                    </code>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                                    <code className="text-sm font-mono text-gray-800">
                                                        "Get weather for Los
                                                        Angeles"
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <User className="w-5 h-5 text-green-500" />
                                                <h4 className="text-base font-semibold text-gray-900">
                                                    Seat Selection:
                                                </h4>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                                    <code className="text-sm font-mono text-gray-800">
                                                        "Show me available seats
                                                        for flight AA1234"
                                                    </code>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                                    <code className="text-sm font-mono text-gray-800">
                                                        "I want to select seat
                                                        2A"
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Zap className="w-5 h-5 text-purple-500" />
                                                <h4 className="text-base font-semibold text-gray-900">
                                                    UI Actions:
                                                </h4>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                                    <code className="text-sm font-mono text-gray-800">
                                                        "Show me the tool
                                                        actions"
                                                    </code>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                                    <code className="text-sm font-mono text-gray-800">
                                                        "Demonstrate the prompt
                                                        action"
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
