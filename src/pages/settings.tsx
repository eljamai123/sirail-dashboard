import React, { useState } from "react";
import { User, Lock, Bell, Globe, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/dashboard-layout";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "system", label: "System", icon: Globe },
  { id: "permissions", label: "Permissions", icon: Shield },
];

const NOTIFICATION_PREFS = [
  { label: "New ticket assigned to me", enabled: true },
  { label: "Ticket status changed", enabled: true },
  { label: "Asset added or removed", enabled: false },
  { label: "New user provisioned", enabled: true },
  { label: "System alerts and warnings", enabled: true },
  { label: "Weekly summary digest", enabled: false },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifs, setNotifs] = useState(NOTIFICATION_PREFS);

  return (
    <DashboardLayout pageTitle="Settings" pageSubtitle="Manage your account preferences and system configuration.">
      <div className="flex gap-6">
        {/* Section Nav */}
        <aside className="w-52 shrink-0">
          <nav className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  data-testid={`settings-nav-${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-gray-100 last:border-0 ${
                    isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Section Content */}
        <div className="flex-1">
          {activeSection === "profile" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
              <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="Administrator" data-testid="input-full-name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Corporate Email</Label>
                  <Input id="email" type="email" defaultValue="admin@sirail.com" data-testid="input-email" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Information Technology" data-testid="input-department" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="IT Admin" disabled className="bg-gray-50" data-testid="input-role" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+33 1 23 45 67 89" data-testid="input-phone" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location">Office Location</Label>
                  <Input id="location" defaultValue="Paris HQ" data-testid="input-location" />
                </div>
              </div>
              <div className="pt-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" data-testid="button-save-profile">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
              <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-4">Security Settings</h3>
              <div className="space-y-5 max-w-md">
                <div className="space-y-1.5">
                  <Label htmlFor="current-pw">Current Password</Label>
                  <Input id="current-pw" type="password" placeholder="••••••••" data-testid="input-current-password" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-pw">New Password</Label>
                  <Input id="new-pw" type="password" placeholder="••••••••" data-testid="input-new-password" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-pw">Confirm New Password</Label>
                  <Input id="confirm-pw" type="password" placeholder="••••••••" data-testid="input-confirm-password" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" data-testid="button-change-password">
                  <Lock className="h-4 w-4" /> Update Password
                </Button>
              </div>
              <div className="border-t border-gray-100 pt-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Multi-Factor Authentication</h4>
                <p className="text-sm text-gray-500 mb-3">MFA is <span className="font-medium text-emerald-600">enabled</span> on your account via Microsoft Authenticator.</p>
                <Button variant="outline" size="sm" className="text-gray-600" data-testid="button-manage-mfa">Manage MFA Devices</Button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
              <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {notifs.map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{pref.label}</span>
                    <button
                      data-testid={`toggle-notif-${i}`}
                      onClick={() => setNotifs(notifs.map((n, j) => j === i ? { ...n, enabled: !n.enabled } : n))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pref.enabled ? "bg-blue-600" : "bg-gray-200"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${pref.enabled ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2" data-testid="button-save-notifications">
                <Save className="h-4 w-4" /> Save Preferences
              </Button>
            </div>
          )}

          {(activeSection === "system" || activeSection === "permissions") && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-4">
                {activeSection === "system" ? "System Configuration" : "Role & Permissions"}
              </h3>
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-blue-400" />
                </div>
                <p className="text-gray-500 text-sm">
                  {activeSection === "system"
                    ? "System-level configuration is managed by the infrastructure team. Contact your system administrator."
                    : "Role and permission management requires elevated privileges. Contact your IT Admin."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
