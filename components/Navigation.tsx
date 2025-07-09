"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Settings, Home, Plus } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Events",
      icon: <Home className="w-4 h-4" />,
      active: pathname === "/"
    },
    {
      href: "/manage",
      label: "Manage",
      icon: <Settings className="w-4 h-4" />,
      active: pathname.startsWith("/manage")
    },
    {
      href: "/manage/events/create",
      label: "Create Event",
      icon: <Plus className="w-4 h-4" />,
      active: pathname === "/manage/events/create"
    }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Attend-Sure</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 ${
                    item.active
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
