import React from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ user, children, role }) {
  // If user not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // Optional role check — only if you pass `role="Admin"` etc.
  if (role && user.role !== role) {
    return <Navigate to={`/dashboard/${user.role.toLowerCase()}`} replace />;
  }

  return children;
}
