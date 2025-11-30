import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loadUsers, saveSession } from "../../utils/storage";

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    let users = loadUsers();
    let found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return alert("Invalid username or password");
    saveSession(found);
    setUser(found);
    navigate(`/dashboard/${found.role.toLowerCase()}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b0034] via-[#320055] to-[#0c001f] flex justify-center items-center px-4">

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wide">
          Welcome Back
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Login to access your dashboard
        </p>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            className="w-full bg-white/20 p-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-white/20 p-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={login}
          className="w-full mt-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl shadow-lg font-bold text-white transition"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-300">
          New user?{" "}
          <Link to="/signup" className="text-pink-400 hover:text-pink-300 underline">
            Create an account
          </Link>
        </p>
      </motion.div>

    </div>
  );
}
