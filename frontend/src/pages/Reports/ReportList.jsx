import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertCircle, ArrowRight, Calendar } from "lucide-react";

export default function ReportList() {
  const api = useApi();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/reports/me")
      .then((data) => setReports(data || []))
      .finally(() => setLoading(false));
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">My Reports</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track the status of your submitted reports</p>
        </div>
        <Link
          to="/report-issue"
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all"
        >
          New Report
        </Link>
      </div>

      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((r) => (
            <motion.div variants={item} key={r._id}>
              <Link
                to={`/reports/${r._id}/details`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900 transition-all h-full flex flex-col"
              >
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${r.status === 'RESOLVED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        r.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                      {r.status === 'RESOLVED' ? <CheckCircle size={12} /> :
                        r.status === 'REJECTED' ? <AlertCircle size={12} /> :
                          <Clock size={12} />}
                      {r.status}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-900 dark:text-white font-medium line-clamp-2 mb-2">
                    {r.description || "No description provided"}
                  </p>

                  {r.photos && r.photos.length > 0 && (
                    <div className="mt-3 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={r.photos[0]}
                        alt="Report evidence"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>

                <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">View Details</span>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 text-gray-400">
            <FileText size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No reports yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">You haven't submitted any waste reports.</p>
          <Link
            to="/report-issue"
            className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:underline"
          >
            Submit your first report <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
