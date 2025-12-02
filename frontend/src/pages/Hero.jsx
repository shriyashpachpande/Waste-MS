import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Leaf, Recycle, BarChart3, Zap, PlayCircle } from "lucide-react";

export default function Hero() {
    const heroRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {

            // HERO TEXT ANIMATION
            gsap.from(".hero-title", {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".hero-subtext", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                delay: 0.2
            });

            gsap.fromTo(
                ".hero-buttons button",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    delay: 0.3
                }
            );

            gsap.from(".hero-image", {
                opacity: 0,
                scale: 0.92,
                duration: 1.2,
                ease: "power2.out",
                delay: 0.4
            });

            // FAST COUNTER FUNCTION
            const fastCounter = (selector, endValue, speed = 10) => {
                let current = 0;
                const el = document.querySelector(selector);
                if (!el) return;

                const step = () => {
                    current += Math.ceil(endValue / 100);

                    if (current >= endValue) {
                        el.textContent = endValue.toLocaleString();
                    } else {
                        el.textContent = current.toLocaleString();
                        setTimeout(step, speed);
                    }
                };
                step();
            };

            // STATS APPEAR + COUNTER START
            gsap.from(".stats-wrapper", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.6,
                onComplete: () => {
                    fastCounter(".stat-1", 170339, 5);
                    fastCounter(".stat-2", 54, 20);
                    fastCounter(".stat-3", 249, 10);
                    fastCounter(".stat-4", 819, 8);
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const goToDashboard = () => {
        navigate("/CitizenDashboard");
    };

    return (
        <section
            ref={heroRef}
            className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 transition-colors duration-300 overflow-hidden relative"
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

                {/* LEFT */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-800">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Smart Waste Management System
                    </div>

                    <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight">
                        Transform Waste <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-blue-500 dark:from-red-400 dark:via-green-400 dark:to-blue-400">
                            Into Resources
                        </span>
                    </h1>

                    <p className="hero-subtext text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg">
                        Join India's mission to manage 1.7 lakh tonnes of daily waste through
                        digital innovation, community participation, and sustainable practices.
                    </p>

                    <div className="hero-buttons flex flex-wrap gap-4">
                        <button
                            onClick={goToDashboard}
                            className="group flex items-center gap-2 cursor-pointer bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/40 hover:-translate-y-1"
                        >
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            className="flex items-center gap-2 cursor-pointer border-2  border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-600"
                        >
                            <PlayCircle className="w-5 h-5" />
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center relative perspective-1000">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl opacity-20 dark:opacity-40 animate-pulse-soft"></div>
                    <div className="hero-image relative z-10 rounded-3xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-800 transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700">
                        <img
                            src="/images/hero.jpg"
                            alt="Waste Management"
                            className="w-full h-auto max-h-[600px] object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `<div class="w-full h-[400px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 flex-col gap-4"><span class="text-8xl">♻️</span><p class="font-bold">Sustainable Future</p></div>`
                            }}
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                            <p className="font-bold text-lg">Clean Cities, Green Future</p>
                            <p className="text-sm opacity-80">Powered by AI & Community Action</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="mt-24 text-center stats-wrapper px-6 relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Challenge We Face</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    India's waste management statistics highlight the urgent need for systematic solutions
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto">

                    <StatCard
                        icon={<Recycle size={24} />}
                        color="green"
                        value="0"
                        label="Tonnes of Waste Daily"
                        selector="stat-1"
                    />

                    <StatCard
                        icon={<BarChart3 size={24} />}
                        color="blue"
                        value="0%"
                        label="Treatment Rate"
                        selector="stat-2"
                    />

                    <StatCard
                        icon={<Zap size={24} />}
                        color="orange"
                        value="0"
                        label="Waste-to-Energy Plants"
                        selector="stat-3"
                    />

                    <StatCard
                        icon={<Leaf size={24} />}
                        color="purple"
                        value="0"
                        label="Biomass Power Plants"
                        selector="stat-4"
                    />

                </div>
            </div>
        </section>
    );
}

function StatCard({ icon, color, value, label, selector }) {
    const colorClasses = {
        green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
        purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110 ${colorClasses[color]}`}>
                {icon}
            </div>
            <h3 className={`${selector} text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-blue-500 dark:from-red-400 dark:via-green-400 dark:to-blue-400 mb-2`}>{value}</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        </div>
    );
}
