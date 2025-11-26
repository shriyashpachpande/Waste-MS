import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { MapPin, Phone, Edit, Trash2, PlusCircle, Factory, Check, X, Search } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

// Fix for default Leaflet marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function FacilityAdminPanel() {
    const api = useApi();
    const [facilities, setFacilities] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form state
    const [form, setForm] = useState({
        name: "",
        type: "",
        address: "",
        city: "",
        contact: "",
        lat: "",
        lon: "",
        status: "active",
        capacity: "",
        description: "",
    });

    const [mapCoords, setMapCoords] = useState({ lat: 20, lon: 77 });

    const refresh = () => {
        setLoading(true);
        api("/facilities")
            .then((data) => setFacilities(data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => { refresh(); }, []);

    // Whenever editing a facility, also set map marker
    const handleEdit = (f) => {
        setEditing(f._id);
        setForm({
            name: f.name,
            type: f.type,
            address: f.address,
            city: f.city,
            contact: f.contact,
            lat: f.coords?.lat || "",
            lon: f.coords?.lon || "",
            status: f.status,
            capacity: f.capacity,
            description: f.description,
        });
        setMapCoords({ lat: f.coords?.lat || 20, lon: f.coords?.lon || 77 });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Update map marker if lat/lon changes
        if (["lat", "lon"].includes(e.target.name)) {
            setMapCoords({
                lat: e.target.name === "lat" ? Number(e.target.value) : Number(form.lat),
                lon: e.target.name === "lon" ? Number(e.target.value) : Number(form.lon)
            });
        }
    };

    const handleAdd = async () => {
        await api(`/facilities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                coords: { lat: Number(form.lat), lon: Number(form.lon) },
                capacity: Number(form.capacity),
            })
        });
        resetForm();
        refresh();
    };

    const handleUpdate = async () => {
        await api(`/facilities/${editing}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                coords: { lat: Number(form.lat), lon: Number(form.lon) },
                capacity: Number(form.capacity),
            })
        });
        resetForm();
        refresh();
    };

    const resetForm = () => {
        setEditing(null);
        setForm({
            name: "",
            type: "",
            address: "",
            city: "",
            contact: "",
            lat: "",
            lon: "",
            status: "active",
            capacity: "",
            description: "",
        });
        setMapCoords({ lat: 20, lon: 77 });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this facility?")) {
            await api(`/facilities/${id}`, { method: "DELETE" });
            refresh();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Facility Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Add, update, and manage waste management infrastructure.
                    </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                    <Factory size={20} />
                    {facilities.length} Facilities
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* FORM SECTION */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-6">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                            {editing ? <Edit className="text-blue-500" /> : <PlusCircle className="text-green-500" />}
                            {editing ? "Edit Facility" : "Add New Facility"}
                        </h3>

                        <div className="space-y-4">
                            <Input label="Facility Name" name="name" value={form.name} onChange={handleChange} />
                            <Input label="Type (e.g. Recycling)" name="type" value={form.type} onChange={handleChange} />
                            <Input label="Address" name="address" value={form.address} onChange={handleChange} />
                            <div className="grid grid-cols-2 gap-3">
                                <Input label="City" name="city" value={form.city} onChange={handleChange} />
                                <Input label="Contact" name="contact" value={form.contact} onChange={handleChange} />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Status</label>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                                    >
                                        <option value="active">Active</option>
                                        <option value="maintenance">Maintenance</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                                <Input label="Capacity (tonnes)" type="number" name="capacity" value={form.capacity} onChange={handleChange} />
                            </div>

                            {/* MAP PICKER */}
                            <div className="mt-4">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block flex items-center gap-2">
                                    <MapPin size={14} /> Location (Click on Map)
                                </label>
                                <div className="h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 relative z-0">
                                    <MapContainer
                                        center={[mapCoords.lat || 20, mapCoords.lon || 77]}
                                        zoom={5}
                                        style={{ height: "100%", width: "100%" }}
                                        scrollWheelZoom={true}
                                    >
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        {mapCoords.lat && mapCoords.lon && <Marker position={[mapCoords.lat, mapCoords.lon]} />}
                                        <LocationPicker setMapCoords={setMapCoords} setForm={setForm} />
                                    </MapContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <Input label="Lat" type="number" name="lat" value={form.lat} onChange={handleChange} />
                                    <Input label="Lon" type="number" name="lon" value={form.lon} onChange={handleChange} />
                                </div>
                            </div>

                            <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />

                            <div className="pt-4 flex gap-3">
                                {!editing ? (
                                    <button
                                        onClick={handleAdd}
                                        disabled={!form.name}
                                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <PlusCircle size={18} /> Add Facility
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
                                            onClick={resetForm}
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
                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        </div>
                    ) : facilities.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Factory size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No facilities found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Add your first facility using the form.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {facilities.map((f) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={f._id}
                                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{f.name}</h2>
                                                <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mt-1">{f.type}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-lg ${f.status === 'active'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {f.status}
                                            </span>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <MapPin size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                                                <span className="line-clamp-2">{f.address}, {f.city}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Phone size={16} className="text-gray-400 flex-shrink-0" />
                                                <span>{f.contact || "N/A"}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <button
                                                onClick={() => handleEdit(f)}
                                                className="flex-1 py-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Edit size={16} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(f._id)}
                                                className="flex-1 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Map click handler to set marker + form fields
function LocationPicker({ setMapCoords, setForm }) {
    useMapEvents({
        click(e) {
            setMapCoords({ lat: e.latlng.lat, lon: e.latlng.lng });
            setForm(f => ({ ...f, lat: e.latlng.lat, lon: e.latlng.lng }));
        }
    });
    return null;
}

// Professional input and textarea components
function Input({ label, name, value, onChange, type = "text" }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-900 dark:text-white"
            />
        </div>
    );
}

function Textarea({ label, name, value, onChange }) {
    return (
        <div className="flex flex-col gap-1 mt-3">
            <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-900 dark:text-white resize-none"
            />
        </div>
    );
}
