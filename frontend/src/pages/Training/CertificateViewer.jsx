import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Download, ArrowLeft, CheckCircle } from "lucide-react";

export default function CertificateViewer() {
    const { id } = useParams();
    const [cert, setCert] = useState();
    const [loading, setLoading] = useState(true);
    const api = useApi();

    useEffect(() => {
        api(`/training/${id}/certificate`)
            .then(setCert)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!cert) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
                        <Award size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Certificate Found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        You haven't earned a certificate for this module yet. Complete the quiz to unlock it.
                    </p>
                    <Link
                        to={`/training/${id}`}
                        className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline"
                    >
                        <ArrowLeft size={16} />
                        Go to Module
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto px-4 py-10"
        >
            <Link to="/training" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 mb-8 transition-colors font-medium">
                <ArrowLeft size={20} />
                Back to Training
            </Link>

            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-green-400" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="p-8 md:p-12 text-center relative z-10">
                    <img
                        src="/images/sih3.png"
                        alt="Logo"
                        className="mx-auto h-16 mb-8 opacity-80"
                    />

                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                        Certificate of Completion
                    </h1>

                    <p className="text-green-600 dark:text-green-400 font-medium mb-8 uppercase tracking-widest text-sm">
                        This certifies that
                    </p>

                    <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 pb-4 border-b-2 border-gray-100 dark:border-gray-700 inline-block px-12">
                        {/* User name would typically go here, but API might not return it in cert object directly depending on schema */}
                        Training Participant
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Has successfully completed the training module
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
                        {cert.trainingId}
                    </h3>

                    <div className="flex justify-center gap-4 mb-10">
                        <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg border border-green-100 dark:border-green-900/30">
                            <span className="block text-xs text-green-600 dark:text-green-400 uppercase font-bold tracking-wider">Score</span>
                            <span className="text-xl font-bold text-green-800 dark:text-green-300">{cert.score}%</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-900/30">
                            <span className="block text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider">Status</span>
                            <span className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1">
                                <CheckCircle size={16} /> Passed
                            </span>
                        </div>
                    </div>

                    <a
                        href={`${import.meta.env.VITE_API_URL}${cert.certificateUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all"
                    >
                        <Download size={20} />
                        Download Certificate
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
