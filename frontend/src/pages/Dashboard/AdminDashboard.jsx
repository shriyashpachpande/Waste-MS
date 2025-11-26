// import React, { useEffect, useState } from "react";
// import useApi from "../../hooks/useApi";
// import { Link } from "react-router-dom";
// import ChartWidget from "../../components/ChartWidget";

// export default function AdminDashboard() {
//     const api = useApi();
//     const [summary, setSummary] = useState({});
//     const [registrations, setRegistrations] = useState([]);

//     useEffect(() => {
//         api("/analytics/summary").then(setSummary);
//         api("/admin/registrations").then(setRegistrations);
//     }, []);

//     return (
//         <div className="max-w-7xl mx-auto p-4 md:p-6">

//             {/* Header */}
//             <div className="bg-white shadow-sm rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h2 className="text-3xl font-bold text-green-800">Admin Dashboard</h2>
//                     <p className="text-gray-600 mt-1 text-sm">
//                         Efficiently oversee waste management, facilities, vehicles & registrations.
//                     </p>
//                 </div>

//                 <div className="flex gap-3">
//                     <Link
//                         to="/facilities"
//                         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
//                     >
//                         Facilities
//                     </Link>
//                     <Link
//                         to="/vehicles"
//                         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
//                     >
//                         Vehicle Map
//                     </Link>
//                     {/* -------- Training Modules Link -------- */}
//                     <Link
//                         to="/admin/training"
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
//                     >
//                         Manage Training Modules
//                     </Link>
//                 </div>
//             </div>

//             {/* Analytics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
//                 <ChartWidget
//                     type="bar"
//                     title="Waste Generated vs Processed"
//                     apiEndpoint="/analytics/summary"
//                 />
//                 <ChartWidget
//                     type="pie"
//                     title="Complaints Heatmap"
//                     apiEndpoint="/analytics/complaints-heatmap"
//                 />
//                 <ChartWidget
//                     type="leaderboard"
//                     title="Top Citizens"
//                     apiEndpoint="/analytics/leaderboard?city="
//                 />
//             </div>

//             {/* Registration Approvals */}
//             <div className="bg-white shadow-sm rounded-xl p-6">
//                 <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
//                     <h3 className="text-xl font-bold text-green-700">
//                         Pending Registration Approvals
//                     </h3>
//                     <p className="text-gray-500 text-sm">
//                         Review ULB workers, champions & staff verification requests.
//                     </p>
//                 </div>

//                 <div className="overflow-x-auto rounded-lg border border-gray-200">
//                     <table className="min-w-full bg-white">
//                         <thead className="bg-green-100 text-green-800 text-sm">
//                             <tr>
//                                 <th className="px-4 py-2 text-left">Name</th>
//                                 <th className="px-4 py-2 text-left">Email</th>
//                                 <th className="px-4 py-2 text-left">Role</th>
//                                 <th className="px-4 py-2 text-left">Docs</th>
//                                 <th className="px-4 py-2 text-left">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {registrations.map((u) => (
//                                 <tr key={u._id} className="odd:bg-green-50">
//                                     <td className="px-4 py-3">{u.name}</td>
//                                     <td className="px-4 py-3">{u.email}</td>
//                                     <td className="px-4 py-3 capitalize">{u.role}</td>
//                                     <td className="px-4 py-3">
//                                         {u.kycDocs?.length ? (
//                                             <a
//                                                 href={u.kycDocs[0]}
//                                                 className="text-green-700 underline font-medium"
//                                                 target="_blank"
//                                                 rel="noreferrer"
//                                             >
//                                                 View
//                                             </a>
//                                         ) : (
//                                             "—"
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-3 flex gap-2">
//                                         <button
//                                             className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition"
//                                             onClick={() =>
//                                                 api(`/admin/registrations/${u._id}/approve`, {
//                                                     method: "POST",
//                                                 }).then(() => window.location.reload())
//                                             }
//                                         >
//                                             Approve
//                                         </button>
//                                         <button
//                                             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition"
//                                             onClick={() => {
//                                                 const reason = window.prompt(
//                                                     "Reason for rejection:"
//                                                 );
//                                                 if (reason) {
//                                                     api(
//                                                         `/admin/registrations/${u._id}/reject`,
//                                                         {
//                                                             method: "POST",
//                                                             headers: {
//                                                                 "Content-Type":
//                                                                     "application/json",
//                                                             },
//                                                             body: JSON.stringify({ reason }),
//                                                         }
//                                                     ).then(() => window.location.reload());
//                                                 }
//                                             }}
//                                         >
//                                             Reject
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}

