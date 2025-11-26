// import React, { useEffect, useState } from "react";
// import useApi from "../hooks/useApi";
// import Timeline from "../components/Timeline";
// import AddWasteForm from "../components/AddWasteForm";

// export default function WasteTracking() {
//   const api = useApi();
//   const [wastes, setWastes] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [showAddWaste, setShowAddWaste] = useState(false);

//   const loadData = () => api("/waste").then(setWastes);

//   useEffect(() => {
//     loadData();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto px-5 py-8">

//       {/* Header Card */}
//       <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 mb-6">
//         <h2 className="text-3xl font-bold text-green-700 mb-3 text-center sm:text-left">
//           Waste Tracking & Timeline
//         </h2>
//         <p className="text-gray-700 text-center sm:text-left">
//           Track all your waste records with real-time status, timestamps, and geo-location updates.
//         </p>
//       </div>

//       {/* Add Waste Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           className="bg-green-700 text-white px-5 py-2 rounded-xl shadow hover:bg-green-800 transition"
//           onClick={() => setShowAddWaste(true)}
//         >
//           + Add Waste Record
//         </button>
//       </div>

//       {/* Add Form Modal */}
//       {showAddWaste && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-scaleIn">
//             <button
//               className="absolute right-4 top-3 text-gray-500 text-xl hover:text-gray-700"
//               onClick={() => setShowAddWaste(false)}
//             >
//               ×
//             </button>
//             <AddWasteForm onClose={() => setShowAddWaste(false)} onAdd={loadData} />
//           </div>
//         </div>
//       )}

//       {/* Waste Records Table */}
//       <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-green-600 text-white">
//             <tr>
//               <th className="p-3">Waste Type</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Weight</th>
//               <th className="p-3 text-center">Timeline</th>
//             </tr>
//           </thead>

//           <tbody>
//             {wastes.map((w) => (
//               <tr key={w._id} className="hover:bg-green-50 border-b">
//                 <td className="p-3 font-medium text-gray-800">{w.type || "—"}</td>
//                 <td className="p-3">
//                   <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
//                     {w.currentStatus}
//                   </span>
//                 </td>
//                 <td className="p-3 text-gray-700">{w.weightKg} kg</td>
//                 <td className="p-3 text-center">
//                   <button
//                     className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition shadow-sm"
//                     onClick={() => setSelected(w)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {!wastes.length && (
//           <div className="p-5 text-center text-gray-500">
//             No waste records available.
//           </div>
//         )}
//       </div>

//       {/* Timeline Section */}
//       {selected && (
//         <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 mt-8 relative">
//           <button
//             className="absolute right-4 top-3 text-green-700 text-xl font-bold hover:text-green-900"
//             onClick={() => setSelected(null)}
//           >
//             ×
//           </button>

//           <h3 className="text-xl font-semibold text-green-700 mb-4">
//             Waste Timeline — {selected.type}
//           </h3>

//           <Timeline events={selected.statusHistory} />
//         </div>
//       )}
//     </div>
//   );
// }






















// import React, { useEffect, useState, useContext } from "react";
// import useApi from "../hooks/useApi";
// import Timeline from "../components/Timeline";
// import AddWasteForm from "../components/AddWasteForm";
// import UpdateStatusModal from "../components/UpdateStatusModal";
// import { AuthContext } from "../context/AuthContext"; // if you use AuthContext

// export default function WasteTracking() {
//     const api = useApi();
//     const [wastes, setWastes] = useState([]);
//     const [selected, setSelected] = useState(null);
//     const [showAddWaste, setShowAddWaste] = useState(false);
//     const [updateId, setUpdateId] = useState(null);

//     // Get current user role (if you use AuthContext)
//     const { user } = useContext(AuthContext); // if user context is available

//     const loadData = () => api("/waste").then(setWastes);

