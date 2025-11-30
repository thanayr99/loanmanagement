import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiGift,
  FiPlusCircle,
  FiBarChart2,
  FiUsers,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar({ user, onLogout }) {
  const [open, setOpen] = useState(true);

  const menu = [
    { text: "Dashboard", icon: <FiHome />, link: `/dashboard/${user?.role?.toLowerCase()}` },
    { text: "Loans", icon: <FiList />, link: "/loans", show: user?.role !== "Admin" },
    { text: "Offers", icon: <FiGift />, link: "/offers", show: user?.role === "Lender" },
    { text: "Create Loan", icon: <FiPlusCircle />, link: "/loans/new", show: user?.role === "Lender" },
    { text: "Analytics", icon: <FiBarChart2 />, link: "/analytics", show: user?.role === "Analyst" },
    { text: "User Management", icon: <FiUsers />, link: "/admin/users", show: user?.role === "Admin" },
  ];

  return (
    <div
      className={`
        h-screen fixed top-0 left-0
        bg-gradient-to-b from-[#4b1dff] to-[#9b0bd9]
        text-white shadow-xl transition-all duration-300
        ${open ? "w-64" : "w-20"}
      `}
      style={{ backdropFilter: "blur(12px)" }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 p-3 rounded-md mt-4 ml-3 transition"
      >
        <FiMenu size={20} />
        {open && <span className="text-sm font-semibold">Menu</span>}
      </button>

      {/* Menu */}
      <div className="mt-6 space-y-1">
        {menu.map(
          (m, i) =>
            m.show !== false && (
              <Link
                key={i}
                to={m.link}
                className="
                  flex items-center gap-3 p-3 mx-3 rounded-lg
                  hover:bg-white/20 transition text-sm font-medium
                "
              >
                <div className="text-lg">{m.icon}</div>
                {open && <span>{m.text}</span>}
              </Link>
            )
        )}
      </div>

      {/* Logout */}
      <div className="absolute bottom-5 w-full px-3">
        <button
          onClick={onLogout}
          className="
            flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 
            text-white p-3 rounded-lg text-sm font-semibold transition
          "
        >
          <FiLogOut size={18} />
          {open && "Logout"}
        </button>
      </div>
    </div>
  );
}
