import { useState } from "react";
import ShipmentCard from "./components/ShipmentCard";
import type { ShipmentInfo } from "./types/shipment";
import { fetchShipment } from "./services/shipmentService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [shipmentData, setShipmentData] = useState<ShipmentInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    setLoading(true);
    setError(null);
    setShipmentData(null);

    try {
      const data = await fetchShipment(trackingNumber);
      setShipmentData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter tracking number"
      />

      <Button variant="outline" onClick={handleTrack}>
        Track Package
      </Button>

      {loading && <p>Loading...</p>}
      {shipmentData && <ShipmentCard shipment={shipmentData} />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;
