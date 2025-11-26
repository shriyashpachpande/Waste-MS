import React from "react";
import { useNotification } from "../context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const toastConfig = {
  success: {
    icon: CheckCircle,
    color: "bg-green-500",
    borderColor: "border-green-600",
    textColor: "text-white"
  },
  error: {
    icon: XCircle,
    color: "bg-red-500",
    borderColor: "border-red-600",
    textColor: "text-white"
  },
  info: {
    icon: Info,
    color: "bg-blue-500",
    borderColor: "border-blue-600",
    textColor: "text-white"
  },
  warning: {
    icon: AlertTriangle,
    color: "bg-yellow-500",
    borderColor: "border-yellow-600",
    textColor: "text-white"
  }
};

export default function NotificationToast() {
  const { notification, hideNotification } = useNotification();

  return (
    <AnimatePresence>
      {notification.open && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`fixed top-24 right-4 z-[60] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl ${toastConfig[notification.type]?.color || "bg-gray-800"} ${toastConfig[notification.type]?.textColor} min-w-[300px] max-w-md`}
        >
          {React.createElement(toastConfig[notification.type]?.icon || Info, { size: 24 })}
          <div className="flex-1">
            <p className="font-medium text-sm">{notification.message}</p>
          </div>
          <button
            onClick={hideNotification}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
