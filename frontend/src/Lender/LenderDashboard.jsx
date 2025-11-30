import React from "react";
import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import { FiCreditCard, FiActivity, FiTrendingUp, FiArrowRight } from "react-icons/fi";

function formatCurrency(x) {
  return `₹${Number(x).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export default function LenderDashboard({ user, loans, setLoans, onLogout }) {
  const myOffersCount = 0; // (Offers live on /offers page)
  const myLoans = loans.filter((l) => l.lenderUsername === user?.username);

  const totalLent = myLoans.reduce((s, l) => s + Number(l.principal || 0), 0);

  const totalOutstanding = myLoans.reduce((s, l) => {
    const paid = (l.payments || []).reduce((a, p) => a + Number(p.amount || 0), 0);
    return s + Math.max(0, Number(l.principal || 0) - paid);
  }, 0);

  return (
    <PageLayout user={user} onLogout={onLogout}>
      <div className="space-y-10 px-6 pt-4">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Lender Dashboard
          </h2>

          <div className="flex gap-3">
            <Link
              to="/offers"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600
              text-white rounded-xl font-semibold shadow hover:opacity-90 transition-all flex items-center gap-2"
            >
              <FiActivity /> Manage Offers
            </Link>

            <Link
              to="/loans/new"
              className="px-5 py-2.5 border border-purple-600 text-purple-600
              rounded-xl font-semibold shadow hover:bg-purple-50 transition-all flex items-center gap-2"
            >
              <FiCreditCard /> Create Loan
            </Link>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium text-sm">Active Offers</span>
              <FiActivity className="text-purple-600 text-xl" />
            </div>
            <div className="text-4xl font-bold mt-2">{myOffersCount}</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium text-sm">Total Lent</span>
              <FiTrendingUp className="text-green-600 text-xl" />
            </div>
            <div className="text-4xl font-bold mt-2">{formatCurrency(totalLent)}</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium text-sm">Outstanding</span>
              <FiArrowRight className="text-red-500 text-xl" />
            </div>
            <div className="text-4xl font-bold mt-2">{formatCurrency(totalOutstanding)}</div>
          </div>

        </div>

        {/* LOANS LIST */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Loans You Funded</h3>

          {myLoans.length === 0 && (
            <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl">
              No funded loans yet.
            </div>
          )}

          <div className="grid gap-4">
            {myLoans.map((l) => {
              const paid = (l.payments || []).reduce((a, p) => a + Number(p.amount || 0), 0);
              const outstanding = Math.max(0, (l.principal || 0) - paid);

              return (
                <div
                  key={l.id}
                  className="
                    p-6 bg-white/40 backdrop-blur-xl border border-white/50 
                    rounded-2xl shadow-xl flex justify-between items-center
                  "
                >
                  <div>
                    <div className="font-bold text-lg text-gray-900">{l.borrowerName}</div>
                    <div className="text-sm text-gray-600">Loan ID: {l.id}</div>

                    <div className="mt-1 text-sm">
                      Principal: <span className="font-semibold">{formatCurrency(l.principal)}</span>
                      {" • "}
                      EMI: <span className="font-semibold">{formatCurrency(l.emi)}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-700">Payments: {l.payments?.length}</div>
                    <div className="text-sm font-semibold text-gray-900">
                      Outstanding: {formatCurrency(outstanding)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
