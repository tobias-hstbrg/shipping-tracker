import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="sticky top-0 bg-gray-50 border-b z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold whitespace-nowrap">
          Shipment Tracker
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:flex-1">
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
  );
}

export default TopBar;
