import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AnalyticsDashboard({ loans = [], users = [] }) {
  // Dummy data for charts
  const monthlyLoans = [
    { month: "Jan", count: 3 },
    { month: "Feb", count: 6 },
    { month: "Mar", count: 4 },
    { month: "Apr", count: 8 },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 34000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 26000 },
  ];

  const roleCounts = [
    {
      name: "Borrowers",
      value: users.filter((u) => u.role === "Borrower").length,
    },
    {
      name: "Lenders",
      value: users.filter((u) => u.role === "Lender").length,
    },
    {
      name: "Analysts",
      value: users.filter((u) => u.role === "Analyst").length,
    },
  ];

  const COLORS = ["#7C3AED", "#EC4899", "#06B6D4"];

  return (
    <div className="space-y-10 px-6 pt-4">

      {/* PAGE HEADER */}
      <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
        Analytics Dashboard
      </h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Loans",
            value: loans.length,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Borrowers",
            value: roleCounts[0].value,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Lenders",
            value: roleCounts[1].value,
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "Analysts",
            value: roleCounts[2].value,
            color: "from-orange-500 to-red-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`
              p-6 rounded-2xl shadow-xl text-white 
              bg-gradient-to-br ${stat.color}
            `}
          >
            <h3 className="text-lg font-medium opacity-90">{stat.title}</h3>
            <p className="text-4xl font-extrabold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* LINE CHART – LOAN TREND */}
      <div
        className="bg-white/40 backdrop-blur-xl border border-white/50 
        shadow-2xl rounded-2xl p-6"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-5">
          Monthly Loan Requests
        </h3>

        <div className="w-full h-[320px] rounded-xl bg-white/60 p-4 shadow-inner border border-gray-200">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyLoans}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="month" tick={{ fill: "#4b5563" }} />
              <YAxis tick={{ fill: "#4b5563" }} />
              <Tooltip contentStyle={{ background: "#fff", borderRadius: "12px" }} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8b5cf6"
                strokeWidth={4}
                dot={{ strokeWidth: 3, r: 5, fill: "#8b5cf6" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART – MONTHLY REVENUE */}
      <div
        className="bg-white/40 backdrop-blur-xl border border-white/50 
        shadow-2xl rounded-2xl p-6"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-5">
          Monthly EMI Revenue
        </h3>

        <div className="w-full h-[320px] rounded-xl bg-white/60 p-4 shadow-inner border border-gray-200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fill: "#4b5563" }} />
              <YAxis tick={{ fill: "#4b5563" }} />
              <Tooltip contentStyle={{ background: "#fff", borderRadius: "12px" }} />
              <Bar dataKey="revenue" fill="#EC4899" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE CHART – USER ROLES */}
      <div
        className="bg-white/40 backdrop-blur-xl border border-white/50 
        shadow-2xl rounded-2xl p-6"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-5">
          User Role Distribution
        </h3>

        <div className="w-full h-[340px] flex justify-center">
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={roleCounts}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={4}
              >
                {roleCounts.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
