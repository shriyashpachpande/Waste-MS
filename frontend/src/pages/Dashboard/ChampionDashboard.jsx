import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { ClipboardList, FileText, MapPin, Image as ImageIcon, CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ChampionDashboard() {
    const api = useApi();
    const [assignedReports, setAssignedReports] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);

    useEffect(() => {
        api(`/reports?assigned=true`).then((r) => setAssignedReports(r || []));
        api(`/green-champion/audit-logs`).then((r) => setAuditLogs(r || []));
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
            className="max-w-7xl mx-auto space-y-8 pb-12"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Green Champion Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Monitor assigned reports and maintain audit compliance.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Assigned Reports Section */}
                <motion.div variants={item} className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <ClipboardList className="text-green-600 dark:text-green-400" size={24} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assigned Reports</h2>
                    </div>

                    {assignedReports.length ? (
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700">
                                        <tr>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Location</th>
                                            <th className="px-6 py-4">Evidence</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {assignedReports.map((report) => (
                                            <tr
                                                key={report._id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    <div className="line-clamp-2 max-w-xs" title={report.description}>
                                                        {report.description}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${report.status === 'resolved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                            report.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                        }`}>
                                                        {report.status === 'resolved' ? <CheckCircle size={12} /> :
                                                            report.status === 'rejected' ? <AlertCircle size={12} /> :
                                                                <Clock size={12} />}
                                                        {report.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {report.coords ? (
                                                        <div className="flex items-center gap-1.5" title={`${report.coords.lat}, ${report.coords.lon}`}>
                                                            <MapPin size={16} className="text-gray-400" />
                                                            <span className="truncate max-w-[100px]">
                                                                {report.coords.lat.toFixed(4)}, {report.coords.lon.toFixed(4)}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {report.photos && report.photos.length ? (
                                                        <div className="relative group w-10 h-10">
                                                            <img
                                                                src={report.photos[0]}
                                                                alt="proof"
                                                                className="w-full h-full rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                                                            />
                                                            <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <ImageIcon size={16} className="text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">No Image</span>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        to={`/report/${report._id}`}
                                                        className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
                                                    >
                                                        Details
                                                        <ArrowRight size={16} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                            <ClipboardList size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Assigned Reports</h3>
                            <p className="text-gray-500 dark:text-gray-400">You're all caught up! No pending reports assigned to you.</p>
                        </div>
                    )}
                </motion.div>

                {/* Audit Logs */}
                <motion.div variants={item} className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="text-blue-600 dark:text-blue-400" size={24} />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Audit Logs</h2>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-6 h-fit">
                        {auditLogs.length ? (
                            <ul className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-700">
                                {auditLogs.map((log) => (
                                    <li key={log._id} className="relative pl-10">
                                        <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-gray-800" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{log.notes}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(log.timestamp).toLocaleString(undefined, {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short'
                                                })}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <FileText size={32} className="mx-auto mb-3 opacity-20" />
                                <p className="text-sm">No audit logs recorded yet.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}