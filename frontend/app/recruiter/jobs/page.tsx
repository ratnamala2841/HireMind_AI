"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
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
  status: string;
  minExperience: number | null;
  maxExperience: number | null;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  openings: number;
  applicationDeadline: string | null;
  createdAt: string;
  company?: {
    id: number;
    name: string;
    industry: string | null;
    location: string | null;
  };
  applications?: {
    id: number;
    status: string;
  }[];
};

type JobsResponse = {
  success: boolean;
  count: number;
  jobs: Job[];
  message?: string;
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

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/jobs`);

        const data: JobsResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load jobs");
        }

        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Load jobs error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load jobs"
        );
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => job.status === "ACTIVE"
  ).length;

  const totalApplicants = jobs.reduce(
    (total, job) => total + (job.applications?.length || 0),
    0
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Recruiter Jobs
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your job postings and track candidates.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/create"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + Create Job
        </Link>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Jobs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {totalJobs}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Jobs
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {activeJobs}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Applicants
          </p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-600">
            {totalApplicants}
          </h2>
        </div>
      </div>

      {/* Jobs */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Your Job Postings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor your current recruitment openings.
          </p>
        </div>

        {loading && (
          <div className="p-10 text-center text-slate-500">
            Loading jobs...
          </div>
        )}

        {error && (
          <div className="p-6">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-slate-500">
              No jobs found.
            </p>

            <Link
              href="/recruiter/jobs/create"
              className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Create your first job
            </Link>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="divide-y divide-slate-100">
            {jobs.map((job) => {
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
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    {/* Job information */}
                    <Link
                      href={`/recruiter/jobs/${job.id}`}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                        {job.title.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900 hover:text-indigo-600">
                          {job.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {job.company?.industry ||
                            "Technology"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {job.location || "Location not specified"}{" "}
                          •{" "}
                          {formatJobType(job.jobType)}
                        </p>
                      </div>
                    </Link>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-slate-400">
                          Applicants
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

                      <Link
                        href={`/recruiter/jobs/${job.id}`}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}