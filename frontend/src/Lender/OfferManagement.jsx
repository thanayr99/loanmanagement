import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { loadOffers, saveOffers, saveLoans } from "../utils/storage";

function uid(prefix = "O") {
  return `${prefix}-${Math.floor(Math.random() * 100000)}`;
}

export default function OfferManagement({ user, loans, setLoans, onLogout }) {
  const [offers, setOffers] = useState(loadOffers());
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(12);
  const [desc, setDesc] = useState("");
  const [showForm, setShowForm] = useState(true);

  function createOffer(e) {
    e.preventDefault();
    const o = {
      id: uid(),
      lenderUsername: user.username,
      title: title || `Loan offer by ${user.username}`,
      amount: Number(amount),
      rate: Number(rate),
      months: Number(months),
      description: desc,
      requests: [],
      createdAt: Date.now(),
    };

    const updated = [o, ...offers];
    setOffers(updated);
    saveOffers(updated);

    setTitle("");
    setDesc("");
  }

  function acceptRequest(offerId, reqId) {
    const updated = offers.map((o) =>
      o.id !== offerId
        ? o
        : {
            ...o,
            requests: o.requests.map((r) =>
              r.id === reqId ? { ...r, status: "accepted" } : r
            ),
          }
    );

    setOffers(updated);
    saveOffers(updated);

    const offer = updated.find((o) => o.id === offerId);
    const req = offer.requests.find((r) => r.id === reqId);

    if (req) {
      const loan = {
        id: `L-${Math.floor(Math.random() * 99999)}`,
        borrowerName: req.borrowerUsername,
          lenderUsername: offer.lenderUsername,
        principal: Number(req.amountRequested || offer.amount),
        rate: offer.rate,
        months: offer.months,
        emi: Math.round(
          (Number(req.amountRequested || offer.amount) *
            (offer.rate / 12 / 100) *
            Math.pow(1 + offer.rate / 12 / 100, offer.months)) /
            (Math.pow(1 + offer.rate / 12 / 100, offer.months) - 1)
        ),
        payments: [],
      };

      const newLoans = [loan, ...loans];
      setLoans(newLoans);
      saveLoans(newLoans);

      alert(`Accepted request and created loan ${loan.id} for ${req.borrowerUsername}`);
    }
  }

  function rejectRequest(offerId, reqId) {
    const updated = offers.map((o) =>
      o.id !== offerId
        ? o
        : {
            ...o,
            requests: o.requests.map((r) =>
              r.id === reqId ? { ...r, status: "rejected" } : r
            ),
          }
    );
    setOffers(updated);
    saveOffers(updated);
  }

  return (
    <PageLayout user={user} onLogout={onLogout}>
      <div className="space-y-10 px-4 md:px-8 pt-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Offers – Manage and Review Requests
          </h2>

          {user?.role === "Lender" && (
            <button
              onClick={() => setShowForm((s) => !s)}
              className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 
                        text-white font-medium rounded-xl shadow hover:opacity-90 transition"
            >
              {showForm ? "Hide" : "New Offer"}
            </button>
          )}
        </div>

        {/* CREATE OFFER FORM */}
        {user?.role === "Lender" && showForm && (
          <form
            onSubmit={createOffer}
            className="bg-white/30 backdrop-blur-xl border border-white/40 
                      shadow-xl rounded-2xl p-6 max-w-xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-3 text-gray-800">Create Offer</h3>

            <input
              className="w-full p-3 rounded-xl bg-white/60 border border-gray-300 
                        focus:ring-2 focus:ring-purple-500 outline-none mb-3"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="flex gap-3">
              <div className="flex flex-col w-1/3">
                <label className="text-xs mb-1 font-medium text-gray-700">Amount</label>
                <input
                  className="p-3 bg-white/60 border border-gray-300 rounded-xl"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-1/3">
                <label className="text-xs mb-1 font-medium text-gray-700">Rate (%)</label>
                <input
                  className="p-3 bg-white/60 border border-gray-300 rounded-xl"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-1/3">
                <label className="text-xs mb-1 font-medium text-gray-700">Months</label>
                <input
                  className="p-3 bg-white/60 border border-gray-300 rounded-xl"
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>
            </div>

            <textarea
              className="w-full p-3 mt-3 bg-white/60 border border-gray-300 
                         rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 
                        to-pink-600 text-white font-semibold shadow hover:opacity-90 transition"
            >
              Create Offer
            </button>
          </form>
        )}

        {/* NON-LENDER WARNING */}
        {user?.role !== "Lender" && (
          <div className="p-6 bg-white/40 backdrop-blur-xl border border-white/50 
                        rounded-xl shadow text-gray-700 max-w-xl mx-auto">
            Only lenders can create offers.
          </div>
        )}

        {/* OFFERS LIST */}
        <div className="grid gap-6">
          {offers
            .filter((o) => o.lenderUsername === user.username)
            .map((o) => (
              <div
                key={o.id}
                className="p-6 bg-white/40 backdrop-blur-xl border border-white/50 
                           rounded-2xl shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-800">{o.title}</h3>
                <p className="text-sm text-gray-600">
                  Amount: ₹{o.amount} • Rate: {o.rate}% • {o.months} months
                </p>

                <div className="mt-5">
                  <p className="font-semibold text-gray-800">Requests</p>

                  {(o.requests || []).length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">No requests yet.</p>
                  )}

                  {(o.requests || []).map((r) => (
                    <div
                      key={r.id}
                      className="flex justify-between items-center p-3 mt-3 border 
                                     border-gray-300 bg-white/60 rounded-xl shadow-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{r.borrowerUsername}</p>
                        <p className="text-sm text-gray-600">
                          Amount: ₹{r.amountRequested} • {r.message}
                        </p>
                        <p className="text-xs">
                          Status:{" "}
                          <span
                            className={
                              r.status === "accepted"
                                ? "text-green-600 font-semibold"
                                : r.status === "rejected"
                                ? "text-red-600 font-semibold"
                                : "text-yellow-600 font-semibold"
                            }
                          >
                            {r.status || "pending"}
                          </span>
                        </p>
                      </div>

                      {/* ACTION BUTTONS */}
                      {r.status !== "accepted" && r.status !== "rejected" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => acceptRequest(o.id, r.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg 
                                           shadow hover:bg-green-700 transition"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => rejectRequest(o.id, r.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg 
                                           shadow hover:bg-red-600 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </PageLayout>
  );
}
