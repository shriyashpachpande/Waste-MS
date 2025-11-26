import { Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

export default function AnimatedMarker({ vehicle, children }) {
  const [pos, setPos] = useState([
    vehicle.currentCoords.lat,
    vehicle.currentCoords.lon
  ]);

  useEffect(() => {
    const start = pos;
    const end = [vehicle.currentCoords.lat, vehicle.currentCoords.lon];

    const duration = 4000; // smooth 4 sec
    const fps = 60;
    const total = (duration / 1000) * fps;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const t = frame / total;

      const lat = start[0] + (end[0] - start[0]) * t;
      const lon = start[1] + (end[1] - start[1]) * t;

      setPos([lat, lon]);

      if (frame >= total) clearInterval(timer);
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [vehicle.currentCoords.lat, vehicle.currentCoords.lon]);

  return <Marker position={pos}>{children}</Marker>;
}
