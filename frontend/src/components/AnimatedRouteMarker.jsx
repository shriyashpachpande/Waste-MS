import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function AnimatedRouteMarker({ vehicle, points = [], segmentDuration = 2000 }) {
  const [pos, setPos] = useState(points[0] || null);
  const frameRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const startTimeRef = useRef(null);
  const idxRef = useRef(0);

  const icon = L.icon({
    iconUrl: "/truck.png",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  useEffect(() => {

    if (!points.length) return;

    idxRef.current = 0;
    setPos(points[0]);

    prepareSegment(0);
    frameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameRef.current);
    
  }, [points]);

  // ❌ NO LOOP — STOP at last point
  // For infinite loop (after reaching last point, start again from first point)
const prepareSegment = (index) => {
  if (index >= points.length - 1) {
    // Infinite loop: back to start
    idxRef.current = 0;
    startRef.current = points[0];
    endRef.current = points[1];
    startTimeRef.current = null;
    return;
  }
  startRef.current = points[index];
  endRef.current = points[index + 1];
  startTimeRef.current = null;
  idxRef.current = index;
};


  const step = (timestamp) => {
    if (!startRef.current || !endRef.current) return; // finish animation

    if (!startTimeRef.current) startTimeRef.current = timestamp;

    const elapsed = timestamp - startTimeRef.current;
    const t = Math.min(1, elapsed / segmentDuration);

    const s = startRef.current;
    const e = endRef.current;

    const lat = s[0] + (e[0] - s[0]) * t;
    const lon = s[1] + (e[1] - s[1]) * t;

    setPos([lat, lon]);

    if (t >= 1) {
      prepareSegment(idxRef.current + 1);
    }

    frameRef.current = requestAnimationFrame(step);
  };

  if (!pos) return null;

  return (
    <Marker position={pos} icon={icon}>
      <Popup>
        <strong>{vehicle.regNo}</strong> (Simulated)<br/>
        Route: {vehicle.routeId?.name || "-"}<br/>
        Driver: {vehicle.driverName || "-"}
      </Popup>
    </Marker>
  );
}
