import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//
// EMI CALCULATION
//
export function calculateEMI(P, R, N) {
  const rate = R / 12 / 100;
  return +(P * rate * Math.pow(1 + rate, N)) /
    (Math.pow(1 + rate, N) - 1);
}

//
// LOANS PAGE
//
export function LoansPage({ loans, setLoans, role }) {
  const navigate = useNavigate();

  function recordPayment(id) {
    const amt = Number(prompt("Enter payment amount:"));
    if (!amt) return;

    const updated = loans.map((l) =>
      l.id === id
        ? { ...l, payments: [...l.payments, { amount: amt, date: Date.now() }] }
        : l
    );

    setLoans(updated);
    localStorage.setItem("loans", JSON.stringify(updated));
  }

  return (
    <div className="space-y-10 px-6 pt-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Loans</h2>

        {role === "Lender" && (
          <button
            onClick={() => navigate("/loans/new")}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600
                       text-white font-semibold rounded-xl shadow-lg
                       hover:opacity-90 transition"
          >
            + Create Loan
          </button>
        )}
      </div>

      {/* LOANS LIST */}
      <div className="grid gap-6">
        {loans.map((l) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white/40 backdrop-blur-lg border border-white/50 
                       rounded-2xl shadow-xl flex justify-between items-center"
          >
            {/* LOAN INFO */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-800">
                {l.borrowerName}
              </h3>
              <p className="text-gray-600 text-sm">Loan ID: {l.id}</p>
              <p className="text-gray-700 font-medium">
                Principal: ₹{l.principal.toLocaleString()}
              </p>
              <p className="text-gray-700 font-medium">
                EMI: ₹{l.emi.toFixed(2)}
              </p>
            </div>

            {/* PAYMENT BUTTON */}
            {role !== "Analyst" && (
              <button
                onClick={() => recordPayment(l.id)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                           text-white rounded-xl font-semibold shadow-lg transition"
              >
                Pay EMI
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

//
// CREATE LOAN PAGE
//
export function CreateLoan({ loans, setLoans }) {
  const [name, setName] = React.useState("");
  const [p, setP] = React.useState(100000);
  const [r, setR] = React.useState(10);
  const [m, setM] = React.useState(12);
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();

    let loan = {
      id: `L-${Math.floor(Math.random() * 999)}`,
      borrowerName: name,
      principal: Number(p),
      rate: Number(r),
      months: Number(m),
      emi: calculateEMI(p, r, m),
      payments: [],
    };

    const updated = [loan, ...loans];
    setLoans(updated);

    localStorage.setItem("loans", JSON.stringify(updated));
    navigate("/loans");
  }

  return (
    <div className="max-w-lg mx-auto p-8 mt-8 bg-white/40 backdrop-blur-lg
                    border border-white/50 shadow-2xl rounded-2xl">

      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
        Create Loan
      </h2>

      <form onSubmit={submit} className="space-y-4">

        <input
          className="w-full p-3 rounded-xl bg-white/70 border border-gray-300
                     focus:ring-2 focus:ring-purple-600 outline-none"
          placeholder="Borrower Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-xl bg-white/70 border border-gray-300
                     focus:ring-2 focus:ring-purple-600 outline-none"
          type="number"
          placeholder="Principal"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-xl bg-white/70 border border-gray-300
                     focus:ring-2 focus:ring-purple-600 outline-none"
          type="number"
          placeholder="Rate (%)"
          value={r}
          onChange={(e) => setR(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-xl bg-white/70 border border-gray-300
                     focus:ring-2 focus:ring-purple-600 outline-none"
          type="number"
          placeholder="Months"
          value={m}
          onChange={(e) => setM(e.target.value)}
        />

        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600
                     to-pink-600 text-white font-semibold shadow-lg 
                     hover:opacity-90 transition"
        >
          Save Loan
        </button>
      </form>
    </div>
  );
}
