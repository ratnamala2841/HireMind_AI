"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

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

interface Application {
  id: number;
  jobId: number;
  status: string;
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

function formatSalary(job: Job) {
  const currency = job.currency || "INR";

  if (
    job.salaryMin == null &&
    job.salaryMax == null
  ) {
    return "Salary not specified";
  }

  if (
    job.salaryMin != null &&
    job.salaryMax != null
  ) {
    return `${currency} ${job.salaryMin} - ${job.salaryMax}`;
  }

  if (job.salaryMin != null) {
    return `${currency} ${job.salaryMin}+`;
  }

  return `${currency} ${job.salaryMax}`;
}

export default function CandidateJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [applicationsLoading, setApplicationsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [jobType, setJobType] =
    useState("All");

  const [applyingJobId, setApplyingJobId] =
    useState<number | null>(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [applyError, setApplyError] =
    useState("");

  /* ============================================================
     LOAD JOBS
     ============================================================ */

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/jobs`
        );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to load jobs."
          );
        }

        setJobs(
          Array.isArray(data.jobs)
            ? data.jobs
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load jobs:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load jobs."
        );
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  /* ============================================================
     LOAD CANDIDATE APPLICATIONS
     ============================================================ */

  useEffect(() => {
    async function loadApplications() {
      const token =
        localStorage.getItem(
          "authToken"
        );

      if (!token) {
        return;
      }

      try {
        setApplicationsLoading(true);

        const response =
          await fetch(
            `${API_URL}/applications/my`,
            {
              method: "GET",
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (
          response.ok &&
          data.success &&
          Array.isArray(
            data.applications
          )
        ) {
          setApplications(
            data.applications
          );
        }
      } catch (error) {
        console.error(
          "Failed to load applications:",
          error
        );
      } finally {
        setApplicationsLoading(false);
      }
    }

    loadApplications();
  }, []);

  /* ============================================================
     CHECK IF ALREADY APPLIED
     ============================================================ */

  function hasApplied(jobId: number) {
    return applications.some(
      (application) =>
        application.jobId === jobId
    );
  }

  /* ============================================================
     APPLY NOW
     ============================================================ */

  async function handleApply(
    job: Job
  ) {
    const token =
      localStorage.getItem(
        "authToken"
      );

    setSuccessMessage("");
    setApplyError("");

    if (!token) {
      setApplyError(
        "Please login as a Candidate before applying."
      );

      return;
    }

    if (hasApplied(job.id)) {
      setSuccessMessage(
        `You have already applied for ${job.title}.`
      );

      return;
    }

    try {
      setApplyingJobId(job.id);

      const response =
        await fetch(
          `${API_URL}/applications`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              jobId: job.id,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to submit application."
        );
      }

      const newApplication =
        data.application;

      if (newApplication) {
        setApplications(
          (previous) => [
            ...previous,
            {
              id:
                newApplication.id,
              jobId:
                newApplication.jobId ??
                job.id,
              status:
                newApplication.status ||
                "APPLIED",
            },
          ]
        );
      } else {
        setApplications(
          (previous) => [
            ...previous,
            {
              id:
                Date.now(),
              jobId: job.id,
              status: "APPLIED",
            },
          ]
        );
      }

      setSuccessMessage(
        `Application submitted successfully for ${job.title}!`
      );

    } catch (error) {
      console.error(
        "Application error:",
        error
      );

      setApplyError(
        error instanceof Error
          ? error.message
          : "Unable to submit application."
      );
    } finally {
      setApplyingJobId(null);
    }
  }

  /* ============================================================
     FILTER JOBS
     ============================================================ */

  const filteredJobs =
    jobs.filter((job) => {
      const searchText =
        search
          .toLowerCase()
          .trim();

      const matchesSearch =
        searchText === "" ||
        job.title
          .toLowerCase()
          .includes(searchText) ||
        job.company.name
          .toLowerCase()
          .includes(searchText) ||
        job.skills.some(
          (jobSkill) =>
            jobSkill.skill.name
              .toLowerCase()
              .includes(searchText)
        );

      const matchesLocation =
        location.trim() === "" ||
        (job.location || "")
          .toLowerCase()
          .includes(
            location
              .toLowerCase()
              .trim()
          );

      const matchesType =
        jobType === "All" ||
        job.jobType === jobType;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType
      );
    });

  /* ============================================================
     LOADING
     ============================================================ */

  if (loading) {
    return (
      <CandidateDashboardLayout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="text-slate-500">
              Loading jobs...
            </p>
          </div>
        </div>
      </CandidateDashboardLayout>
    );
  }

  /* ============================================================
     PAGE
     ============================================================ */

  return (
    <CandidateDashboardLayout>

      {/* HEADER */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Find Your Next Opportunity
          </h1>

          <p className="mt-2 text-slate-500">
            Discover jobs that match your
            skills and career goals.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
        >
          Back to Home
        </Link>
      </div>

      {/* SUCCESS */}

      {successMessage && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">
            ✓ {successMessage}
          </p>

          <Link
            href="/applications"
            className="mt-2 inline-block text-sm font-semibold text-green-700 underline"
          >
            View My Applications →
          </Link>
        </div>
      )}

      {/* ERROR */}

      {(error || applyError) && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-600">
            {applyError || error}
          </p>
        </div>
      )}

      {/* SEARCH */}

      <div className="rounded-2xl bg-indigo-600 p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-white">
          Search Jobs
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-3">

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Job title, company or skill"
            className="rounded-lg border-0 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-300"
          />

          <input
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            placeholder="Location or Remote"
            className="rounded-lg border-0 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-300"
          />

          <select
            value={jobType}
            onChange={(e) =>
              setJobType(
                e.target.value
              )
            }
            className="rounded-lg border-0 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300"
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

      {/* RESULTS HEADER */}

      <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recommended Jobs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredJobs.length} opportunities
            found
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
          {applicationsLoading
            ? "Checking applications..."
            : "Best Match"}
        </div>

      </div>

      {/* JOB CARDS */}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">

        {filteredJobs.map(
          (job) => {
            const applied =
              hasApplied(job.id);

            const applying =
              applyingJobId ===
              job.id;

            return (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
                      {job.company.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 font-medium text-slate-600">
                        {job.company.name}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        📍{" "}
                        {job.location ||
                          "Location not specified"}
                      </p>

                    </div>

                  </div>

                  <div className="rounded-xl bg-indigo-50 px-3 py-2 text-center">
                    <p className="text-xs text-indigo-600">
                      HireMind AI
                    </p>

                    <p className="text-sm font-bold text-indigo-600">
                      Match
                    </p>
                  </div>

                </div>

                {/* JOB INFORMATION */}

                <div className="mt-5 flex flex-wrap gap-2">

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {formatJobType(
                      job.jobType
                    )}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {formatWorkMode(
                      job.workMode
                    )}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    💰{" "}
                    {formatSalary(job)}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    🕒{" "}
                    {new Date(
                      job.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                {/* EXPERIENCE */}

                <div className="mt-4">

                  <p className="text-sm text-slate-500">
                    Experience:{" "}

                    <span className="font-medium text-slate-700">
                      {formatExperience(
                        job.experienceLevel
                      )}

                      {job.minExperience !=
                        null &&
                      job.maxExperience !=
                        null
                        ? ` • ${job.minExperience}-${job.maxExperience} years`
                        : ""}
                    </span>
                  </p>

                </div>

                {/* SKILLS */}

                <div className="mt-5">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Required Skills
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {job.skills.length >
                    0 ? (
                      job.skills.map(
                        (
                          jobSkill
                        ) => (
                          <span
                            key={
                              jobSkill.id
                            }
                            className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-600"
                          >
                            {
                              jobSkill
                                .skill
                                .name
                            }
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-xs text-slate-400">
                        No skills specified
                      </span>
                    )}

                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className="mt-5">

                  <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                    {job.description}
                  </p>

                </div>

                {/* BOTTOM */}

                <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">

                  <div>

                    <p className="text-xs font-medium text-slate-500">
                      {job.openings}{" "}
                      {job.openings === 1
                        ? "opening"
                        : "openings"}{" "}
                      available
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Apply directly as a Candidate.
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {/* VIEW */}

                    <Link
                      href={`/jobs/${job.id}`}
                      className="rounded-lg border border-indigo-300 px-4 py-2.5 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      View Details
                    </Link>

                    {/* APPLY */}

                    <button
                      type="button"
                      onClick={() =>
                        handleApply(job)
                      }
                      disabled={
                        applied ||
                        applying
                      }
                      className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
                        applied
                          ? "cursor-default bg-green-600"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } ${
                        applying
                          ? "cursor-wait opacity-70"
                          : ""
                      }`}
                    >
                      {applying
                        ? "Applying..."
                        : applied
                        ? "Applied ✓"
                        : "Apply Now"}
                    </button>

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>

      {/* EMPTY STATE */}

      {filteredJobs.length === 0 &&
        !error && (

          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <div className="text-4xl">
              🔎
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No jobs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or
              location filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setLocation("");
                setJobType("All");
              }}
              className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Clear Filters
            </button>

          </div>
        )}

    </CandidateDashboardLayout>
  );
}