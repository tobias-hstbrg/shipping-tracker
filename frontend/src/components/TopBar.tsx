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
    <div className="sticky top-0 bg-gray-50 border-b flex items-center justify-between p-4 gap-4">
      <h1 className="text-3xl font-bold">Shipment Tracker</h1>
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
  );
}

export default TopBar;
