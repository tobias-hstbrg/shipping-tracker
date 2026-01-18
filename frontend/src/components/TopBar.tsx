import { ModeToggle } from "./theme-mode-toggle";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import SettingsDialog from "./SettingsDialog";

interface TopBarProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  handleTrack: () => void;
  loading: boolean;
}

function TopBar({
  trackingNumber,
  setTrackingNumber,
  handleTrack,
  loading,
}: TopBarProps) {
  return (
    <div className="sticky top-0 bg-gray-50 dark:bg-gray-950 border-b z-10">
      <div
        className="
        p-4 gap-4
        grid
        grid-cols-[1fr_auto]
        sm:grid-cols-[auto_1fr_auto]
        items-center
      "
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
          Shipment Tracker
        </h1>

        <div className="justify-self-end">
          <ModeToggle />
          <SettingsDialog />
        </div>

        <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-1">
          <div className="flex gap-2">
            <Input
              className="flex-1"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
            />

            <Button variant="outline" onClick={handleTrack} disabled={loading}>
              {loading ? "Tracking..." : "Track Package"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
