import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import { ToastContainer } from "../components/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MCP-UI Demos",
    description:
        "Preview MCP-UI examples in a demo environment. Test real-time weather data, interactive seat selection, and dynamic UI actions. Explore Model Context Protocol UI components.",
    keywords: [
        "MCP-UI",
        "Model Context Protocol",
        "UI components",
        "sandbox",
        "preview",
        "weather data",
        "seat selection",
        "UI actions",
        "interactive demos",
    ],
    authors: [{ name: "aharvard" }],
    creator: "aharvard",
    openGraph: {
        title: "MCP-UI Demos",
        description:
            "Preview MCP-UI examples in a demo environment. Test real-time weather data, interactive seat selection, and dynamic UI actions.",
        type: "website",
        url: "https://mcp-aharvard.netlify.app",
    },
    twitter: {
        card: "summary_large_image",
        title: "MCP-UI Demos",
        description:
            "Preview MCP-UI examples in a demo environment. Test real-time weather data, interactive seat selection, and dynamic UI actions.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer>
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </ToastContainer>
            </body>
        </html>
    );
}
