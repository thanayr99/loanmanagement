// 🚀 FINAL UPGRADED VERSION
// Includes:
// 🌙 Dark Mode (Toggle + Saved in LocalStorage)
// 📊 Charts Dashboard (Recharts)
// 🎞️ Smooth Animations (Framer Motion)
// 👨‍💼 Admin User Management (CRUD)
// 🧭 Sidebar + Modern UI (Tailwind v4)
// ------------------------------------------------------------
// Paste this entire file into App.jsx
// ------------------------------------------------------------

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import SignupPage from "./components/Auth/SignupPage";
import AdminUserManagement from "./Admin/AdminUserManagement";
import AnalyticsDashboard from "./Analyst/AnalyticsDashboard";
import { LoansPage, CreateLoan } from "./Lender/LoansPage";
import PageLayout from "./components/PageLayout";
import Protected from "./components/Protected";
import { loadSession, clearSession, loadLoans } from "./utils/storage";
import Home from "./pages/Home";
import BorrowerDashboard from "./Borrower/BorrowerDashboard";
import OfferManagement from "./Lender/OfferManagement";
import LenderDashboard from "./Lender/LenderDashboard";

export default function App() {
  const [user, setUser] = useState(loadSession());
  const [loans, setLoans] = useState(loadLoans());

  function logout() {
    clearSession();
    setUser(null);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />

        {/* Dashboards */}
        <Route path="/dashboard/admin" element={<Protected user={user}><PageLayout user={user} onLogout={logout}><AdminUserManagement /></PageLayout></Protected>} />
        <Route path="/dashboard/lender" element={<Protected user={user}><LenderDashboard user={user} loans={loans} setLoans={setLoans} onLogout={logout} /></Protected>} />
        <Route path="/offers" element={<Protected user={user}><OfferManagement user={user} loans={loans} setLoans={setLoans} onLogout={logout} /></Protected>} />
        <Route path="/dashboard/borrower" element={<Protected user={user}><BorrowerDashboard user={user} loans={loans} setLoans={setLoans} onLogout={logout} /></Protected>} />
        <Route path="/dashboard/analyst" element={<Protected user={user}><PageLayout user={user} onLogout={logout}><AnalyticsDashboard /></PageLayout></Protected>} />

        {/* Loans */}
        <Route path="/loans" element={<Protected user={user}><PageLayout user={user} onLogout={logout}><LoansPage loans={loans} setLoans={setLoans} role={user?.role} /></PageLayout></Protected>} />
        <Route path="/loans/new" element={<Protected user={user}><PageLayout user={user} onLogout={logout}><CreateLoan loans={loans} setLoans={setLoans} /></PageLayout></Protected>} />
      </Routes>
    </Router>
  );
}
