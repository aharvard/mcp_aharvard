import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import { ToastContainer } from "../components/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MCP Weather App",
  description: "A weather app using MCP (Model Context Protocol)",
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
          <Navigation />
          {children}
        </ToastContainer>
      </body>
    </html>
  );
}
