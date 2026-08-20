"use client";

import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

const candidates = [
  {
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    match: 92,
    aptitude: "Passed",
    technical: "Passed",
    assessment: "Passed",
    communication: "Passed",
    ready: true,
  },
  {
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    match: 89,
    aptitude: "Passed",
    technical: "Passed",
    assessment: "Passed",
    communication: "Passed",
    ready: true,
  },
  {
    name: "Arjun Patel",
    role: "Backend Developer",
    match: 86,
    aptitude: "Passed",
    technical: "Passed",
    assessment: "Pending",
    communication: "Passed",
    ready: false,
  },
  {
    name: "Sneha Reddy",
    role: "Frontend Developer",
    match: 84,
    aptitude: "Passed",
    technical: "Passed",
    assessment: "Passed",
    communication: "Passed",
    ready: true,
  },
];

function TestStatus({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 font-semibold ${
          status === "Passed"
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        {status === "Passed" ? "✓ " : "⚠ "}
        {status}
      </p>

    </div>
  );
}

export default function InterviewReadinessPage() {
  const readyCount = candidates.filter(
    (candidate) => candidate.ready
  ).length;

  return (
    <DashboardLayout>

      <Link
        href="/shortlisted"
        className="text-sm font-medium text-slate-500 hover:text-indigo-600"
      >
        ← Back to Shortlisted
      </Link>


      <div className="mt-6">

        <h1 className="text-3xl font-bold text-slate-900">
          Ready for Interview
        </h1>

        <p className="mt-2 text-slate-500">
          Review candidate evaluation progress and interview readiness.
        </p>

      </div>


      {/* Statistics */}
      <div className="mt-8 grid gap-5 md:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Ready for Interview
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {readyCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Candidates ready
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Aptitude Passed
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            4
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Technical Passed
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            4
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Assessment Passed
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            3
          </p>

        </div>

      </div>


      {/* Recruitment Flow */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900">
          Interview Preparation Flow
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Candidates move through evaluation stages before entering the
          interview process.
        </p>


        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <div className="rounded-xl bg-indigo-50 p-5">

            <p className="text-sm font-bold text-indigo-600">
              01
            </p>

            <h3 className="mt-2 font-semibold text-slate-900">
              Aptitude Test
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Logical reasoning, quantitative aptitude and problem-solving.
            </p>

          </div>


          <div className="rounded-xl bg-indigo-50 p-5">

            <p className="text-sm font-bold text-indigo-600">
              02
            </p>

            <h3 className="mt-2 font-semibold text-slate-900">
              Technical Test
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Coding skills, technical knowledge and role-specific concepts.
            </p>

          </div>


          <div className="rounded-xl bg-indigo-50 p-5">

            <p className="text-sm font-bold text-indigo-600">
              03
            </p>

            <h3 className="mt-2 font-semibold text-slate-900">
              Assessment
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Practical assignment and candidate capability assessment.
            </p>

          </div>


          <div className="rounded-xl bg-green-50 p-5">

            <p className="text-sm font-bold text-green-600">
              04
            </p>

            <h3 className="mt-2 font-semibold text-slate-900">
              Interview
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Technical, HR, or combined interview with the recruiter.
            </p>

          </div>

        </div>

      </section>


      {/* Candidate Evaluation Status */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-xl font-semibold text-slate-900">
            Candidate Interview Readiness
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Check whether each candidate has completed the required
            evaluation stages.
          </p>

        </div>


        <div className="divide-y divide-slate-100">

          {candidates.map((candidate) => (

            <div
              key={candidate.name}
              className="p-6"
            >

              <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">

                <div className="min-w-56">

                  <h3 className="text-lg font-semibold text-slate-900">
                    {candidate.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {candidate.role}
                  </p>

                  <p className="mt-2 font-semibold text-indigo-600">
                    AI Match: {candidate.match}%
                  </p>

                </div>


                <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  <TestStatus
                    label="Aptitude Test"
                    status={candidate.aptitude}
                  />

                  <TestStatus
                    label="Technical Test"
                    status={candidate.technical}
                  />

                  <TestStatus
                    label="Assessment"
                    status={candidate.assessment}
                  />

                  <TestStatus
                    label="Communication"
                    status={candidate.communication}
                  />

                </div>


                <div>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                      candidate.ready
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {candidate.ready
                      ? "Ready for Interview"
                      : "Assessment Pending"}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* Interview Types */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900">
          Recommended Interview Types
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Interview stages that can be used for candidates who complete the
          evaluation process.
        </p>


        <div className="mt-6 grid gap-5 md:grid-cols-3">


          <div className="rounded-xl border border-slate-200 p-5">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              T
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Technical Round
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Evaluate coding ability, technical knowledge, system
              understanding and problem-solving skills.
            </p>

            <p className="mt-4 text-xs font-semibold text-indigo-600">
              Recommended: 45–60 minutes
            </p>

          </div>


          <div className="rounded-xl border border-slate-200 p-5">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
              H
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              HR Round
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Evaluate communication, motivation, cultural fit and
              professional behaviour.
            </p>

            <p className="mt-4 text-xs font-semibold text-green-600">
              Recommended: 30–45 minutes
            </p>

          </div>


          <div className="rounded-xl border border-slate-200 p-5">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              +
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              Technical + HR
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Combined interview covering both technical capability and
              behavioural evaluation.
            </p>

            <p className="mt-4 text-xs font-semibold text-purple-600">
              Recommended: 60–90 minutes
            </p>

          </div>

        </div>

      </section>


      {/* Assessment Information */}
      <section className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 p-6">

        <h2 className="text-xl font-semibold text-slate-900">
          Interview Readiness Summary
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-white p-5">

            <p className="text-xs text-slate-400">
              Next Action
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              Schedule Interviews
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Three candidates have completed all required assessments.
            </p>

          </div>


          <div className="rounded-xl bg-white p-5">

            <p className="text-xs text-slate-400">
              Pending Candidate
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              Arjun Patel
            </p>

            <p className="mt-1 text-sm text-yellow-600">
              Assessment still pending
            </p>

          </div>


          <div className="rounded-xl bg-white p-5">

            <p className="text-xs text-slate-400">
              Interview Pipeline
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              3 Candidates
            </p>

            <p className="mt-1 text-sm text-green-600">
              Ready to move to interview stage
            </p>

          </div>

        </div>

      </section>

    </DashboardLayout>
  );
}