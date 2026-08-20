"use client";

import Link from "next/link";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

const hiringFunnel = [
  { label: "Applications", value: 248, width: "w-full", color: "bg-indigo-500" },
  { label: "Shortlisted", value: 42, width: "w-[65%]", color: "bg-indigo-500" },
  { label: "Interviews", value: 25, width: "w-[45%]", color: "bg-blue-500" },
  { label: "Selected", value: 8, width: "w-[25%]", color: "bg-green-500" },
];

const jobPerformance = [
  {
    role: "AI/ML Engineer",
    applications: 64,
    shortlisted: 14,
    interviews: 9,
    selected: 3,
    match: "91%",
  },
  {
    role: "Full Stack Developer",
    applications: 58,
    shortlisted: 12,
    interviews: 7,
    selected: 2,
    match: "88%",
  },
  {
    role: "Backend Developer",
    applications: 47,
    shortlisted: 8,
    interviews: 5,
    selected: 2,
    match: "86%",
  },
  {
    role: "Frontend Developer",
    applications: 42,
    shortlisted: 5,
    interviews: 3,
    selected: 1,
    match: "84%",
  },
];

const monthlyHiring = [
  { month: "March", value: 42 },
  { month: "April", value: 55 },
  { month: "May", value: 68 },
  { month: "June", value: 74 },
  { month: "July", value: 86 },
  { month: "August", value: 92 },
];

export default function HRAnalyticsPage() {
  return (
    <HRDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Hiring Manager
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Recruitment Analytics
            </h1>

            <p className="mt-2 text-slate-500">
              Monitor hiring performance, candidate conversion, and recruitment
              trends.
            </p>
          </div>

          <Link
            href="/hr"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Applications"
          value="248"
          description="+18% this month"
        />

        <AnalyticsCard
          title="Shortlist Rate"
          value="16.9%"
          description="42 shortlisted"
        />

        <AnalyticsCard
          title="Interview Rate"
          value="59.5%"
          description="25 interviews"
        />

        <AnalyticsCard
          title="Hiring Conversion"
          value="3.2%"
          description="8 candidates selected"
          green
        />
      </section>

      {/* Funnel + AI Intelligence */}
      <section className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Hiring Funnel */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Hiring Funnel
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Candidate movement through the recruitment pipeline.
          </p>

          <div className="mt-7 space-y-6">
            {hiringFunnel.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    {item.label}
                  </span>

                  <span className="font-bold text-slate-900">
                    {item.value}
                  </span>
                </div>

                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className={`h-3 rounded-full ${item.width} ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recruitment Intelligence */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            AI Recruitment Intelligence
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Insights generated from candidate and hiring data.
          </p>

          <div className="mt-6 space-y-4">
            <Insight
              title="Strong Candidate Quality"
              value="87%"
              text="Average AI candidate match across active roles."
            />

            <Insight
              title="Best Performing Role"
              value="AI/ML Engineer"
              text="Highest average candidate relevance."
            />

            <Insight
              title="Hiring Efficiency"
              value="+18%"
              text="Application volume increased compared with last month."
            />

            <Insight
              title="Interview Success"
              value="32%"
              text="Interviewed candidates progressing toward selection."
            />
          </div>
        </div>
      </section>

      {/* Monthly Trend */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Hiring Activity Trend
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recruitment activity over the last six months.
          </p>
        </div>

        <div className="grid grid-cols-6 items-end gap-3">
          {monthlyHiring.map((item) => (
            <div
              key={item.month}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs font-semibold text-slate-600">
                {item.value}
              </span>

              <div className="flex h-40 w-full items-end rounded-lg bg-slate-50">
                <div
                  className="w-full rounded-lg bg-indigo-500"
                  style={{
                    height: `${(item.value / 100) * 100}%`,
                  }}
                />
              </div>

              <span className="text-xs text-slate-400">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Job Performance */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Job Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare recruitment performance across active positions.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                  Role
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                  Applications
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                  Shortlisted
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                  Interviews
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                  Selected
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-400">
                  AI Match
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {jobPerformance.map((job) => (
                <tr
                  key={job.role}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-900">
                      {job.role}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    {job.applications}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    {job.shortlisted}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    {job.interviews}
                  </td>

                  <td className="px-6 py-5 text-sm font-bold text-green-600">
                    {job.selected}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      {job.match}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Action */}
      <section className="mt-6 rounded-xl bg-indigo-600 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-200">
              Hiring Manager Insight
            </p>

            <h2 className="mt-1 text-xl font-bold">
              AI is helping improve candidate screening efficiency.
            </h2>

            <p className="mt-2 text-sm text-indigo-100">
              Use candidate match scores and interview feedback together to
              make better hiring decisions.
            </p>
          </div>

          <Link
            href="/hr/candidates"
            className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Review Candidates
          </Link>
        </div>
      </section>
    </HRDashboardLayout>
  );
}

function AnalyticsCard({
  title,
  value,
  description,
  green = false,
}: {
  title: string;
  value: string;
  description: string;
  green?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${
          green ? "text-green-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function Insight({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>

      <span className="shrink-0 text-lg font-bold text-indigo-600">
        {value}
      </span>
    </div>
  );
}