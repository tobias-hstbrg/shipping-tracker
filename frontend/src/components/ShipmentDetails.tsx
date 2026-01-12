import type { ShipmentInfo, ShipmentStatus } from "../types/shipment";
import Timeline from "./timeline";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ShipmentDetailsProps {
  shipmentData: ShipmentInfo | null;
  loading: boolean;
  error: string | null;
  onClose?: () => void;
}

function getStatusColor(status: ShipmentStatus) {
  switch (status) {
    case "INFORMATION_RECEIVED":
      return "bg-gray-500 text-white";
    case "IN_TRANSIT":
      return "bg-blue-500 text-white";
    case "OUT_FOR_DELIVERY":
      return "bg-orange-500 text-white";
    case "DELIVERED":
      return "bg-green-500 text-white";
    case "EXCEPTION":
      return "bg-red-500 text-white";
    case "UNKNOWN":
    default:
      return "bg-yellow-500 text-black";
  }
}

function ShipmentDetails({
  shipmentData,
  loading,
  error,
  onClose,
}: ShipmentDetailsProps) {
  return (
    <div className="w-1/3 p-8 border-l">
      {loading && <p>Loading shipment data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {shipmentData && (
        <div>
          <Button onClick={onClose} variant="outline" className="mb-4">
            X
          </Button>
          <h1 className="text-4xl font-bold mb-4">
            Shipment: {shipmentData.trackingNumber}
          </h1>
          <Badge className={`p-2 mb-4 ${getStatusColor(shipmentData.status)}`}>
            {shipmentData.status}
          </Badge>
          <p>Carrier: {shipmentData.carrier}</p>
          <p>
            From: {shipmentData.origin.city}, {shipmentData.origin.countryCode}
          </p>
          <p>
            To: {shipmentData.destination.city},{" "}
            {shipmentData.destination.countryCode}
          </p>

          <h2 className="text-2xl font-bold mt-10">History</h2>
          <Timeline events={shipmentData.events} />
        </div>
      )}
    </div>
  );
}
export default ShipmentDetails;
