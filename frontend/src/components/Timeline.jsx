import React from "react";

const statusMap = {
    GENERATED: { color: "bg-gray-300", label: "Generated" },
    SEGREGATED_AT_SOURCE: { color: "bg-green-400", label: "Segregated at Source" },
    COLLECTED: { color: "bg-blue-400", label: "Collected" },
    TRANSPORTING: { color: "bg-yellow-400", label: "Transporting" },
    DUMPING_AREA: { color: "bg-red-400", label: "Dumping Area" },
    FACILITY_SEGREGATION: { color: "bg-purple-400", label: "Facility Segregation" },
    PROCESSING: { color: "bg-green-500", label: "Processing" },
    COMPLETED: { color: "bg-green-700 text-white", label: "Completed" },
};

export default function Timeline({ events }) {
    if (!events || !events.length)
        return <div className="text-center py-6 text-gray-500">No timeline data.</div>;

    return (
        <div className="relative pl-6">
            {/* Vertical Line */}
            <div className="absolute top-0 left-3 w-1 h-full bg-green-200 rounded-full animate-growLine"></div>

            <ol className="space-y-10 relative">
                {events.map((evt, idx) => {
                    const statusInfo = statusMap[evt.status] || {
                        color: "bg-gray-300",
                        label: evt.status,
                    };

                    return (
                        <li key={idx} className="relative flex gap-4 items-start animate-fadeUp">
                            {/* Index Circle */}
                            <span
                                className={`
                                    absolute -left-6 flex items-center justify-center 
                                    w-10 h-10 rounded-full ring-4 ring-green-300 text-sm font-bold
                                    ${statusInfo.color}
                                `}
                            >
                                {idx + 1}
                            </span>

                            {/* Content */}
                            <div className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md rounded-xl p-5 w-full">
                                <div className="flex flex-wrap justify-between items-center gap-2">
                                    <h4 className="text-xl font-bold text-green-700">
                                        {statusInfo.label}
                                    </h4>

                                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                        Step {idx + 1}
                                    </span>
                                </div>

                                <p className="text-gray-700 mt-2 text-sm">
                                    {evt.timestamp
                                        ? new Date(evt.timestamp).toLocaleString()
                                        : "No timestamp"}
                                </p>

                                {evt.coords && (
                                    <p className="text-gray-600 mt-1 text-sm">
                                        🌍 Location: {evt.coords.lat}, {evt.coords.lon}
                                    </p>
                                )}

                                {evt.photo && (
                                    <div className="mt-3">
                                        <img
                                            src={evt.photo}
                                            alt="Proof"
                                            className="w-20 h-20 rounded-lg border object-cover shadow hover:scale-105 transition-transform cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>

            {/* Animations */}
            <style>{`
                @keyframes fadeUp {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .animate-fadeUp {
                    animation: fadeUp 0.4s ease forwards;
                }

                @keyframes growLine {
                    0% { height: 0; }
                    100% { height: 100%; }
                }

                .animate-growLine {
                    animation: growLine 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
