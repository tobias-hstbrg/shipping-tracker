import { useState } from "react";
import "./App.css";
import ShipmentCard from "./components/ShipmentCard";

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/shipments/${trackingNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setShipmentData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
      <input
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter tracking number"
      />

      <button onClick={handleTrack}>Track package</button>

      {loading && <p>Loading...</p>}
      {shipmentData && <ShipmentCard shipment={shipmentData} />}
    </>
  );
}

export default App;
