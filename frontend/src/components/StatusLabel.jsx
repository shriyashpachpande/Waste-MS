import React from "react";
export default function StatusLabel({ status }) {
  const map = {
    "PENDING": "bg-yellow-200 text-yellow-900",
    "ACTIVE": "bg-green-300 text-green-900",
    "REJECTED": "bg-red-200 text-red-800",
    "IN_PROGRESS": "bg-blue-200 text-blue-800",
    "RESOLVED": "bg-green-500 text-white"
  };
  return (
    <span className={`px-2 py-1 rounded text-sm font-bold ${map[status] || "bg-gray-200 text-gray-700"}`}>
      {status}
    </span>
  );
}