//                             {!registrations.length && (
//                                 <tr>
//                                     <td
//                                         className="text-center text-gray-400 py-4"
//                                         colSpan={5}
//                                     >
//                                         No pending registration requests
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }










// import React, { useEffect, useState } from "react";
// import useApi from "../../hooks/useApi";
// import { Link } from "react-router-dom";
// import ChartWidget from "../../components/ChartWidget";
// import AdminAwardPoints from "../AdminAwardPoints"; // <-- import

// export default function AdminDashboard() {
//   const api = useApi();
//   const [summary, setSummary] = useState({});
//   const [registrations, setRegistrations] = useState([]);

//   useEffect(() => {
//     api("/analytics/summary").then(setSummary);
//     api("/admin/registrations").then(setRegistrations);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6">

//       {/* Header */}
//       <div className="bg-white shadow-sm rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-3xl font-bold text-green-800">Admin Dashboard</h2>
//           <p className="text-gray-600 mt-1 text-sm">
//             Efficiently oversee waste management, facilities, vehicles & registrations.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             to="/facilities"
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
//           >
//             Facilities
//           </Link>
//           <Link
//             to="/vehicles"
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
//           >
//             Vehicle Map
//           </Link>
//           {/* -------- Training Modules Link -------- */}
//           <Link
//             to="/admin/training"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition"
//           >
//             Manage Training Modules
//           </Link>
//         </div>
//       </div>

//       {/* Analytics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
//         <ChartWidget
//           type="bar"
//           title="Waste Generated vs Processed"
//           apiEndpoint="/analytics/summary"
//         />
//         <ChartWidget
//           type="pie"
//           title="Complaints Heatmap"
//           apiEndpoint="/analytics/complaints-heatmap"
//         />
//         <ChartWidget
//           type="leaderboard"
//           title="Top Citizens"
//           apiEndpoint="/analytics/leaderboard?city="
//         />
//       </div>

//       {/* -------- Award Points Panel (NEW) -------- */}
//       <Link to="/admin/offer-panel" className="px-4 py-2 text-green-800">
//         Manage Reward Offers
//       </Link>
//       {/* ----------------------------------------- */}

//       {/* Registration Approvals */}
//       <div className="bg-white shadow-sm rounded-xl p-6">
//         <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
//           <h3 className="text-xl font-bold text-green-700">
//             Pending Registration Approvals
//           </h3>
//           <p className="text-gray-500 text-sm">
//             Review ULB workers, champions & staff verification requests.
//           </p>
//         </div>

