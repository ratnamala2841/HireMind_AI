"use client";

import Link from "next/link";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

const strengths = [
  "Strong technical skill set",
  "AI & ML knowledge",
  "Python development experience",
  "SQL and backend skills",
  "Relevant academic background",
];

const skillGaps = [
  "Cloud deployment",
  "Advanced system design",
  "Production ML pipelines",
  "Testing and CI/CD",
];

const recommendations = [
  "Add measurable project results",
  "Highlight internship experience",
  "Add relevant certifications",
  "Customize resume for each job",
];

const matchedJobs = [
  {
    title: "AI/ML Intern",
    company: "TechNova",
    match: "92%",
    location: "Chennai",
  },
  {
    title: "Machine Learning Intern",
    company: "AI Labs",
    match: "88%",
    location: "Bangalore",
  },
  {
    title: "Python AI Developer Intern",
    company: "CloudWorks",
    match: "84%",
    location: "Remote",
  },
];

export default function AIResumeAnalysisPage() {
  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/resume"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Resume
        </Link>

        <div className="mt-5">
          <h1 className="text-3xl font-bold text-slate-900">
            AI Resume Analysis
          </h1>

          <p className="mt-2 text-slate-500">
            Get AI-powered insights into your resume,
            skills and job readiness.
          </p>
        </div>
      </div>

      {/* Resume Score */}
      <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
              🤖
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                AI Resume Analysis
              </h2>

              <p className="mt-1 text-sm font-medium text-green-600">
                ✓ Analysis completed successfully
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
                Your resume has been analyzed based on
                skills, experience, education, technical
                keywords and overall job-readiness.
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border-[10px] border-indigo-100 bg-white">
            <span className="text-4xl font-bold text-indigo-600">
              86%
            </span>

            <span className="text-sm font-semibold text-slate-500">
              Resume Score
            </span>
          </div>
        </div>
      </section>

      {/* Analysis Cards */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        {/* Strengths */}
        <section className="rounded-2xl border border-green-200 bg-green-50 p-7">
          <div className="flex items-center gap-3">
            <div className="text-3xl">✅</div>

            <h2 className="text-xl font-bold text-green-800">
              Strengths
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {strengths.map((item) => (
              <div
                key={item}
                className="text-sm leading-6 text-green-700"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>

        {/* Skill Gaps */}
        <section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-7">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚠️</div>

            <h2 className="text-xl font-bold text-yellow-800">
              Skill Gaps
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {skillGaps.map((item) => (
              <div
                key={item}
                className="text-sm leading-6 text-yellow-700"
              >
                • {item}
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-7">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💡</div>

            <h2 className="text-xl font-bold text-indigo-800">
              Recommendations
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {recommendations.map((item) => (
              <div
                key={item}
                className="text-sm leading-6 text-indigo-700"
              >
                • {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* AI Job Match */}
      <section className="mt-6 rounded-2xl bg-indigo-600 p-7 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-200">
              AI JOB MATCH
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Jobs that match your resume
            </h2>

            <p className="mt-2 text-sm text-indigo-100">
              Based on your skills, education and
              technical profile.
            </p>
          </div>

          <Link
            href="/jobs"
            className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Find More Jobs →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {matchedJobs.map((job) => (
            <div
              key={job.title}
              className="rounded-xl bg-white p-5 text-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.company}
                  </p>
                </div>

                <span className="rounded-lg bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
                  {job.match}
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                📍 {job.location}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Actions */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Want to improve your score?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your resume and run the analysis
              again.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/resume"
              className="rounded-lg border border-indigo-600 px-5 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Update Resume
            </Link>

            <Link
              href="/profile"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </section>
    </CandidateDashboardLayout>
  );
}