"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    name: "Find Jobs",
    href: "/jobs",
    icon: "💼",
  },
  {
    name: "Applications",
    href: "/applications",
    icon: "📋",
  },
  {
    name: "Resume",
    href: "/resume",
    icon: "📄",
  },
  {
    name: "AI Resume Analysis",
    href: "/ai-resume-analysis",
    icon: "🤖",
  },
  {
    name: "Interviews",
    href: "/candidate/interviews",
    icon: "📅",
  },
  {
    name: "Assessments",
    href: "/assessments",
    icon: "💻",
  },
  {
    name: "Offers",
    href: "/offers",
    icon: "🎁",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: "🔔",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "👤",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "⚙️",
  },
];

export default function CandidateSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    router.push("/login");
  }

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col bg-slate-950 text-white">

      {/* Logo */}
      <div className="border-b border-slate-800 px-7 py-7">
        <Link href="/dashboard">
          <h1 className="text-3xl font-bold">
            Hire
            <span className="text-indigo-400">Mind</span>
            <span className="ml-1 text-sm text-indigo-300">
              AI
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            AI Recruitment Platform
          </p>
        </Link>
      </div>

      {/* Candidate Role */}
      <div className="border-b border-slate-800 p-4">
        <div className="rounded-xl bg-slate-900 px-5 py-3">
          <p className="text-xs text-slate-400">
            Signed in as
          </p>

          <p className="mt-1 font-semibold text-indigo-300">
            Candidate
          </p>
        </div>
      </div>

      {/* Candidate Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <span className="flex w-6 justify-center text-lg">
                {link.icon}
              </span>

              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          <span className="flex w-6 justify-center text-lg">
            ↪
          </span>

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}