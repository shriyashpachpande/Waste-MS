import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user || !["ULB_ADMIN", "SUPER_ADMIN"].includes(user.role)) return null;

  return (
    <aside className="bg-green-100 min-h-screen p-4 w-56 hidden md:block fixed">
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard/admin" className="py-2 px-3 rounded hover:bg-green-300">Dashboard</Link>
        <Link to="/facilities" className="py-2 px-3 rounded hover:bg-green-300">Facilities</Link>
        <Link to="/vehicles" className="py-2 px-3 rounded hover:bg-green-300">Vehicle Map</Link>
        <Link to="/admin/registrations" className="py-2 px-3 rounded hover:bg-green-300">Approve Registrations</Link>
        <Link to="/analytics" className="py-2 px-3 rounded hover:bg-green-300">Analytics</Link>
      </nav>
    </aside>
  );
}
