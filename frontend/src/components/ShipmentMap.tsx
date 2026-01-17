import type { TrackingEvent } from "@/types/shipment";
import {
  Map,
  MapControls,
  MapRoute,
  MapMarker,
  MarkerTooltip,
  MarkerContent,
} from "./ui/map";
import * as turf from "@turf/turf";
import React, { useEffect, useMemo } from "react";

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

function createArcBetweenPoints(
  startLongitude: number,
  startLatitude: number,
  endLongitude: number,
  endLatitude: number,
  numPoints: number = 50,
): [number, number][] {
  const start = turf.point([startLongitude, startLatitude]);
  const end = turf.point([endLongitude, endLatitude]);

  // generate the route arc
  const arc = turf.greatCircle(start, end, { npoints: numPoints });

  // return coordinates
  return arc.geometry.coordinates as [number, number][];
}

export default function ShipmentMap({
  origin,
  destination,
  events,
}: ShipmentMapProps) {
  const [animatedCoordinates, setAnimatedCoordinates] = React.useState<
    [number, number][]
  >([]);

  const fullRouteCoordinates: [number, number][] = useMemo(() => {
    const coords: [number, number][] = [];

    for (let i = 0; i < events.length - 1; i++) {
      const arc = createArcBetweenPoints(
        events[i].location.longitude,
        events[i].location.latitude,
        events[i + 1].location.longitude,
        events[i + 1].location.latitude,
        80, // number of points in the arc
      );

      if (i === 0) {
        coords.push(...arc);
      } else {
        // Avoid duplicating the starting point of the arc
        coords.push(...arc.slice(1));
      }
    }
    return coords;
  }, [events]);

  useEffect(() => {
    if (fullRouteCoordinates.length === 0) return;

    let currentIndex = 0;
    const totalPoints = fullRouteCoordinates.length;
    const animationSpeed = 10;

    const interval = setInterval(() => {
      currentIndex++;

      setAnimatedCoordinates(fullRouteCoordinates.slice(0, currentIndex));

      if (currentIndex >= totalPoints) {
        clearInterval(interval);
      }
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [fullRouteCoordinates]);

  // Calculate center point for map
  const centerLng = (origin.longitude + destination.longitude) / 2;
  const centerLat = (origin.latitude + destination.latitude) / 2;

  return (
    <div className="h-full w-full">
      <Map
        center={[centerLng, centerLat]}
        zoom={4}
        styles={{
          light:
            "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
          dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        }}
      >
        <MapRoute
          coordinates={animatedCoordinates}
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
