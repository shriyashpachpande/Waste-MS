










// import React, { useState } from "react";

// export default function ReportForm() {
//   const [coords, setCoords] = useState({ lat: "", lon: "" });
//   const [description, setDescription] = useState("");
//   const [photos, setPhotos] = useState([]);
//   const [msg, setMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("coords", JSON.stringify(coords)); // 🔹 stringify coords
//     data.append("description", description);
//     photos.forEach((p) => data.append("photos", p));

//     const res = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
//       method: "POST",
//       body: data,
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     }).then((r) => r.json());

//     if (res.report) setMsg("✅ Report filed! +10 points.");
//     else setMsg("❌ Error submitting report.");

//     setCoords({ lat: "", lon: "" });
//     setDescription("");
//     setPhotos([]);
//   };

//   return (
//     <div className="max-w-lg mx-auto px-5 py-10">
//       <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
//         <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
//           Report Illegal Dumping / Waste Issue
//         </h2>
//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Location Coordinates</label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <input type="number" step="0.0001" placeholder="Latitude" value={coords.lat}
//                 onChange={e => setCoords({ ...coords, lat: e.target.value })} required
//                 className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition" />
//               <input type="number" step="0.0001" placeholder="Longitude" value={coords.lon}
//                 onChange={e => setCoords({ ...coords, lon: e.target.value })} required
//                 className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition" />
//             </div>
//           </div>
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Description</label>
//             <textarea rows={4} placeholder="Describe the issue..." value={description}
//               onChange={e => setDescription(e.target.value)} required
//               className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition resize-none" />
//           </div>
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Upload Photos (optional)</label>
//             <input type="file" multiple accept="image/*" onChange={e => setPhotos([...e.target.files])}
//               className="w-full px-3 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-green-500 outline-none transition" />
//             {photos.length > 0 && (<p className="text-sm text-gray-600 mt-1">{photos.length} file(s) selected</p>)}
//           </div>
//           <button type="submit"
//             className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-800 transition shadow">
//             Submit Report
//           </button>
//           {msg && (<div className="mt-3 px-4 py-3 rounded-lg bg-green-50 text-green-700 border border-green-200 text-center font-medium">{msg}</div>)}
//         </form>
//       </div>
//     </div>
//   );
// }
























import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Upload, Send, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Fix default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Marker picker component
function LocationMarker({ coords, setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });

  if (!coords.lat || !coords.lon) return null;
  return <Marker position={[coords.lat, coords.lon]} />;
}

export default function ReportForm() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coords.lat || !coords.lon) {
      setMsg("❌ Please select location on map!");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("coords", JSON.stringify(coords));
    data.append("description", description);
    photos.forEach((p) => data.append("photos", p));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).then((r) => r.json());

      if (res.report) setMsg("✅ Report filed! +10 points.");
      else setMsg("❌ Error submitting report.");

      setCoords({ lat: null, lon: null });
      setDescription("");
      setPhotos([]);
    } catch (error) {
      setMsg("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-5 py-10"
    >
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Report Waste Issue
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Help us keep the city clean by reporting illegal dumping or overflow.
          </p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">

          {/* Leaflet Map */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <MapPin size={18} />
              Pick Location
            </label>
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
              <MapContainer
                center={[20, 77]} // default center
                zoom={5}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker coords={coords} setCoords={setCoords} />
              </MapContainer>
            </div>
            {coords.lat && coords.lon ? (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                <CheckCircle size={14} />
                Selected: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Tap on the map to pin the location.</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              rows={4}
              placeholder="Describe the issue (e.g., large pile of garbage, overflowing bin)..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
            />
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Upload size={18} />
              Upload Photos
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setPhotos([...e.target.files])}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
            {photos.length > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {photos.length} file(s) selected
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Submitting...' : (
              <>
                <Send size={20} />
                Submit Report
              </>
            )}
          </button>

          {msg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 px-4 py-3 rounded-xl text-center font-medium border ${msg.includes("✅")
                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                  : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                }`}
            >
              {msg}
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
}
