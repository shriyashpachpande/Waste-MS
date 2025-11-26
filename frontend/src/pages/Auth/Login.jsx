import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await login(email, password);
        setLoading(false);

        if (!res?.token) {
            setError(res?.message || "Invalid credentials");
            return;
        }

        const role = res.user?.role;

        switch (role) {
            case "ULB_ADMIN":
                window.location.href = "/dashboard/admin";
                break;
            case "SUPER_ADMIN":
                window.location.href = "/dashboard/super-admin";
                break;
            case "WORKER":
                window.location.href = "/dashboard/worker";
                break;
            case "GREEN_CHAMPION":
                window.location.href = "/dashboard/champion";
                break;
            default:
                window.location.href = "/CitizenDashboard";
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20 dark:border-gray-700"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                        <Leaf size={32} />
                    </div>
                    <h2 className="font-extrabold text-3xl mb-2 text-gray-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Sign in to continue to your dashboard
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                    >
                        <span className="block w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5 ml-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <a href="#" className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors">Forgot password?</a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-3 font-semibold transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            <>
                                Login
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                        Create an account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
