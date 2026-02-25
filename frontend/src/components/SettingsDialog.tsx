import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsDialog() {
  const [isMockMode, setIsMockMode] = useState(true);
  const [dhlApiKey, setDhlApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    // Send to backend
    const settings = {
      mockMode: isMockMode,
      dhlApiKey: isMockMode ? null : dhlApiKey,
    };

    try {
      const response = await fetch("http://localhost:8080/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Settings saved!", data);
      } else {
        console.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Settings size={20} />
              <p className="text-xl font-bold">Settings</p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Setup your Carrier API Key and switch from mock mode to production
            mode.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="mock-mode" className="text-base">
              Mock Data Mode
            </Label>
            <Switch
              id="mock-mode"
              checked={isMockMode}
              onCheckedChange={setIsMockMode}
              className="scale-125"
            />
          </div>

          {/* show only when mock mode is disabled */}
          {!isMockMode && (
            <div className="grid gap-2">
              <Label htmlFor="dhl-key">DHL API Key</Label>
              <Input
                id="dhl-key"
                type="password"
                placeholder="Enter your DHL API key"
                value={dhlApiKey}
                onChange={(e) => setDhlApiKey(e.target.value)}
              />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
