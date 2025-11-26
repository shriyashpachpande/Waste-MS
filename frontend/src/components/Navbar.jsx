import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import { Menu, X, Sun, Moon, User, LogOut, Leaf, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setOpen(!open);
    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    // Close menus when route changes
    useEffect(() => {
        setOpen(false);
        setUserMenuOpen(false);
    }, [location]);

    const displayName = user?.name
        ? user.name.split(" ")[0]
        : user?.email?.split("@")[0];

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ to, children }) => (
        <Link
            to={to}
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
            ${isActive(to)
                    ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
        >
            {children}
            {isActive(to) && (
                <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full mx-3"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
        </Link>
    );

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform duration-200">
                            <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            SmartWaste
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {user && (
                            <>
                                <NavItem to="/training">Training</NavItem>
                                <NavItem to="/waste-tracking">Tracking</NavItem>
                                <NavItem to="/analytics">Analytics</NavItem>
                                <NavItem to="/leaderboard">Leaderboard</NavItem>
                                <NavItem to="/rewards">Rewards</NavItem>
                                <NavItem to="/shop">Shop</NavItem>
                            </>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700 focus:outline-none"
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center text-green-700 dark:text-green-400 ring-2 ring-transparent hover:ring-green-500/30 transition-all">
                                        <User size={18} />
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none">{displayName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.role?.replace('_', ' ')}</p>
                                    </div>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 overflow-hidden"
                                        >
                                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 lg:hidden">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{displayName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                                            </div>
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-lg shadow-green-600/20 transition-all hover:shadow-green-600/40 hover:-translate-y-0.5"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {user ? (
                                <>
                                    <Link to="/training" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Training</Link>
                                    <Link to="/waste-tracking" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Tracking</Link>
                                    <Link to="/analytics" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Analytics</Link>
                                    <Link to="/leaderboard" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Leaderboard</Link>
                                    <Link to="/rewards" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Rewards</Link>
                                    <Link to="/shop" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Shop</Link>

                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3 px-3 py-2">
                                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-700 dark:text-green-400">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{displayName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="w-full mt-2 flex items-center gap-2 px-3 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            <LogOut size={20} />
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 pt-4">
                                    <Link
                                        to="/login"
                                        className="w-full px-4 py-3 text-center text-base font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="w-full px-4 py-3 text-center text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-lg shadow-green-600/20 transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
