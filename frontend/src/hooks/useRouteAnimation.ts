import { useState, useEffect, useMemo } from "react";
import type { TrackingEvent } from "@/types/shipment";
import { createArcBetweenPoints } from "@/lib/mapUtils";

export function useRouteAnimation(events: TrackingEvent[]) {
  const [animatedCoordinates, setAnimatedCoordinates] = useState<
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
  }, [fullRouteCoordinates, setAnimatedCoordinates]);

  return animatedCoordinates;
}
