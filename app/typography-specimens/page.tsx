"use client";

import { useState } from "react";
import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import TypographySpecimens from "../../netlify/mcp-server/tools/TypographySpecimens";
import { Type, Palette, Eye } from "lucide-react";
import Navigation from "../../components/Navigation";

export default function TypographySpecimensPage() {
    const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
        "medium"
    );
    const [showPangrams, setShowPangrams] = useState<boolean>(true);

    // Create UI resource based on current settings
    const createTypographyResource = () => {
        return createUIResource({
            uri: `ui://mcp-aharvard/typography-specimens`,
            content: {
                type: "rawHtml",
                htmlString: TypographySpecimens({ fontSize, showPangrams }),
            },
            encoding: "text",
        });
    };

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/30 to-zinc-50/50">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
                            <Type className="w-4 h-4" />
                            Open Source Typefaces
                        </div>
                        <div className="flex justify-center items-center gap-4 mb-6">
                            <Palette className="w-10 h-10 text-purple-600" />
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
                                Typography Specimens
                            </h1>
                            <Eye className="w-10 h-10 text-purple-600" />
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Explore beautiful open-source typefaces from Google
                            Fonts featuring Inter, Playfair Display, JetBrains
                            Mono, and Outfit
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Eye className="w-6 h-6 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Display Options
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Customize how the typography specimens are displayed
                            below. Choose from different sizes and toggle
                            additional samples.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Font Size
                                </label>
                                <div className="flex gap-3">
                                    {(
                                        ["small", "medium", "large"] as const
                                    ).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setFontSize(size)}
                                            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 capitalize ${
                                                fontSize === size
                                                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg scale-105"
                                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Additional Samples
                                </label>
                                <button
                                    onClick={() =>
                                        setShowPangrams(!showPangrams)
                                    }
                                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                        showPangrams
                                            ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {showPangrams
                                        ? "✓ Showing Pangrams"
                                        : "Show Pangrams"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Type className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                MCP-UI Typography Resource Preview
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            This section displays the typography specimens as
                            rendered by MCP-UI. The content below is generated
                            from an MCP-UI resource that can be embedded in any
                            MCP client. All fonts are loaded dynamically from
                            Google Fonts CDN.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="font-medium">
                                    MCP-UI Resource:
                                </span>
                                <code className="bg-white px-2 py-1 rounded text-xs">
                                    ui://mcp-aharvard/typography-specimens
                                </code>
                            </div>
                        </div>
                        <MCPUIResourceRenderer
                            resource={createTypographyResource().resource}
                        />
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 border-l-4 border-l-blue-500">
                            <div className="mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                    <Type className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Inter
                                </h3>
                                <p className="text-xs text-blue-600 font-medium mb-2">
                                    SANS-SERIF
                                </p>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Modern, versatile sans-serif perfect for UI and
                                body text
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-red-100 border-l-4 border-l-red-500">
                            <div className="mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                                    <Type className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Playfair Display
                                </h3>
                                <p className="text-xs text-red-600 font-medium mb-2">
                                    SERIF
                                </p>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Elegant high-contrast serif ideal for headings
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-green-100 border-l-4 border-l-green-500">
                            <div className="mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                                    <Type className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    JetBrains Mono
                                </h3>
                                <p className="text-xs text-green-600 font-medium mb-2">
                                    MONOSPACE
                                </p>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Developer-friendly monospace with ligatures
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 border-l-4 border-l-purple-500">
                            <div className="mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                                    <Type className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Outfit
                                </h3>
                                <p className="text-xs text-purple-600 font-medium mb-2">
                                    DISPLAY
                                </p>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Geometric sans-serif with rounded terminals
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
