import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import ChartWidget from "../../components/ChartWidget";
import { Award, Trash2, Recycle, MapPin, ShoppingBag, FileText, Plus, Truck, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CitizenDashboard() {
  const api = useApi();
  const [summary, setSummary] = useState({ generated: 0, processed: 0 });
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    api("/analytics/summary")
      .then((d) => setSummary(d || {}));
    api("/auth/me")
      .then(r => setUserPoints((r.user && r.user.points) || 0));
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

  const StatCard = ({ title, value, icon: Icon, color, bg }) => (
    <motion.div
      variants={item}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${bg} ${color}`}>
          <Icon size={24} />
        </div>
        <span className={`text-3xl font-bold ${color}`}>{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    </motion.div>
  );

  const ActionButton = ({ to, icon: Icon, label, colorClass, delay }) => (
    <motion.div variants={item}>
      <Link
        to={to}
        className={`group relative overflow-hidden flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1`}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${colorClass}`} />
        <div className={`p-4 rounded-full bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300 ${colorClass.replace('bg-', 'text-')}`}>
          <Icon size={24} />
        </div>
        <span className="font-semibold text-gray-700 dark:text-gray-200">{label}</span>
      </Link>
    </motion.div>
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8 pb-12"
    >

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's your waste management summary.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/reports/new" className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium shadow-lg shadow-green-600/20 transition-all hover:shadow-green-600/40 hover:-translate-y-0.5">
            <Plus size={20} />
            File Report
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Points"
          value={userPoints}
          icon={Award}
          color="text-yellow-600 dark:text-yellow-400"
          bg="bg-yellow-100 dark:bg-yellow-900/30"
        />
        <StatCard
          title="Waste Generated"
          value={`${summary.generated} kg`}
          icon={Trash2}
          color="text-red-600 dark:text-red-400"
          bg="bg-red-100 dark:bg-red-900/30"
        />
        <StatCard
          title="Waste Processed"
          value={`${summary.processed} kg`}
          icon={Recycle}
          color="text-green-600 dark:text-green-400"
          bg="bg-green-100 dark:bg-green-900/30"
        />
        <motion.div
          variants={item}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award size={64} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Award size={24} />
              </div>
              <span className="font-medium text-white/90">Current Badge</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">Eco Star</h3>
            <p className="text-sm text-white/80">Top 5% Contributor</p>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <ChartWidget type="line" title="Your Waste Generation Trend" apiEndpoint="/analytics/summary" />
        </motion.div>
        <motion.div variants={item} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <ChartWidget type="pie" title="Segregation Overview" apiEndpoint="/analytics/segregation?area=your_area" />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ArrowRight className="text-green-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ActionButton to="/waste-tracking" icon={Trash2} label="Track Waste" colorClass="bg-green-600" />
          <ActionButton to="/shop" icon={ShoppingBag} label="Shop Items" colorClass="bg-indigo-600" />
          <ActionButton to="/training" icon={BookOpen} label="Training" colorClass="bg-teal-600" />
          <ActionButton to="/facilities" icon={MapPin} label="Find Facilities" colorClass="bg-orange-600" />
          <ActionButton to="/vehicles" icon={Truck} label="Vehicle Map" colorClass="bg-slate-600" />
          <ActionButton to="/reports/me" icon={FileText} label="My Reports" colorClass="bg-gray-600" />
        </div>
      </div>
    </motion.div>
  );
}
