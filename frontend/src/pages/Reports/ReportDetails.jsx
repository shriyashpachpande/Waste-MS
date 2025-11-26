import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useApi from "../../hooks/useApi";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, CheckCircle, AlertCircle, ArrowLeft, User, Image as ImageIcon } from "lucide-react";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ReportDetails() {
  const { id } = useParams();
  const api = useApi();
  const [report, setReport] = useState(null);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api(`/auth/me`);
        setMe(userRes);
        const reportRes = await api(`/reports/${id}/action`);
        setReport(reportRes);
      } catch (error) {
        console.error("Failed to fetch details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Report not found</h2>
        <Link to="/reports" className="text-green-600 hover:underline mt-4 inline-block">Back to Reports</Link>
      </div>
    )
  }

  const rawStatus = report.status || report.currentStatus || report.reportStatus || "";
  const status = rawStatus.toString().trim().toLowerCase();
  const canResolve = me?.user?.role && ["WORKER", "GREEN_CHAMPION", "ULB_ADMIN", "SUPER_ADMIN"].includes(me.user.role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <Link to="/reports" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition-colors">
        <ArrowLeft size={20} />
        Back to Reports
      </Link>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Report Details</h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase ${status === 'resolved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                {status === 'resolved' ? <CheckCircle size={16} /> :
                  status === 'rejected' ? <AlertCircle size={16} /> :
                    <Clock size={16} />}
                {rawStatus}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 text-sm">
              <Clock size={14} />
              Reported on {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>

          {status !== "resolved" && canResolve && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-600/20 font-bold transition-all hover:-translate-y-0.5"
              onClick={() =>
                api(`/green-champion/reports/${id}/resolve`, "POST", { notes: "Resolved by user" }).then(() =>
                  window.location.reload()
                )
              }
            >
              Mark as Resolved
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-gray-100 dark:divide-gray-700">

          {/* Left Column: Details & Map */}
          <div className="p-6 md:p-8 space-y-8">

            {/* Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <User size={20} className="text-blue-500" />
                Description
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {report.description || "No description provided."}
              </div>
            </div>

            {/* Location Map */}
            {report.coords && report.coords.lat && report.coords.lon ? (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MapPin size={20} className="text-red-500" />
                  Location
                </h3>
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm h-[300px] relative z-0">
                  <MapContainer
                    center={[report.coords.lat, report.coords.lon]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[report.coords.lat, report.coords.lon]}>
                      <Popup>
                        Report Location <br /> {report.coords.lat.toFixed(6)}, {report.coords.lon.toFixed(6)}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                  <MapPin size={14} />
                  {report.coords.lat.toFixed(6)}, {report.coords.lon.toFixed(6)}
                </p>
              </div>
            ) : (
              <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-center text-gray-500">
                <MapPin size={32} className="mx-auto mb-2 opacity-30" />
                No location data available
              </div>
            )}
          </div>

          {/* Right Column: Photos */}
          <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-gray-800/50">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-purple-500" />
              Evidence Photos
            </h3>

            {report.photos && report.photos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {report.photos.map((p, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 aspect-square">
                    <img
                      src={p}
                      alt={`Evidence ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
                <ImageIcon size={48} className="mb-3 opacity-20" />
                <p>No photos attached</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
