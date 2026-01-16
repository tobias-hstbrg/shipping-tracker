import ShipmentDetails from "./components/ShipmentDetails";
import TopBar from "./components/TopBar";
import type { ShipmentInfo } from "./types/shipment";
import { fetchShipment } from "./services/shipmentService";
import { useState } from "react";
import ShipmentMap from "./components/ShipmentMap";
import { ThemeProvider } from "./components/theme-provider";

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen">
        <TopBar
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
          handleTrack={handleTrack}
          loading={loading}
        />

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <div className="w-full md:flex-1 h-100 md:h-full">
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
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Enter a tracking number to view shipment details.
              </div>
            )}
          </div>

          {(shipmentData || loading || error) && (
            <div className="w-full md:w-7/24 h-full overflow-y-auto border-l">
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
    </ThemeProvider>
  );
}

export default App;
