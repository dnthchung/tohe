"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import {
  LayoutDashboard,
  CheckSquare,
  Grid3X3,
  MessageSquare,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useMediaQuery } from "../hooks/use-media-query";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: Grid3X3, label: "Apps", href: "/apps" },
    { icon: MessageSquare, label: "Chat", href: "/chat", badge: "3" },
    { icon: Users, label: "Users", href: "/users" },
  ];

  const otherItems = [
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help Center", href: "/help" },
  ];

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="font-semibold">Shadow Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={isMobile ? toggleMobileSidebar : toggleSidebar}
          className="text-white hover:bg-slate-800"
        >
          <ChevronLeft className={cn("h-5 w-5", collapsed && "rotate-180")} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <div className="px-4 py-2">
            {!collapsed && (
              <p className="text-xs font-semibold text-slate-400">Other</p>
            )}
          </div>
          <nav className="grid gap-1 px-2">
            {otherItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar || "/placeholder.svg"}
              alt={user?.name}
            />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-1 items-center justify-between">
              <div className="text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          className="fixed left-4 top-4 z-50 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {isMobile ? (
        <div
          className={cn(
            "fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleMobileSidebar}
          />
          <div className="relative h-full w-64">{sidebarContent}</div>
        </div>
      ) : (
        sidebarContent
      )}
    </>
  );
}
