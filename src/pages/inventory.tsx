import React from "react";
import { Monitor, Printer, Wifi, HardDrive } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

const CATEGORIES = [
  {
    name: "Workstations & PCs",
    icon: Monitor,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    total: 562,
    items: [
      { name: "Dell OptiPlex 7090", count: 210, status: "Active" },
      { name: "Lenovo ThinkPad X1 Carbon", count: 180, status: "Active" },
      { name: "HP EliteDesk 800", count: 120, status: "Active" },
      { name: "Apple MacBook Pro", count: 42, status: "Active" },
      { name: "Various (Legacy)", count: 10, status: "Maintenance" },
    ],
  },
  {
    name: "Printers & Copiers",
    icon: Printer,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    total: 224,
    items: [
      { name: "HP LaserJet Pro M404", count: 88, status: "Active" },
      { name: "Canon imageRUNNER", count: 64, status: "Active" },
      { name: "Epson WorkForce Pro", count: 52, status: "Active" },
      { name: "Xerox VersaLink", count: 14, status: "Active" },
      { name: "HP Color LaserJet (EOL)", count: 6, status: "Inactive" },
    ],
  },
  {
    name: "Network Equipment",
    icon: Wifi,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    total: 274,
    items: [
      { name: "Cisco Catalyst 9300 Switch", count: 42, status: "Active" },
      { name: "Ubiquiti UniFi Access Point", count: 118, status: "Active" },
      { name: "Fortinet FortiGate Firewall", count: 24, status: "Active" },
      { name: "Cisco ASR 1001-X Router", count: 18, status: "Active" },
      { name: "Juniper EX2300 (Legacy)", count: 72, status: "Active" },
    ],
  },
  {
    name: "Servers & Storage",
    icon: HardDrive,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    total: 187,
    items: [
      { name: "Dell PowerEdge R750", count: 48, status: "Active" },
      { name: "HP ProLiant DL380 Gen10", count: 36, status: "Active" },
      { name: "IBM FlashSystem 9200", count: 12, status: "Active" },
      { name: "NetApp AFF A400 (NAS)", count: 8, status: "Active" },
      { name: "VMware vSphere Hosts", count: 83, status: "Active" },
    ],
  },
];

const STATUS_COLOR: Record<string, string> = {
  Active: "text-emerald-600",
  Maintenance: "text-amber-600",
  Inactive: "text-gray-400",
};

export default function Inventory() {
  return (
    <DashboardLayout pageTitle="Inventory" pageSubtitle="Complete inventory breakdown by category across all SIRAIL sites.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.name} data-testid={`card-category-${cat.name.toLowerCase().replace(/ /g, "-")}`} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className={`p-5 border-b ${cat.border} flex items-center gap-4`}>
                <div className={`w-10 h-10 rounded-lg ${cat.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${cat.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.total.toLocaleString()} units total</p>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {cat.items.map((item, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                      <span className={`text-xs font-medium ${STATUS_COLOR[item.status]}`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
