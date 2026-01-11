import ShipmentDetails from "./components/ShipmentDetails";
import TopBar from "./components/TopBar";
import type { ShipmentInfo } from "./types/shipment";
import { fetchShipment } from "./services/shipmentService";
import { useState } from "react";

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

  const clearShipmentDetails = () => {
    setShipmentData(null);
    setError(null);
  };

  return (
    <>
      <TopBar
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        handleTrack={handleTrack}
        loading={loading}
      />

      <div className="flex h-screen">
        {/*Space for the Map in the future*/}
        <div className="flex-1"></div>

        {(shipmentData || loading || error) && (
          <ShipmentDetails
            shipmentData={shipmentData}
            loading={loading}
            error={error}
            onClose={clearShipmentDetails}
          />
        )}
      </div>
    </>
  );
}

export default App;
