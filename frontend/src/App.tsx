import ShipmentDetails from "./components/ShipmentDetails";
import TopBar from "./components/TopBar";
import type { ShipmentInfo } from "./types/shipment";
import { fetchShipment } from "./services/shipmentService";
import { useState } from "react";
import ShipmentMap from "./components/ShipmentMap";

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
        <div className="flex-1">
          {shipmentData ? (
            <ShipmentMap
              origin={{
                latitude: shipmentData?.origin.latitude || 0,
                longitude: shipmentData?.origin.longitude || 0,
              }}
              destination={{
                latitude: shipmentData?.destination.latitude || 0,
                longitude: shipmentData?.destination.longitude || 0,
              }}
              events={shipmentData?.events || []}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Enter a tracking number to view shipment details.
            </div>
          )}
        </div>
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
