import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Plus, Trash2, Map as MapIcon, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function AdminRoutePanel() {
  const api = useApi();
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [stops, setStops] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [form, setForm] = useState({ name: "", area: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshData();
    const timer = setInterval(() => {
      api("/vehicles").then(setVehicles);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const refreshData = () => {
    setLoading(true);
    Promise.all([api("/routes"), api("/vehicles")])
      .then(([rData, vData]) => {
        setRoutes(rData || []);
        setVehicles(vData || []);
      })
      .finally(() => setLoading(false));
  };

  // Map click handler
  function RoutePicker() {
    useMapEvents({
      click(e) {
        setStops(s => [...s, { lat: e.latlng.lat, lon: e.latlng.lng, label: `Stop ${s.length + 1}` }]);
        setPolyline(p => [...p, { lat: e.latlng.lat, lon: e.latlng.lng }]);
      }
    });
    return null;
  }

  const handleAdd = async () => {
    if (!form.name || stops.length < 2) return;

    await api("/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        stops,
        polyline
      })
    });
    setForm({ name: "", area: "" });
    setStops([]);
    setPolyline([]);
    refreshData();
  };

  const handleDeleteRoute = async (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      await api(`/routes/${id}`, { method: "DELETE" });
      refreshData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-bold text-3xl text-gray-900 dark:text-white tracking-tight">Route Management</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage collection routes.</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <Navigation size={20} />
          {routes.length} Routes
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CREATE ROUTE SECTION */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-6">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus className="text-green-500" />
              Create New Route
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Route Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Downtown Morning"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Area / Zone</label>
                <input
                  name="area"
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                  placeholder="e.g. Zone A"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>

              <div className="mt-4">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-2">
                  <MapIcon size={14} /> Draw Route (Click Map)
                </label>
                <div className="h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 relative z-0">
                  <MapContainer center={[28.6, 77.2]} zoom={12} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {stops.map((s, idx) => (
                      <Marker key={idx} position={[s.lat, s.lon]}>
                        <Popup>{s.label}</Popup>
                      </Marker>
                    ))}
                    {polyline.length > 1 && <Polyline positions={polyline.map(p => [p.lat, p.lon])} color="blue" />}
                    <RoutePicker />
                  </MapContainer>
                </div>

                {stops.length > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-xs text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                    <span className="font-bold text-gray-900 dark:text-white">{stops.length} Stops Added</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {stops.map((s, idx) => (
                        <span key={idx} className="bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600">
                          {idx + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  disabled={!form.name || stops.length < 2}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Save Route
                </button>
                <button
                  onClick={() => { setStops([]); setPolyline([]); }}
                  className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-bold transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ROUTE LIST SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : routes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <Navigation size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No routes found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Create your first route using the map.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              <AnimatePresence>
                {routes.map(r => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={r._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{r.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{r.area} • {r.stops.length} Stops</p>
                      </div>
                      <button
                        onClick={() => handleDeleteRoute(r._id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="h-48 relative z-0">
                      <MapContainer
                        center={r.polyline[0] ? [r.polyline[0].lat, r.polyline[0].lon] : [28.6, 77.2]}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={false}
                        dragging={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {r.polyline && r.polyline.length > 1 && (
                          <Polyline positions={r.polyline.map(pt => [pt.lat, pt.lon])} color="#3b82f6" weight={4} />
                        )}

                        {r.stops.map((s, idx) => (
                          <Marker key={idx} position={[s.lat, s.lon]}>
                            <Popup>{s.label}</Popup>
                          </Marker>
                        ))}

                        {/* Live vehicle markers assigned to this route */}
                        {vehicles.filter(v =>
                          (v.routeId?._id || v.routeId) === r._id && v.currentCoords
                        ).map(v => (
                          <Marker key={v._id} position={[v.currentCoords.lat, v.currentCoords.lon]}>
                            <Popup>
                              <strong>{v.regNo}</strong> ({v.type})<br />
                              Status: {v.status}
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>

                      {/* Overlay for interaction hint */}
                      <div className="absolute inset-0 bg-transparent pointer-events-none border-b border-gray-100 dark:border-gray-700"></div>
                    </div>

                    {/* Assigned Vehicles List */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <Truck size={12} /> Assigned Vehicles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {vehicles.filter(v => (v.routeId?._id || v.routeId) === r._id).length > 0 ? (
                          vehicles.filter(v => (v.routeId?._id || v.routeId) === r._id).map(v => (
                            <span key={v._id} className="bg-white dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${v.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                              {v.regNo}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400 italic">No vehicles assigned</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
