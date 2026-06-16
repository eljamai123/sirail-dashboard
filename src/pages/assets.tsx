import React, { useState } from "react";
import { Server, Monitor, Printer, Wifi, HardDrive, Plus, Search } from "lucide-react";
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

const INITIAL_ASSETS = [
  { id: "AST-001", name: "Dell OptiPlex 7090", type: "PC", location: "HQ - Floor 2", status: "Active", assigned: "John Doe", serial: "DL9082731" },
  { id: "AST-002", name: "HP LaserJet Pro M404", type: "Printer", location: "HQ - Floor 1", status: "Active", assigned: "Shared", serial: "HP4031892" },
  { id: "AST-003", name: "Cisco Catalyst 9300", type: "Network", location: "Server Room A", status: "Active", assigned: "IT Team", serial: "CS8821004" },
  { id: "AST-004", name: "Dell PowerEdge R750", type: "Server", location: "Data Center", status: "Active", assigned: "IT Team", serial: "DL5510283" },
  { id: "AST-005", name: "Lenovo ThinkPad X1", type: "PC", location: "Plant B", status: "Maintenance", assigned: "Alice Smith", serial: "LN3312890" },
  { id: "AST-006", name: "HP Color LaserJet", type: "Printer", location: "Logistics", status: "Inactive", assigned: "Shared", serial: "HP7733012" },
  { id: "AST-007", name: "Ubiquiti UniFi AP", type: "Network", location: "Plant B", status: "Active", assigned: "IT Team", serial: "UB2209143" },
  { id: "AST-008", name: "HP ProLiant DL380", type: "Server", location: "Data Center", status: "Active", assigned: "IT Team", serial: "HP9981234" },
];

const TYPE_ICONS: Record<string, React.ElementType> = {
  PC: Monitor, Printer: Printer, Network: Wifi, Server: HardDrive,
};

const STATUS_STYLE: Record<string, string> = {
  Active: "border-emerald-200 text-emerald-700 bg-emerald-50",
  Maintenance: "border-amber-200 text-amber-700 bg-amber-50",
  Inactive: "border-gray-200 text-gray-600 bg-gray-50",
};

const EMPTY_FORM = { name: "", type: "", location: "", assigned: "", serial: "", status: "Active" };

export default function Assets() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const filtered = assets.filter((a) =>
    search === "" ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase()) ||
    a.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.name || !form.type || !form.location) return;
    setSaving(true);
    setTimeout(() => {
      const newId = `AST-${String(assets.length + 1).padStart(3, "0")}`;
      setAssets([...assets, { id: newId, ...form }]);
      setForm(EMPTY_FORM);
      setSaving(false);
      setOpen(false);
    }, 600);
  };

  return (
    <DashboardLayout pageTitle="Asset Registry" pageSubtitle="Manage and track all SIRAIL hardware assets globally.">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search assets..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-asset-search"
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          onClick={() => setOpen(true)}
          data-testid="button-add-asset"
        >
          <Plus className="h-4 w-4" /> Add Asset
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Asset ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Assigned To</th>
                <th className="px-6 py-4 font-medium">Serial</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((asset) => {
                const Icon = TYPE_ICONS[asset.type] ?? Server;
                return (
                  <tr key={asset.id} data-testid={`row-asset-${asset.id}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-medium text-gray-700">{asset.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{asset.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon className="h-4 w-4 text-blue-500" />
                        {asset.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{asset.location}</td>
                    <td className="px-6 py-4 text-gray-600">{asset.assigned}</td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{asset.serial}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={STATUS_STYLE[asset.status]}>{asset.status}</Badge>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-400 text-sm">No assets match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Asset Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>Register a new hardware asset to the SIRAIL inventory.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="asset-name">Asset Name <span className="text-red-500">*</span></Label>
              <Input
                id="asset-name"
                placeholder="e.g. Dell OptiPlex 7090"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-testid="modal-input-asset-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Type <span className="text-red-500">*</span></Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger data-testid="modal-select-asset-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PC">PC / Workstation</SelectItem>
                  <SelectItem value="Printer">Printer / Copier</SelectItem>
                  <SelectItem value="Network">Network Equipment</SelectItem>
                  <SelectItem value="Server">Server / Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="asset-location">Location <span className="text-red-500">*</span></Label>
              <Input
                id="asset-location"
                placeholder="e.g. HQ - Floor 3"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                data-testid="modal-input-asset-location"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="asset-assigned">Assigned To</Label>
                <Input
                  id="asset-assigned"
                  placeholder="e.g. John Doe"
                  value={form.assigned}
                  onChange={(e) => setForm({ ...form, assigned: e.target.value })}
                  data-testid="modal-input-asset-assigned"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="asset-serial">Serial Number</Label>
                <Input
                  id="asset-serial"
                  placeholder="e.g. SN12345"
                  value={form.serial}
                  onChange={(e) => setForm({ ...form, serial: e.target.value })}
                  data-testid="modal-input-asset-serial"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger data-testid="modal-select-asset-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
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
              disabled={saving || !form.name || !form.type || !form.location}
              data-testid="modal-button-save-asset"
            >
              {saving ? "Saving..." : "Add Asset"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
