import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur">
      <div className="bg-white rounded-lg shadow-lg p-8 relative min-w-[300px] max-w-lg w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl font-bold text-green-600 hover:text-red-400">×</button>
        {children}
      </div>
    </div>
  );
}
