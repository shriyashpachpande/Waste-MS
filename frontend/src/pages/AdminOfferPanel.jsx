import React, { useEffect, useState } from "react";
import { Gift, Plus, Trash2, Tag, Coins, Search } from "lucide-react";
import useApi from "../hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminOfferPanel() {
  const api = useApi();
  const [offers, setOffers] = useState([]);
  const [type, setType] = useState("");
  const [points, setPoints] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    api("/reward-offers")
      .then((data) => setOffers(data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  const addOffer = async () => {
    if (!type || !points) return;

    await api("/reward-offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        pointsRequired: Number(points),
        description: desc,
      })
    });
    setType("");
    setPoints("");
    setDesc("");
    refresh();
  };

  const removeOffer = async (id) => {
    await api(`/reward-offers/${id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Column: Form */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-700 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus className="text-green-600" size={20} />
              New Offer
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Offer Name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm"
                />
              </div>

              <div className="relative">
                <Coins className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="Points Cost"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm"
                />
              </div>

              <div className="relative">
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description (optional)"
                  rows={3}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm resize-none"
                />
              </div>

              <button
                onClick={addOffer}
                disabled={!type || !points}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add Offer
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: List */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Gift className="text-purple-500" size={20} />
                Active Offers
              </h2>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
                {offers.length} Total
              </span>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : offers.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Gift size={48} className="mx-auto mb-3 opacity-20" />
                  <p>No active offers found.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence>
                    {offers.map((o) => (
                      <motion.li
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={o._id}
                        className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 transition-colors group"
                      >
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {o.type}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Coins size={10} /> {o.pointsRequired} pts
                            </span>
                            {o.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                {o.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeOffer(o._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Delete Offer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
