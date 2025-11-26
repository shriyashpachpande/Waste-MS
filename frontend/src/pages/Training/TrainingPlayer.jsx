import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, CheckCircle, ArrowRight, BookOpen, ArrowLeft } from "lucide-react";

export default function TrainingPlayer() {
    const api = useApi();
    const { id } = useParams();
    const [mod, setMod] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api(`/training/${id}`)
            .then((data) => setMod(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!mod) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Module not found</h2>
                <Link to="/training" className="text-green-600 hover:underline mt-4 inline-block">Back to Training</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 py-8"
        >
            <Link to="/training" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition-colors font-medium">
                <ArrowLeft size={20} />
                Back to Training
            </Link>

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase tracking-wide">
                            Training Module
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{mod.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">{mod.description}</p>
                </div>

                <div className="p-6 md:p-8 space-y-8">

                    {/* Video Section */}
                    {mod.videos?.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <PlayCircle size={24} className="text-green-600 dark:text-green-400" />
                                Training Video
                            </h3>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black aspect-video group">
                                <video
                                    controls
                                    src={mod.videos[0]}
                                    className="w-full h-full object-contain"
                                    poster={mod.thumbnail || ""}
                                />
                            </div>
                        </div>
                    )}

                    {/* Lessons Section */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
                            Lessons Covered
                        </h3>
                        <div className="grid gap-3">
                            {mod.lessons?.map((lesson, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-bold">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{lesson}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
                        <Link
                            to={`/training/${id}/quiz`}
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all"
                        >
                            Take Quiz
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
