"use client";

import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

const candidates = [
  {
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    company: "TechNova",
    match: 92,
    experience: "2.5 Years",
    status: "Ready for Interview",
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    company: "DataSphere",
    match: 89,
    experience: "2 Years",
    status: "Ready for Interview",
    skills: ["Python", "TensorFlow", "Machine Learning"],
  },
  {
    name: "Arjun Patel",
    role: "Backend Developer",
    company: "CloudWorks",
    match: 86,
    experience: "1.8 Years",
    status: "Assessment Pending",
    skills: ["Python", "FastAPI", "PostgreSQL"],
  },
  {
    name: "Sneha Reddy",
    role: "Frontend Developer",
    company: "AI Labs",
    match: 84,
    experience: "1.5 Years",
    status: "Ready for Interview",
    skills: ["React", "Next.js", "TypeScript"],
  },
];

export default function TotalShortlistedPage() {
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
          Total Shortlisted
        </h1>

        <p className="mt-2 text-slate-500">
          Detailed overview of all candidates selected for further
          evaluation.
        </p>

      </div>


      {/* Overview Cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Shortlisted
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            4
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Candidates selected
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Highest AI Match
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            92%
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Rahul Kumar
          </p>

        </div>


        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Ready for Interview
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            3
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Evaluation completed
          </p>

        </div>

      </div>


      {/* Details */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-xl font-semibold text-slate-900">
            Shortlisted Candidate Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review candidate information, AI match scores and recruitment
            status.
          </p>

        </div>


        <div className="divide-y divide-slate-100">

          {candidates.map((candidate) => (

            <div
              key={candidate.name}
              className="p-6 transition hover:bg-slate-50"
            >

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                    {candidate.name.charAt(0)}
                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-slate-900">
                      {candidate.name}
                    </h3>

                    <p className="text-sm font-medium text-slate-700">
                      {candidate.role}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {candidate.company}
                    </p>

                  </div>

                </div>


                <div className="grid gap-5 sm:grid-cols-3">

                  <div>

                    <p className="text-xs text-slate-400">
                      AI Match
                    </p>

                    <p className="mt-1 text-xl font-bold text-indigo-600">
                      {candidate.match}%
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
                      Experience
                    </p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {candidate.experience}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        candidate.status === "Ready for Interview"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {candidate.status}
                    </span>

                  </div>

                </div>

              </div>


              <div className="mt-5 flex flex-wrap gap-2">

                {candidate.skills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}