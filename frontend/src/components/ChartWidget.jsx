import React, { useEffect, useState, useContext } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AuthContext } from "../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartWidget({ type, apiEndpoint, title }) {
  const { token } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${apiEndpoint}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((res) => {
        if (type === "leaderboard") {
          setLeaderboard(res.leaderboard || []);
        } else if (type === "bar" || type === "line") {
          setData({
            labels: ["Generated", "Processed"],
            datasets: [
              {
                label: "Waste (Tonnes)",
                data: [res.generated || 0, res.processed || 0],
                backgroundColor:
                  type === "bar"
                    ? ["#6EE7B7", "#10B981"]
                    : "#10B981",
                borderColor: "#10B981",
                borderWidth: 2,
                tension: 0.4,
              },
            ],
          });
        } else if (type === "pie") {
          // CORRECT PATCH — use backend real total & segregated values
          const total = res.total || 1; // prevent divide by zero
          const segregated = res.segregated || 0;
          const unhandled = total - segregated;
          setData({
            labels: ["Segregated", "Unhandled"],
            datasets: [
              {
                data: [segregated, unhandled],
                backgroundColor: ["#34D399", "#FCA5A5"],
                borderColor: "#fff",
                borderWidth: 2,
              },
            ],
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiEndpoint, type, token]);

  return (
    <div className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl p-5 
     w-full h-[350px] flex flex-col">

      <h4 className="font-semibold text-green-800 mb-3 text-lg">{title}</h4>

      {loading && (
        <div className="text-center text-gray-400 py-10 animate-pulse">
          Loading...
        </div>
      )}

      {!loading && type === "line" && data && (
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            animation: { duration: 1000 },
          }}
        />
      )}

      {!loading && type === "bar" && data && (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            animation: { duration: 1000 },
          }}
        />
      )}

      {!loading && type === "pie" && data && (
        <Pie
          data={data}
          options={{
            responsive: true,
            animation: { duration: 800 },
            plugins: { legend: { position: "right" } },
          }}
        />
      )}

      {/* Leaderboard PRO UI */}
      {!loading && type === "leaderboard" && (
        <div className="space-y-3 w-full flex-1 overflow-y-auto custom-scroll pr-1">


          {leaderboard.length === 0 && (
            <div className="text-gray-400 text-center py-12">No leaderboard data</div>
          )}

          {leaderboard.map((lb, idx) => {
            const medals = ["🥇", "🥈", "🥉"];
            const badge = medals[idx] || `#${idx + 1}`;

            const avatarLetter = (lb.name || lb.email || "?")[0].toUpperCase();

            const flag = lb.city === "Mumbai" ? "🇮🇳"
              : lb.city === "Delhi" ? "🇮🇳"
                : lb.city === "Dubai" ? "🇦🇪"
                  : "🌍";

            return (
              <div
                key={lb._id || idx}
                className="
            flex items-center justify-between p-4 rounded-xl 
            bg-white/70 backdrop-blur-xl shadow 
            border border-green-100
            hover:bg-green-50 hover:shadow-lg 
            transition-all duration-300
            animate-rankAppear
          "
              >
                {/* Left side */}
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold w-10 text-center">
                    {badge}
                  </div>

                  <div className="
              w-12 h-12 rounded-full bg-green-600 text-white 
              flex items-center justify-center 
              text-lg font-bold 
              shadow group-hover:scale-110 transition-transform
            ">
                    {avatarLetter}
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800">
                      {lb.name || lb.email}
                    </div>

                    <div className="text-sm text-gray-500">
                      {flag} {lb.city || "Unknown"}
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="text-xl font-bold text-green-700 animate-rankFlash">
                  {lb.points} pts
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
