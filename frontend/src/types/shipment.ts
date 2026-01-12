export type ShipmentStatus =
  | "INFORMATION_RECEIVED"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "EXCEPTION"
  | "UNKNOWN";

export interface Location {
  city: string;
  countryCode: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface TrackingEvent {
  timestamp: Date;
  location: Location;
  statusCode: ShipmentStatus;
  status: string;
  description: string;
}

export interface ShipmentInfo {
  trackingNumber: string;
  carrier: string;
  status: ShipmentStatus;
  origin: Location;
  destination: Location;
  currentLocation: Location;
  estimatedDelivery: Date;
  events: Array<TrackingEvent>;
}
