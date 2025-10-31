"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Cloud, User, Zap, Heart, Type, PlayCircle } from "lucide-react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/get-weather", label: "Get Weather", icon: Cloud },
    { href: "/pick-seat", label: "Pick Seat", icon: User },
    { href: "/ui-actions", label: "UI Actions", icon: Zap },
    { href: "/mood-trip-planner", label: "Mood Trip Planner", icon: Heart },
    { href: "/typography-specimens", label: "Typography", icon: Type },
    { href: "/media-player", label: "Media Player", icon: PlayCircle },
    // { href: "/remote-dom-demo", label: "Remote DOM", icon: Code },
];

export default function Navigation() {
    const pathname = usePathname();

    const isActiveRoute = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <NavigationMenu.Root className="flex justify-center">
                    <NavigationMenu.List className="flex gap-2 py-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActiveRoute(item.href);
                            return (
                                <NavigationMenu.Item key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                            isActive
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                        {item.label}
                                    </Link>
                                </NavigationMenu.Item>
                            );
                        })}
                    </NavigationMenu.List>
                </NavigationMenu.Root>
            </div>
        </div>
    );
}
