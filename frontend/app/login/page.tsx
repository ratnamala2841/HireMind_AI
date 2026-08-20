"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

type UserRole = "RECRUITER" | "HR" | "CANDIDATE";

type LoginResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    token: string;
  };
};

function getDestination(role: UserRole): string {
  switch (role) {
    case "RECRUITER":
      return "/recruiter";

    case "HR":
      return "/hr";

    case "CANDIDATE":
    default:
      return "/dashboard";
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        }
      );

      const data: LoginResponse =
        await response.json();

      if (
        !response.ok ||
        !data.success ||
        !data.user
      ) {
        throw new Error(
          data.message ||
            "Invalid email or password."
        );
      }

      const user = data.user;

      /*
       * Clear any previous login information.
       * This prevents an old Candidate/HR role from
       * remaining in localStorage.
       */
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");

      /*
       * Store the new authenticated user.
       */
      localStorage.setItem(
        "authToken",
        user.token
      );

      localStorage.setItem(
        "userRole",
        user.role
      );

      localStorage.setItem(
        "role",
        user.role
      );

      localStorage.setItem(
        "userId",
        String(user.id)
      );

      localStorage.setItem(
        "userName",
        user.name
      );

      localStorage.setItem(
        "userEmail",
        user.email
      );

      /*
       * Determine destination based on backend role.
       */
      const destination =
        getDestination(user.role);

      console.log(
        "Login successful:",
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          destination,
        }
      );

      /*
       * Full navigation makes sure the Sidebar
       * reads the newly stored role immediately.
       */
      window.location.href = destination;
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-bold"
          >
            Hire
            <span className="text-indigo-400">
              Mind
            </span>

            <span className="ml-1 text-sm text-indigo-300">
              AI
            </span>
          </Link>

          <h1 className="mt-8 text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-400">
            Login to your HireMind AI account
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 py-3 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Signing in..."
                : "Login"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}

            <Link
              href="/register"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Back */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-300"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}