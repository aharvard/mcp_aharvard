"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/get-weather", label: "Get Weather" },
  { href: "/pick-seat", label: "Pick Seat" },
  // { href: "/toast-demo", label: "Toast Demo" },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root className="w-full flex justify-center bg-white border-b border-gray-200 shadow-sm">
      <NavigationMenu.List className="flex gap-6 py-4">
        {navItems.map((item) => (
          <NavigationMenu.Item key={item.href}>
            <Link
              href={item.href}
              className={`text-lg font-medium px-3 py-1 rounded transition-colors duration-150 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
