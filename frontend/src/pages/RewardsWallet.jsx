import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Gift, Coins, Clock, Tag, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RewardsWallet() {
    const api = useApi();
    const [user, setUser] = useState();
    const [rewards, setRewards] = useState([]);
    const [offers, setOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api("/auth/me"),
            api("/reward-penalty/reward"),
            api("/reward-offers"),
        ]).then(([userRes, rewardsRes, offersRes]) => {
            setUser(userRes.user);
            setRewards(rewardsRes || []);
            setOffers(offersRes || []);
            setLoading(false);
        });
    }, []);

    const handleRedeem = async (offerType) => {
        const typeToRedeem = offerType || selectedOffer;
        if (!typeToRedeem) return;

        try {
            const res = await api("/coupon/redeem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voucherType: typeToRedeem })
            });
            setStatus({ type: "success", msg: "Coupon Claimed! Code: " + res.coupon.code });

            // Refresh user points
            const userRes = await api("/auth/me");
            setUser(userRes.user);

            setTimeout(() => setStatus(""), 5000);
        } catch (err) {
            setStatus({ type: "error", msg: "Redeem failed: " + (err.message || "Error") });
            setTimeout(() => setStatus(""), 5000);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto p-6 space-y-8"
        >

            {/* Status / Toast */}
            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${status.type === "success"
                                ? "bg-green-100 border-green-300 text-green-800"
                                : "bg-red-100 border-red-300 text-red-800"
                            }`}
                    >
                        {status.type === "success" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        <span className="font-bold">{status.msg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Card */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
                            <Gift className="w-8 h-8" />
                            Rewards Wallet
                        </h2>
                        <p className="text-green-100 max-w-md">
                            Earn points for segregation, drop-off, awareness training, and more! Redeem them for exciting offers.
                        </p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl flex items-center gap-4 min-w-[240px]">
                        <div className="bg-yellow-400 p-3 rounded-full text-yellow-900 shadow-lg">
                            <Coins className="w-8 h-8" />
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-green-100 uppercase tracking-wider">Your Balance</span>
                            <span className="text-4xl font-extrabold text-white">
                                {user?.points ?? 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* OFFERS SECTION */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Tag className="w-5 h-5 text-green-600" />
                            Available Offers
                        </h3>
                    </div>

                    {offers.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
                            <Gift size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No reward offers currently available.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {offers.map((o) => {
                                const canRedeem = (user?.points ?? 0) >= o.pointsRequired;

                                return (
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        key={o._id}
                                        className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col ${canRedeem
                                                ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl hover:border-green-200 dark:hover:border-green-900"
                                                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-80"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400">
                                                <Tag size={24} />
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${canRedeem
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                                }`}>
                                                {o.pointsRequired} pts
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{o.type}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
                                            {o.description || "Redeem your points for this exclusive reward."}
                                        </p>

                                        <button
                                            disabled={!canRedeem}
                                            onClick={() => handleRedeem(o.type)}
                                            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                                                ${canRedeem
                                                    ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            {canRedeem ? "Redeem Now" : "Insufficient Points"}
                                            {canRedeem && <ArrowRight size={16} />}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* HISTORY SECTION */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden sticky top-6">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                Recent Activity
                            </h3>
                        </div>

                        <div className="p-4 max-h-[500px] overflow-y-auto custom-scroll">
                            {rewards.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <p>No rewards earned yet.</p>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {rewards.map((r, idx) => (
                                        <li
                                            key={r._id || idx}
                                            className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{r.reason}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {new Date(r.date || Date.now()).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg text-sm">
                                                +{r.points}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
