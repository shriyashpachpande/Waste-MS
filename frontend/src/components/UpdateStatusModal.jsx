import React, { useState } from "react";
import useApi from "../hooks/useApi";

export default function UpdateStatusModal({ wasteId, currentStatus, onClose, onUpdated }) {
    const api = useApi();
    const [newStatus, setNewStatus] = useState("");
    const [msg, setMsg] = useState("");

    const statusOptions = [
        "SEGREGATED_AT_SOURCE",
        "COLLECTED",
        "TRANSPORTING",
        "DUMPING_AREA",
        "FACILITY_SEGREGATION",
        "PROCESSING",
        "COMPLETED"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await api(`/waste/${wasteId}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.currentStatus === newStatus) {
            setMsg("✅ Status Updated Successfully!");
            onUpdated && onUpdated();
            setTimeout(onClose, 900);
        } else {
            setMsg("❌ Error updating status.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4 animate-fadeIn">
            
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md relative animate-scaleIn"
            >
                {/* Close Button */}
                <button
                    type="button"
                    className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-gray-700 transition"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* Modal Title */}
                <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
                    Update Waste Status
                </h3>

                {/* Current Status */}
                <div className="mb-4">
                    <label className="text-sm text-gray-600">Current Status:</label>
                    <div className="font-semibold text-green-800 text-lg">
                        {currentStatus}
                    </div>
                </div>

                {/* Status Dropdown */}
                <div className="mb-5">
                    <label className="text-sm text-gray-600 mb-1 block">Select New Status</label>
                    <select
                        required
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition"
                    >
                        <option value="">Choose an option</option>
                        {statusOptions
                            .filter(opt => opt !== currentStatus)
                            .map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.replaceAll("_", " ")}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-green-700 rounded-xl text-white font-semibold text-lg shadow hover:bg-green-800 transition"
                >
                    Update Status
                </button>

                {/* Message */}
                {msg && (
                    <div className="mt-4 text-center text-green-700 font-medium animate-fadeIn">
                        {msg}
                    </div>
                )}

                {/* Animations */}
                <style>{`
                    @keyframes fadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.4s ease-out;
                    }

                    @keyframes scaleIn {
                        0% { transform: scale(0.85); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    .animate-scaleIn {
                        animation: scaleIn 0.25s ease-out;
                    }
                `}</style>
            </form>
        </div>
    );
}
