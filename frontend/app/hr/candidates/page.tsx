"use client";

import { useState } from "react";
import Link from "next/link";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

type CandidateStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Selected";

type Candidate = {
  id: number;
  name: string;
  role: string;
  email: string;
  experience: string;
  match: string;
  skills: string[];
  status: CandidateStatus;
};

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    email: "rahul.kumar@example.com",
    experience: "3 Years",
    match: "92%",
    skills: ["React", "Node.js", "PostgreSQL"],
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    email: "priya.sharma@example.com",
    experience: "2 Years",
    match: "89%",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    status: "Interview",
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Backend Developer",
    email: "arjun.patel@example.com",
    experience: "2 Years",
    match: "86%",
    skills: ["Python", "FastAPI", "SQL"],
    status: "Under Review",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Frontend Developer",
    email: "sneha.reddy@example.com",
    experience: "2 Years",
    match: "84%",
    skills: ["React", "Next.js", "TypeScript"],
    status: "Shortlisted",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Data Scientist",
    email: "vikram.singh@example.com",
    experience: "3 Years",
    match: "87%",
    skills: ["Python", "SQL", "Pandas"],
    status: "Selected",
  },
  {
    id: 6,
    name: "Ananya Rao",
    role: "Machine Learning Engineer",
    email: "ananya.rao@example.com",
    experience: "1 Year",
    match: "82%",
    skills: ["Python", "Scikit-learn", "ML"],
    status: "Applied",
  },
  {
    id: 7,
    name: "Karthik Menon",
    role: "Software Engineer",
    email: "karthik.menon@example.com",
    experience: "2 Years",
    match: "88%",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
    status: "Under Review",
  },
  {
    id: 8,
    name: "Divya Nair",
    role: "Data Analyst",
    email: "divya.nair@example.com",
    experience: "2 Years",
    match: "85%",
    skills: ["Python", "SQL", "Power BI"],
    status: "Shortlisted",
  },
];

function getStatusStyle(status: CandidateStatus) {
  switch (status) {
    case "Selected":
      return "bg-green-50 text-green-600";

    case "Interview":
      return "bg-blue-50 text-blue-600";

    case "Shortlisted":
      return "bg-indigo-50 text-indigo-600";

    case "Under Review":
      return "bg-yellow-50 text-yellow-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function HRCandidatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const filteredCandidates = candidates.filter((candidate) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      candidate.name.toLowerCase().includes(searchText) ||
      candidate.role.toLowerCase().includes(searchText) ||
      candidate.email.toLowerCase().includes(searchText) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      );

    const matchesStatus =
      statusFilter === "All" ||
      candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <HRDashboardLayout>
      {/* =====================================================
          HEADER
         ===================================================== */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Hiring Manager
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Candidates
            </h1>

            <p className="mt-2 text-slate-500">
              Review candidates, evaluate AI match scores, and track their
              recruitment status.
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
          CANDIDATE STATISTICS
         ===================================================== */}
      <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total"
          value="248"
          description="Applications"
        />

        <StatCard
          title="Under Review"
          value="96"
          description="Candidates"
        />

        <StatCard
          title="Shortlisted"
          value="42"
          description="Candidates"
        />

        <StatCard
          title="Interviews"
          value="25"
          description="Scheduled"
        />

        <StatCard
          title="Selected"
          value="8"
          description="Candidates"
          green
        />
      </section>

      {/* =====================================================
          SEARCH & FILTERS
         ===================================================== */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Candidate Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search candidates by name, role, email, or skill.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidates..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-72"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
            </select>

            {(search || statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULT SUMMARY
         ===================================================== */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredCandidates.length}
          </span>{" "}
          candidates
        </p>

        <div className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
          HR Candidate Directory
        </div>
      </div>

      {/* =====================================================
          CANDIDATE LIST
         ===================================================== */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Candidate List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review candidate profiles and recruitment progress.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                {/* Candidate Info */}
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                    {candidate.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {candidate.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {candidate.role}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {candidate.email}
                    </p>
                  </div>
                </div>

                {/* AI Match */}
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

                {/* Skills */}
                <div className="max-w-xs">
                  <p className="mb-2 text-xs text-slate-400">
                    SKILLS
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Review
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredCandidates.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                🔍
              </div>

              <p className="mt-4 font-semibold text-slate-700">
                No candidates found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Show All Candidates
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CANDIDATE REVIEW MODAL
         ===================================================== */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
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

                  <p className="text-sm text-slate-500">
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

            {/* Candidate Details */}
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

            {/* Skills */}
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">
                SKILLS
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedCandidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="mt-5 rounded-xl bg-indigo-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                AI Recommendation
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                This candidate has been evaluated based on technical skills,
                experience, profile information, and AI match score. The HR
                manager can continue with the appropriate recruitment stage.
              </p>
            </div>

            {/* Hiring Workflow */}
            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Hiring Workflow
              </p>

              <div className="grid gap-2 sm:grid-cols-4">
                <WorkflowStep
                  number="1"
                  label="Applied"
                  active={selectedCandidate.status !== "Applied"}
                />

                <WorkflowStep
                  number="2"
                  label="Review"
                  active={
                    selectedCandidate.status === "Under Review" ||
                    selectedCandidate.status === "Shortlisted" ||
                    selectedCandidate.status === "Interview" ||
                    selectedCandidate.status === "Selected"
                  }
                />

                <WorkflowStep
                  number="3"
                  label="Interview"
                  active={
                    selectedCandidate.status === "Interview" ||
                    selectedCandidate.status === "Selected"
                  }
                />

                <WorkflowStep
                  number="4"
                  label="Decision"
                  active={selectedCandidate.status === "Selected"}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/hr/shortlisted"
                className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                View Shortlisted
              </Link>

              <Link
                href="/hr/interview-feedback"
                className="rounded-lg border border-indigo-300 px-4 py-3 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Interview Feedback
              </Link>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:col-span-2"
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
   STAT CARD
   ============================================================ */

function StatCard({
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

/* ============================================================
   WORKFLOW STEP
   ============================================================ */

function WorkflowStep({
  number,
  label,
  active,
}: {
  number: string;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-3 text-center ${
        active ? "bg-indigo-50" : "bg-slate-50"
      }`}
    >
      <div
        className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
          active
            ? "bg-indigo-600 text-white"
            : "bg-slate-200 text-slate-500"
        }`}
      >
        {number}
      </div>

      <p
        className={`mt-2 text-xs font-semibold ${
          active ? "text-indigo-600" : "text-slate-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}