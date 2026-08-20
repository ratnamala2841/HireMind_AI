"use client";

import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

const candidates = [
  { name: "Rahul Kumar", score: 92 },
  { name: "Priya Sharma", score: 89 },
  { name: "Arjun Patel", score: 86 },
  { name: "Sneha Reddy", score: 84 },
];

export default function MatchAnalyticsPage() {
  const average = Math.round(
    candidates.reduce(
      (sum, candidate) => sum + candidate.score,
      0
    ) / candidates.length
  );

  const excellent = candidates.filter(
    (candidate) => candidate.score >= 90
  ).length;

  const strong = candidates.filter(
    (candidate) => candidate.score >= 80 && candidate.score < 90
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
          Average Match Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Visual analysis of AI-generated candidate-job matching scores.
        </p>

      </div>


      {/* Statistics */}
      <div className="mt-8 grid gap-5 md:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Average Match
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {average}%
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Highest Match
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            92%
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Rahul Kumar
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Excellent Match
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {excellent}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            90% and above
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Strong Match
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {strong}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            80% - 89%
          </p>

        </div>

      </div>


      {/* Graph + Pie Chart */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">


        {/* BAR GRAPH */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            Candidate Match Scores
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            AI compatibility score for each shortlisted candidate.
          </p>


          <div className="mt-8 space-y-7">

            {candidates.map((candidate) => (

              <div key={candidate.name}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-slate-700">
                    {candidate.name}
                  </span>

                  <span className="font-bold text-indigo-600">
                    {candidate.score}%
                  </span>

                </div>


                <div className="h-5 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${candidate.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* PIE CHART */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            Match Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Distribution of shortlisted candidates by AI match level.
          </p>


          <div className="mt-8 flex flex-col items-center">

            <div
              className="h-56 w-56 rounded-full"
              style={{
                background:
                  "conic-gradient(#22c55e 0% 25%, #4f46e5 25% 100%)",
              }}
            />

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <span className="h-4 w-4 rounded-full bg-green-500" />

                <span className="text-sm text-slate-600">
                  Excellent Match — {excellent} candidate
                </span>

              </div>


              <div className="flex items-center gap-3">

                <span className="h-4 w-4 rounded-full bg-indigo-600" />

                <span className="text-sm text-slate-600">
                  Strong Match — {strong} candidates
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>


      {/* Candidate comparison */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-xl font-semibold text-slate-900">
            Candidate Match Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            AI ranking of shortlisted candidates based on job compatibility.
          </p>

        </div>


        <div className="divide-y divide-slate-100">

          {candidates.map((candidate, index) => (

            <div
              key={candidate.name}
              className="flex items-center justify-between p-5"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-600">
                  #{index + 1}
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    {candidate.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    AI candidate-job compatibility
                  </p>

                </div>

              </div>


              <div className="text-right">

                <p className="text-xl font-bold text-indigo-600">
                  {candidate.score}%
                </p>

                <p className="text-xs text-slate-400">
                  Match Score
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* AI Insights */}
      <section className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 p-6">

        <h2 className="text-xl font-semibold text-slate-900">
          AI Matching Insights
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          The shortlisted pool shows strong overall alignment with the
          available job requirements.
        </p>


        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-white p-5">

            <p className="text-xs text-slate-400">
              Top Candidate
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              Rahul Kumar
            </p>

            <p className="mt-1 text-sm text-green-600">
              92% match
            </p>

          </div>


          <div className="rounded-xl bg-white p-5">

            <p className="text-xs text-slate-400">
              Average Match
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {average}%
            </p>

            <p className="mt-1 text-sm text-indigo-600">
              Strong overall alignment
            </p>

          </div>


          <div className="rounded-xl bg-white p-5">

            <p className="text-xs text-slate-400">
              Match Quality
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              High
            </p>

            <p className="mt-1 text-sm text-green-600">
              All shortlisted candidates are above 80%
            </p>

          </div>

        </div>

      </section>

    </DashboardLayout>
  );
}