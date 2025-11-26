import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AnimatedRouteMarker from "../components/AnimatedRouteMarker";
import { Search, Truck, Map as MapIcon, Navigation } from "lucide-react";
import { motion } from "framer-motion";

// Fix for default Leaflet marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function VehicleMap() {
  const api = useApi();
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
    loadRoutes();

    const timer = setInterval(() => {
      loadVehicles();
    }, 5000);

    return () => clearInterval(timer);
  }, [search]);

  const loadVehicles = () => {
    api("/vehicles" + (search ? `?regNo=${search}` : ""))
      .then((data) => {
        setVehicles(data || []);
        if (loading) setLoading(false);
      })
      .catch((e) => {
        console.error("vehicles load error", e);
        setVehicles([]);
        setLoading(false);
      });
  };

  const loadRoutes = () => {
    api("/routes")
      .then(setRoutes)
      .catch((e) => {
        console.error("routes load error", e);
        setRoutes([]);
      });
  };

  const getRoutePoints = (routeId) => {
    const r = routes.find((x) => {
      if (!x) return false;
      if (typeof routeId === "string") return String(x._id) === String(routeId);
      return String(x._id) === String(routeId?._id);
    });

    if (!r) return null;

    const raw = r.polyline?.length ? r.polyline : r.stops || [];

    const pts = raw
      .map((s) => [
        Number(s.lat?.$numberDouble || s.lat),
        Number(s.lon?.$numberDouble || s.lon),
      ])
      .filter((x) => x[0] && x[1]);

    return pts.length ? pts : null;
  };

  const center =
    vehicles.length && vehicles[0]?.currentCoords
      ? [vehicles[0].currentCoords.lat, vehicles[0].currentCoords.lon]
      : routes[0]?.polyline?.length
        ? [routes[0].polyline[0].lat, routes[0].polyline[0].lon]
        : [19.173244, 77.341631];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 h-[calc(100vh-80px)] flex flex-col md:flex-row gap-6">

      {/* Sidebar List */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4 h-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex-shrink-0">
          <h2 className="font-bold text-2xl text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <MapIcon className="text-green-600" />
            Live Tracking
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Track waste collection vehicles in real-time.</p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Reg No..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 space-y-3">
          <h3 className="font-bold text-gray-700 dark:text-gray-300 px-2">Active Vehicles ({vehicles.length})</h3>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Truck size={32} className="mx-auto mb-2 opacity-20" />
              <p className="text-sm">No vehicles found.</p>
            </div>
          ) : (
            vehicles.map((v) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={v._id}
                className="p-4 bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-green-300 dark:hover:border-green-700 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Truck size={16} className="text-green-600" />
                    {v.regNo}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${v.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                    {v.status}
                  </span>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p><span className="font-semibold">Driver:</span> {v.driverName || "Unassigned"}</p>
                  <p><span className="font-semibold">Route:</span> {v.routeId?.name || v.routeId || "None"}</p>
                  <p className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <Navigation size={12} />
                    {v.currentCoords ? "Location Active" : "No Signal"}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 h-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 relative z-0">
        <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* ROUTE POLYLINES */}
          {routes.map((r) =>
            r.polyline?.length || r.stops?.length ? (
              <Polyline
                key={r._id}
                positions={(r.polyline?.length ? r.polyline : r.stops).map((pt) => [
                  Number(pt.lat?.$numberDouble || pt.lat),
                  Number(pt.lon?.$numberDouble || pt.lon),
                ])}
                color="#3b82f6"
                weight={4}
                opacity={0.6}
              />
            ) : null
          )}

          {/* VEHICLE MARKERS OR ANIMATION */}
          {vehicles.map((v) => {
            if (v.currentCoords?.lat != null && v.currentCoords?.lon != null) {
              return (
                <Marker key={v._id} position={[v.currentCoords.lat, v.currentCoords.lon]}>
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-1">{v.regNo}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-semibold">Type:</span> {v.type}</p>
                        <p><span className="font-semibold">Driver:</span> {v.driverName || "-"}</p>
                        <p><span className="font-semibold">Route:</span> {v.routeId?.name || "N/A"}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          Updated: {v.lastUpdate ? new Date(v.lastUpdate).toLocaleTimeString() : "Never"}
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            }

            const pts = getRoutePoints(v.routeId);
            if (pts?.length) {
              return <AnimatedRouteMarker key={v._id} vehicle={v} points={pts} segmentDuration={2000} />;
            }

            return null;
          })}
        </MapContainer>
      </div>
    </div>
  );
}
