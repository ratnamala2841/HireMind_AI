"use client";

import { useState } from "react";
import Link from "next/link";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

const stats = [
  {
    title: "Total Jobs",
    value: "18",
    description: "Active recruitment positions",
    icon: "💼",
  },
  {
    title: "Applications",
    value: "248",
    description: "Total candidates applied",
    icon: "📋",
  },
  {
    title: "Shortlisted",
    value: "42",
    description: "Candidates shortlisted",
    icon: "⭐",
  },
  {
    title: "Interviews",
    value: "25",
    description: "Interviews scheduled",
    icon: "📅",
  },
  {
    title: "Selected",
    value: "8",
    description: "Candidates selected",
    icon: "✅",
  },
];

const recruitmentActivity = [
  {
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    score: "92%",
    status: "Shortlisted",
  },
  {
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    score: "89%",
    status: "Interview",
  },
  {
    name: "Arjun Patel",
    role: "Backend Developer",
    score: "86%",
    status: "Under Review",
  },
  {
    name: "Sneha Reddy",
    role: "Frontend Developer",
    score: "84%",
    status: "Shortlisted",
  },
  {
    name: "Vikram Singh",
    role: "Data Scientist",
    score: "81%",
    status: "Applied",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Shortlisted":
      return "bg-green-50 text-green-600";

    case "Interview":
      return "bg-blue-50 text-blue-600";

    case "Under Review":
      return "bg-yellow-50 text-yellow-600";

    case "Applied":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function HRDashboardPage() {
  const [selectedCandidate, setSelectedCandidate] =
    useState<(typeof recruitmentActivity)[number] | null>(null);

  return (
    <HRDashboardLayout>
      {/* =====================================================
          HR HEADER
         ===================================================== */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Hiring Manager
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              HR Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor recruitment activities, review candidates, and track
              hiring progress.
            </p>
          </div>

          <Link
            href="/hr/candidates"
            className="rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View Candidates
          </Link>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
         ===================================================== */}
      <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* =====================================================
          RECRUITMENT OVERVIEW
         ===================================================== */}
      <section className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Hiring Pipeline */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Hiring Pipeline
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Candidate distribution across the recruitment process.
            </p>
          </div>

          <div className="space-y-5">
            <PipelineRow
              label="Applications"
              value="248"
              percentage="100%"
              width="w-full"
              color="bg-indigo-500"
            />

            <PipelineRow
              label="Under Review"
              value="96"
              percentage="39%"
              width="w-[65%]"
              color="bg-indigo-500"
            />

            <PipelineRow
              label="Shortlisted"
              value="42"
              percentage="17%"
              width="w-[45%]"
              color="bg-indigo-500"
            />

            <PipelineRow
              label="Interviews"
              value="25"
              percentage="10%"
              width="w-[32%]"
              color="bg-blue-500"
            />

            <PipelineRow
              label="Selected"
              value="8"
              percentage="3%"
              width="w-[18%]"
              color="bg-green-500"
            />
          </div>
        </div>

        {/* Recruitment Intelligence */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Recruitment Intelligence
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Key insights from the current hiring pipeline.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InsightCard
              title="Hiring Conversion"
              value="3.2%"
              description="Applications to selected"
            />

            <InsightCard
              title="Average AI Match"
              value="87%"
              description="Candidate relevance"
            />

            <InsightCard
              title="Interview Rate"
              value="10%"
              description="Applications reaching interviews"
            />

            <InsightCard
              title="Selected"
              value="8"
              description="Successful candidates"
              green
            />
          </div>

          <div className="mt-5 rounded-xl bg-indigo-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
              AI Hiring Insight
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              Candidates with an AI match above 85% are currently progressing
              faster through the hiring pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HR QUICK ACTIONS
         ===================================================== */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              HR Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quickly access important hiring management tools.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            href="/hr/candidates"
            icon="👥"
            title="Candidates"
            description="Review candidate profiles"
          />

          <QuickAction
            href="/hr/shortlisted"
            icon="⭐"
            title="Shortlisted"
            description="View shortlisted candidates"
          />

          <QuickAction
            href="/hr/interview-feedback"
            icon="📝"
            title="Interview Feedback"
            description="Review interview evaluations"
          />

          <QuickAction
            href="/hr/analytics"
            icon="📈"
            title="Analytics"
            description="View recruitment analytics"
          />
        </div>
      </section>

      {/* =====================================================
          RECENT CANDIDATE ACTIVITY
         ===================================================== */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Candidate Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review recent candidate evaluations and recruitment stages.
            </p>
          </div>

          <Link
            href="/hr/candidates"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all candidates →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recruitmentActivity.map((candidate) => (
            <div
              key={`${candidate.name}-${candidate.role}`}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                {/* Candidate */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                    {candidate.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {candidate.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {candidate.role}
                    </p>
                  </div>
                </div>

                {/* AI Match */}
                <div className="text-left lg:text-center">
                  <p className="text-xs text-slate-400">
                    AI Match
                  </p>

                  <p className="mt-1 font-bold text-indigo-600">
                    {candidate.score}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${getStatusStyle(
                    candidate.status
                  )}`}
                >
                  {candidate.status}
                </span>

                {/* Review */}
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(candidate)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                >
                  Review Candidate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CANDIDATE REVIEW MODAL
         ===================================================== */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                  Candidate Review
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedCandidate.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedCandidate.role}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  AI MATCH SCORE
                </p>

                <p className="mt-1 text-2xl font-bold text-indigo-600">
                  {selectedCandidate.score}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  APPLICATION STATUS
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {selectedCandidate.status}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href="/hr/candidates"
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                View Profile
              </Link>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </HRDashboardLayout>
  );
}

/* ============================================================
   PIPELINE COMPONENT
   ============================================================ */

function PipelineRow({
  label,
  value,
  percentage,
  width,
  color,
}: {
  label: string;
  value: string;
  percentage: string;
  width: string;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-600">
          {label}
        </span>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">
            {value}
          </span>

          <span className="text-xs text-slate-400">
            {percentage}
          </span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-2 rounded-full ${width} ${color}`}
        />
      </div>
    </div>
  );
}

/* ============================================================
   INSIGHT CARD
   ============================================================ */

function InsightCard({
  title,
  value,
  description,
  green = false,
}: {
  title: string;
  value: string;
  description: string;
  green?: boolean;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {title}
      </p>

      <p
        className={`mt-2 text-2xl font-bold ${
          green ? "text-green-600" : "text-indigo-600"
        }`}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   QUICK ACTION
   ============================================================ */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-indigo-600">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </Link>
  );
}