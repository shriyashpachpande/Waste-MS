import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Heatmap() {
  const api = useApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/analytics/complaints-heatmap?area=GreenCity")
      .then(res => setData(res.heatmap || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-2xl text-red-600 dark:text-red-400">
            <MapIcon size={28} />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Complaints Heatmap</h2>
            <p className="text-gray-500 dark:text-gray-400">Visualize high-density areas for waste reports and complaints.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 h-[600px] relative z-0">
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        <MapContainer center={[28.6, 77.2]} zoom={11} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.map((cluster, idx) => (
            <Circle
              key={idx}
              center={[
                cluster._id?.lat || 28.61,
                cluster._id?.lon || 77.20,
              ]}
              radius={200 + 100 * cluster.count}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.4
              }}
            >
              <Popup>
                <div className="text-center p-2">
                  <div className="flex items-center justify-center gap-1 text-red-600 font-bold mb-1">
                    <AlertTriangle size={16} />
                    High Activity
                  </div>
                  <div className="text-gray-700">
                    Reports: <strong className="text-lg">{cluster.count}</strong>
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 right-6 z-[1000] bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">Legend</h4>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="w-4 h-4 rounded-full bg-red-500 opacity-40 border border-red-500"></span>
            <span>Complaint Cluster</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
