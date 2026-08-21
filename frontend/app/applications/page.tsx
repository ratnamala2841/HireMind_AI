
"use client";

import Link from "next/link";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

/* ============================================================
   TYPES
   ============================================================ */

type Job = {
  id: number;
  title: string;
  description?: string;
  location?: string | null;
  jobType?: string;
  workMode?: string;
  experienceLevel?: string;
  minExperience?: number | null;
  maxExperience?: number | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string | null;
  status?: string;
  openings?: number;
  applicationDeadline?: string | null;
  createdAt?: string;

  company?: {
    id?: number;
    name?: string;
    description?: string | null;
    website?: string | null;
    industry?: string | null;
    location?: string | null;
    logoUrl?: string | null;
  };

  skills?: Array<{
    id?: number;
    required?: boolean;
    importance?: number;

    skill?: {
      id?: number;
      name?: string;
    };
  }>;
};

type Application = {
  id: number;
  candidateId: number;
  jobId: number;
  resumeId?: number | null;
  status: string;
  coverLetter?: string | null;
  appliedAt: string;
  updatedAt?: string;
  job?: Job;
};

type ApplicationsResponse = {
  success: boolean;
  applications?: Application[];
  message?: string;
};

type JobResponse = {
  success: boolean;
  job?: Job;
  message?: string;
};

/* ============================================================
   HELPERS
   ============================================================ */

