import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Truck, MapPin, Navigation, User, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkerVehicleList() {
  const api = useApi();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/vehicles?workerOnly=true")
      .then((data) => setVehicles(data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6"
    >
      <div className="bg-gradient-to-r from-green-600 to-emerald-800 p-8 rounded-3xl shadow-xl mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-2xl font-bold flex items-center gap-3 relative z-10">
          <Truck className="w-8 h-8" />
          My Assigned Vehicles
        </h2>
        <p className="text-green-100 mt-2 relative z-10">
          View details and current status of vehicles assigned to you.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
          <Truck size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No vehicles assigned</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">You currently don't have any assigned vehicles.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {vehicles.map((v, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={v._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl text-green-600 dark:text-green-400">
                      <Truck size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{v.regNo}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{v.type}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${v.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                    {v.status}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Navigation size={18} className="text-blue-500" />
                      <span className="font-medium">Route:</span>
                      <span>{v.routeId?.name || v.routeId || "Not Assigned"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <User size={18} className="text-purple-500" />
                      <span className="font-medium">Driver:</span>
                      <span>{v.driverName || "N/A"}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <MapPin size={18} className="text-red-500 mt-0.5" />
                      <div>
                        <span className="font-medium block">Current Location:</span>
                        {v.currentCoords ? (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${v.currentCoords.lat},${v.currentCoords.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline text-sm flex items-center gap-1 mt-1"
                          >
                            {v.currentCoords.lat.toFixed(4)}, {v.currentCoords.lon.toFixed(4)}
                            <Navigation size={12} />
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm italic">Location unavailable</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {v.lastUpdate && (
                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Clock size={12} />
                    Last Updated: {new Date(v.lastUpdate).toLocaleString()}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
