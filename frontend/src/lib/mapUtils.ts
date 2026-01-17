import * as turf from "@turf/turf";

export function createArcBetweenPoints(
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
