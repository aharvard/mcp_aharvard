"use client";

import { useState } from "react";
import { createUIResource } from "@mcp-ui/server";
import MCPUIResourceRenderer from "../../components/MCPUIResourceRenderer";
import MediaPlayer from "../../netlify/mcp-server/tools/MediaPlayer";
import { Video, Music, PlayCircle } from "lucide-react";
import Navigation from "../../components/Navigation";

export default function MediaPlayerPage() {
    const [selectedType, setSelectedType] = useState<"video" | "audio">(
        "video"
    );

    const createMediaResource = () => {
        return createUIResource({
            uri: `ui://mcp-aharvard/media-player-${selectedType}`,
            content: {
                type: "rawHtml",
                htmlString: MediaPlayer({ type: selectedType }),
            },
            encoding: "text",
        });
    };

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/50">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-6">
                            <PlayCircle className="w-4 h-4" />
                            Open Source Media Content
                        </div>
                        <div className="flex justify-center items-center gap-4 mb-6">
                            <Video className="w-10 h-10 text-purple-600" />
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                                Media Player Demo
                            </h1>
                            <Music className="w-10 h-10 text-purple-600" />
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Interactive video and audio player with open source,
                            safe-for-work content.
                        </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <PlayCircle className="w-6 h-6 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Choose Media Type
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Select whether to play video or audio content. All
                            content is open source and safe for work.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => setSelectedType("video")}
                                className={`p-6 rounded-xl font-medium transition-all duration-200 text-left ${
                                    selectedType === "video"
                                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Video className="w-6 h-6" />
                                    <span className="text-lg font-bold">
                                        Video
                                    </span>
                                </div>
                                <p
                                    className={`text-sm ${
                                        selectedType === "video"
                                            ? "text-white/90"
                                            : "text-gray-600"
                                    }`}
                                >
                                    Big Buck Bunny - Open source animated short
                                    film from Blender Foundation
                                </p>
                            </button>

                            <button
                                onClick={() => setSelectedType("audio")}
                                className={`p-6 rounded-xl font-medium transition-all duration-200 text-left ${
                                    selectedType === "audio"
                                        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Music className="w-6 h-6" />
                                    <span className="text-lg font-bold">
                                        Audio
                                    </span>
                                </div>
                                <p
                                    className={`text-sm ${
                                        selectedType === "audio"
                                            ? "text-white/90"
                                            : "text-gray-600"
                                    }`}
                                >
                                    Test Audio - Public domain audio file from
                                    Internet Archive
                                </p>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Video className="w-6 h-6 text-purple-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                MCP-UI Media Player Resource
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            This section displays the media player as rendered
                            by MCP-UI. The player supports both video and audio
                            content with full controls.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="font-medium">
                                    MCP-UI Resource:
                                </span>
                                <code className="bg-white px-2 py-1 rounded text-xs">
                                    ui://mcp-aharvard/media-player-
                                    {selectedType}
                                </code>
                            </div>
                        </div>
                        <MCPUIResourceRenderer
                            resource={createMediaResource().resource}
                        />
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Video className="w-8 h-8 text-purple-500" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Open Source Video
                                </h3>
                            </div>
                            <p className="text-gray-600">
                                Big Buck Bunny and Elephant's Dream are open
                                movies from the Blender Foundation, released
                                under Creative Commons
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Music className="w-8 h-8 text-pink-500" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Royalty-Free Audio
                                </h3>
                            </div>
                            <p className="text-gray-600">
                                Ambient music tracks from Pixabay, free to use
                                for any project without attribution
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <PlayCircle className="w-8 h-8 text-blue-500" />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Full Controls
                                </h3>
                            </div>
                            <p className="text-gray-600">
                                Native HTML5 video and audio players with play,
                                pause, volume, and seek controls
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
