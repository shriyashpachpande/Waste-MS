import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { MapPin, Phone, Building2, Factory, Info, LocateFixed, ExternalLink, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FacilityList() {
  const api = useApi();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api("/facilities")
      .then((data) => setFacilities(data || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredFacilities = facilities.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto p-6"
    >
      {/* Header Card */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-800 p-8 rounded-3xl shadow-xl mb-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Factory className="w-8 h-8" />
            City Facilities
          </h2>
          <p className="text-green-100 max-w-2xl text-lg">
            Explore all waste management facilities — recycling centers, waste-to-energy plants, composting sites, and more.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search facilities by name, type, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all shadow-sm"
        />
      </div>

      {/* List */}
      <div className="grid gap-6">
        <AnimatePresence>
          {filteredFacilities.map((f, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={f._id}
              className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shadow-inner">
                      <Factory size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {f.name}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 mt-1">
                        <Building2 size={12} />
                        {f.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {f.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                      {f.description}
                    </p>
                  )}

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Phone size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="font-medium">{f.contact || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Building2 size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>{f.city}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Factory size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Capacity: <span className="font-bold">{f.capacity} tonnes</span></span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Info size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wide ${f.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                        {f.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location & Map */}
                <div className="md:w-64 flex-shrink-0 bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {f.address}
                    </p>
                  </div>

                  {f.coords?.lat && f.coords?.lon && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                        <LocateFixed size={12} />
                        {f.coords.lat.toFixed(4)}, {f.coords.lon.toFixed(4)}
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${f.coords.lat},${f.coords.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl py-2 text-sm font-semibold transition-colors shadow-sm"
                      >
                        <ExternalLink size={16} />
                        View on Map
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && filteredFacilities.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
            <Factory size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No facilities found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
