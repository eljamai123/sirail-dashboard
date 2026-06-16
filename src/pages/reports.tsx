import React from "react";
import { FileText, Download, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import DashboardLayout from "@/components/dashboard-layout";

const MONTHLY_TICKETS = [
  { month: "Jan", open: 58, resolved: 51 },
  { month: "Feb", open: 72, resolved: 68 },
  { month: "Mar", open: 65, resolved: 60 },
  { month: "Apr", open: 80, resolved: 74 },
  { month: "May", open: 55, resolved: 62 },
  { month: "Jun", open: 42, resolved: 38 },
];

const ASSET_GROWTH = [
  { month: "Jan", assets: 1180 },
  { month: "Feb", assets: 1195 },
  { month: "Mar", assets: 1210 },
  { month: "Apr", assets: 1225 },
  { month: "May", assets: 1238 },
  { month: "Jun", assets: 1247 },
];

const SAVED_REPORTS = [
  { name: "Monthly IT Summary — June 2026", type: "Operational", date: "2026-06-01", size: "2.4 MB" },
  { name: "Asset Audit Report Q2 2026", type: "Compliance", date: "2026-05-30", size: "5.1 MB" },
  { name: "Ticket Resolution SLA Report", type: "Performance", date: "2026-05-20", size: "1.8 MB" },
  { name: "Network Infrastructure Inventory", type: "Inventory", date: "2026-05-15", size: "3.2 MB" },
  { name: "User Access Review — H1 2026", type: "Security", date: "2026-04-30", size: "4.7 MB" },
];

const TYPE_STYLE: Record<string, string> = {
  Operational: "border-blue-200 text-blue-700 bg-blue-50",
  Compliance: "border-violet-200 text-violet-700 bg-violet-50",
  Performance: "border-emerald-200 text-emerald-700 bg-emerald-50",
  Inventory: "border-cyan-200 text-cyan-700 bg-cyan-50",
  Security: "border-red-200 text-red-700 bg-red-50",
};

import { Badge } from "@/components/ui/badge";

export default function Reports() {
  return (
    <DashboardLayout pageTitle="Reports" pageSubtitle="Analytics, trends, and downloadable reports for SIRAIL operations.">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg. Resolution Time", value: "4.2h", trend: "-12%", up: false },
          { label: "SLA Compliance", value: "96.4%", trend: "+1.2%", up: true },
          { label: "Assets Added (MTD)", value: "9", trend: "+3", up: true },
          { label: "Tickets Resolved (MTD)", value: "38", trend: "-8%", up: false },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-xs text-gray-500 font-medium">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
            <div className={`flex items-center gap-1 text-xs font-medium mt-1 ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>
              {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {kpi.trend} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Monthly Ticket Volume</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_TICKETS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/0.1)" }} />
                <Bar dataKey="open" name="Opened" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Asset Fleet Growth</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ASSET_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} domain={["auto", "auto"]} />
                <RechartsTooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0/0.1)" }} />
                <Line type="monotone" dataKey="assets" name="Total Assets" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Saved Reports */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Saved Reports</h3>
          <Button variant="outline" size="sm" className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50" data-testid="button-generate-report">
            <FileText className="h-4 w-4" /> Generate New
          </Button>
        </div>
        <div className="divide-y divide-gray-100">
          {SAVED_REPORTS.map((r, i) => (
            <div key={i} data-testid={`row-report-${i}`} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{r.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className={TYPE_STYLE[r.type]}>{r.type}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {r.date}
                    </span>
                    <span className="text-xs text-gray-400">{r.size}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 gap-1.5" data-testid={`button-download-report-${i}`}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
