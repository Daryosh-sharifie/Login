import React, { useState, type FormEvent, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, logout } from "./store/authSlice";
import type { RootState, AppDispatch } from "./store/store";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handle Login
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter your username");
      return;
    }

    if (!password) {
      alert("Please enter your password");
      return;
    }

    dispatch(loginApi());
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-8">

        {!token ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold mb-4">Login Form</h2>

            <label className="block mb-2 text-sm">Username</label>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />

            <label className="block mb-2 text-sm">Password</label>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            {error && (
              <div className="text-red-600 mb-3 whitespace-pre-wrap">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-4 rounded-xl bg-blue-500 text-white font-medium disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Access Token</h2>
              <button
                onClick={handleLogoutClick}
                className="px-3 py-1 rounded bg-gray-200"
              >
                Logout
              </button>
            </div>

            <div className="border rounded p-4 bg-gray-50">
              <pre className="text-sm whitespace-pre-wrap overflow-auto">
                {token}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
