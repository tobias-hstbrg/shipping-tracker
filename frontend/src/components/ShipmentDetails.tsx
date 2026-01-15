import type { ShipmentInfo, ShipmentStatus } from "../types/shipment";
import Timeline from "./timeline";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Package, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
    <div className="overflow-y-hidden p-8 border-l">
      {loading && <p>Loading shipment data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {shipmentData && (
        <div>
          <Button onClick={onClose} variant="outline" className="mb-4">
            <X />
          </Button>

          <Card className="p-4 mb-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-1">
                Shipment: {shipmentData.trackingNumber}
              </CardTitle>
              <CardDescription>
                <Badge className={`p-2 ${getStatusColor(shipmentData.status)}`}>
                  {shipmentData.status}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Carrier:</span>
                <span className="font-semibold">{shipmentData.carrier}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Origin:</span>
                <span className="font-semibold">
                  {shipmentData.origin.city}, {shipmentData.origin.countryCode}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Destination:
                </span>
                <span className="font-semibold">
                  {shipmentData.destination.city},{" "}
                  {shipmentData.destination.countryCode}
                </span>
              </div>
            </CardContent>
          </Card>
          <h2 className="text-2xl font-bold mt-10">History</h2>
          <Timeline events={shipmentData.events} />
        </div>
      )}
    </div>
  );
}
export default ShipmentDetails;
