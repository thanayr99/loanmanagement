import React from "react";
import PageLayout from "../components/PageLayout";
import { saveLoans } from "../utils/storage";
import { loadOffers, saveOffers } from "../utils/storage";

function formatCurrency(x) {
  return `₹${Number(x).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export default function BorrowerDashboard({ user, loans, setLoans, onLogout }) {
  const myLoans =
    loans.filter(
      (l) =>
        l.borrowerName === user?.username ||
        l.borrowerName === user?.name ||
        (user?.role !== "Borrower" ? l.borrowerName === user?.username : false)
    );

  function recordPayment(loanId) {
    const amt = Number(prompt("Enter payment amount:"));
    if (!amt || amt <= 0) return;

    const updated = loans.map((l) =>
      l.id === loanId
        ? {
            ...l,
            payments: [...(l.payments || []), { amount: amt, date: Date.now() }],
          }
        : l
    );

    setLoans(updated);
    saveLoans(updated);
  }

  function totalPaid(l) {
    return (l.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0);
  }

  function outstanding(l) {
    return Math.max(0, Number(l.principal || 0) - totalPaid(l));
  }

  return (
    <PageLayout user={user} onLogout={onLogout}>
      <div className="space-y-10 px-4 md:px-8 pt-6">

        {/* HEADER */}
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
          Available Offers
        </h2>

        {/* OFFER LIST */}
        <OfferList user={user} />

        {/* USER LOANS SECTION */}
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight pt-10">
          Your Loans
        </h2>

        {myLoans.length === 0 && (
          <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/50 rounded-xl text-gray-700 max-w-lg shadow-md">
            No loans found for your account.
          </div>
        )}

        <div className="grid gap-6">
          {myLoans.map((l) => (
            <div
              key={l.id}
              className="p-6 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between gap-6"
            >
              {/* LOAN DETAILS */}
              <div>
                <div className="text-xl font-bold text-gray-900">{l.borrowerName}</div>
                <div className="text-sm text-gray-600 mt-1">Loan ID: {l.id}</div>

                <div className="mt-3 text-gray-800">
                  <div>Principal: {formatCurrency(l.principal)}</div>
                  <div>Rate: {l.rate}%</div>
                  <div>Tenure: {l.months} months</div>
                  <div>EMI: {formatCurrency(l.emi)}</div>
                  <div className="mt-2 font-semibold text-purple-700">
                    Outstanding: {formatCurrency(outstanding(l))}
                  </div>
                </div>
              </div>

              {/* PAYMENTS SECTION */}
              <div className="w-full md:w-1/3">
                <div className="mb-2 font-semibold text-gray-900">Payments</div>

                <div className="space-y-2 max-h-48 overflow-auto pr-2">
                  {(l.payments || []).length === 0 && (
                    <div className="text-sm text-gray-600">No payments yet.</div>
                  )}

                  {(l.payments || []).map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border border-gray-300 bg-white/60 p-3 rounded-xl shadow-sm"
                    >
                      <div className="text-sm text-gray-900">
                        {formatCurrency(p.amount)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(p.date).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex">
                  <button
                    onClick={() => recordPayment(l.id)}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 
                      text-white rounded-xl shadow hover:opacity-90 transition"
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

/* --------------------------------------- */
/*             OFFER LIST BELOW            */
/* --------------------------------------- */

function OfferList({ user }) {
  const [offers, setOffers] = React.useState(loadOffers());

  function sendRequest(o) {
    const amountRequested = Number(
      prompt(`Enter amount to request (max ${o.amount}):`, o.amount)
    );

    if (!amountRequested || amountRequested <= 0) return;

    const message = prompt("Optional message to lender:", "") || "";

    const req = {
      id: `R-${Math.floor(Math.random() * 99999)}`,
      borrowerUsername: user.username,
      amountRequested,
      message,
      status: "pending",
      createdAt: Date.now(),
    };

    const updated = offers.map((x) =>
      x.id === o.id ? { ...x, requests: [...(x.requests || []), req] } : x
    );

    setOffers(updated);
    saveOffers(updated);
    alert("Request sent to lender");
  }

  const visible = offers || [];

  return (
    <div className="grid gap-6">
      {visible.length === 0 && (
        <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/50 rounded-xl text-gray-700 shadow">
          No offers available.
        </div>
      )}

      {visible.map((o) => (
        <div
          key={o.id}
          className="p-6 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl flex justify-between items-center"
        >
          <div>
            <div className="text-xl font-bold text-gray-900">{o.title}</div>
            <div className="text-sm text-gray-700 mt-1">
              Lender: <span className="font-semibold">{o.lenderUsername}</span> •
              Amount: {formatCurrency(o.amount)} • Rate: {o.rate}% • {o.months} months
            </div>
          </div>

          <button
            onClick={() => sendRequest(o)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
              text-white rounded-xl shadow hover:opacity-90 transition"
          >
            Request
          </button>
        </div>
      ))}
    </div>
  );
}
