import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Server, MonitorSmartphone, Ticket,
  Users, FileBarChart, Settings, LogOut, Search,
  Bell, ChevronDown, Menu, AlertTriangle, CheckCircle2,
  Info, Clock, User
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Assets",    icon: Server,           path: "/assets" },
  { name: "Inventory", icon: MonitorSmartphone, path: "/inventory" },
  { name: "Tickets",   icon: Ticket,            path: "/tickets" },
  { name: "Users",     icon: Users,             path: "/users" },
  { name: "Reports",   icon: FileBarChart,      path: "/reports" },
  { name: "Settings",  icon: Settings,          path: "/settings" },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "alert",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    title: "Network latency detected",
    desc: "Plant B — switch SW-04 is unresponsive",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "ticket",
    icon: Ticket,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Ticket INC-4592 updated",
    desc: "Alex Turner added a comment",
    time: "42 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "success",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Daily backup completed",
    desc: "All 14 servers backed up successfully",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 4,
    type: "info",
    icon: Info,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "License renewal reminder",
    desc: "Autodesk suite expires in 14 days",
    time: "1 day ago",
    unread: false,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
}

export default function DashboardLayout({ children, pageTitle, pageSubtitle }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const authData = localStorage.getItem("sirail_auth");
    if (authData) setUser(JSON.parse(authData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sirail_auth");
    setLocation("/login");
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const currentDate = new Date("2026-06-13").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-[#0a192f] text-slate-300 transition-all duration-300 flex flex-col border-r border-slate-800 z-20 shrink-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-[#061122]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0">
              <Server className="h-5 w-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-white text-lg tracking-wide">SIRAIL</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white hidden lg:block"
            data-testid="button-toggle-sidebar"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${sidebarOpen ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path || (item.path !== "/dashboard" && location.startsWith(item.path));
            return (
              <Link key={item.path} href={item.path}>
                <a
                  data-testid={`nav-${item.name.toLowerCase()}`}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 font-medium"
                      : "hover:bg-white/5 hover:text-white text-slate-400"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span>{item.name}</span>}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            data-testid="button-signout"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
              data-testid="button-menu-toggle"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden md:block w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search assets, tickets, users..."
                className="pl-10 bg-gray-50 border-gray-200 h-10 w-full rounded-full focus-visible:ring-1 focus-visible:ring-blue-500"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-sm text-gray-500 font-medium">{currentDate}</div>

            {/* Notification Bell */}
            <div className="relative">
              <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    data-testid="button-notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border border-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-0" sideOffset={8}>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-blue-600 hover:underline"
                        data-testid="button-mark-all-read"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                    {notifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <div
                          key={notif.id}
                          data-testid={`notification-item-${notif.id}`}
                          className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? "bg-blue-50/40" : ""}`}
                          onClick={() => setNotifications(notifications.map((n) => n.id === notif.id ? { ...n, unread: false } : n))}
                        >
                          <div className={`w-8 h-8 rounded-full ${notif.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Icon className={`h-4 w-4 ${notif.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 leading-snug">{notif.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.desc}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                              <Clock className="h-3 w-3" />
                              {notif.time}
                            </div>
                          </div>
                          {notif.unread && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2.5 border-t border-gray-100">
                    <button
                      className="text-xs text-blue-600 hover:underline font-medium w-full text-center"
                      data-testid="button-view-all-notifications"
                    >
                      View all notifications
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
                  data-testid="button-user-menu"
                >
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-semibold text-gray-900 leading-none">{user.name}</div>
                    <div className="text-xs text-blue-600 font-medium mt-1">{user.role}</div>
                  </div>
                  <Avatar className="h-9 w-9 border border-gray-200">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">AD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs font-normal text-gray-500 mt-0.5">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setLocation("/settings")}
                  className="cursor-pointer gap-2"
                  data-testid="menu-profile"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLocation("/settings")}
                  className="cursor-pointer gap-2"
                  data-testid="menu-settings"
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer gap-2"
                  data-testid="menu-logout"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
              {pageSubtitle && <p className="text-gray-500 mt-1">{pageSubtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
