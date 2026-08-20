"use client";

import { useEffect, useState } from "react";

type UserRole = "RECRUITER" | "HR" | "CANDIDATE";

function formatRole(role: string) {
  switch (role) {
    case "RECRUITER":
      return "Recruiter";

    case "HR":
      return "HR";

    case "CANDIDATE":
      return "Candidate";

    default:
      return role;
  }
}

export default function Navbar() {
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] =
    useState<UserRole>("CANDIDATE");

  useEffect(() => {
    const storedName =
      localStorage.getItem("userName");

    const storedRole =
      localStorage.getItem("userRole") ||
      localStorage.getItem("role");

    if (storedName) {
      setUserName(storedName);
    }

    if (
      storedRole === "RECRUITER" ||
      storedRole === "HR" ||
      storedRole === "CANDIDATE"
    ) {
      setUserRole(storedRole);
    }
  }, []);

  const initial =
    userName.charAt(0).toUpperCase();

  return (
    <header className="fixed left-64 right-0 top-0 z-10 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-8">

        {/* Welcome */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Welcome back 👋
          </h2>

          <p className="text-xs text-slate-500">
            Manage your recruitment journey
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-lg p-2 text-lg hover:bg-slate-100"
          >
            🔔
          </button>

          {/* User */}
          <div className="flex items-center gap-3">

            {/* Initial */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              {initial}
            </div>

            {/* User information */}
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {userName}
              </p>

              <p className="text-xs text-slate-500">
                {formatRole(userRole)}
              </p>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}