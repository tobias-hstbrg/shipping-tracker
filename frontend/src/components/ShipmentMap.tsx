import type { TrackingEvent } from "@/types/shipment";
import {
  Map,
  MapControls,
  MapRoute,
  MapMarker,
  MarkerTooltip,
  MarkerContent,
} from "./ui/map";
import { MapPin } from "lucide-react";

interface ShipmentMapProps {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  events: Array<TrackingEvent>;
}

export default function ShipmentMap({
  origin,
  destination,
  events,
}: ShipmentMapProps) {
  // Build route coordinates from events
  const routeCoordinates: [number, number][] = events.map((event) => [
    event.location.longitude,
    event.location.latitude,
  ]);

  // Calculate center point for map
  const centerLng = (origin.longitude + destination.longitude) / 2;
  const centerLat = (origin.latitude + destination.latitude) / 2;

  return (
    <div className="h-full w-full">
      <Map center={[centerLng, centerLat]} zoom={4}>
        <MapRoute
          coordinates={routeCoordinates}
          color="#3b82f6"
          width={4}
          opacity={0.8}
        />

        {/* Origin marker */}
        <MapMarker longitude={origin.longitude} latitude={origin.latitude}>
          <div className="size-4 rounded-full bg-green-500 border-2 border-white shadow-lg" />
          <MarkerTooltip>Origin</MarkerTooltip>
        </MapMarker>

        {/* Destination marker */}
        <MapMarker
          longitude={destination.longitude}
          latitude={destination.latitude}
        >
          <MarkerContent>
            <div className="size-4 rounded-full bg-red-500 border-2 border-white shadow-lg" />
          </MarkerContent>
          <MarkerTooltip>Destination</MarkerTooltip>
        </MapMarker>

        {/* Event markers */}
        {events.map((event, index) => (
          <MapMarker
            key={index}
            longitude={event.location.longitude}
            latitude={event.location.latitude}
          >
            <MarkerContent>
              <div className="size-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>
              {event.location.city} - {event.status}
            </MarkerTooltip>
          </MapMarker>
        ))}

        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />
      </Map>
    </div>
  );
}
