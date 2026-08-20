"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CandidateNavbar() {
  const [userName, setUserName] = useState("Candidate");

  useEffect(() => {
    const storedName =
      localStorage.getItem("userName");

    if (storedName) {
      setUserName(storedName);
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
            Manage your career journey
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative rounded-lg p-2 text-lg transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            🔔

            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Link>

          {/* Candidate Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              {initial}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                {userName}
              </p>

              <p className="text-xs text-slate-500">
                Candidate
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}