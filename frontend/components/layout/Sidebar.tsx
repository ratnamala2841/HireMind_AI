"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Jobs", href: "/jobs", icon: "💼" },
  { name: "Applications", href: "/applications", icon: "📄" },
  { name: "Profile", href: "/profile", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-2xl font-bold">
          Hire<span className="text-indigo-400">Mind</span>
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          AI Recruitment Platform
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {links.map((link) => {
          const active = pathname === link.href;

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
              <span>{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
        <Link
          href="/login"
          className="block rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
        >
          🚪 Logout
        </Link>
      </div>
    </aside>
  );
}