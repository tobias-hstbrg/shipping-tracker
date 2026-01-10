import type { ShipmentInfo } from "../types/shipment";

interface ShipmentDetailsProps {
  shipmentData: ShipmentInfo | null;
  loading: boolean;
  error: string | null;
}

function ShipmentDetails({
  shipmentData,
  loading,
  error,
}: ShipmentDetailsProps) {
  return (
    <div className="w-1/4 p-8 border-l">
      {loading && <p>Loading shipment data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {shipmentData && (
        <div>
          <h1 className="text-4xl font-bold text-blue-400">
            Shipment: {shipmentData.trackingNumber}
          </h1>
          <p>Status: {shipmentData.status}</p>
          <p>Status: {shipmentData.carrier}</p>
          <p>
            From: {shipmentData.origin.city}, {shipmentData.origin.countryCode}
          </p>
          <p>
            To: {shipmentData.destination.city},{" "}
            {shipmentData.destination.countryCode}
          </p>

          <h2>History</h2>
          <table>
            <tr>
              <th>Time</th>
              <th>Location</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
            {shipmentData.events.map((event, index) => (
              <tr key={index}>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>
                  {event.location.city}, {event.location.countryCode}
                </td>
                <td>{event.status}</td>
                <td>{event.description}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
export default ShipmentDetails;
