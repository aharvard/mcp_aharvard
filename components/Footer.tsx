import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-white/80 backdrop-blur-sm border-t border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-center items-center py-4">
                    <div className="text-gray-600 text-sm">
                        <p>
                            Site and MCP-UI demos by{" "}
                            <a
                                href="https://x.com/aharvard"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @aharvard
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
