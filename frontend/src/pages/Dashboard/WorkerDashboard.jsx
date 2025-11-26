import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { Truck, MapPin, FileText, Calendar, Clock, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerDashboard() {
  const api = useApi();
  const [todayRoutes, setTodayRoutes] = useState([]);

  useEffect(() => {
    api("/routes?date=today").then((r) => setTodayRoutes(r || []));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const QuickAction = ({ to, icon: Icon, label, color }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group`}
    >
      <div className={`p-2.5 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20 text-white`}>
        <Icon size={20} className={`text-${color.split('-')[1]}-600 dark:text-${color.split('-')[1]}-400`} />
      </div>
      <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{label}</span>
    </Link>
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-8 pb-12"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Worker Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your assigned routes, vehicles, and manage tasks efficiently.
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickAction to="/facilities" icon={MapPin} label="Facilities List" color="bg-blue-500" />
        <QuickAction to="/vehicles/my" icon={Truck} label="My Vehicles" color="bg-green-500" />
        <QuickAction to="/reports" icon={FileText} label="View All Reports" color="bg-indigo-500" />
      </motion.div>

      {/* TODAY ROUTES */}
      <motion.div variants={item} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
            <Calendar size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Today's Routes
          </h3>
        </div>

        <div className="p-6">
          {todayRoutes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Truck size={48} className="mx-auto mb-4 opacity-20" />
              <p>No routes assigned for today.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {todayRoutes.map((route) => (
                <div
                  key={route._id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-green-200 dark:hover:border-green-900 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{route.name}</h4>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Navigation size={14} />
                        Route ID: {route._id}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Assigned Today
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <button className="w-full md:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center gap-2">
                      <MapPin size={18} />
                      Start Route
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}