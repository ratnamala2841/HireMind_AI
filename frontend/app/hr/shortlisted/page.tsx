"use client";

import { useState } from "react";
import Link from "next/link";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

type Candidate = {
  id: number;
  name: string;
  role: string;
  email: string;
  match: string;
  experience: string;
  status: "Shortlisted" | "Interview Scheduled" | "Selected";
};

const shortlistedCandidates: Candidate[] = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    email: "rahul.kumar@example.com",
    match: "92%",
    experience: "3 Years",
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    email: "priya.sharma@example.com",
    match: "89%",
    experience: "2 Years",
    status: "Interview Scheduled",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "Frontend Developer",
    email: "sneha.reddy@example.com",
    match: "84%",
    experience: "2 Years",
    status: "Shortlisted",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Data Scientist",
    email: "vikram.singh@example.com",
    match: "87%",
    experience: "3 Years",
    status: "Selected",
  },
  {
    id: 5,
    name: "Arjun Patel",
    role: "Backend Developer",
    email: "arjun.patel@example.com",
    match: "86%",
    experience: "2 Years",
    status: "Shortlisted",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    role: "Machine Learning Engineer",
    email: "ananya.iyer@example.com",
    match: "91%",
    experience: "2 Years",
    status: "Shortlisted",
  },
];

function getStatusStyle(status: Candidate["status"]) {
  switch (status) {
    case "Selected":
      return "bg-green-50 text-green-600";

    case "Interview Scheduled":
      return "bg-blue-50 text-blue-600";

    case "Shortlisted":
      return "bg-indigo-50 text-indigo-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function HRShortlistedPage() {
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const filteredCandidates = shortlistedCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.role.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email.toLowerCase().includes(search.toLowerCase())
  );

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
              Shortlisted Candidates
            </h1>

            <p className="mt-2 text-slate-500">
              Review AI-shortlisted candidates, evaluate their profiles, and
              move strong candidates to the next hiring stage.
            </p>
          </div>

          <Link
            href="/hr"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
         ===================================================== */}
      <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Shortlisted"
          value="42"
          description="Total candidates"
        />

        <SummaryCard
          title="High Match"
          value="18"
          description="AI match above 85%"
        />

        <SummaryCard
          title="Interviews"
          value="25"
          description="Interview stage"
        />

        <SummaryCard
          title="Selected"
          value="8"
          description="Successfully selected"
          green
        />
      </section>

      {/* =====================================================
          SEARCH / FILTER
         ===================================================== */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Candidate Review
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search shortlisted candidates by name, role, or email.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate or role..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-80"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CANDIDATE LIST
         ===================================================== */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Shortlisted Candidates
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredCandidates.length} candidates currently displayed.
            </p>
          </div>

          <div className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
            AI Shortlisted
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                {/* Candidate */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                    {candidate.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {candidate.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {candidate.role}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {candidate.email}
                    </p>
                  </div>
                </div>

                {/* Match */}
                <div className="min-w-[90px]">
                  <p className="text-xs text-slate-400">
                    AI MATCH
                  </p>

                  <p className="mt-1 text-xl font-bold text-indigo-600">
                    {candidate.match}
                  </p>
                </div>

                {/* Experience */}
                <div className="min-w-[100px]">
                  <p className="text-xs text-slate-400">
                    EXPERIENCE
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {candidate.experience}
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

                {/* Action */}
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(candidate)}
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Review
                </button>
              </div>
            </div>
          ))}

          {filteredCandidates.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                🔍
              </div>

              <p className="mt-4 font-semibold text-slate-700">
                No candidates found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try searching with another candidate name, role, or email.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Show All Candidates
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          HR REVIEW MODAL
         ===================================================== */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                  {selectedCandidate.name.charAt(0)}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                    HR Candidate Review
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {selectedCandidate.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedCandidate.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Candidate Information */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard
                label="AI Match"
                value={selectedCandidate.match}
              />

              <InfoCard
                label="Experience"
                value={selectedCandidate.experience}
              />

              <InfoCard
                label="Status"
                value={selectedCandidate.status}
              />

              <InfoCard
                label="Email"
                value={selectedCandidate.email}
              />
            </div>

            {/* AI Recommendation */}
            <div className="mt-6 rounded-xl bg-indigo-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                AI Recommendation
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                This candidate has been shortlisted based on their profile,
                experience, technical skills, and AI match score. Review the
                complete candidate profile before making the next hiring
                decision.
              </p>
            </div>

            {/* Hiring Workflow */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Hiring Workflow
              </p>

              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg bg-indigo-50 p-3 text-center">
                  <p className="text-xs font-semibold text-indigo-600">
                    1
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-700">
                    Shortlisted
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs font-semibold text-slate-500">
                    2
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-700">
                    Interview
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs font-semibold text-slate-500">
                    3
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-700">
                    Decision
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hr/candidates"
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                View Full Profile
              </Link>

              <Link
                href="/hr/interview-feedback"
                className="flex-1 rounded-lg border border-indigo-300 px-4 py-3 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Interview Feedback
              </Link>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
   SUMMARY CARD
   ============================================================ */

function SummaryCard({
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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${
          green ? "text-green-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   INFO CARD
   ============================================================ */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}