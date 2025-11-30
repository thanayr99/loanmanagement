import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-xl bg-white/10 border-b border-white/10 fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-10 py-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold tracking-wide">LoanMVP</h1>

        <div className="hidden md:flex gap-10 text-sm">
          <Link to="/" className="hover:text-pink-300 transition">Home</Link>
          <a className="hover:text-pink-300 transition">Features</a>
          <a className="hover:text-pink-300 transition">Guides</a>
          <a className="hover:text-pink-300 transition">Contact</a>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-pink-600 rounded-lg hover:bg-pink-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
