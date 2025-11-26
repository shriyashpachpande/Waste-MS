import React, { useContext } from "react";
import ChartWidget from "../../components/ChartWidget";
import { AuthContext } from "../../context/AuthContext";
import { Trophy, Award, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const { user } = useContext(AuthContext);
  const city = user?.city || "Your City";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6"
    >

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-xl rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <Trophy size={40} className="text-yellow-100" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-1">
              Leaderboard
            </h2>
            <p className="text-yellow-100 text-lg">
              Top performing citizens and societies in <span className="font-bold text-white">{city}</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Card */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 rounded-3xl p-1 overflow-hidden"
        >
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown size={20} className="text-yellow-500" />
              <h3 className="font-bold text-gray-900 dark:text-white">Top Eco-Champions</h3>
            </div>
            <span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
              Live Rankings
            </span>
          </div>

          <div className="p-6 min-h-[500px]">
            <ChartWidget
              type="leaderboard"
              apiEndpoint={`/analytics/leaderboard?city=${city}`}
              title=""
              enhancedUI={true}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
