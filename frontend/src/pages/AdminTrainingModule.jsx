// frontend/src/pages/AdminTrainingModule.jsx
import React, { useState } from "react";
import useApi from "../hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Trash2, Video, CheckCircle, AlertCircle, List, HelpCircle } from "lucide-react";

export default function AdminTrainingModule() {
    const api = useApi();
    const [title, setTitle] = useState("");
    const [lessons, setLessons] = useState([""]);
    const [videos, setVideos] = useState([""]);
    const [mcqs, setMcqs] = useState([
        { question: "", options: ["", "", "", ""], correct: 0 },
    ]);
    const [passingScore, setPassingScore] = useState(7);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleMcqChange = (idx, key, value) => {
        setMcqs((prev) =>
            prev.map((mcq, i) => (i === idx ? { ...mcq, [key]: value } : mcq))
        );
    };

    const addMcq = () =>
        setMcqs([
            ...mcqs,
            { question: "", options: ["", "", "", ""], correct: 0 },
        ]);

    const handleOptionChange = (midx, oidx, value) => {
        setMcqs((prev) =>
            prev.map((mcq, i) =>
                i === midx
                    ? {
                        ...mcq,
                        options: mcq.options.map((opt, j) =>
                            j === oidx ? value : opt
                        ),
                    }
                    : mcq
            )
        );
    };

    const removeMcq = (idx) =>
        setMcqs((prev) => prev.filter((_, i) => i !== idx));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await api("/training", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    lessons,
                    videos: videos.filter(v => v.trim() !== ""),
                    mcqs,
                    passingScore,
                }),
            });

            if (res && res._id) {
                setMessage("success");
                setTitle("");
                setLessons([""]);
                setVideos([""]);
                setMcqs([{ question: "", options: ["", "", "", ""], correct: 0 }]);
                setPassingScore(7);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setMessage("error");
            }
        } catch (error) {
            setMessage("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto p-6 mt-10"
        >
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">

                {/* Header */}
                <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Create Training Module
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Add new educational content for users.
                    </p>
                </div>

                <div className="p-8">
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${message === "success"
                                    ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                                    : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
                                }`}
                        >
                            {message === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span className="font-medium">
                                {message === "success" ? "Training module created successfully!" : "Error creating training module. Please try again."}
                            </span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                <BookOpen size={18} className="text-blue-500" />
                                Module Title
                            </label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                                placeholder="e.g., Waste Segregation Basics"
                                required
                            />
                        </div>

                        {/* Lessons */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                <List size={18} className="text-purple-500" />
                                Lessons
                            </label>

                            <div className="space-y-3">
                                {lessons.map((lesson, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <span className="flex-shrink-0 w-8 h-10 flex items-center justify-center text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 rounded-lg">
                                            {idx + 1}
                                        </span>
                                        <input
                                            value={lesson}
                                            onChange={(e) =>
                                                setLessons((prev) =>
                                                    prev.map((l, i) =>
                                                        i === idx ? e.target.value : l
                                                    )
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-900 dark:text-white"
                                            placeholder={`Lesson content or title`}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => setLessons([...lessons, ""])}
                                className="mt-3 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1 transition-colors"
                            >
                                <Plus size={16} /> Add Another Lesson
                            </button>
                        </div>

                        {/* Videos */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                <Video size={18} className="text-red-500" />
                                Video URLs
                            </label>

                            <div className="space-y-3">
                                {videos.map((video, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            value={video}
                                            onChange={(e) =>
                                                setVideos((prev) =>
                                                    prev.map((v, i) =>
                                                        i === idx ? e.target.value : v
                                                    )
                                                )
                                            }
                                            className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-900 dark:text-white"
                                            placeholder={`https://example.com/video.mp4`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => setVideos([...videos, ""])}
                                className="mt-3 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1 transition-colors"
                            >
                                <Plus size={16} /> Add Another Video
                            </button>
                        </div>

                        {/* MCQs */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                <HelpCircle size={18} className="text-orange-500" />
                                Quiz Questions (MCQs)
                            </label>

                            <div className="space-y-6">
                                {mcqs.map((mcq, idx) => (
                                    <div
                                        key={idx}
                                        className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 relative group"
                                    >
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={() => removeMcq(idx)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Remove Question"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="mb-4 pr-10">
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Question {idx + 1}</label>
                                            <input
                                                value={mcq.question}
                                                onChange={(e) =>
                                                    handleMcqChange(
                                                        idx,
                                                        "question",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium"
                                                placeholder="Enter question text"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                            {mcq.options.map((opt, oidx) => (
                                                <div key={oidx}>
                                                    <input
                                                        value={opt}
                                                        onChange={(e) =>
                                                            handleOptionChange(
                                                                idx,
                                                                oidx,
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm ${mcq.correct === oidx
                                                                ? "bg-green-50 border-green-300 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                                                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                                                            }`}
                                                        placeholder={`Option ${oidx + 1}`}
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Correct Answer:</label>
                                            <div className="flex gap-2">
                                                {mcq.options.map((_, oidx) => (
                                                    <button
                                                        key={oidx}
                                                        type="button"
                                                        onClick={() => handleMcqChange(idx, "correct", oidx)}
                                                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${mcq.correct === oidx
                                                                ? "bg-green-600 text-white shadow-md scale-105"
                                                                : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                                                            }`}
                                                    >
                                                        {oidx + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addMcq}
                                className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 font-semibold hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={20} /> Add New Question
                            </button>
                        </div>

                        {/* Passing Score */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                Passing Score Requirement
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={passingScore}
                                    onChange={(e) => setPassingScore(parseInt(e.target.value))}
                                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <span className="text-xl font-bold text-green-700 dark:text-green-400 w-16 text-center">
                                    {passingScore}%
                                </span>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Publish Training Module"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
