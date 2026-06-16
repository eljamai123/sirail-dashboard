import React, { useState } from "react";
import { Search, Plus, Shield, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard-layout";

const INITIAL_USERS = [
  { id: "USR-001", name: "Administrator", email: "admin@sirail.com", role: "IT Admin", department: "Information Technology", status: "Active", lastLogin: "2026-06-13" },
  { id: "USR-002", name: "Alice Smith", email: "a.smith@sirail.com", role: "IT Engineer", department: "Information Technology", status: "Active", lastLogin: "2026-06-13" },
  { id: "USR-003", name: "John Doe", email: "j.doe@sirail.com", role: "IT Technician", department: "Information Technology", status: "Active", lastLogin: "2026-06-12" },
  { id: "USR-004", name: "Sarah Chen", email: "s.chen@sirail.com", role: "IT Engineer", department: "Information Technology", status: "Active", lastLogin: "2026-06-12" },
  { id: "USR-005", name: "Mike Johnson", email: "m.johnson@sirail.com", role: "Systems Admin", department: "Infrastructure", status: "Active", lastLogin: "2026-06-11" },
  { id: "USR-006", name: "Claire Dubois", email: "c.dubois@sirail.com", role: "Project Manager", department: "Operations", status: "Active", lastLogin: "2026-06-10" },
  { id: "USR-007", name: "Alex Turner", email: "a.turner@sirail.com", role: "Network Engineer", department: "Infrastructure", status: "Active", lastLogin: "2026-06-13" },
  { id: "USR-008", name: "Maria Santos", email: "m.santos@sirail.com", role: "Finance Analyst", department: "Finance", status: "Inactive", lastLogin: "2026-05-20" },
];

const ROLE_STYLE: Record<string, string> = {
  "IT Admin": "border-blue-200 text-blue-700 bg-blue-50",
  "IT Engineer": "border-indigo-200 text-indigo-700 bg-indigo-50",
  "IT Technician": "border-cyan-200 text-cyan-700 bg-cyan-50",
  "Systems Admin": "border-violet-200 text-violet-700 bg-violet-50",
  "Network Engineer": "border-sky-200 text-sky-700 bg-sky-50",
  "Project Manager": "border-emerald-200 text-emerald-700 bg-emerald-50",
  "Finance Analyst": "border-amber-200 text-amber-700 bg-amber-50",
};

const EMPTY_FORM = { name: "", email: "", role: "", department: "", status: "Active" };

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function Users() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const activeCount = users.filter((u) => u.status === "Active").length;
  const inactiveCount = users.filter((u) => u.status === "Inactive").length;
  const adminCount = users.filter((u) => u.role === "IT Admin").length;

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.role) return;
    setSaving(true);
    setTimeout(() => {
      const newId = `USR-${String(users.length + 1).padStart(3, "0")}`;
      setUsers([...users, { id: newId, ...form, lastLogin: "Never" }]);
      setForm(EMPTY_FORM);
      setSaving(false);
      setOpen(false);
    }, 600);
  };

  return (
    <DashboardLayout pageTitle="User Management" pageSubtitle="Manage employee accounts, roles and access levels.">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length.toLocaleString(), icon: UserCheck, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active", value: activeCount.toLocaleString(), icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Inactive", value: inactiveCount.toLocaleString(), icon: UserCheck, color: "text-gray-500", bg: "bg-gray-50" },
          { label: "Admins", value: adminCount.toLocaleString(), icon: Shield, color: "text-violet-600", bg: "bg-violet-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search users..." className="pl-10" data-testid="input-user-search" />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          onClick={() => setOpen(true)}
          data-testid="button-add-user"
        >
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Last Login</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} data-testid={`row-user-${user.id}`} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">{initials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={ROLE_STYLE[user.role] ?? "border-gray-200 text-gray-600 bg-gray-50"}>{user.role}</Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.department}</td>
                  <td className="px-6 py-4 text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                      <span className={user.status === "Active" ? "text-emerald-700" : "text-gray-500"}>{user.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Provision a new employee account in the SIRAIL portal.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="user-name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="user-name"
                placeholder="e.g. Jane Dupont"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-testid="modal-input-user-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="user-email">Corporate Email <span className="text-red-500">*</span></Label>
              <Input
                id="user-email"
                type="email"
                placeholder="name@sirail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                data-testid="modal-input-user-email"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Role <span className="text-red-500">*</span></Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                  <SelectTrigger data-testid="modal-select-user-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT Admin">IT Admin</SelectItem>
                    <SelectItem value="IT Engineer">IT Engineer</SelectItem>
                    <SelectItem value="IT Technician">IT Technician</SelectItem>
                    <SelectItem value="Systems Admin">Systems Admin</SelectItem>
                    <SelectItem value="Network Engineer">Network Engineer</SelectItem>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="Finance Analyst">Finance Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger data-testid="modal-select-user-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v })}>
                <SelectTrigger data-testid="modal-select-user-department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Research & Development">Research &amp; Development</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
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
              disabled={saving || !form.name || !form.email || !form.role}
              data-testid="modal-button-save-user"
            >
              {saving ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
