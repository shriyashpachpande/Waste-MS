import React, { useState } from "react";
import useApi from "../hooks/useApi";

export default function AdminAwardPoints() {
    const api = useApi();
    const [userId, setUserId] = useState("");
    const [points, setPoints] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");

    const handleAward = async (e) => {
        e.preventDefault();
        try {
            await api("/reward-penalty/reward", "POST", {
                userId,
                points: Number(points),
                reason
            });
            setStatus("Reward assigned successfully!");
            setPoints("");
            setReason("");
            setUserId("");
        } catch (err) {
            setStatus("Failed to assign reward.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white/80 rounded-lg shadow mt-10">
            <h2 className="font-bold text-2xl mb-4 text-green-700">Admin - Award Points</h2>
            <form onSubmit={handleAward} className="space-y-4">
                <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="User ID"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    className="border p-2 rounded w-full"
                    placeholder="Points"
                    value={points}
                    min={1}
                    onChange={e => setPoints(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="border p-2 rounded w-full"
                    placeholder="Reason"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Award Reward
                </button>
                <div className="text-lg mt-2 text-green-700">{status}</div>
            </form>
        </div>
    );
}
