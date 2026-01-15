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
    <div className="flex flex-col h-screen">
      <TopBar
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        handleTrack={handleTrack}
        loading={loading}
      />

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="w-full md:flex-1 h-200 md:h-full">
          {shipmentData ? (
            <ShipmentMap
              origin={{
                latitude: shipmentData.origin.latitude,
                longitude: shipmentData.origin.longitude,
              }}
              destination={{
                latitude: shipmentData.destination.latitude,
                longitude: shipmentData.destination.longitude,
              }}
              events={shipmentData.events}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Enter a tracking number to view shipment details.
            </div>
          )}
        </div>

        {/* Details Section - shown alongside map */}
        {(shipmentData || loading || error) && (
          <div className="w-full md:w-1/3 overflow-y-auto">
            <ShipmentDetails
              shipmentData={shipmentData}
              loading={loading}
              error={error}
              onClose={clearShipmentDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
