import type { ShipmentInfo } from "../types/shipment";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ShipmentDetailsProps {
  shipmentData: ShipmentInfo | null;
  loading: boolean;
  error: string | null;
  onClose?: () => void;
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
          <p className="">Status: {shipmentData.status}</p>
          <p>Status: {shipmentData.carrier}</p>
          <p>
            From: {shipmentData.origin.city}, {shipmentData.origin.countryCode}
          </p>
          <p>
            To: {shipmentData.destination.city},{" "}
            {shipmentData.destination.countryCode}
          </p>

          <h2 className="text-2xl font-bold mt-4">History</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipmentData.events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(event.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {event.location.city}, {event.location.countryCode}
                  </TableCell>
                  <TableCell>{event.status}</TableCell>
                  <TableCell>{event.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
export default ShipmentDetails;
