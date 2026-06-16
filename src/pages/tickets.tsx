import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";

const INITIAL_TICKETS = [
  { id: "INC-4592", subject: "Network latency in Plant B", category: "Incident", priority: "High", status: "Open", assignee: "Alex Turner", date: "2026-06-13" },
  { id: "REQ-8821", subject: "New workstation setup for R&D team", category: "Request", priority: "Medium", status: "In Progress", assignee: "Sarah Chen", date: "2026-06-12" },
  { id: "INC-4588", subject: "ERP system access error for Finance", category: "Incident", priority: "High", status: "Resolved", assignee: "Mike Johnson", date: "2026-06-12" },
  { id: "REQ-8815", subject: "Software license renewal - Autodesk", category: "Request", priority: "Low", status: "Closed", assignee: "System", date: "2026-06-11" },
  { id: "INC-4570", subject: "Printer jam in Logistics department", category: "Incident", priority: "Medium", status: "Open", assignee: "Alex Turner", date: "2026-06-11" },
  { id: "REQ-8800", subject: "VPN access request for remote contractor", category: "Request", priority: "Medium", status: "In Progress", assignee: "Sarah Chen", date: "2026-06-10" },
  { id: "INC-4560", subject: "Email delivery failure - Exchange issue", category: "Incident", priority: "High", status: "Resolved", assignee: "Mike Johnson", date: "2026-06-10" },
  { id: "REQ-8790", subject: "New badge access for Warehouse B", category: "Request", priority: "Low", status: "Closed", assignee: "System", date: "2026-06-09" },
];

const PRIORITY_STYLE: Record<string, string> = {
  High: "border-red-200 text-red-700 bg-red-50",
  Medium: "border-amber-200 text-amber-700 bg-amber-50",
  Low: "border-emerald-200 text-emerald-700 bg-emerald-50",
};

const STATUS_DOT: Record<string, string> = {
  Open: "bg-red-500",
  "In Progress": "bg-amber-500",
  Resolved: "bg-emerald-500",
  Closed: "bg-gray-400",
};

const EMPTY_FORM = { subject: "", description: "", category: "Incident", priority: "Medium", assignee: "" };

export default function Tickets() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const statuses = ["All", "Open", "In Progress", "Resolved", "Closed"];
  const filtered = filter === "All" ? tickets : tickets.filter((t) => t.status === filter);

  const STATS = [
    { label: "Open", count: tickets.filter((t) => t.status === "Open").length, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { label: "In Progress", count: tickets.filter((t) => t.status === "In Progress").length, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "Resolved", count: tickets.filter((t) => t.status === "Resolved").length, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Closed", count: tickets.filter((t) => t.status === "Closed").length, color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
  ];

  const handleSubmit = () => {
    if (!form.subject) return;
    setSaving(true);
    setTimeout(() => {
      const prefix = form.category === "Incident" ? "INC" : "REQ";
      const nextNum = tickets.filter((t) => t.id.startsWith(prefix)).length + 4600;
      const newId = `${prefix}-${nextNum}`;
      setTickets([
        { id: newId, subject: form.subject, category: form.category, priority: form.priority, status: "Open", assignee: form.assignee || "Unassigned", date: "2026-06-13" },
        ...tickets,
      ]);
      setForm(EMPTY_FORM);
      setSaving(false);
      setOpen(false);
    }, 600);
  };

  return (
    <DashboardLayout pageTitle="Ticket Management" pageSubtitle="Track and manage all IT incidents and service requests.">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} p-4`}>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              data-testid={`filter-${s.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === s
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search tickets..." className="pl-10 w-56" data-testid="input-ticket-search" />
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={() => setOpen(true)}
            data-testid="button-new-ticket"
          >
            <Plus className="h-4 w-4" /> New Ticket
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Assignee</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((ticket) => (
                <tr key={ticket.id} data-testid={`row-ticket-${ticket.id}`} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-blue-600">{ticket.id}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{ticket.subject}</td>
                  <td className="px-6 py-4 text-gray-500">{ticket.category}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={PRIORITY_STYLE[ticket.priority]}>{ticket.priority}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${STATUS_DOT[ticket.status]}`} />
                      <span className="text-gray-600">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{ticket.assignee}</td>
                  <td className="px-6 py-4 text-gray-500">{ticket.date}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">No tickets in this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Ticket Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogDescription>Submit a new IT incident or service request.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="ticket-subject">Subject <span className="text-red-500">*</span></Label>
              <Input
                id="ticket-subject"
                placeholder="Brief description of the issue"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                data-testid="modal-input-ticket-subject"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ticket-desc">Description</Label>
              <Textarea
                id="ticket-desc"
                placeholder="Provide additional details..."
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                data-testid="modal-input-ticket-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger data-testid="modal-select-ticket-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Incident">Incident</SelectItem>
                    <SelectItem value="Request">Service Request</SelectItem>
                    <SelectItem value="Change">Change</SelectItem>
                    <SelectItem value="Problem">Problem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger data-testid="modal-select-ticket-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Assign To</Label>
              <Select value={form.assignee} onValueChange={(v) => setForm({ ...form, assignee: v })}>
                <SelectTrigger data-testid="modal-select-ticket-assignee">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alex Turner">Alex Turner</SelectItem>
                  <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  <SelectItem value="Alice Smith">Alice Smith</SelectItem>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setOpen(false); setForm(EMPTY_FORM); }} data-testid="modal-button-cancel">
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSubmit}
              disabled={saving || !form.subject}
              data-testid="modal-button-save-ticket"
            >
              {saving ? "Submitting..." : "Submit Ticket"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
