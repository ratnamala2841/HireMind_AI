"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

type JobSkill = {
  id: number;
  required?: boolean;
  importance?: number;
  skill?: {
    id: number;
    name: string;
  };
};

type Job = {
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
  applicationDeadline?: string | null;
  createdAt: string;

  company?: {
    id: number;
    name: string;
    description?: string | null;
    website?: string | null;
    industry?: string | null;
    location?: string | null;
    logoUrl?: string | null;
  };

  skills?: JobSkill[];
};

type JobsResponse = {
  success: boolean;
  jobs?: Job[];
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

function formatDate(date?: string | null) {
  if (!date) {
    return "Not specified";
  }

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

/*
 * Demo fallback jobs.
 *
 * Your PostgreSQL database currently contains real jobs.
 * These fallback jobs are used only when the Dashboard
 * contains recommendation cards whose IDs are not yet
 * present in the database.
 */
const demoJobs: Job[] = [
  {
    id: 1,
    title: "AI/ML Intern",
    description:
      "Work on machine learning models, AI applications and data-driven solutions. Collaborate with developers and data scientists to build intelligent products.",
    location: "Chennai",
    jobType: "INTERNSHIP",
    workMode: "ONSITE",
    experienceLevel: "ENTRY",
    minExperience: 0,
    maxExperience: 1,
    salaryMin: 15000,
    salaryMax: 25000,
    currency: "INR",
    status: "ACTIVE",
    openings: 3,
    applicationDeadline: "2026-09-30",
    createdAt: "2026-08-20",
    company: {
      id: 1,
      name: "TechNova",
      description:
        "TechNova builds innovative AI and software solutions for modern businesses.",
      industry: "Technology",
      location: "Chennai",
    },
    skills: [
      {
        id: 101,
        skill: {
          id: 101,
          name: "Python",
        },
      },
      {
        id: 102,
        skill: {
          id: 102,
          name: "Machine Learning",
        },
      },
      {
        id: 103,
        skill: {
          id: 103,
          name: "Artificial Intelligence",
        },
      },
    ],
  },

  {
    id: 2,
    title: "Backend Developer",
    description:
      "Build scalable backend services and APIs using modern development technologies. Work with databases, authentication and REST APIs.",
    location: "Chennai",
    jobType: "INTERNSHIP",
    workMode: "HYBRID",
    experienceLevel: "ENTRY",
    minExperience: 0,
    maxExperience: 2,
    salaryMin: 18000,
    salaryMax: 30000,
    currency: "INR",
    status: "ACTIVE",
    openings: 2,
    applicationDeadline: "2026-09-25",
    createdAt: "2026-08-20",
    company: {
      id: 2,
      name: "CloudWorks",
      description:
        "CloudWorks develops cloud-native platforms and backend systems.",
      industry: "Software",
      location: "Chennai",
    },
    skills: [
      {
        id: 201,
        skill: {
          id: 201,
          name: "Python",
        },
      },
      {
        id: 202,
        skill: {
          id: 202,
          name: "FastAPI",
        },
      },
      {
        id: 203,
        skill: {
          id: 203,
          name: "PostgreSQL",
        },
      },
    ],
  },

  {
    id: 3,
    title: "Data Science Intern",
    description:
      "Analyze datasets, build predictive models and support AI-driven business decisions. Gain practical experience in data science workflows.",
    location: "Bangalore",
    jobType: "INTERNSHIP",
    workMode: "HYBRID",
    experienceLevel: "ENTRY",
    minExperience: 0,
    maxExperience: 1,
    salaryMin: 16000,
    salaryMax: 28000,
    currency: "INR",
    status: "ACTIVE",
    openings: 4,
    applicationDeadline: "2026-10-01",
    createdAt: "2026-08-20",
    company: {
      id: 3,
      name: "DataSphere",
      description:
        "DataSphere provides analytics and machine learning solutions for modern organizations.",
      industry: "Data & AI",
      location: "Bangalore",
    },
    skills: [
      {
        id: 301,
        skill: {
          id: 301,
          name: "Python",
        },
      },
      {
        id: 302,
        skill: {
          id: 302,
          name: "SQL",
        },
      },
      {
        id: 303,
        skill: {
          id: 303,
          name: "Pandas",
        },
      },
    ],
  },

  {
    id: 4,
    title: "Frontend Developer Intern",
    description:
      "Create responsive web applications using React, Next.js and modern UI technologies. Work with designers and backend developers to deliver user-friendly experiences.",
    location: "Hyderabad",
    jobType: "INTERNSHIP",
    workMode: "REMOTE",
    experienceLevel: "ENTRY",
    minExperience: 0,
    maxExperience: 1,
    salaryMin: 15000,
    salaryMax: 25000,
    currency: "INR",
    status: "ACTIVE",
    openings: 3,
    applicationDeadline: "2026-09-28",
    createdAt: "2026-08-20",
    company: {
      id: 4,
      name: "WebCraft",
      description:
        "WebCraft creates modern digital products and web experiences.",
      industry: "Software",
      location: "Hyderabad",
    },
    skills: [
      {
        id: 401,
        skill: {
          id: 401,
          name: "React",
        },
      },
      {
        id: 402,
        skill: {
          id: 402,
          name: "Next.js",
        },
      },
      {
        id: 403,
        skill: {
          id: 403,
          name: "TypeScript",
        },
      },
    ],
  },

  {
    id: 5,
    title: "Machine Learning Engineer",
    description:
      "Develop and deploy machine learning models for real-world applications. Work with data pipelines, model evaluation and AI solutions.",
    location: "Bangalore",
    jobType: "FULL_TIME",
    workMode: "HYBRID",
    experienceLevel: "JUNIOR",
    minExperience: 1,
    maxExperience: 3,
    salaryMin: 50000,
    salaryMax: 80000,
    currency: "INR",
    status: "ACTIVE",
    openings: 2,
    applicationDeadline: "2026-10-15",
    createdAt: "2026-08-20",
    company: {
      id: 5,
      name: "NeuralTech",
      description:
        "NeuralTech builds production-grade AI and machine learning systems.",
      industry: "Artificial Intelligence",
      location: "Bangalore",
    },
    skills: [
      {
        id: 501,
        skill: {
          id: 501,
          name: "Python",
        },
      },
      {
        id: 502,
        skill: {
          id: 502,
          name: "TensorFlow",
        },
      },
      {
        id: 503,
        skill: {
          id: 503,
          name: "Machine Learning",
        },
      },
    ],
  },

  {
    id: 6,
    title: "Python Developer",
    description:
      "Develop backend applications and APIs using Python and FastAPI. Work with databases and build reliable services for production applications.",
    location: "Chennai",
    jobType: "FULL_TIME",
    workMode: "ONSITE",
    experienceLevel: "JUNIOR",
    minExperience: 1,
    maxExperience: 2,
    salaryMin: 35000,
    salaryMax: 60000,
    currency: "INR",
    status: "ACTIVE",
    openings: 2,
    applicationDeadline: "2026-10-10",
    createdAt: "2026-08-20",
    company: {
      id: 6,
      name: "CodeWorks",
      description:
        "CodeWorks develops enterprise software and Python-based backend systems.",
      industry: "Software",
      location: "Chennai",
    },
    skills: [
      {
        id: 601,
        skill: {
          id: 601,
          name: "Python",
        },
      },
      {
        id: 602,
        skill: {
          id: 602,
          name: "FastAPI",
        },
      },
      {
        id: 603,
        skill: {
          id: 603,
          name: "SQL",
        },
      },
    ],
  },
];

export default function CandidateJobDetailsPage() {
  const params = useParams();

  const rawId = params.id;

  const jobId = Array.isArray(rawId)
    ? rawId[0]
    : rawId;

  const [job, setJob] =
    useState<Job | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [applying, setApplying] =
    useState(false);

  const [applied, setApplied] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    if (!jobId) {
      return;
    }

    async function loadJob() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/jobs`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data: JobsResponse =
          await response.json();

        if (
          !response.ok ||
          !data.success ||
          !Array.isArray(data.jobs)
        ) {
          throw new Error(
            data.message ||
              "Failed to load jobs."
          );
        }

        const numericId =
          Number(jobId);

        /*
         * First use the real job from PostgreSQL.
         */
        const foundJob =
          data.jobs.find(
            (item) =>
              Number(item.id) === numericId
          );

        /*
         * If the job does not exist in PostgreSQL,
         * use one of our demo recommendation jobs.
         *
         * This allows the Candidate Dashboard to show
         * 4–6 recommendation cards during the demo
         * without displaying "Job not found".
         */
        const selectedJob =
          foundJob ||
          demoJobs.find(
            (item) =>
              item.id === numericId
          );

        if (!selectedJob) {
          throw new Error(
            `Job #${jobId} was not found.`
          );
        }

        setJob(selectedJob);

        /*
         * Check whether candidate already applied.
         */
        const token =
          localStorage.getItem(
            "authToken"
          );

        if (token) {
          try {
            const applicationsResponse =
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

            const applicationsData =
              await applicationsResponse.json();

            if (
              applicationsResponse.ok &&
              applicationsData.success &&
              Array.isArray(
                applicationsData.applications
              )
            ) {
              const alreadyApplied =
                applicationsData.applications.some(
                  (application: {
                    jobId: number;
                  }) =>
                    Number(
                      application.jobId
                    ) === numericId
                );

              setApplied(
                alreadyApplied
              );
            }
          } catch {
            /*
             * Application lookup should not
             * prevent the job page from loading.
             */
          }
        }
      } catch (error) {
        console.error(
          "Load job details error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load job."
        );
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [jobId]);

  async function handleApply() {
    if (!job) {
      return;
    }

    const token =
      localStorage.getItem(
        "authToken"
      );

    if (!token) {
      setMessage(
        "Please login as a Candidate before applying."
      );
      return;
    }

    if (applied) {
      setMessage(
        "You have already applied for this job."
      );
      return;
    }

    try {
      setApplying(true);
      setMessage("");

      const response = await fetch(
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

      setApplied(true);

      setMessage(
        "Application submitted successfully!"
      );
    } catch (error) {
      console.error(
        "Application error:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit application."
      );
    } finally {
      setApplying(false);
    }
  }

  /*
   * LOADING
   */
  if (loading) {
    return (
      <CandidateDashboardLayout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="text-slate-500">
              Loading job details...
            </p>
          </div>
        </div>
      </CandidateDashboardLayout>
    );
  }

  /*
   * ERROR
   */
  if (error || !job) {
    return (
      <CandidateDashboardLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h2 className="text-xl font-bold text-red-700">
            Unable to load job
          </h2>

          <p className="mt-2 text-red-600">
            {error ||
              "Job not found."}
          </p>

          <Link
            href="/jobs"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Back to Jobs
          </Link>
        </div>
      </CandidateDashboardLayout>
    );
  }

  const skills =
    job.skills || [];

  const isActive =
    job.status === "ACTIVE";

  return (
    <CandidateDashboardLayout>
      <div className="space-y-6">

        {/* Back */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600"
        >
          ← Back to Jobs
        </Link>

        {/* Job Header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div className="flex gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-600">
                {(
                  job.company?.name ||
                  job.title ||
                  "J"
                )
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {job.title}
                </h1>

                <p className="mt-2 text-lg font-medium text-slate-600">
                  {job.company?.name ||
                    "Company"}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600">
                    {formatJobType(
                      job.jobType
                    )}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
                    {formatWorkMode(
                      job.workMode
                    )}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
                    {formatExperience(
                      job.experienceLevel
                    )}
                  </span>

                </div>

                <p className="mt-4 text-sm text-slate-500">
                  📍{" "}
                  {job.location ||
                    "Location not specified"}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-green-50 px-5 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                HireMind AI
              </p>

              <p className="mt-1 text-lg font-bold text-green-600">
                Recommended
              </p>
            </div>

          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:col-span-2">

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Job Description
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {job.description ||
                  "No job description provided."}
              </p>

            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Required Skills
              </h2>

              {skills.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-3">

                  {skills.map(
                    (item) => (
                      <span
                        key={item.id}
                        className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                      >
                        {item.skill?.name ||
                          "Skill"}
                      </span>
                    )
                  )}

                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  No specific skills
                  listed.
                </p>
              )}

            </section>

            {/* Company */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                About{" "}
                {job.company?.name ||
                  "Company"}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {job.company
                  ?.description ||
                  "Company information is available through the recruitment platform."}
              </p>

              {job.company?.industry && (
                <p className="mt-4 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Industry:
                  </span>{" "}
                  {job.company.industry}
                </p>
              )}

              {job.company?.location && (
                <p className="mt-2 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Location:
                  </span>{" "}
                  {job.company.location}
                </p>
              )}

              {job.company?.website && (
                <a
                  href={
                    job.company.website
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Visit Company Website →
                </a>
              )}

            </section>
          </div>

          {/* Right */}
          <aside className="space-y-6">

            {/* Overview */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Job Overview
              </h2>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Openings
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {job.openings}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Salary
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {formatSalary(job)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Experience
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {formatExperience(
                      job.experienceLevel
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Application Deadline
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {formatDate(
                      job.applicationDeadline
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Posted On
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {formatDate(
                      job.createdAt
                    )}
                  </p>
                </div>

              </div>
            </section>

            {/* Apply */}
            <section className="rounded-2xl bg-indigo-600 p-7 text-white shadow-sm">

              <h2 className="text-xl font-bold">
                Interested in this role?
              </h2>

              <p className="mt-3 text-sm leading-6 text-indigo-100">
                Apply for this position
                and track your
                application from your
                Candidate Dashboard.
              </p>

              <button
                type="button"
                onClick={handleApply}
                disabled={
                  applying ||
                  applied ||
                  !isActive
                }
                className={`mt-6 w-full rounded-xl px-5 py-3 font-semibold transition ${
                  applied
                    ? "bg-green-500 text-white"
                    : !isActive
                    ? "cursor-not-allowed bg-white/30 text-white/70"
                    : "bg-white text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {applying
                  ? "Submitting..."
                  : applied
                  ? "✓ Application Submitted"
                  : !isActive
                  ? "Applications Closed"
                  : "Apply Now"}
              </button>

              {message && (
                <div className="mt-4 rounded-lg bg-white/10 p-3 text-sm text-indigo-50">
                  {message}
                </div>
              )}

              <Link
                href="/applications"
                className="mt-4 block text-center text-sm font-medium text-indigo-100 hover:text-white"
              >
                View My Applications →
              </Link>

            </section>

            {/* Tip */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

              <h3 className="font-semibold text-indigo-900">
                💡 Application Tip
              </h3>

              <p className="mt-2 text-sm leading-6 text-indigo-700">
                Make sure your
                candidate profile and
                resume are complete
                before applying.
              </p>

              <Link
                href="/resume"
                className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Manage My Resume →
              </Link>

            </section>

          </aside>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">

          <Link
            href="/jobs"
            className="font-semibold text-slate-600 hover:text-indigo-600"
          >
            ← Find More Jobs
          </Link>

          <Link
            href="/applications"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View My Applications →
          </Link>

        </div>

      </div>
    </CandidateDashboardLayout>
  );
}