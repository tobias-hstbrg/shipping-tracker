import type { ShipmentInfo } from "../types/shipment";

function ShipmentCard({ shipment }: { shipment: ShipmentInfo }) {
  return (
    <div className="shipment-card">
      <h1 className="text-4xl font-bold text-blue-400">
        Shipment: {shipment.trackingNumber}
      </h1>
      <p>Status: {shipment.status}</p>
      <p>
        From: {shipment.origin.city}, {shipment.origin.countryCode}
      </p>
      <p>
        To: {shipment.destination.city}, {shipment.destination.countryCode}
      </p>
      <h2>History</h2>
      <table>
        <tr>
          <th>Time</th>
          <th>Location</th>
          <th>Status</th>
          <th>Description</th>
        </tr>
        {shipment.events.map((event, index) => (
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
  );
}
export default ShipmentCard;
