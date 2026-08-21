"use client";

import { useEffect, useState } from "react";

type UserRole = "RECRUITER" | "HR" | "CANDIDATE";

function formatRole(role: UserRole) {
  switch (role) {
    case "RECRUITER":
      return "Recruiter";

    case "HR":
      return "HR";

    case "CANDIDATE":
      return "Candidate";

    default:
      return "Candidate";
  }
}

export default function Navbar() {
  const [userName, setUserName] = useState("User");

  const [userRole, setUserRole] =
    useState<UserRole>("CANDIDATE");

  useEffect(() => {
    // ============================================================
    // GET CURRENT LOGGED-IN USER
    // ============================================================

    const storedName =
      localStorage.getItem("userName");

    const storedRole =
      localStorage.getItem("userRole") ||
      localStorage.getItem("role");

    // Set actual logged-in user's name
    if (storedName && storedName.trim()) {
      setUserName(storedName.trim());
    }

    // Set actual logged-in user's role
    if (
      storedRole === "RECRUITER" ||
      storedRole === "HR" ||
      storedRole === "CANDIDATE"
    ) {
      setUserRole(storedRole);
    }
  }, []);

  // ============================================================
  // USER INITIAL
  // ============================================================

  const initial =
    userName.charAt(0).toUpperCase();

  // ============================================================
  // ROLE LABEL
  // ============================================================

  const roleLabel = formatRole(userRole);

  return (
    <header className="fixed left-64 right-0 top-0 z-10 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-8">

        {/* ======================================================
            WELCOME
        ====================================================== */}

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Welcome back 👋
          </h2>

          <p className="text-xs text-slate-500">
            {userRole === "CANDIDATE"
              ? "Manage your career journey"
              : "Manage your recruitment journey"}
          </p>
        </div>

        {/* ======================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="flex items-center gap-4">

          {/* ====================================================
              NOTIFICATIONS
          ==================================================== */}

          <button
            type="button"
            aria-label="Notifications"
            className="rounded-lg p-2 text-lg transition hover:bg-slate-100"
          >
            🔔
          </button>

          {/* ====================================================
              LOGGED-IN USER
          ==================================================== */}

          <div className="flex items-center gap-3">

            {/* User Initial */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
              {initial}
            </div>

            {/* User Information */}
            <div className="min-w-0">

              {/* HireMind + Role */}
              <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                HireMind {roleLabel}
              </p>

              {/* Actual Logged-in User Name */}
              <p className="whitespace-nowrap text-xs text-slate-500">
                {userName}
              </p>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}