import React from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function RegistrationStatus() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 text-center max-w-lg border border-gray-100 dark:border-gray-700"
            >
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                </div>

                <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
                    Registration Pending
                </h2>

                <p className="mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                    Your account is currently awaiting admin approval.
                    <br className="hidden sm:block" />
                    You will receive an email notification once your account has been reviewed and activated.
                </p>

                <div className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Thank you for helping us make the city cleaner and smarter!
                    </p>

                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
