import type { ShipmentInfo } from "./../types/shipment";
export async function fetchShipment(trackingNumber: string) {
  const response = await fetch(
    "http://localhost:8080/api/shipments/" + trackingNumber
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const shipmentInfo: ShipmentInfo = await response.json();
  return shipmentInfo;
}
