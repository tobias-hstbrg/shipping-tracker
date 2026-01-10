import type { ShipmentInfo } from "../types/shipment";

function ShipmentCard({ shipment }: { shipment: ShipmentInfo }) {
  return (
    <div className="shipment-card">
      <h1>Shipment: {shipment.trackingNumber}</h1>
      <p>Status: {shipment.status}</p>
      <p>
        From: {shipment.origin.city}, {shipment.origin.countryCode}
      </p>
      <p>
        To: {shipment.destination.city}, {shipment.destination.countryCode}
      </p>
    </div>
  );
}
export default ShipmentCard;
