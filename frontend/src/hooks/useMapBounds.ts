import type { TrackingEvent } from "@/types/shipment";
import { useMemo } from "react";

export function useMapBounds(events: TrackingEvent[]) {
  return useMemo(() => {
    const longitudes = events.map((e) => e.location.longitude);
    const latitudes = events.map((e) => e.location.latitude);

    const bounds = {
      minLongitude: Math.min(...longitudes),
      maxLongitude: Math.max(...longitudes),
      minLatitude: Math.min(...latitudes),
      maxLatitude: Math.max(...latitudes),
    };

    const centerLongitude = (bounds.minLongitude + bounds.maxLongitude) / 2;
    const centerLatitude = (bounds.minLatitude + bounds.maxLatitude) / 2;

    const longitudeDifference = bounds.maxLongitude - bounds.minLongitude;
    const latitudeDifference = bounds.maxLatitude - bounds.minLatitude;
    const maximumDifference = Math.max(longitudeDifference, latitudeDifference);

    let zoom;
    if (maximumDifference > 100) {
      zoom = 2;
    } else if (maximumDifference > 50) {
      zoom = 3;
    } else if (maximumDifference > 20) {
      zoom = 4;
    } else {
      zoom = 5;
    }

    return {
      center: [centerLongitude, centerLatitude] as [number, number],
      zoom,
      bounds,
    };
  }, [events]);
}
