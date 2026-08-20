"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const hrLinks = [
  {
    name: "Dashboard",
    href: "/hr",
    icon: "📊",
  },
  {
    name: "Shortlisted",
    href: "/hr/shortlisted",
    icon: "⭐",
  },
  {
    name: "Candidates",
    href: "/hr/candidates",
    icon: "👥",
  },
  {
    name: "Interview Feedback",
    href: "/hr/interview-feedback",
    icon: "📝",
  },
  {
    name: "Offer Management",
    href: "/hr/offers",
    icon: "📄",
  },
  {
    name: "Analytics",
    href: "/hr/analytics",
    icon: "📈",
  },
  {
    name: "Settings",
    href: "/hr/settings",
    icon: "⚙️",
  },
];

export default function HRDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-slate-950 text-white">
        {/* Logo */}
        <div className="border-b border-slate-800 px-7 py-7">
          <Link href="/hr">
            <h1 className="text-3xl font-bold">
              Hire<span className="text-indigo-400">Mind</span>
              <span className="ml-1 text-sm text-indigo-300">
                AI
              </span>
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              AI Recruitment Platform
            </p>
          </Link>
        </div>

        {/* HR Role */}
        <div className="border-b border-slate-800 p-4">
          <div className="rounded-xl bg-slate-900 px-5 py-4">
            <p className="text-xs text-slate-400">
              Signed in as
            </p>

            <p className="mt-1 font-semibold text-indigo-300">
              Hiring Manager
            </p>

            <p className="mt-1 text-xs text-slate-500">
              HR & Recruitment
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {hrLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/hr" &&
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

      {/* Main Area */}
      <div className="pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-[92px] items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back 👋
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your recruitment journey
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Notification */}
            <Link
              href="/hr/notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-slate-100"
              title="Notifications"
            >
              🔔

              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
            </Link>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                H
              </div>

              <div className="hidden sm:block">
                <p className="font-semibold text-slate-900">
                  Hiring Manager
                </p>

                <p className="text-sm text-slate-500">
                  HR
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-92px)] p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