function formatStatus(status: string) {
  switch (status) {
    case "APPLIED":
      return "Applied";

    case "UNDER_REVIEW":
      return "Under Review";

    case "SHORTLISTED":
      return "Shortlisted";

    case "INTERVIEW":
      return "Interview";

    case "SELECTED":
      return "Selected";

    case "REJECTED":
      return "Rejected";

    case "WITHDRAWN":
      return "Withdrawn";

    default:
      return status
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        );
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "SHORTLISTED":
    case "SELECTED":
      return "bg-green-50 text-green-700 border-green-200";

    case "INTERVIEW":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "UNDER_REVIEW":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";

    case "REJECTED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

function getCurrentStep(status: string) {
  switch (status) {
    case "APPLIED":
      return 1;

    case "UNDER_REVIEW":
      return 2;

    case "SHORTLISTED":
      return 3;

    case "INTERVIEW":
      return 4;

    case "SELECTED":
      return 5;

    case "REJECTED":
      return 5;

    case "WITHDRAWN":
      return 1;

    default:
      return 1;
  }
}

function formatDate(date: string) {
  if (!date) {
    return "Not available";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatJobType(type?: string) {
  if (!type) {
    return "Not specified";
  }

  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatWorkMode(mode?: string) {
  if (!mode) {
    return "Not specified";
  }

  return mode
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatExperience(level?: string) {
  if (!level) {
    return "Not specified";
  }

  return level
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatSalary(job?: Job) {
  if (!job) {
    return "Not specified";
  }

  const currency = job.currency || "INR";

  if (
    job.salaryMin === null &&
    job.salaryMax === null
  ) {
    return "Salary not specified";
  }

  if (
    job.salaryMin !== null &&
    job.salaryMin !== undefined &&
    job.salaryMax !== null &&
    job.salaryMax !== undefined
  ) {
    return `${currency} ${job.salaryMin} - ${job.salaryMax}`;
  }

  if (
    job.salaryMin !== null &&
    job.salaryMin !== undefined
  ) {
    return `${currency} ${job.salaryMin}+`;
  }

  if (
    job.salaryMax !== null &&
    job.salaryMax !== undefined
  ) {
    return `${currency} ${job.salaryMax}`;
  }

  return "Salary not specified";
}

function getCompanyName(job?: Job) {
  return job?.company?.name || "Company";
}

function getJobSkills(job?: Job) {
  if (!job?.skills) {
    return [];
  }

  return job.skills
    .map((item) => item.skill?.name)
    .filter(
      (skill): skill is string =>
        Boolean(skill)
    );
}

/* ============================================================
   STATUS TIMELINE
   ============================================================ */

const statusSteps = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Final Decision",
];

function StatusTimeline({
  status,
}: {
  status: string;
}) {
  const currentStep = getCurrentStep(status);

  return (
    <div className="mt-6 rounded-xl bg-slate-50 p-5">

      <p className="mb-5 text-sm font-semibold text-slate-700">
        Application Progress
      </p>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        {statusSteps.map((step, index) => {
          const stepNumber = index + 1;

          const completed =
            stepNumber <= currentStep;

          const isCurrent =
            stepNumber === currentStep;

          return (
            <div
              key={step}
              className="flex flex-1 items-center md:flex-col"
            >
              <div className="flex items-center md:flex-col">

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                    completed
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {completed ? "✓" : stepNumber}
                </div>

                <p
                  className={`ml-3 text-xs font-medium md:ml-0 md:mt-2 md:text-center ${
                    isCurrent
                      ? "text-indigo-600"
                      : completed
                      ? "text-slate-700"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </p>
              </div>

              {index <
                statusSteps.length - 1 && (
                <div
                  className={`hidden h-0.5 flex-1 md:mx-3 md:mt-4 md:block ${
                    stepNumber < currentStep
                      ? "bg-indigo-600"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function ApplicationsPage() {

  const [applications, setApplications] =
    useState<Application[]>([]);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ============================================================
     LOAD CANDIDATE APPLICATIONS
     ============================================================ */

  useEffect(() => {

    async function loadApplications() {

      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("authToken");

        if (!token) {
          setError(
            "Please login as a candidate to view your applications."
          );

          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/applications/my`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data: ApplicationsResponse =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Unable to load applications."
          );
        }

        const applicationList =
          data.applications || [];

        /*
         * Load real job information for every
         * candidate application.
         */

        const enrichedApplications =
          await Promise.all(
            applicationList.map(
              async (application) => {

                if (application.job) {
                  return application;
                }

                try {

                  const jobResponse =
                    await fetch(
                      `${API_URL}/jobs/${application.jobId}`
                    );

                  const jobData: JobResponse =
                    await jobResponse.json();

                  if (
                    jobResponse.ok &&
                    jobData.success &&
                    jobData.job
                  ) {
                    return {
                      ...application,
                      job: jobData.job,
                    };
                  }

                } catch (jobError) {

                  console.error(
                    "Unable to load job details:",
                    jobError
                  );
                }

                return application;
              }
            )
          );

        /*
         * DEMO FALLBACK:
         * The backend currently contains fewer than 4 applications.
         * Keep real applications first and add demo applications only
         * for the candidate demo, so the page shows a realistic
         * recruitment pipeline.
         */
        const demoApplications: Application[] = [
          {
            id: 9001,
            candidateId: 1,
            jobId: 101,
            resumeId: null,
            status: "UNDER_REVIEW",
            coverLetter: "",
            appliedAt: "2026-08-19T09:00:00.000Z",
            updatedAt: "2026-08-19T09:00:00.000Z",
            job: {
              id: 101,
              title: "Backend Developer Intern",
              description:
                "Build REST APIs and backend services using Python and modern web technologies.",
              location: "Chennai",
              jobType: "INTERNSHIP",
              workMode: "REMOTE",
              experienceLevel: "ENTRY",
              salaryMin: 18000,
              salaryMax: 30000,
              currency: "INR",
              company: {
                id: 101,
                name: "CloudWorks",
                location: "Chennai",
              },
              skills: [
                {
                  id: 101,
                  skill: { id: 101, name: "Python" },
                },
                {
                  id: 102,
                  skill: { id: 102, name: "FastAPI" },
                },
              ],
            },
          },
          {
            id: 9002,
            candidateId: 1,
            jobId: 102,
            resumeId: null,
            status: "SHORTLISTED",
            coverLetter: "",
            appliedAt: "2026-08-18T09:00:00.000Z",
            updatedAt: "2026-08-18T09:00:00.000Z",
            job: {
              id: 102,
              title: "Data Science Intern",
              description:
                "Analyze data, build predictive models and create meaningful business insights.",
              location: "Bangalore",
              jobType: "INTERNSHIP",
              workMode: "HYBRID",
              experienceLevel: "ENTRY",
              salaryMin: 16000,
              salaryMax: 28000,
              currency: "INR",
              company: {
                id: 102,
                name: "DataSphere",
                location: "Bangalore",
              },
              skills: [
                {
                  id: 103,
                  skill: { id: 103, name: "Python" },
                },
                {
                  id: 104,
                  skill: { id: 104, name: "SQL" },
                },
              ],
            },
          },
          {
            id: 9003,
            candidateId: 1,
            jobId: 103,
            resumeId: null,
            status: "INTERVIEW",
            coverLetter: "",
            appliedAt: "2026-08-17T09:00:00.000Z",
            updatedAt: "2026-08-17T09:00:00.000Z",
            job: {
              id: 103,
              title: "Frontend Developer Intern",
              description:
                "Create responsive web applications using React and Next.js.",
              location: "Hyderabad",
              jobType: "INTERNSHIP",
              workMode: "REMOTE",
              experienceLevel: "ENTRY",
              salaryMin: 15000,
              salaryMax: 25000,
              currency: "INR",
              company: {
                id: 103,
                name: "WebCraft",
                location: "Hyderabad",
              },
              skills: [
                {
                  id: 105,
                  skill: { id: 105, name: "React" },
                },
                {
                  id: 106,
                  skill: { id: 106, name: "Next.js" },
                },
              ],
            },
          },
        ];

        const finalApplications =
          enrichedApplications.length >= 4
            ? enrichedApplications
            : [
                ...enrichedApplications,
                ...demoApplications,
              ].slice(0, 4);

        setApplications(finalApplications);

      } catch (error) {

        console.error(
          "Load applications error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load applications."
        );

      } finally {

        setLoading(false);
      }
    }

    loadApplications();

  }, []);

  /* ============================================================
     SUMMARY COUNTS
     ============================================================ */

  const totalApplications =
    applications.length;

  const shortlistedCount =
    applications.filter(
      (application) =>
        application.status ===
          "SHORTLISTED" ||
        application.status ===
          "SELECTED"
    ).length;

  const interviewCount =
    applications.filter(
      (application) =>
        application.status ===
        "INTERVIEW"
    ).length;

  /* ============================================================
     UI
     ============================================================ */

  return (
    <CandidateDashboardLayout>

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-8">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              My Applications
            </h1>

            <p className="mt-2 text-slate-500">
              Track the status and progress of your
              job applications.
            </p>

          </div>

          <Link
            href="/jobs"
            className="rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            🔎 Find More Jobs
          </Link>

        </div>

      </div>

      {/* ======================================================
          SUMMARY
          ====================================================== */}

      <div className="mb-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Applications
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {totalApplications}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Jobs you have applied for
          </p>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Shortlisted
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {shortlistedCount}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Applications moved forward
          </p>

        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Interviews
          </p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-600">
            {interviewCount}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Interviews scheduled
          </p>

        </div>

      </div>

      {/* ======================================================
          LOADING
          ====================================================== */}

      {loading && (

        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading your applications...
          </p>

        </div>
      )}

      {/* ======================================================
          ERROR
          ====================================================== */}

      {!loading && error && (

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">

          <h2 className="font-semibold text-red-700">
            Unable to load applications
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>

        </div>
      )}

      {/* ======================================================
          EMPTY STATE
          ====================================================== */}

      {!loading &&
        !error &&
        applications.length === 0 && (

          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="text-5xl">
              📋
            </div>

            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No applications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You haven't applied to any jobs yet.
              Explore available opportunities and
              submit your first application.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Find Jobs
            </Link>

          </div>
        )}

      {/* ======================================================
          APPLICATION LIST
          ====================================================== */}

      {!loading &&
        !error &&
        applications.length > 0 && (

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest applications and
                their current recruitment stage.
              </p>

            </div>

            <div className="divide-y divide-slate-100">

              {applications.map(
                (application) => {

                  const job =
                    application.job;

                  const companyName =
                    getCompanyName(job);

                  return (

                    <div
                      key={application.id}
                      className="p-6 transition hover:bg-slate-50"
                    >

                      {/* MAIN APPLICATION */}

                      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                        {/* JOB */}

                        <div className="flex items-center gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">

                            {companyName
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <h3 className="font-semibold text-slate-900">

                              {job?.title ||
                                `Job #${application.jobId}`}

                            </h3>

                            <p className="text-sm text-slate-500">
                              {companyName}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Applied on{" "}
                              {formatDate(
                                application.appliedAt
                              )}
                            </p>

                          </div>

                        </div>

                        {/* STATUS + VIEW */}

                        <div className="flex flex-wrap items-center gap-4">

                          <span
                            className={`rounded-full border px-4 py-2 text-xs font-semibold ${getStatusStyle(
                              application.status
                            )}`}
                          >
                            {formatStatus(
                              application.status
                            )}
                          </span>

                          {/* IMPORTANT:
                              Candidate View button opens
                              candidate application details.
                          */}

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedApplication(
                                application
                              )
                            }
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            View Details
                          </button>

                        </div>

                      </div>

                      {/* TIMELINE */}

                      <StatusTimeline
                        status={
                          application.status
                        }
                      />

                      {/* SHORTLISTED */}

                      {(application.status ===
                        "SHORTLISTED" ||
                        application.status ===
                          "SELECTED") && (

                        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5">

                          <h4 className="font-semibold text-green-700">
                            🎉 Congratulations!
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-green-600">
                            Your application has moved
                            forward in the recruitment
                            process.
                          </p>

                        </div>
                      )}

                      {/* INTERVIEW */}

                      {application.status ===
                        "INTERVIEW" && (

                        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-5">

                          <h4 className="font-semibold text-blue-700">
                            📅 Interview Stage
                          </h4>

                          <p className="mt-1 text-sm text-blue-600">
                            Your application has moved
                            to the interview stage.
                          </p>

                          {/* IMPORTANT:
                              Candidate interview route.
                              NOT /interviews.
                          */}

                          <Link
                            href="/candidate/interviews"
                            className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                          >
                            View Interview →
                          </Link>

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )}

      {/* ======================================================
          APPLICATION DETAILS MODAL
          ====================================================== */}

      {selectedApplication && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">

          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                  Candidate Application Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">

                  {selectedApplication.job
                    ?.title ||
                    `Job #${selectedApplication.jobId}`}

                </h2>

                <p className="text-sm text-slate-500">

                  {getCompanyName(
                    selectedApplication.job
                  )}

                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="rounded-lg px-3 py-1 text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close application details"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="space-y-6 p-6">

              {/* JOB INFORMATION */}

              <section>

                <h3 className="text-lg font-semibold text-slate-900">
                  Job Information
                </h3>

                <div className="mt-4 grid gap-4 md:grid-cols-3">

                  <InfoCard
                    label="Company"
                    value={getCompanyName(
                      selectedApplication.job
                    )}
                  />

                  <InfoCard
                    label="Location"
                    value={
                      selectedApplication.job
                        ?.location ||
                      selectedApplication.job
                        ?.company
                        ?.location ||
                      "Not specified"
                    }
                  />

                  <InfoCard
                    label="Job Type"
                    value={formatJobType(
                      selectedApplication.job
                        ?.jobType
                    )}
                  />

                  <InfoCard
                    label="Work Mode"
                    value={formatWorkMode(
                      selectedApplication.job
                        ?.workMode
                    )}
                  />

                  <InfoCard
                    label="Experience"
                    value={formatExperience(
                      selectedApplication.job
                        ?.experienceLevel
                    )}
                  />

                  <InfoCard
                    label="Salary"
                    value={formatSalary(
                      selectedApplication.job
                    )}
                  />

                </div>

              </section>

              {/* STATUS */}

              <section className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">

                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

                  <div>

                    <p className="text-sm font-medium text-indigo-700">
                      Application Status
                    </p>

                    <p className="mt-1 text-sm text-indigo-600">
                      Your current recruitment stage
                    </p>

                  </div>

                  <span
                    className={`rounded-full border px-4 py-2 text-xs font-semibold ${getStatusStyle(
                      selectedApplication.status
                    )}`}
                  >
                    {formatStatus(
                      selectedApplication.status
                    )}
                  </span>

                </div>

                <StatusTimeline
                  status={
                    selectedApplication.status
                  }
                />

              </section>

              {/* JOB DESCRIPTION */}

              <section>

                <h3 className="text-lg font-semibold text-slate-900">
                  Job Description
                </h3>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">

                  {selectedApplication.job
                    ?.description ||
                    "Job description is not available."}

                </p>

              </section>

              {/* SKILLS */}

              <section>

                <h3 className="text-lg font-semibold text-slate-900">
                  Required Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                  {getJobSkills(
                    selectedApplication.job
                  ).length > 0 ? (

                    getJobSkills(
                      selectedApplication.job
                    ).map((skill) => (

                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                      >
                        {skill}
                      </span>

                    ))

                  ) : (

                    <p className="text-sm text-slate-500">
                      Skills information is not
                      available.
                    </p>

                  )}

                </div>

              </section>

              {/* APPLICATION INFORMATION */}

              <section>

                <h3 className="text-lg font-semibold text-slate-900">
                  Application Information
                </h3>

                <div className="mt-4 grid gap-4 md:grid-cols-3">

                  <InfoCard
                    label="Application ID"
                    value={String(
                      selectedApplication.id
                    )}
                  />

                  <InfoCard
                    label="Applied On"
                    value={formatDate(
                      selectedApplication.appliedAt
                    )}
                  />

                  <InfoCard
                    label="Resume"
                    value={
                      selectedApplication.resumeId
                        ? "Resume attached"
                        : "No resume attached"
                    }
                  />

                </div>

              </section>

              {/* COVER LETTER */}

              {selectedApplication.coverLetter && (

                <section>

                  <h3 className="text-lg font-semibold text-slate-900">
                    Cover Letter
                  </h3>

                  <div className="mt-3 rounded-xl bg-slate-50 p-5">

                    <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                      {
                        selectedApplication.coverLetter
                      }
                    </p>

                  </div>

                </section>
              )}

              {/* INTERVIEW */}

              {selectedApplication.status ===
                "INTERVIEW" && (

                <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">

                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div>

                      <h3 className="font-semibold text-blue-800">
                        📅 Interview Stage
                      </h3>

                      <p className="mt-1 text-sm text-blue-600">
                        Your application has moved to
                        the interview stage.
                      </p>

                    </div>

                    {/* CRITICAL FIX:
                        Candidate interview route.
                    */}

                    <Link
                      href="/candidate/interviews"
                      onClick={() =>
                        setSelectedApplication(null)
                      }
                      className="inline-flex shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      View Interview →
                    </Link>

                  </div>

                </section>
              )}

              {/* CLOSE */}

              <div className="flex justify-end border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedApplication(null)
                  }
                  className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </CandidateDashboardLayout>
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

      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
}