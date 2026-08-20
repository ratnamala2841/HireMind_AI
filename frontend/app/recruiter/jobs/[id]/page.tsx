"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type Job = {
  id: number;
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

  company?: {
    id: number;
    name: string;
    description: string | null;
    website: string | null;
    industry: string | null;
    location: string | null;
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

  skills?: {
    id: number;
    required: boolean;
    importance: number;
    skill?: {
      id: number;
      name: string;
    };
  }[];

  applications?: {
    id: number;
    status: string;
  }[];
};

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
      return "On-site";
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

export default function JobDetailsPage() {
  const params = useParams();

  const jobId = params.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) return;

    async function loadJob() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/jobs/${jobId}`
        );

        const data = await response.json();

        if (!response.ok || !data.success || !data.job) {
          throw new Error(
            data.message || "Failed to load job"
          );
        }

        setJob(data.job);
      } catch (error) {
        console.error("Load job error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load job"
        );
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [jobId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[500px] items-center justify-center">
          <p className="text-slate-500">
            Loading job details...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !job) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">
            Unable to load job
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error || "Job not found"}
          </p>

          <Link
            href="/recruiter/jobs"
            className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back to Jobs
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const applications =
    job.applications?.length || 0;

  const shortlisted =
    job.applications?.filter(
      (application) =>
        application.status === "SHORTLISTED"
    ).length || 0;

  return (
    <DashboardLayout>
      {/* Back */}
      <Link
        href="/recruiter/jobs"
        className="text-sm font-medium text-slate-500 hover:text-indigo-600"
      >
        ← Back to Jobs
      </Link>

      {/* Header */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-600">
              {job.title.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">
                  {job.title}
                </h1>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    job.status === "ACTIVE"
                      ? "bg-green-50 text-green-600"
                      : job.status === "DRAFT"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {formatStatus(job.status)}
                </span>
              </div>

              <p className="mt-2 text-slate-500">
                {job.company?.name || "Company"}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {job.company?.industry ||
                  "Technology"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
            >
              Edit Job
            </button>

            <Link
              href={`/candidates?jobId=${job.id}`}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              View Candidates
            </Link>
          </div>
        </div>

        {/* Job meta */}
        <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <Info
            label="Location"
            value={job.location || "Not specified"}
          />

          <Info
            label="Job Type"
            value={formatJobType(job.jobType)}
          />

          <Info
            label="Work Mode"
            value={formatWorkMode(job.workMode)}
          />

          <Info
            label="Experience"
            value={`${formatExperience(
              job.experienceLevel
            )}${
              job.minExperience !== null &&
              job.maxExperience !== null
                ? ` • ${job.minExperience}-${job.maxExperience} years`
                : ""
            }`}
          />
        </div>
      </div>

      {/* Main */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Description */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Job Description
            </h2>

            <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
              {job.description}
            </p>
          </section>

          {/* Skills */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Required Skills
            </h2>

            {job.skills && job.skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {job.skills.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                  >
                    {item.skill?.name || "Skill"}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                No skills have been added to this job yet.
              </p>
            )}
          </section>

          {/* Company */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Company Information
            </h2>

            <p className="mt-4 font-semibold text-slate-800">
              {job.company?.name || "Company"}
            </p>

            {job.company?.description && (
              <p className="mt-2 leading-6 text-slate-500">
                {job.company.description}
              </p>
            )}

            {job.company?.website && (
              <a
                href={job.company.website}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Visit Company Website →
              </a>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application stats */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Recruitment Overview
            </h2>

            <div className="mt-5 space-y-5">
              <Stat
                label="Applications"
                value={applications}
              />

              <Stat
                label="Shortlisted"
                value={shortlisted}
              />

              <Stat
                label="Openings"
                value={job.openings}
              />
            </div>
          </section>

          {/* Compensation */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Compensation
            </h2>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {job.salaryMin !== null ||
              job.salaryMax !== null
                ? `${job.currency || "INR"} ${
                    job.salaryMin ?? ""
                  } - ${job.salaryMax ?? ""}`
                : "Not specified"}
            </p>
          </section>

          {/* Dates */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Job Information
            </h2>

            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="text-slate-400">
                  Created
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {new Date(
                    job.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Deadline
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {job.applicationDeadline
                    ? new Date(
                        job.applicationDeadline
                      ).toLocaleDateString()
                    : "No deadline"}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Recruiter
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {job.recruiter?.user?.name ||
                    "Recruiter"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-xl font-bold text-slate-900">
        {value}
      </span>
    </div>
  );
}