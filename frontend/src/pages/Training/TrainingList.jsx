import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Award, PlayCircle } from "lucide-react";

export default function TrainingList() {
    const api = useApi();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api("/training")
            .then((data) => setModules(data || []))
            .finally(() => setLoading(false));
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
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
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-5xl mx-auto px-4 py-10"
        >
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                    <BookOpen size={32} />
                </div>
                <h2 className="font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-3 tracking-tight">
                    Training & Onboarding
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
                    Complete modules to earn points, improve skills, and unlock certificates.
                </p>
            </div>

            {/* List */}
            <div className="grid gap-6">
                {modules.map((mod) => (
                    <motion.div
                        variants={item}
                        key={mod._id}
                        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-green-200 dark:hover:border-green-900 transition-all group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                        {mod.title}
                                    </h3>
                                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide">
                                        Module
                                    </span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                    {mod.description || "Learn best practices for waste management and safety protocols."}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen size={16} />
                                        <span>{mod.lessons?.length || 0} Lessons</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Award size={16} />
                                        <span>Certificate Available</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
                                <Link
                                    to={`/training/${mod._id}`}
                                    className="flex-1 inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all"
                                >
                                    <PlayCircle size={20} />
                                    Start
                                </Link>

                                <Link
                                    to={`/training/${mod._id}/certificate`}
                                    className="flex-1 inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-white font-semibold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                                >
                                    <Award size={20} />
                                    Certificate
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Empty State */}
                {!modules.length && (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                        <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No modules found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Check back later for new training content.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
