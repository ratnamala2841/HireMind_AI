"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/* ============================================================
   TYPES
   ============================================================ */

type Application = {
  id: number;
  status: string;
};

type Job = {
  id: number;
  recruiterId: number;
  companyId: number;

  title: string;
  description: string;
  location: string | null;

  jobType: string;
  workMode: string;
  experienceLevel: string;

  minExperience: number | null;
  maxExperience: number | null;

  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;

  status: string;
  openings: number;

  applicationDeadline: string | null;

  createdAt: string;
  updatedAt: string;

  company?: {
    id: number;
    name: string;
    description: string | null;
    website: string | null;
    industry: string | null;
    location: string | null;
    logoUrl: string | null;
  };

  recruiter?: {
    id: number;
    designation: string | null;
    user?: {
      id: number;
      name: string;
      email: string;
    };
  };

  applications?: Application[];
};

/* ============================================================
   STATIC DASHBOARD DATA
   ============================================================ */

const candidates = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    company: "TechNova",
    matchScore: 92,
    experience: "2.5 Years",
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    company: "DataSphere",
    matchScore: 89,
    experience: "2 Years",
    status: "Under Review",
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Backend Developer",
    company: "CloudWorks",
    matchScore: 86,
    experience: "1.8 Years",
    status: "Interview",
  },
];

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