//     useEffect(() => {
//         loadData();
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto px-5 py-8">
//             {/* Header Card */}
//             <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 mb-6">
//                 <h2 className="text-3xl font-bold text-green-700 mb-3 text-center sm:text-left">
//                     Waste Tracking & Timeline
//                 </h2>
//                 <p className="text-gray-700 text-center sm:text-left">
//                     Track all your waste records with real-time status, timestamps, and geo-location updates.
//                 </p>
//             </div>

//             {/* Add Waste Button */}
//             <div className="flex justify-end mb-4">
//                 <button
//                     className="bg-green-700 text-white px-5 py-2 rounded-xl shadow hover:bg-green-800 transition"
//                     onClick={() => setShowAddWaste(true)}
//                 >
//                     + Add Waste Record
//                 </button>
//             </div>

//             {/* Add Form Modal */}
//             {showAddWaste && (
//                 <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
//                     <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-scaleIn">
//                         <button
//                             className="absolute right-4 top-3 text-gray-500 text-xl hover:text-gray-700"
//                             onClick={() => setShowAddWaste(false)}
//                         >
//                             ×
//                         </button>
//                         <AddWasteForm onClose={() => setShowAddWaste(false)} onAdd={loadData} />
//                     </div>
//                 </div>
//             )}

//             {/* Waste Records Table */}
//             <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-x-auto">
//                 <table className="w-full text-left">
//                     <thead className="bg-green-600 text-white">
//                         <tr>
//                             <th className="p-3">Waste Type</th>
//                             <th className="p-3">Status</th>
//                             <th className="p-3">Weight</th>
//                             <th className="p-3 text-center">Timeline</th>
//                             {((user?.role === "WORKER") || (user?.role === "ADMIN")) && (
//                                 <th className="p-3 text-center">Update Status</th>
//                             )}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {wastes.map((w) => (
//                             <tr key={w._id} className="hover:bg-green-50 border-b">
//                                 <td className="p-3 font-medium text-gray-800">{w.type || "—"}</td>
//                                 <td className="p-3">
//                                     <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
//                                         {w.currentStatus}
//                                     </span>
//                                 </td>
//                                 <td className="p-3 text-gray-700">{w.weightKg} kg</td>
//                                 <td className="p-3 text-center">
//                                     <button
//                                         className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition shadow-sm"
//                                         onClick={() => setSelected(w)}
//                                     >
//                                         View
//                                     </button>
//                                 </td>
//                                 {["WORKER", "ADMIN", "ULB_ADMIN", "SUPER_ADMIN"].includes(user?.role) && (
//                                     <td className="p-3 text-center">
//                                         <button
//                                             className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
//                                             onClick={() => setUpdateId(w._id)}
//                                         >
//                                             Update Status
//                                         </button>
//                                     </td>
//                                 )}

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {!wastes.length && (
//                     <div className="p-5 text-center text-gray-500">
//                         No waste records available.
//                     </div>
//                 )}
//             </div>

//             {/* Timeline Section */}
//             {selected && (
//                 <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 mt-8 relative">
//                     <button
//                         className="absolute right-4 top-3 text-green-700 text-xl font-bold hover:text-green-900"
//                         onClick={() => setSelected(null)}
//                     >
//                         ×
//                     </button>
//                     <h3 className="text-xl font-semibold text-green-700 mb-4">
//                         Waste Timeline — {selected.type}
//                     </h3>
//                     <Timeline events={selected.statusHistory} />
//                 </div>
//             )}

//             {/* Worker/Admin: Status Update Modal */}
//             {updateId && (
//                 <UpdateStatusModal
//                     wasteId={updateId}
//                     currentStatus={wastes.find(w => w._id === updateId)?.currentStatus}
//                     onClose={() => setUpdateId(null)}
//                     onUpdated={loadData}
//                 />
//             )}
//         </div>
//     );
// }












import React, { useEffect, useState, useContext } from "react";
import useApi from "../hooks/useApi";
import Timeline from "../components/Timeline";
import AddWasteForm from "../components/AddWasteForm";
import UpdateStatusModal from "../components/UpdateStatusModal";
import { AuthContext } from "../context/AuthContext";
import { Plus, Clock, Scale, Activity, X, Edit, Eye, Trash2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WasteTracking() {
    const api = useApi();
    const [wastes, setWastes] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showAddWaste, setShowAddWaste] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const { user } = useContext(AuthContext);

    const loadData = () => api("/waste").then(setWastes);

    useEffect(() => {
        loadData();
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

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20"
        >

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Waste Tracking
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Monitor waste lifecycle with real-time updates
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-green-600/40 hover:-translate-y-0.5 transition-all"
                    onClick={() => setShowAddWaste(true)}
                >
                    <Plus size={20} />
                    Add Waste Record
                </button>
            </div>

            {/* ADD FORM MODAL */}
            <AnimatePresence>
                {showAddWaste && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden"
                        >
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Record</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    onClick={() => setShowAddWaste(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <AddWasteForm onClose={() => setShowAddWaste(false)} onAdd={loadData} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TABLE CARD */}
            <motion.div variants={item} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl overflow-hidden">

                {/* TABLE (DESKTOP) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-4 text-left font-semibold">Waste Type</th>
                                <th className="p-4 text-left font-semibold">Status</th>
                                <th className="p-4 text-left font-semibold">Weight</th>
                                <th className="p-4 text-center font-semibold">Timeline</th>
                                {["WORKER", "ADMIN", "ULB_ADMIN", "SUPER_ADMIN"].includes(user?.role) && (
                                    <th className="p-4 text-center font-semibold">Action</th>
                                )}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {wastes.map((w) => (
                                <tr key={w._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                            <Trash2 size={18} />
                                        </div>
                                        {w.type}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${w.currentStatus === 'COLLECTED' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                                            w.currentStatus === 'PROCESSED' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                                'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                                            }`}>
                                            {w.currentStatus}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300 font-medium">
                                        {w.weightKg} kg
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            className="text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 p-2 rounded-lg transition-colors"
                                            onClick={() => setSelected(w)}
                                            title="View Timeline"
                                        >
                                            <Eye size={20} />
                                        </button>
                                    </td>

                                    {["WORKER", "ADMIN", "ULB_ADMIN", "SUPER_ADMIN"].includes(user?.role) && (
                                        <td className="p-4 text-center">
                                            <button
                                                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-lg transition-colors"
                                                onClick={() => setUpdateId(w._id)}
                                                title="Update Status"
                                            >
                                                <Edit size={20} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE-LIST VERSION */}
                <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
                    {wastes.map((w) => (
                        <div key={w._id} className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                        <Trash2 size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{w.type}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{w.weightKg} kg</p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${w.currentStatus === 'COLLECTED' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' :
                                    w.currentStatus === 'PROCESSED' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                        'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                                    }`}>
                                    {w.currentStatus}
                                </span>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                                    onClick={() => setSelected(w)}
                                >
                                    <Eye size={16} /> Timeline
                                </button>

                                {["WORKER", "ADMIN", "ULB_ADMIN", "SUPER_ADMIN"].includes(user?.role) && (
                                    <button
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                                        onClick={() => setUpdateId(w._id)}
                                    >
                                        <Edit size={16} /> Update
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {!wastes.length && (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 text-gray-400">
                            <Activity size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No records found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Start by adding a new waste record.</p>
                    </div>
                )}
            </motion.div>

            {/* TIMELINE SECTION */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6 relative"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Clock className="text-green-600 dark:text-green-400" />
                                Timeline — {selected.type}
                            </h3>
                            <button
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                onClick={() => setSelected(null)}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <Timeline events={selected.statusHistory} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STATUS UPDATE MODAL */}
            {updateId && (
                <UpdateStatusModal
                    wasteId={updateId}
                    currentStatus={wastes.find((w) => w._id === updateId)?.currentStatus}
                    onClose={() => setUpdateId(null)}
                    onUpdated={loadData}
                />
            )}
        </motion.div>
    );
}
