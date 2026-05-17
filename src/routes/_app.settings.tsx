import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/modules/auth/store";
import { useState, useRef } from "react";

function Settings() {
  const { user, updateProfile, isLoading } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    designation: user?.designation || "",
    avatar: user?.avatar || "",
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [success, setSuccess] = useState("");

  const handleProfileSave = async () => {
    try {
      await updateProfile(profile);
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      /* ignore error */
    }
  };

  const handlePasswordSave = async () => {
    if (passwords.new !== passwords.confirm) return alert("Passwords do not match");
    try {
      await updateProfile({ ...profile, password: passwords.current, newPassword: passwords.new });
      setSuccess("Password changed successfully");
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      /* ignore error */
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your workspace and preferences.
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="m-3 mb-0">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <Separator className="mt-3" />
          <TabsContent value="profile" className="p-6 space-y-5">
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <div className="flex items-center gap-4">
              <img
                src={
                  profile.avatar ||
                  "https://img.magnific.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740&q=80"
                }
                className="size-16 rounded-full object-cover"
                alt="avatar"
              />
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 1024 * 1024) {
                        alert("File too large. Max 1MB allowed.");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setProfile((p) => ({ ...p, avatar: ev.target?.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  Upload photo
                </Button>
                <p className="text-xs text-muted-foreground mt-1.5">PNG or JPG, max 1MB.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1.5 block">First name</Label>
                <Input
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Last name</Label>
                <Input
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Email</Label>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Designation</Label>
                <Input
                  value={profile.designation}
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Address</Label>
                <Input
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Role</Label>
              <Input value={user?.role || ""} disabled />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() =>
                  setProfile({
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                    address: user?.address || "",
                    designation: user?.designation || "",
                    avatar: user?.avatar || "",
                  })
                }
              >
                Cancel
              </Button>
              <Button onClick={handleProfileSave} disabled={isLoading}>
                Save changes
              </Button>
            </div>

            <Separator />
            <div className="pt-2">
              <h3 className="font-medium mb-3">Change Password</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1.5 block">Current password</Label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">New password</Label>
                  <Input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Confirm new password</Label>
                  <Input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button onClick={handlePasswordSave} disabled={isLoading || !passwords.new}>
                  Update password
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="workspace" className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1.5 block">Workspace name</Label>
                <Input defaultValue="Pulse Sales" />
              </div>
              <div>
                <Label className="mb-1.5 block">Currency</Label>
                <Input defaultValue="USD" />
              </div>
              <div>
                <Label className="mb-1.5 block">Time zone</Label>
                <Input defaultValue="UTC-08:00 (Pacific)" />
              </div>
              <div>
                <Label className="mb-1.5 block">Fiscal year start</Label>
                <Input defaultValue="January" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="p-6 space-y-3">
            {[
              "Email me when a deal is assigned",
              "Push notifications for new leads",
              "Daily digest summary",
              "Mention me in comments",
              "Weekly pipeline report",
            ].map((t) => (
              <div
                key={t}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="text-sm">{t}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="integrations" className="p-6 grid sm:grid-cols-2 gap-3">
            {["Slack", "Gmail", "Outlook", "Zoom", "Stripe", "HubSpot"].map((n) => (
              <div
                key={n}
                className="flex items-center justify-between p-4 rounded-md border border-border"
              >
                <div>
                  <div className="font-medium text-sm">{n}</div>
                  <div className="text-xs text-muted-foreground">Sync data with {n}</div>
                </div>
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="billing" className="p-6">
            <div className="rounded-md border border-border p-5">
              <div className="text-sm font-semibold">Enterprise plan</div>
              <div className="text-xs text-muted-foreground">
                Renews on Jun 12, 2026 · $1,200 / month
              </div>
              <div className="mt-4 flex gap-2">
                <Button>Manage plan</Button>
                <Button variant="outline">View invoices</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — Pulse CRM" }] }),
  component: Settings,
});
