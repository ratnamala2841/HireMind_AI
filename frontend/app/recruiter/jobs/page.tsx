import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";

const jobs = [
  {
    title: "AI/ML Intern",
    department: "Artificial Intelligence",
    location: "Chennai, India",
    type: "Internship",
    applicants: 42,
    shortlisted: 8,
    status: "Active",
  },
  {
    title: "Python Backend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full Time",
    applicants: 67,
    shortlisted: 12,
    status: "Active",
  },
  {
    title: "Generative AI Engineer",
    department: "AI Research",
    location: "Bangalore, India",
    type: "Full Time",
    applicants: 31,
    shortlisted: 5,
    status: "Draft",
  },
];

export default function RecruiterJobsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Recruiter Jobs
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your job postings and track candidates.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/create"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + Create Job
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Jobs</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">12</h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active Jobs</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">8</h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Applicants</p>
          <h2 className="mt-2 text-3xl font-bold text-indigo-600">140</h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Your Job Postings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor your current recruitment openings.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                    {job.title.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {job.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {job.department}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {job.location} • {job.type}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Applicants</p>
                    <p className="mt-1 font-bold text-slate-900">
                      {job.applicants}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-slate-400">Shortlisted</p>
                    <p className="mt-1 font-bold text-indigo-600">
                      {job.shortlisted}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                      job.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {job.status}
                  </span>

                  <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}