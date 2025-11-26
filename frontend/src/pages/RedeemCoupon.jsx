import React, { useState } from "react";
import useApi from "../hooks/useApi";
import { motion } from "framer-motion";
import { Gift, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

const couponRewards = [
  { type: "Food Coupon", pointsRequired: 100 },
  { type: "Discount Voucher", pointsRequired: 75 },
  { type: "Eco Bottle", pointsRequired: 150 }
];

export default function RedeemCoupon() {
  const api = useApi();
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRedeem = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await api("/coupon/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voucherType: selected })
      });
      setStatus({ type: "success", msg: "Coupon Claimed! Code: " + res.coupon.code });
    } catch (err) {
      setStatus({ type: "error", msg: "Failed: " + (err.message || "Error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl mt-12 border border-gray-100 dark:border-gray-700"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
          <Gift size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Redeem Rewards</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Select a reward to claim with your points</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none text-gray-900 dark:text-white font-medium"
          >
            <option value="">Select Reward...</option>
            {couponRewards.map(r =>
              <option value={r.type} key={r.type}>
                {r.type} ({r.pointsRequired} pts)
              </option>
            )}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ArrowRight size={16} className="rotate-90" />
          </div>
        </div>

        <button
          disabled={!selected || loading}
          onClick={handleRedeem}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Claim Reward <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>

      {status && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${status.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
              : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
            }`}
        >
          {status.type === "success" ? <CheckCircle size={20} className="mt-0.5" /> : <AlertCircle size={20} className="mt-0.5" />}
          <span className="font-medium text-sm">{status.msg}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
