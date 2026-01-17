import type { TrackingEvent } from "@/types/shipment";
import {
  Map,
  MapControls,
  MapRoute,
  MapMarker,
  MarkerTooltip,
  MarkerContent,
} from "./ui/map";
import { useRouteAnimation } from "@/hooks/useRouteAnimation";
import { useMapBounds } from "@/hooks/useMapBounds";

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
  const animatedCoordinates = useRouteAnimation(events);
  const { center, zoom } = useMapBounds(events);
  return (
    <div className="h-full w-full">
      <Map
        center={center}
        zoom={zoom}
        minZoom={2}
        maxZoom={10}
        maxPitch={60}
        styles={{
          light:
            "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
          dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        }}
      >
        <MapRoute
          coordinates={animatedCoordinates}
          color="#edb90c"
          width={4}
          opacity={0.8}
        />

        {/* Origin marker */}
        <MapMarker longitude={origin.longitude} latitude={origin.latitude}>
          <MarkerContent>
            <div className="size-4 rounded-full bg-green-500 border-2 border-white shadow-lg" />
          </MarkerContent>
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
        {events
          .filter((_, index) => index !== 0 && index !== events.length - 1)
          .map((event, index) => (
            <MapMarker
              key={index}
              longitude={event.location.longitude}
              latitude={event.location.latitude}
            >
              <MarkerContent>
                <div className="size-4 rounded-full bg-orange-500 border-2 border-white shadow-lg" />
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