//         <div className="overflow-x-auto rounded-lg border border-gray-200">
//           <table className="min-w-full bg-white">
//             <thead className="bg-green-100 text-green-800 text-sm">
//               <tr>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Role</th>
//                 <th className="px-4 py-2 text-left">Docs</th>
//                 <th className="px-4 py-2 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {registrations.map((u) => (
//                 <tr key={u._id} className="odd:bg-green-50">
//                   <td className="px-4 py-3">{u.name}</td>
//                   <td className="px-4 py-3">{u.email}</td>
//                   <td className="px-4 py-3 capitalize">{u.role}</td>
//                   <td className="px-4 py-3">
//                     {u.kycDocs?.length ? (
//                       <a
//                         href={u.kycDocs[0]}
//                         className="text-green-700 underline font-medium"
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         View
//                       </a>
//                     ) : (
//                       "—"
//                     )}
//                   </td>
//                   <td className="px-4 py-3 flex gap-2">
//                     <button
//                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition"
//                       onClick={() =>
//                         api(`/admin/registrations/${u._id}/approve`, {
//                           method: "POST",
//                         }).then(() => window.location.reload())
//                       }
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition"
//                       onClick={() => {
//                         const reason = window.prompt(
//                           "Reason for rejection:"
//                         );
//                         if (reason) {
//                           api(
//                             `/admin/registrations/${u._id}/reject`,
//                             {
//                               method: "POST",
//                               headers: {
//                                 "Content-Type":
//                                   "application/json",
//                               },
//                               body: JSON.stringify({ reason }),
//                             }
//                           ).then(() => window.location.reload());
//                         }
//                       }}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {!registrations.length && (
//                 <tr>
//                   <td
//                     className="text-center text-gray-400 py-4"
//                     colSpan={5}
//                   >
//                     No pending registration requests
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



















import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import ChartWidget from "../../components/ChartWidget";
import { Users, Truck, Map, BookOpen, Gift, ShoppingBag, Route, FileText, Check, X, Eye, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const api = useApi();
  const [summary, setSummary] = useState({});
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    api("/analytics/summary").then(setSummary);
    api("/admin/registrations").then(setRegistrations);
  }, []);

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
    <div className="max-w-7xl mx-auto space-y-8 pb-12">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Efficiently oversee waste management, facilities, vehicles & registrations.
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction to="/facilities-admin" icon={Map} label="Manage Facilities" color="bg-blue-500" />
        <QuickAction to="/vehicles/admin" icon={Truck} label="Manage Vehicles" color="bg-green-500" />
        <QuickAction to="/routes/admin" icon={Route} label="Manage Routes" color="bg-purple-500" />
        <QuickAction to="/admin/training" icon={BookOpen} label="Training Modules" color="bg-teal-500" />
        <QuickAction to="/admin/offer-panel" icon={Gift} label="Reward Offers" color="bg-yellow-500" />
        <QuickAction to="/shop/admin-panel" icon={ShoppingBag} label="Shop Items" color="bg-orange-500" />
        <QuickAction to="/reports" icon={FileText} label="All Reports" color="bg-indigo-500" />
      </div>

      {/* CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <ChartWidget type="bar" title="Waste Generated vs Processed" apiEndpoint="/analytics/summary" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <ChartWidget type="pie" title="Complaints Heatmap" apiEndpoint="/analytics/complaints-heatmap" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <ChartWidget type="leaderboard" title="Top Citizens" apiEndpoint="/analytics/leaderboard?city=" />
        </div>
      </div>

      {/* REGISTRATION APPROVAL CARD */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users size={20} className="text-green-600" />
              Pending Registration Approvals
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Review ULB workers, champions & staff verification requests.
            </p>
          </div>
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded-full self-start md:self-center">
            {registrations.length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Documents</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {registrations.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{u.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 capitalize">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {u.kycDocs?.length ? (
                      <a
                        href={u.kycDocs[0]}
                        className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 hover:underline font-medium"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Eye size={16} />
                        View Docs
                      </a>
                    ) : (
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <AlertCircle size={16} />
                        No Docs
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                        title="Approve"
                        onClick={() =>
                          api(`/admin/registrations/${u._id}/approve`, {
                            method: "POST",
                          }).then(() => window.location.reload())
                        }
                      >
                        <Check size={18} />
                      </button>

                      <button
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        title="Reject"
                        onClick={() => {
                          const reason = window.prompt("Reason for rejection:");
                          if (reason) {
                            api(`/admin/registrations/${u._id}/reject`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ reason }),
                            }).then(() => window.location.reload());
                          }
                        }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!registrations.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Check size={32} className="text-green-500/50" />
                      <p>No pending registration requests.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
