import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { motion } from "framer-motion";
import { ShoppingBag, MapPin, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function OrderPage() {
  const [search] = useSearchParams();
  const itemId = search.get("item");

  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api("/shop/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ itemId, qty }], address }),
      });
      setMsg(res._id ? "success" : "error");
    } catch (error) {
      setMsg("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl rounded-3xl p-8 relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600" />

        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-3">
            <ShoppingBag size={24} />
          </div>
          <h2 className="font-bold text-2xl text-gray-900 dark:text-white tracking-tight">
            Place Order
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Complete your purchase details below
          </p>
        </div>

        {/* Form */}
        {!msg ? (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Quantity
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value))}
                  required
                  className="w-full pl-4 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Delivery Address
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 text-gray-400">
                  <MapPin size={18} />
                </div>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={4}
                  placeholder="Enter your complete delivery address..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center p-6 rounded-2xl ${msg === "success" ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${msg === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {msg === "success" ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
            </div>
            <h3 className={`text-lg font-bold mb-2 ${msg === "success" ? "text-green-800 dark:text-green-400" : "text-red-800 dark:text-red-400"}`}>
              {msg === "success" ? "Order Placed Successfully!" : "Order Failed"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              {msg === "success" ? "Your eco-friendly products will be on their way soon." : "Something went wrong. Please try again."}
            </p>
            <Link
              to="/shop"
              className={`inline-block px-6 py-2 rounded-xl font-semibold text-sm transition-colors ${msg === "success"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {msg === "success" ? "Continue Shopping" : "Try Again"}
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