function getCandidateStatusStyle(status: string) {
  switch (status) {
    case "Shortlisted":
      return "bg-green-50 text-green-600";

    case "Interview":
      return "bg-blue-50 text-blue-600";

    case "Under Review":
      return "bg-yellow-50 text-yellow-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getMatchStyle(score: number) {
  if (score >= 90) {
    return "text-green-600";
  }

  if (score >= 80) {
    return "text-indigo-600";
  }

  return "text-yellow-600";
}

function formatJobType(type: string) {
  switch (type) {
    case "FULL_TIME":
      return "Full Time";

    case "PART_TIME":
      return "Part Time";

    case "INTERNSHIP":
      return "Internship";

    case "CONTRACT":
      return "Contract";

    case "FREELANCE":
      return "Freelance";

    default:
      return type;
  }
}

function formatWorkMode(mode: string) {
  switch (mode) {
    case "REMOTE":
      return "Remote";

    case "HYBRID":
      return "Hybrid";

    case "ONSITE":
      return "Onsite";

    default:
      return mode;
  }
}

function formatExperience(level: string) {
  switch (level) {
    case "ENTRY":
      return "Entry Level";

    case "JUNIOR":
      return "Junior";

    case "MID":
      return "Mid Level";

    case "SENIOR":
      return "Senior";

    case "LEAD":
      return "Lead";

    default:
      return level;
  }
}

function formatStatus(status: string) {
  switch (status) {
    case "ACTIVE":
      return "Active";

    case "DRAFT":
      return "Draft";

    case "CLOSED":
      return "Closed";

    case "ARCHIVED":
      return "Archived";

    default:
      return status;
  }
}

function formatDate(date: string | null) {
  if (!date) {
    return "Not specified";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ============================================================
   RECRUITER HOME
   ============================================================ */

export default function RecruiterDashboard() {
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");

  /* ==========================================================
     LOAD REAL JOBS FROM POSTGRESQL
     ========================================================== */

  useEffect(() => {
    async function loadJobs() {
      try {
        setJobsLoading(true);
        setJobsError("");

        const response = await fetch(`${API_URL}/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load jobs"
          );
        }

        setRecentJobs((data.jobs || []).slice(0, 4));
      } catch (error) {
        console.error("Failed to load recruiter jobs:", error);

        setJobsError(
          error instanceof Error
            ? error.message
            : "Failed to load jobs from server."
        );
      } finally {
        setJobsLoading(false);
      }
    }

    loadJobs();
  }, []);

  /* ==========================================================
     REAL JOB STATISTICS
     ========================================================== */

  const totalJobs = recentJobs.length;

  const activeJobs = recentJobs.filter(
    (job) => job.status === "ACTIVE"
  ).length;

  const totalApplications = recentJobs.reduce(
    (total, job) =>
      total + (job.applications?.length || 0),
    0
  );

  const totalShortlisted = recentJobs.reduce(
    (total, job) =>
      total +
      (job.applications?.filter(
        (application) =>
          application.status === "SHORTLISTED"
      ).length || 0),
    0
  );

  return (
    <DashboardLayout>
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Recruiter Home
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your hiring pipeline and discover the best
            candidates.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/create"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + Create Job
        </Link>
      </div>

      {/* ======================================================
          STATS
          ====================================================== */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-3xl">💼</div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              Live
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Total Jobs
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {totalJobs}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-3xl">📢</div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              Active
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Active Jobs
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {activeJobs}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-3xl">📄</div>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              Total
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Applications
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {totalApplications}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-3xl">⭐</div>

            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
              Selected
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Shortlisted
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {totalShortlisted}
          </h2>
        </div>
      </div>

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* ====================================================
            RECENT JOBS
            ==================================================== */}

        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Jobs
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Overview of your latest job postings.
              </p>
            </div>

            <Link
              href="/recruiter/jobs"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          {/* ==================================================
              JOB LIST
              ================================================== */}

          <div className="divide-y divide-slate-100">
            {jobsLoading && (
              <div className="p-10 text-center text-slate-500">
                Loading recent jobs...
              </div>
            )}

            {!jobsLoading && jobsError && (
              <div className="p-10 text-center">
                <p className="text-sm text-red-500">
                  {jobsError}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Please make sure the backend is running on
                  port 5000.
                </p>
              </div>
            )}

            {!jobsLoading &&
              !jobsError &&
              recentJobs.length === 0 && (
                <div className="p-10 text-center">
                  <div className="text-4xl">📋</div>

                  <h3 className="mt-3 font-semibold text-slate-900">
                    No jobs yet
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Create your first job posting to get
                    started.
                  </p>

                  <Link
                    href="/recruiter/jobs/create"
                    className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Create Job
                  </Link>
                </div>
              )}

            {!jobsLoading &&
              !jobsError &&
              recentJobs.map((job) => {
                const applications =
                  job.applications?.length || 0;

                const shortlisted =
                  job.applications?.filter(
                    (application) =>
                      application.status === "SHORTLISTED"
                  ).length || 0;

                return (
                  <div
                    key={job.id}
                    className="p-6 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                      {/* JOB INFORMATION */}

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                          {job.title.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {job.title}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {job.company?.industry ||
                              "Technology"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {job.location ||
                              "Location not specified"}
                            {" • "}
                            {formatJobType(job.jobType)}
                          </p>
                        </div>
                      </div>

                      {/* JOB STATS + MANAGE */}

                      <div className="flex flex-wrap items-center gap-5">
                        <div className="text-center">
                          <p className="text-xs text-slate-400">
                            Applications
                          </p>

                          <p className="mt-1 font-bold text-slate-900">
                            {applications}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-xs text-slate-400">
                            Shortlisted
                          </p>

                          <p className="mt-1 font-bold text-indigo-600">
                            {shortlisted}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            job.status === "ACTIVE"
                              ? "bg-green-50 text-green-600"
                              : job.status === "DRAFT"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {formatStatus(job.status)}
                        </span>

                        {/* MANAGE BUTTON */}

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedJob(job)
                          }
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ====================================================
            AI INSIGHT
            ==================================================== */}

        <div className="rounded-xl bg-indigo-600 p-6 text-white">
          <div className="text-4xl">🤖</div>

          <h2 className="mt-5 text-xl font-bold">
            AI Recruitment Insight
          </h2>

          <p className="mt-3 text-sm leading-6 text-indigo-100">
            Your AI matching system has identified
            high-potential candidates across your active job
            postings.
          </p>

          <div className="mt-6 rounded-lg bg-white/10 p-4">
            <p className="text-sm text-indigo-100">
              Top Match
            </p>

            <p className="mt-1 font-semibold">
              Python Developer
            </p>

            <p className="mt-1 text-sm text-indigo-200">
              94% average candidate match
            </p>
          </div>

          <Link
            href="/candidates"
            className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Review Candidates
          </Link>
        </div>
      </div>

      {/* ======================================================
          ALL CANDIDATES
          ====================================================== */}

      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              All Candidates
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review candidates across your recruitment
              pipeline and identify the best matches for your
              open positions.
            </p>
          </div>

          <Link
            href="/candidates"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View All Candidates
          </Link>
        </div>

        {/* CANDIDATE PREVIEW */}

        <div className="divide-y divide-slate-100">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                {/* Candidate Information */}

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                    {candidate.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {candidate.name}
                    </h3>

                    <p className="text-sm font-medium text-slate-700">
                      {candidate.role}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {candidate.company}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {candidate.experience} experience
                    </p>
                  </div>
                </div>

                {/* Candidate Details */}

                <div className="flex flex-wrap items-center gap-5">
                  <div>
                    <p className="text-xs text-slate-400">
                      AI Match
                    </p>

                    <p
                      className={`mt-1 text-xl font-bold ${getMatchStyle(
                        candidate.matchScore
                      )}`}
                    >
                      {candidate.matchScore}%
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${getCandidateStatusStyle(
                      candidate.status
                    )}`}
                  >
                    {candidate.status}
                  </span>

                  <Link
                    href={`/candidates/${candidate.id}`}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Candidate List Footer */}

        <div className="border-t border-slate-100 p-5 text-center">
          <Link
            href="/candidates"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View complete candidate list →
          </Link>
        </div>
      </div>

      {/* ======================================================
          HIRING ACTIVITY
          ====================================================== */}

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Hiring Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Candidate activity across your recruitment pipeline.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Activity
            label="New Applications"
            value="128"
            description="This week"
          />

          <Activity
            label="AI Shortlisted"
            value="32"
            description="This week"
          />

          <Activity
            label="Interviews"
            value="14"
            description="Scheduled"
          />

          <Activity
            label="Offers"
            value="5"
            description="In progress"
          />
        </div>
      </div>

      {/* ======================================================
          JOB DETAILS MODAL
          ====================================================== */}

      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
                  {selectedJob.title
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedJob.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedJob.company?.name ||
                      "Company"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="rounded-lg px-3 py-2 text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="p-6">
              {/* STATUS */}

              <div className="mb-6 flex flex-wrap gap-3">
                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    selectedJob.status === "ACTIVE"
                      ? "bg-green-50 text-green-600"
                      : selectedJob.status === "DRAFT"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {formatStatus(selectedJob.status)}
                </span>

                <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
                  {formatJobType(selectedJob.jobType)}
                </span>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                  {formatWorkMode(selectedJob.workMode)}
                </span>
              </div>

              {/* JOB DETAILS GRID */}

              <div className="grid gap-4 sm:grid-cols-2">
                <JobDetail
                  label="Location"
                  value={
                    selectedJob.location ||
                    "Not specified"
                  }
                />

                <JobDetail
                  label="Experience"
                  value={formatExperience(
                    selectedJob.experienceLevel
                  )}
                />

                <JobDetail
                  label="Minimum Experience"
                  value={
                    selectedJob.minExperience !== null
                      ? `${selectedJob.minExperience} years`
                      : "Not specified"
                  }
                />

                <JobDetail
                  label="Maximum Experience"
                  value={
                    selectedJob.maxExperience !== null
                      ? `${selectedJob.maxExperience} years`
                      : "Not specified"
                  }
                />

                <JobDetail
                  label="Openings"
                  value={String(
                    selectedJob.openings
                  )}
                />

                <JobDetail
                  label="Application Deadline"
                  value={formatDate(
                    selectedJob.applicationDeadline
                  )}
                />

                <JobDetail
                  label="Applications"
                  value={String(
                    selectedJob.applications?.length ||
                      0
                  )}
                />

                <JobDetail
                  label="Shortlisted"
                  value={String(
                    selectedJob.applications?.filter(
                      (application) =>
                        application.status ===
                        "SHORTLISTED"
                    ).length || 0
                  )}
                />
              </div>

              {/* SALARY */}

              <div className="mt-6 rounded-xl bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">
                  Salary
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {selectedJob.salaryMin !== null ||
                  selectedJob.salaryMax !== null
                    ? `${selectedJob.currency || "INR"} ${
                        selectedJob.salaryMin ?? "0"
                      } - ${
                        selectedJob.salaryMax ??
                        "Not specified"
                      }`
                    : "Salary not specified"}
                </p>
              </div>

              {/* DESCRIPTION */}

              <div className="mt-6">
                <h3 className="font-semibold text-slate-900">
                  Job Description
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {selectedJob.description ||
                    "No description available."}
                </p>
              </div>

              {/* COMPANY */}

              {selectedJob.company && (
                <div className="mt-6 rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900">
                    Company Information
                  </h3>

                  <p className="mt-2 font-medium text-slate-800">
                    {selectedJob.company.name}
                  </p>

                  {selectedJob.company.industry && (
                    <p className="mt-1 text-sm text-slate-500">
                      Industry:{" "}
                      {selectedJob.company.industry}
                    </p>
                  )}

                  {selectedJob.company.location && (
                    <p className="mt-1 text-sm text-slate-500">
                      Location:{" "}
                      {selectedJob.company.location}
                    </p>
                  )}

                  {selectedJob.company.description && (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {selectedJob.company.description}
                    </p>
                  )}
                </div>
              )}

              {/* CREATED DATE */}

              <p className="mt-6 text-xs text-slate-400">
                Job posted on{" "}
                {formatDate(selectedJob.createdAt)}
              </p>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>

              <Link
                href={`/recruiter/jobs`}
                onClick={() => setSelectedJob(null)}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Manage Jobs
              </Link>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

/* ============================================================
   JOB DETAIL COMPONENT
   ============================================================ */

function JobDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   ACTIVITY COMPONENT
   ============================================================ */

function Activity({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}