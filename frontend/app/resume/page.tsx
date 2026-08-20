"use client";

import {
  ChangeEvent,
  useState,
} from "react";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

export default function ResumePage() {
  const [resume, setResume] =
    useState<File | null>(null);

  const [message, setMessage] =
    useState("");

  const [analyzing, setAnalyzing] =
    useState(false);

  const [analyzed, setAnalyzed] =
    useState(false);

  const [score, setScore] =
    useState(0);

  function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (
      !validTypes.includes(file.type)
    ) {
      setMessage(
        "Please upload a PDF or DOCX file."
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setMessage(
        "Resume must be smaller than 5MB."
      );

      event.target.value = "";
      return;
    }

    setResume(file);
    setAnalyzed(false);
    setScore(0);

    setMessage(
      "✓ Resume selected successfully. You can now analyze it with AI."
    );
  }

  function removeResume() {
    setResume(null);
    setMessage("");
    setAnalyzed(false);
    setScore(0);
  }

  function analyzeResume() {
    if (!resume) {
      setMessage(
        "Please upload your resume first."
      );
      return;
    }

    setAnalyzing(true);
    setMessage(
      "🤖 AI is analyzing your resume..."
    );

    /*
     * Demo-ready AI analysis simulation.
     * Backend AI integration can be connected later.
     */
    setTimeout(() => {
      setScore(86);
      setAnalyzed(true);
      setAnalyzing(false);

      setMessage(
        "✓ AI resume analysis completed successfully."
      );
    }, 1500);
  }

  return (
    <CandidateDashboardLayout>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Resume & AI Analysis
        </h1>

        <p className="mt-2 text-slate-500">
          Upload your resume and use AI to
          understand your strengths, skill gaps
          and job readiness.
        </p>
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ===================================================
            UPLOAD SECTION
        =================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              📄 Resume Upload
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload your latest resume for job
              applications and AI analysis.
            </p>
          </div>

          {!resume ? (

            <label
              htmlFor="resume-file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-6 py-14 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl">
                📄
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Upload your resume
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                PDF or DOCX format
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Maximum file size: 5MB
              </p>

              <span className="mt-5 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Choose Resume
              </span>

              <input
                id="resume-file"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleUpload}
                className="hidden"
              />

            </label>

          ) : (

            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl">
                    📄
                  </div>

                  <div>

                    <p className="font-semibold text-slate-900">
                      {resume.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(
                        resume.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>

                    <p className="mt-1 text-xs font-semibold text-green-600">
                      ✓ Resume ready
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <label
                    htmlFor="replace-resume"
                    className="cursor-pointer rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                  >
                    Replace
                  </label>

                  <input
                    id="replace-resume"
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={removeResume}
                    className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* MESSAGE */}

          {message && (
            <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm font-medium text-slate-600">
              {message}
            </div>
          )}

          {/* ANALYZE BUTTON */}

          {resume && (
            <div className="mt-6 border-t border-slate-100 pt-6">

              <button
                type="button"
                onClick={analyzeResume}
                disabled={analyzing}
                className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60"
              >
                {analyzing
                  ? "🤖 Analyzing Resume..."
                  : "🤖 Analyze Resume with AI"}
              </button>

            </div>
          )}

        </div>

        {/* ===================================================
            RESUME STATUS
        =================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Resume Status
          </h2>

          <div className="mt-6 space-y-5">

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                STATUS
              </p>

              <p
                className={`mt-2 font-semibold ${
                  resume
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {resume
                  ? "Ready"
                  : "Not uploaded"}
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                AI ANALYSIS
              </p>

              <p
                className={`mt-2 font-semibold ${
                  analyzed
                    ? "text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                {analyzed
                  ? "Completed"
                  : "Not analyzed"}
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                FORMAT
              </p>

              <p className="mt-2 font-semibold text-slate-700">
                PDF / DOCX
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <p className="text-xs text-slate-400">
                MAXIMUM SIZE
              </p>

              <p className="mt-2 font-semibold text-slate-700">
                5 MB
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          AI ANALYSIS RESULTS
      ===================================================== */}

      {analyzed && (

        <div className="mt-6">

          {/* SCORE */}

          <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                    🤖
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      AI Resume Analysis
                    </h2>

                    <p className="text-sm text-slate-500">
                      Analysis completed successfully
                    </p>
                  </div>

                </div>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-500">
                  Your resume has been analyzed based
                  on skills, experience, education,
                  technical keywords and overall
                  job-readiness.
                </p>

              </div>

              {/* SCORE */}

              <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border-8 border-indigo-100 bg-indigo-50">

                <span className="text-4xl font-bold text-indigo-600">
                  {score}%
                </span>

                <span className="text-xs font-semibold text-slate-500">
                  Resume Score
                </span>

              </div>

            </div>

          </div>

          {/* ANALYSIS CARDS */}

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            {/* STRENGTHS */}

            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

              <div className="flex items-center gap-3">

                <div className="text-2xl">
                  ✅
                </div>

                <h3 className="font-bold text-green-800">
                  Strengths
                </h3>

              </div>

              <ul className="mt-5 space-y-3 text-sm text-green-700">

                <li>
                  ✓ Strong technical skill set
                </li>

                <li>
                  ✓ AI & ML knowledge
                </li>

                <li>
                  ✓ Python development experience
                </li>

                <li>
                  ✓ SQL and backend skills
                </li>

                <li>
                  ✓ Relevant academic background
                </li>

              </ul>

            </div>

            {/* SKILL GAPS */}

            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

              <div className="flex items-center gap-3">

                <div className="text-2xl">
                  ⚠️
                </div>

                <h3 className="font-bold text-yellow-800">
                  Skill Gaps
                </h3>

              </div>

              <ul className="mt-5 space-y-3 text-sm text-yellow-700">

                <li>
                  • Cloud deployment
                </li>

                <li>
                  • Advanced system design
                </li>

                <li>
                  • Production ML pipelines
                </li>

                <li>
                  • Testing and CI/CD
                </li>

              </ul>

            </div>

            {/* RECOMMENDATIONS */}

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">

              <div className="flex items-center gap-3">

                <div className="text-2xl">
                  💡
                </div>

                <h3 className="font-bold text-indigo-800">
                  Recommendations
                </h3>

              </div>

              <ul className="mt-5 space-y-3 text-sm text-indigo-700">

                <li>
                  • Add measurable project results
                </li>

                <li>
                  • Highlight internship experience
                </li>

                <li>
                  • Add relevant certifications
                </li>

                <li>
                  • Customize resume for each job
                </li>

              </ul>

            </div>

          </div>

          {/* JOB MATCH */}

          <div className="mt-6 rounded-2xl bg-indigo-600 p-7 text-white shadow-sm">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  🎯 AI Job Match
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                  Your profile appears well suited
                  for AI/ML, Python and software
                  development opportunities.
                </p>

              </div>

              <a
                href="/jobs"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                Find Matching Jobs →
              </a>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          BEFORE ANALYSIS CTA
      ===================================================== */}

      {!analyzed && (

        <div className="mt-6 rounded-2xl bg-indigo-600 p-7 text-white shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-xl font-bold">
                🤖 AI Resume Analysis
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                Upload your resume above and let
                HireMind AI evaluate your profile,
                identify skill gaps and provide
                personalized recommendations.
              </p>

            </div>

            <button
              type="button"
              onClick={() => {
                if (!resume) {
                  document
                    .getElementById(
                      "resume-file"
                    )
                    ?.click();

                  return;
                }

                analyzeResume();
              }}
              disabled={analyzing}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-60"
            >
              {resume
                ? "Analyze Resume →"
                : "Upload Resume →"}
            </button>

          </div>

        </div>
      )}

    </CandidateDashboardLayout>
  );
}