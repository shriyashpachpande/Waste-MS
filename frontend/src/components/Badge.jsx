import React from "react";
export default function Badge({ text, type = "success" }) {
  const colors = {
    success: "bg-green-300 text-green-900",
    warning: "bg-yellow-200 text-yellow-700",
    error: "bg-red-200 text-red-700",
    info: "bg-blue-200 text-blue-700"
  };
  return (
    <span className={`px-2 py-1 rounded-full font-semibold text-xs ${colors[type] || colors.success}`}>
      {text}
    </span>
  );
}
