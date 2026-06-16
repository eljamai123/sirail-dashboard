import React from "react";
import { useLocation, Link } from "wouter";
import {
  Server, MonitorSmartphone, Ticket, Users,
  TrendingUp, Clock, CheckCircle2
} from "lucide-react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard-layout";

const TICKET_DATA = [
  { name: "Open", value: 42, fill: "#ef4444" },
  { name: "In Progress", value: 28, fill: "#f59e0b" },
  { name: "Resolved", value: 156, fill: "#10b981" },
  { name: "Closed", value: 89, fill: "#64748b" },
];

const ASSET_DATA = [
  { name: "PCs", value: 45, fill: "#3b82f6" },
  { name: "Printers", value: 18, fill: "#8b5cf6" },
  { name: "Network", value: 22, fill: "#06b6d4" },
  { name: "Servers", value: 15, fill: "#1d4ed8" },
];

const RECENT_TICKETS = [
  { id: "INC-4592", subject: "Network latency in Plant B", priority: "High", status: "Open", assignee: "Alex Turner" },
  { id: "REQ-8821", subject: "New workstation setup", priority: "Medium", status: "In Progress", assignee: "Sarah Chen" },
  { id: "INC-4588", subject: "ERP system access error", priority: "High", status: "Resolved", assignee: "Mike Johnson" },
  { id: "REQ-8815", subject: "Software license renewal", priority: "Low", status: "Closed", assignee: "System" },
  { id: "INC-4570", subject: "Printer jam in Logistics", priority: "Medium", status: "Open", assignee: "Alex Turner" },
];

const ACTIVITY_FEED = [
  { id: 1, user: "John Doe", action: "added 3 new workstations", time: "10 mins ago", icon: MonitorSmartphone },
  { id: 2, user: "Alice Smith", action: "updated ticket #INC-4592", time: "1 hour ago", icon: Ticket },
  { id: 3, user: "System", action: "completed daily backup", time: "3 hours ago", icon: Server },
  { id: 4, user: "Mike Johnson", action: "resolved ticket #INC-4588", time: "5 hours ago", icon: CheckCircle2 },
  { id: 5, user: "Sarah Chen", action: "provisioned new user accounts", time: "1 day ago", icon: Users },
];

export default function Dashboard() {
  return (
    <DashboardLayout
      pageTitle="Enterprise Overview"
      pageSubtitle="Real-time status of global operations and IT infrastructure."
    >
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Assets", value: "1,247", change: "+12%", icon: Server, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Active Devices", value: "983", change: "+5%", icon: MonitorSmartphone, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "Open Tickets", value: "42", change: "-8%", icon: Ticket, color: "text-amber-600", bg: "bg-amber-100" },
          { label: "Employees", value: "3,841", change: "+2%", icon: Users, color: "text-indigo-600", bg: "bg-indigo-100" },
        ].map((stat, i) => (
          <div key={i} data-testid={`card-stat-${stat.label.toLowerCase().replace(/ /g, "-")}`} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <span className={`text-xs font-medium flex items-center ${stat.change.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${stat.change.startsWith("-") ? "rotate-180" : ""}`} />
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ASSET_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {ASSET_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {ASSET_DATA.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-sm text-gray-600 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ticket Status</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TICKET_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {TICKET_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Table & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
            <Link href="/tickets">
              <a>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50" data-testid="button-view-all-tickets">
                  View All
                </Button>
              </a>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Assignee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {RECENT_TICKETS.map((ticket, i) => (
                  <tr key={i} data-testid={`row-ticket-${ticket.id}`} className="bg-white hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{ticket.id}</td>
                    <td className="px-6 py-4 text-gray-700">{ticket.subject}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`
                        ${ticket.priority === "High" ? "border-red-200 text-red-700 bg-red-50" :
                          ticket.priority === "Medium" ? "border-amber-200 text-amber-700 bg-amber-50" :
                          "border-emerald-200 text-emerald-700 bg-emerald-50"}
                      `}>
                        {ticket.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          ticket.status === "Open" ? "bg-red-500" :
                          ticket.status === "In Progress" ? "bg-amber-500" :
                          ticket.status === "Resolved" ? "bg-emerald-500" : "bg-gray-500"
                        }`} />
                        <span className="text-gray-600">{ticket.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{ticket.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
          </div>
          <div className="p-6 flex-1">
            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {ACTIVITY_FEED.map((item, i) => (
                <div key={i} data-testid={`activity-item-${item.id}`} className="relative flex items-start gap-4 z-10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 border border-blue-100 shrink-0 shadow-sm">
                    <item.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{item.user}</span> {item.action}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
