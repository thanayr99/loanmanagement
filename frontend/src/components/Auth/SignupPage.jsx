import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loadUsers, saveUsers } from "../../utils/storage";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Borrower");
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    let users = loadUsers();
    if (users.find((u) => u.username === username)) return alert("User exists");
    users.push({ username, password, role });
    saveUsers(users);
    alert("Signup successful");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a0050] via-[#3d0077] to-[#09001a] flex justify-center items-center px-4">

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wide">
          Create Account
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Join the platform and get started
        </p>

        {/* Input Fields */}
        <div className="space-y-4">

          <input
            className="w-full bg-white/20 p-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Choose Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full bg-white/20 p-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full bg-white/20 p-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Borrower</option>
            <option>Lender</option>
            <option>Analyst</option>
          </select>

        </div>

        {/* Button */}
        <button
          onClick={signup}
          className="w-full mt-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl shadow-lg font-bold text-white transition"
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  );
}
