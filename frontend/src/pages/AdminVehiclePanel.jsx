import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Truck, User, Phone, Map, Radio, Activity, Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminVehiclePanel() {
    const api = useApi();
    const [vehicles, setVehicles] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [form, setForm] = useState({
        regNo: "", type: "", driverName: "", driverPhone: "",
        status: "ACTIVE", routeId: "", deviceId: ""
    });
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setLoading(true);
        Promise.all([api("/vehicles"), api("/routes")])
            .then(([vData, rData]) => {
                setVehicles(vData || []);
                setRoutes(rData || []);
            })
            .finally(() => setLoading(false));
    };

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async () => {
        await api("/vehicles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        resetForm();
        refreshData();
    };

    const handleEdit = v => {
        setForm({
            regNo: v.regNo, type: v.type, driverName: v.driverName, driverPhone: v.driverPhone,
            status: v.status, routeId: v.routeId?._id || v.routeId || "", deviceId: v.deviceId || ""
        });
        setEditing(v._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = async () => {
        await api(`/vehicles/${editing}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        resetForm();
        setEditing(null);
        refreshData();
    };

    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            await api(`/vehicles/${id}`, { method: "DELETE" });
            refreshData();
        }
    };

    const resetForm = () => {
        setForm({ regNo: "", type: "", driverName: "", driverPhone: "", status: "ACTIVE", routeId: "", deviceId: "" });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-bold text-3xl text-gray-900 dark:text-white tracking-tight">Vehicle Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage fleet, drivers, and assignments.</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                    <Truck size={20} />
                    {vehicles.length} Vehicles
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* FORM SECTION */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-6">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            {editing ? <Edit2 className="text-blue-500" /> : <Plus className="text-green-500" />}
                            {editing ? "Edit Vehicle" : "Add New Vehicle"}
                        </h3>

                        <div className="space-y-4">
                            <InputField icon={<Truck />} name="regNo" value={form.regNo} onChange={handleChange} placeholder="Registration Number" />
                            <InputField icon={<Activity />} name="type" value={form.type} onChange={handleChange} placeholder="Vehicle Type (e.g. Truck)" />
                            <InputField icon={<User />} name="driverName" value={form.driverName} onChange={handleChange} placeholder="Driver Name" />
                            <InputField icon={<Phone />} name="driverPhone" value={form.driverPhone} onChange={handleChange} placeholder="Driver Phone" />

                            <div className="relative">
                                <Map className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    name="routeId"
                                    value={form.routeId}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm appearance-none"
                                >
                                    <option value="">Select Route...</option>
                                    {routes.map(r => (<option key={r._id} value={r._id}>{r.name}</option>))}
                                </select>
                            </div>

                            <InputField icon={<Radio />} name="deviceId" value={form.deviceId} onChange={handleChange} placeholder="GPS Device ID" />

                            <div className="relative">
                                <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm appearance-none"
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="MAINTENANCE">Maintenance</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                {!editing ? (
                                    <button
                                        onClick={handleAdd}
                                        disabled={!form.regNo}
                                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <Plus size={18} /> Add Vehicle
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                        >
                                            <Check size={18} /> Update
                                        </button>
                                        <button
                                            onClick={() => { setEditing(null); resetForm(); }}
                                            className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-bold transition-all"
                                        >
                                            <X size={18} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* LIST SECTION */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Fleet Overview</h3>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                            </div>
                        ) : vehicles.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <Truck size={48} className="mx-auto mb-3 opacity-20" />
                                <p>No vehicles in fleet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                <AnimatePresence>
                                    {vehicles.map(v => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={v._id}
                                            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{v.regNo}</h4>
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${v.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                                                v.status === 'MAINTENANCE' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'
                                                            }`}>
                                                            {v.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="flex items-center gap-1.5"><Truck size={14} /> {v.type}</span>
                                                        <span className="flex items-center gap-1.5"><User size={14} /> {v.driverName || "No Driver"}</span>
                                                        <span className="flex items-center gap-1.5"><Phone size={14} /> {v.driverPhone || "N/A"}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(v)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(v._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({ icon, name, value, onChange, placeholder }) {
    return (
        <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm"
            />
        </div>
    );
}
