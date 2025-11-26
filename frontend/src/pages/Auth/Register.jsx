import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, MapPin, Building, Upload, Loader2, ArrowRight, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const ROLES = [
  { value: "CITIZEN", label: "Citizen" },
  { value: "WORKER", label: "Waste Worker" },
  { value: "GREEN_CHAMPION", label: "Green Champion" },
];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CITIZEN",
    address: "",
    city: "",
    kycDocs: null,
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          body: data,
        }
      ).then((r) => r.json());

      if (res.message && /pending|approval/i.test(res.message)) {
        setPending(true);
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pending) {
    window.location.href = "/registration-status";
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
              <Leaf size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Join us in making the world cleaner
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

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">I am a...</label>
              <div className="relative">
                <select
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all appearance-none"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Address & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <input
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    name="address"
                    placeholder="Street Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">City</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                    <Building size={18} />
                  </div>
                  <input
                    className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* KYC Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                Upload KYC Document (PDF / JPG / PNG)
              </label>
              <div className="relative">
                <input
                  className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 dark:file:bg-green-900/30 dark:file:text-green-400 cursor-pointer"
                  name="kycDocs"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl py-3 transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Register
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already registered?{" "}
            <Link to="/login" className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
