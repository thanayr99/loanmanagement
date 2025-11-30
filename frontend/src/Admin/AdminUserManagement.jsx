import React, { useState } from "react";
import { loadUsers, saveUsers } from "../utils/storage";

export default function AdminUserManagement() {
  const [users, setUsers] = useState(loadUsers());
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "Borrower",
  });

  function addUser() {
    if (!newUser.username || !newUser.password)
      return alert("Please fill all fields");

    let arr = [...users, newUser];
    setUsers(arr);
    saveUsers(arr);

    setNewUser({ username: "", password: "", role: "Borrower" });
  }

  function deleteUser(username) {
    let arr = users.filter((u) => u.username !== username);
    setUsers(arr);
    saveUsers(arr);
  }

  return (
    <div className="space-y-10 px-4 md:px-8 pt-6">

      {/* HEADER */}
      <h2 className="text-3xl font-extrabold text-gray-900">
        User Management
      </h2>

      {/* ADD USER CARD */}
      <div className="bg-white/40 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/50">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New User
        </h3>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            className="flex-1 p-3 rounded-xl bg-white/70 border border-gray-300 
                       focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />

          <input
            className="flex-1 p-3 rounded-xl bg-white/70 border border-gray-300 
                       focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />

          <select
            className="p-3 rounded-xl bg-white/70 border border-gray-300 
                       focus:ring-2 focus:ring-purple-500 outline-none"
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
          >
            <option>Borrower</option>
            <option>Lender</option>
            <option>Analyst</option>
          </select>

          <button
            onClick={addUser}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
                       text-white font-semibold shadow hover:opacity-90 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* USERS LIST */}
      <div className="bg-white/40 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/50">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">All Users</h3>

        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.username}
              className="flex justify-between items-center p-4 bg-white/70 
                         rounded-xl shadow border border-gray-200 hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{u.username}</p>
                <p className="text-sm text-gray-600">{u.role}</p>
              </div>

              <button
                onClick={() => deleteUser(u.username)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white 
                           rounded-lg font-medium shadow transition"
              >
                Delete
              </button>
            </div>
          ))}

          {users.length === 0 && (
            <p className="text-gray-600 text-center py-4">No users available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
