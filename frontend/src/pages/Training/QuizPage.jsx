import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, Award, HelpCircle, ArrowLeft } from "lucide-react";

export default function QuizPage() {
  const [mod, setMod] = useState();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api(`/training/${id}`)
      .then((data) => setMod(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (idx, val) => {
    setAnswers((ans) => ({ ...ans, [idx]: parseInt(val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api(`/training/${id}/submit-quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    setResult(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!mod) return null;

  if (result) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center border border-gray-100 dark:border-gray-700"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${result.pass ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {result.pass ? <Award size={40} /> : <XCircle size={40} />}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {result.pass ? "Congratulations!" : "Keep Trying!"}
          </h2>

          <div className="text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
            {result.score}<span className="text-2xl text-gray-400 font-medium">/100</span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            {result.pass
              ? "You've successfully passed the quiz and earned your certificate."
              : "You didn't pass this time. Review the material and try again."}
          </p>

          <div className="space-y-3">
            {result.pass && (
              <Link
                to={`/training/${id}/certificate`}
                className="block w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all"
              >
                View Certificate
              </Link>
            )}

            <button
              onClick={() => navigate("/training")}
              className="block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-3.5 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              Back to Training List
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <Link to={`/training/${id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition-colors font-medium">
        <ArrowLeft size={20} />
        Back to Module
      </Link>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 md:p-8 bg-green-600 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Quiz: {mod.title}</h1>
          <p className="text-green-100">Answer all questions correctly to pass.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          {(mod.mcqs || []).map((q, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-bold mt-0.5">
                  {idx + 1}
                </span>
                {q.question}
              </h3>

              <div className="grid gap-3 pl-10">
                {(q.options || []).map((opt, oidx) => (
                  <label
                    key={oidx}
                    className={`
                                        relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                                        ${answers[idx] === oidx
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 bg-white dark:bg-gray-800"}
                                    `}
                  >
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={oidx}
                      required
                      checked={answers[idx] === oidx}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className={`ml-3 font-medium ${answers[idx] === oidx ? "text-green-900 dark:text-green-300" : "text-gray-700 dark:text-gray-300"}`}>
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Submit Quiz
              <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
