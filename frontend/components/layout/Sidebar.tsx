"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type UserRole = "RECRUITER" | "HR" | "CANDIDATE";

type SidebarLink = {
  name: string;
  href: string;
  icon: string;
};

const roleLinks: Record<UserRole, SidebarLink[]> = {
  // ============================================================
  // RECRUITER
  // ============================================================
  RECRUITER: [
    {
      name: "Dashboard",
      href: "/recruiter",
      icon: "📊",
    },
    {
      name: "Jobs",
      href: "/recruiter/jobs",
      icon: "💼",
    },
    {
      name: "Candidates",
      href: "/candidates",
      icon: "👥",
    },
    {
      name: "Shortlisted",
      href: "/shortlisted",
      icon: "⭐",
    },
    {
      name: "Interviews",
      href: "/recruiter/interviews",
      icon: "🎤",
    },
  ],

  // ============================================================
  // HR
  // ============================================================
  HR: [
    {
      name: "Dashboard",
      href: "/hr",
      icon: "📊",
    },
    {
      name: "Candidates",
      href: "/candidates",
      icon: "👥",
    },
    {
      name: "Shortlisted",
      href: "/shortlisted",
      icon: "⭐",
    },
    {
      name: "Interviews",
      href: "/hr/interviews",
      icon: "🎤",
    },
  ],

  // ============================================================
  // CANDIDATE
  // ============================================================
  CANDIDATE: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "📊",
    },
    {
      name: "Find Jobs",
      href: "/jobs",
      icon: "💼",
    },
    {
      name: "My Applications",
      href: "/applications",
      icon: "📄",
    },
    {
      name: "Interviews",
      href: "/interviews",
      icon: "🎤",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: "👤",
    },
  ],
};

// ============================================================
// GET STORED USER ROLE
// ============================================================
function getStoredRole(): UserRole {
  if (typeof window === "undefined") {
    return "CANDIDATE";
  }

  const storedRole =
    localStorage.getItem("userRole") ||
    localStorage.getItem("role");

  if (
    storedRole === "RECRUITER" ||
    storedRole === "HR" ||
    storedRole === "CANDIDATE"
  ) {
    return storedRole;
  }

  return "CANDIDATE";
}

// ============================================================
// ROLE DISPLAY NAME
// ============================================================
function getRoleName(role: UserRole) {
  switch (role) {
    case "RECRUITER":
      return "Recruiter";

    case "HR":
      return "HR";

    default:
      return "Candidate";
  }
}

// ============================================================
// SIDEBAR
// ============================================================
export default function Sidebar() {
  const pathname = usePathname();

  const [role, setRole] =
    useState<UserRole>("CANDIDATE");

  useEffect(() => {
    setRole(getStoredRole());
  }, []);

  const links = roleLinks[role];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-950 text-white">
      {/* ========================================================
          LOGO
      ======================================================== */}
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-2xl font-bold">
          Hire
          <span className="text-indigo-400">
            Mind
          </span>

          <span className="ml-1 text-sm text-indigo-300">
            AI
          </span>
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          AI Recruitment Platform
        </p>
      </div>

      {/* ========================================================
          CURRENT ROLE
      ======================================================== */}
      <div className="border-b border-slate-800 px-4 py-4">
        <div className="rounded-lg bg-slate-900 px-4 py-3">
          <p className="text-xs text-slate-400">
            Signed in as
          </p>

          <p className="mt-1 text-sm font-semibold text-indigo-300">
            {getRoleName(role)}
          </p>
        </div>
      </div>

      {/* ========================================================
          NAVIGATION
      ======================================================== */}
      <nav className="space-y-2 p-4">
        {links.map((link) => {
          const isDashboard =
            link.href === "/dashboard" ||
            link.href === "/recruiter" ||
            link.href === "/hr";

          const active =
            pathname === link.href ||
            (!isDashboard &&
              pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-base">
                {link.icon}
              </span>

              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* ========================================================
          LOGOUT
      ======================================================== */}
      <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
        <Link
          href="/login"
          className="block rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          🚪 Logout
        </Link>
      </div>
    </aside>
  );
}