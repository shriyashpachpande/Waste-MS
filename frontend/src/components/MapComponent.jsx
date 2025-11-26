import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ markers, center = [28.6, 77.2], zoom = 12 }) {
  return (
    <div className="w-full h-[400px] rounded shadow">
      <MapContainer center={center} zoom={zoom} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((m, idx) =>
          <Marker position={[m.lat, m.lon]} key={idx}>
            <Popup>
              {m.label}<br />
              {m.details}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
