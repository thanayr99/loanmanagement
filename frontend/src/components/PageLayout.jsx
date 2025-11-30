import React from "react";
import Sidebar from "./Sidebar";

export default function PageLayout({ children, user, onLogout }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={onLogout} />

      {/* CONTENT */}
      <div className="flex-1 min-h-screen bg-[#f6f7fb] p-8 pl-72 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
