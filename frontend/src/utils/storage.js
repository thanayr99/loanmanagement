// storage helpers
export const defaultUsers = [
  { username: "admin", password: "admin123", role: "Admin" },
  { username: "lender", password: "lender123", role: "Lender" },
  { username: "borrower", password: "borrow123", role: "Borrower" },
  { username: "analyst", password: "analyst123", role: "Analyst" },
];

export const loadUsers = () => JSON.parse(localStorage.getItem("users")) || defaultUsers;
export const saveUsers = (u) => localStorage.setItem("users", JSON.stringify(u));

export const loadSession = () => JSON.parse(localStorage.getItem("session"));
export const saveSession = (u) => localStorage.setItem("session", JSON.stringify(u));
export const clearSession = () => localStorage.removeItem("session");

export const loadLoans = () => JSON.parse(localStorage.getItem("loans")) || [];
export const saveLoans = (l) => localStorage.setItem("loans", JSON.stringify(l));

// Offers: lenders create offers, borrowers send requests to offers
export const loadOffers = () => JSON.parse(localStorage.getItem("offers")) || [];
export const saveOffers = (o) => localStorage.setItem("offers", JSON.stringify(o));
