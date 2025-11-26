import React, { useEffect, useState, useContext } from "react";
import useApi from "../../hooks/useApi";
import ChartWidget from "../../components/ChartWidget";
import { AuthContext } from "../../context/AuthContext";
import { BarChart3, PieChart, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsSummary() {
  const api = useApi();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Role Protection
  const allowedRoles = ["ADMIN", "ULB_ADMIN", "SUPER_ADMIN", "WORKER"];

  useEffect(() => {
    // Simulate loading for smoother entry
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10">
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full text-red-600 dark:text-red-400 mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          You do not have permission to view city analytics. Please contact your administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-6"
    >

      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-xl rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            Analytics & KPIs
          </h2>
          <p className="text-green-100 text-lg max-w-2xl">
            Real-time visual insights into waste generation, segregation efficiency, and processing trends.
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Chart Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Generated vs Processed</h3>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ChartWidget
              type="bar"
              apiEndpoint="/analytics/summary"
              title=""
              height={300}
            />
          </div>
        </motion.div>

        {/* Chart Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <PieChart size={20} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Segregation Rate</h3>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ChartWidget
              type="pie"
              apiEndpoint="/analytics/segregation?area=GreenCity"
              title=""
              height={300}
            />
          </div>
        </motion.div>

        {/* Chart Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Monthly Trend</h3>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ChartWidget
              type="line"
              apiEndpoint="/analytics/summary"
              title=""
              height={300}
            />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
