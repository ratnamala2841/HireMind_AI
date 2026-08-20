"use client";

import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";
import { useState } from "react";

type Assessment = {
  id: number;
  title: string;
  company: string;
  description: string;
  questions: number;
  duration: string;
  difficulty: string;
  status: "Available" | "Completed";
};

const assessments: Assessment[] = [
  {
    id: 1,
    title: "Python Technical Assessment",
    company: "TechNova",
    description:
      "Test your Python programming, problem-solving and coding fundamentals.",
    questions: 20,
    duration: "30 minutes",
    difficulty: "Intermediate",
    status: "Available",
  },
  {
    id: 2,
    title: "AI & Machine Learning Assessment",
    company: "HireMind AI",
    description:
      "Evaluate your knowledge of machine learning, AI concepts and model development.",
    questions: 15,
    duration: "25 minutes",
    difficulty: "Intermediate",
    status: "Available",
  },
  {
    id: 3,
    title: "SQL & Database Assessment",
    company: "TechNova",
    description:
      "Test your SQL queries, relational database and data handling skills.",
    questions: 15,
    duration: "20 minutes",
    difficulty: "Beginner",
    status: "Completed",
  },
];

export default function AssessmentsPage() {
  const [selected, setSelected] = useState<Assessment | null>(null);

  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Assessments
        </h1>

        <p className="mt-2 text-slate-500">
          Complete assessments assigned to you and showcase your technical
          skills to recruiters.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Available
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            2
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            1
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Assessments
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            3
          </p>
        </div>
      </div>

      {/* Assessments */}
      <div className="space-y-5">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Information */}
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                  💻
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-900">
                      {assessment.title}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        assessment.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {assessment.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-indigo-600">
                    {assessment.company}
                  </p>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    {assessment.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    <span className="rounded-lg bg-slate-100 px-3 py-2 text-slate-600">
                      📝 {assessment.questions} Questions
                    </span>

                    <span className="rounded-lg bg-slate-100 px-3 py-2 text-slate-600">
                      ⏱️ {assessment.duration}
                    </span>

                    <span className="rounded-lg bg-slate-100 px-3 py-2 text-slate-600">
                      📊 {assessment.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0">
                {assessment.status === "Available" ? (
                  <button
                    type="button"
                    onClick={() => setSelected(assessment)}
                    className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Start Assessment →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelected(assessment)}
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    View Result
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  Candidate Assessment
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {selected.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-indigo-50 p-5">
              {selected.status === "Completed" ? (
                <>
                  <p className="text-sm font-semibold text-indigo-700">
                    Assessment Completed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    82%
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Good performance. Your result has been shared with the
                    recruiter.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-indigo-700">
                    Ready to begin?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This demo assessment contains{" "}
                    <strong>{selected.questions} questions</strong> and has a
                    time limit of{" "}
                    <strong>{selected.duration}</strong>.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>

              {selected.status === "Available" && (
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      "Assessment demo started successfully!"
                    );
                    setSelected(null);
                  }}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Begin Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}