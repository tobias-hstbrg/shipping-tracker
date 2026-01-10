function ShipmentCard({ shipment }) {
  return (
    <div className="shipment-card">
      <h1>Shipment: {shipment.trackingNumber}</h1>
      <p>Status: {shipment.status}</p>
      <p>
        From: {shipment.origin.city}, {shipment.origin.country}
      </p>
      <p>
        To: {shipment.destination.city}, {shipment.destination.country}
      </p>
    </div>
  );
}
export default ShipmentCard;
