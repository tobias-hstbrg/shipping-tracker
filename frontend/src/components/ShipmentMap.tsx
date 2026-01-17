import type { ShipmentStatus, TrackingEvent } from "@/types/shipment";
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
  currentStatus: ShipmentStatus;
  events: Array<TrackingEvent>;
}

export default function ShipmentMap({
  origin,
  destination,
  currentStatus,
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

        <MapMarker longitude={origin.longitude} latitude={origin.latitude}>
          <MarkerContent>
            <div className="size-4 rounded-full bg-red-500 border-2 border-white shadow-lg" />
          </MarkerContent>
          <MarkerTooltip>Origin</MarkerTooltip>
        </MapMarker>

        {/* Destination marker - only show if NOT delivered yet */}
        {currentStatus !== "DELIVERED" && (
          <MapMarker
            longitude={destination.longitude}
            latitude={destination.latitude}
          >
            <MarkerContent>
              <div className="size-4 rounded-full bg-green-500 border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>Destination</MarkerTooltip>
          </MapMarker>
        )}

        {/* Latest event marker - show based on status */}
        {events.length > 0 && (
          <>
            {currentStatus === "DELIVERED" && (
              <MapMarker
                longitude={events[events.length - 1].location.longitude}
                latitude={events[events.length - 1].location.latitude}
              >
                <MarkerContent>
                  <div className="size-4 rounded-full bg-green-500 border-2 border-white shadow-lg" />
                </MarkerContent>
                <MarkerTooltip>Delivered</MarkerTooltip>
              </MapMarker>
            )}

            {currentStatus === "OUT_FOR_DELIVERY" && (
              <MapMarker
                longitude={events[events.length - 1].location.longitude}
                latitude={events[events.length - 1].location.latitude}
              >
                <MarkerContent>
                  <div className="size-4 rounded-full bg-orange-500 border-2 border-white shadow-lg" />
                </MarkerContent>
                <MarkerTooltip>Out for Delivery</MarkerTooltip>
              </MapMarker>
            )}

            {currentStatus === "IN_TRANSIT" && (
              <MapMarker
                longitude={events[events.length - 1].location.longitude}
                latitude={events[events.length - 1].location.latitude}
              >
                <MarkerContent>
                  <div className="size-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                </MarkerContent>
                <MarkerTooltip>In Transit</MarkerTooltip>
              </MapMarker>
            )}
          </>
        )}

        {/* All other events as waypoints - just skip first and last */}
        {events
          .slice(
            1,
            currentStatus === "DELIVERED" ||
              currentStatus === "OUT_FOR_DELIVERY"
              ? -2 // Skip last 2 events (out for delivery + delivered/current)
              : -1, // Skip last 1 event (current location)
          )
          .map((event, index) => (
            <MapMarker
              key={index}
              longitude={event.location.longitude}
              latitude={event.location.latitude}
            >
              <MarkerContent>
                <div className="size-4 rounded-full bg-blue-400 border-2 border-white shadow-lg" />
              </MarkerContent>
              <MarkerTooltip>{event.location.city}</MarkerTooltip>
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
