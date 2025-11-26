import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
                    <img
                        src="/images/sih1.png"
                        alt="404"
                        className="relative z-10 mx-auto h-32 object-contain drop-shadow-xl"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML += `<div class="text-9xl mx-auto">😕</div>`
                        }}
                    />
                </div>

                <h1 className="font-extrabold text-8xl text-green-600 dark:text-green-500 mb-2">404</h1>
                <h2 className="font-bold text-2xl text-gray-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="mb-8 text-gray-600 dark:text-gray-400 text-lg">
                    Oops! The page you are looking for might have been removed or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 hover:-translate-y-1"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:-translate-y-1"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
