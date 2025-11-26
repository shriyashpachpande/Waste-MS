import React, { useState } from "react";
import useApi from "../hooks/useApi";

export default function AddWasteForm({ onClose, onAdd }) {
  const api = useApi();
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [msg, setMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api("/waste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, weightKg: weight, lat, lon }),
    });

    setMsg(res._id ? "✅ Record added successfully!" : "❌ Failed to add record.");

    if (res._id && onAdd) onAdd();

    setType("");
    setWeight("");
    setLat("");
    setLon("");
  };

  return (
    <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Add Waste Record
      </h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Waste Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Waste Type</label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Organic, Recyclable, Hazardous..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Weight (kg)</label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        {/* Coordinates */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location Coordinates</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="number"
              step="0.0001"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <input
              type="number"
              step="0.0001"
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-3">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>

        {/* Response Message */}
        {msg && (
          <div className="text-center mt-3 py-2 px-3 rounded-lg bg-green-50 border border-green-200 text-green-700 font-medium">
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
