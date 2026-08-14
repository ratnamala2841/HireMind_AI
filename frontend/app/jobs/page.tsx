"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface JobSkill {
  id: number;
  skill: {
    id: number;
    name: string;
  };
}

interface Company {
  id: number;
  name: string;
  logoUrl?: string | null;
}

interface Job {
  id: number;
  title: string;
  description: string;
  location?: string | null;

  jobType: string;
  workMode: string;
  experienceLevel: string;

  minExperience?: number | null;
  maxExperience?: number | null;

  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string | null;

  status: string;
  openings: number;

  createdAt: string;

  company: Company;
  skills: JobSkill[];
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");

  // ============================================================
  // LOAD JOBS FROM BACKEND / POSTGRESQL
  // ============================================================

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load jobs"
          );
        }

        setJobs(data.jobs);
      } catch (error) {
        console.error("Failed to load jobs:", error);

        setError(
          "Failed to load jobs from server. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  // ============================================================
  // FILTER JOBS
  // ============================================================

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.name.toLowerCase().includes(searchText) ||
      job.skills.some((jobSkill) =>
        jobSkill.skill.name
          .toLowerCase()
          .includes(searchText)
      );

    const matchesLocation =
      location === "" ||
      (job.location || "")
        .toLowerCase()
        .includes(location.toLowerCase());

    const matchesType =
      jobType === "All" || job.jobType === jobType;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType
    );
  });

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

            <p className="text-slate-500">
              Loading jobs...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Find Your Next Opportunity
        </h1>

        <p className="mt-2 text-slate-500">
          Discover jobs that match your skills and career goals.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Search */}
      <div className="rounded-2xl bg-indigo-600 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-white">
          Search Jobs
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, company or skill"
            className="rounded-lg border-0 bg-white px-4 py-3 text-slate-900 outline-none"
          />

          {/* Location */}
          <input
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            placeholder="Location or Remote"
            className="rounded-lg border-0 bg-white px-4 py-3 text-slate-900 outline-none"
          />

          {/* Job Type */}
          <select
            value={jobType}
            onChange={(e) =>
              setJobType(e.target.value)
            }
            className="rounded-lg border-0 bg-white px-4 py-3 text-slate-900 outline-none"
          >
            <option value="All">
              All Job Types
            </option>

            <option value="INTERNSHIP">
              Internship
            </option>

            <option value="FULL_TIME">
              Full Time
            </option>

            <option value="PART_TIME">
              Part Time
            </option>

            <option value="CONTRACT">
              Contract
            </option>

            <option value="FREELANCE">
              Freelance
            </option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recommended Jobs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredJobs.length} opportunities found
          </p>
        </div>

        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600">
          Sort: Best Match
        </button>
      </div>

      {/* Job Cards */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                {/* Company Logo / Initial */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
                  {job.company.name.charAt(0)}
                </div>

                {/* Job Details */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {job.title}
                  </h3>

                  <p className="mt-1 font-medium text-slate-600">
                    {job.company.name}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    📍 {job.location || "Location not specified"}
                  </p>
                </div>
              </div>

              {/* HireMind AI */}
              <div className="rounded-xl bg-indigo-50 px-3 py-2 text-center">
                <p className="text-xs text-indigo-600">
                  HireMind AI
                </p>

                <p className="text-sm font-bold text-indigo-600">
                  Job
                </p>
              </div>
            </div>

            {/* Job Information */}
            <div className="mt-5 flex flex-wrap gap-2">
              {/* Job Type */}
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                {job.jobType}
              </span>

              {/* Work Mode */}
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {job.workMode}
              </span>

              {/* Salary */}
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                💰{" "}
                {job.salaryMin || job.salaryMax
                  ? `${job.currency || "INR"} ${
                      job.salaryMin ?? ""
                    }${
                      job.salaryMax
                        ? ` - ${job.salaryMax}`
                        : ""
                    }`
                  : "Salary not specified"}
              </span>

              {/* Posted Date */}
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                🕒{" "}
                {new Date(
                  job.createdAt
                ).toLocaleDateString()}
              </span>
            </div>

            {/* Experience */}
            <div className="mt-4">
              <p className="text-sm text-slate-500">
                Experience:{" "}
                <span className="font-medium text-slate-700">
                  {job.experienceLevel}
                </span>
              </p>
            </div>

            {/* Skills */}
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Required Skills
              </p>

              <div className="flex flex-wrap gap-2">
                {job.skills.length > 0 ? (
                  job.skills.map((jobSkill) => (
                    <span
                      key={jobSkill.id}
                      className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {jobSkill.skill.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">
                    No skills specified
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                {job.description}
              </p>
            </div>

            {/* Bottom */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              <p className="text-xs text-slate-400">
                AI matching will be available after
                candidate profile integration.
              </p>

              <button
                onClick={() =>
                  alert(
                    `Opening ${job.title} at ${job.company.name}`
                  )
                }
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                View & Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && !error && (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="text-4xl">🔎</div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No jobs found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or location filters.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}