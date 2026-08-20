"use client";

import Link from "next/link";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

export default function CandidateApplicationDetailsPage() {
  return (
    <CandidateDashboardLayout>
      {/* Back */}
      <Link
        href="/applications"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600"
      >
        ← Back to Applications
      </Link>

      {/* Header */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-100 text-2xl font-bold text-indigo-600">
              T
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                AI/ML Intern
              </h1>

              <p className="mt-1 text-slate-500">
                TechNova
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Applied on August 12, 2026
              </p>
            </div>
          </div>

          <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
            Shortlisted
          </span>
        </div>
      </div>

      {/* Application Progress */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Application Progress
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-5">

          {[
            ["✓", "Applied", true],
            ["✓", "Under Review", true],
            ["✓", "Shortlisted", true],
            ["4", "Interview", true],
            ["5", "Final Decision", false],
          ].map(([number, label, completed]) => (
            <div
              key={String(label)}
              className="relative text-center"
            >
              <div
                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${
                  completed
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {number}
              </div>

              <p
                className={`mt-3 text-xs font-semibold ${
                  completed
                    ? "text-indigo-600"
                    : "text-slate-400"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Job Information */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Job Information
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <p className="text-xs text-slate-400">
                POSITION
              </p>

              <p className="mt-1 font-medium text-slate-800">
                AI/ML Intern
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                COMPANY
              </p>

              <p className="mt-1 font-medium text-slate-800">
                TechNova
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                WORK MODE
              </p>

              <p className="mt-1 font-medium text-slate-800">
                Hybrid
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                JOB TYPE
              </p>

              <p className="mt-1 font-medium text-slate-800">
                Internship
              </p>
            </div>
          </div>
        </div>

        {/* AI Match */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-7 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900">
            🤖 AI Match Score
          </h2>

          <div className="mt-6 flex items-center gap-5">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-2xl font-bold text-indigo-600 shadow-sm">
              91%
            </div>

            <div>
              <p className="font-semibold text-indigo-900">
                Excellent Match
              </p>

              <p className="mt-1 text-sm leading-6 text-indigo-700">
                Your skills and experience strongly match the requirements
                of this position.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interview */}
      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-7">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                📅
              </span>

              <h2 className="text-lg font-semibold text-blue-900">
                Interview Scheduled
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-blue-700">
              Your application has moved to the interview stage. Your next
              interview is scheduled with the technical hiring team.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-blue-800">
              <span>📅 August 25, 2026</span>
              <span>🕐 10:30 AM</span>
              <span>💻 Online</span>
            </div>
          </div>

          <Link
            href="/candidate/interviews"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            View Interview →
          </Link>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}