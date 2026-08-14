import DashboardLayout from "@/components/layout/DashboardLayout";

const stats = [
  {
    title: "Active Jobs",
    value: "8",
    change: "+2 this month",
    icon: "💼",
  },
  {
    title: "Total Candidates",
    value: "248",
    change: "+18 this week",
    icon: "👥",
  },
  {
    title: "Applications",
    value: "1,284",
    change: "+12.5%",
    icon: "📄",
  },
  {
    title: "Interviews",
    value: "36",
    change: "+6 this week",
    icon: "🎯",
  },
];

const recentJobs = [
  {
    title: "AI / ML Intern",
    department: "Artificial Intelligence",
    applications: 86,
    shortlisted: 14,
    status: "Active",
  },
  {
    title: "Python Developer",
    department: "Engineering",
    applications: 64,
    shortlisted: 9,
    status: "Active",
  },
  {
    title: "Data Science Intern",
    department: "Data",
    applications: 51,
    shortlisted: 7,
    status: "Active",
  },
  {
    title: "Backend Developer",
    department: "Engineering",
    applications: 43,
    shortlisted: 6,
    status: "Draft",
  },
];

export default function RecruiterDashboard() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Recruiter Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your hiring pipeline and discover the best candidates.
          </p>
        </div>

        <a
          href="/recruiter/jobs/create"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + Create Job
        </a>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="text-3xl">{stat.icon}</div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                {stat.change}
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Jobs */}
        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Jobs
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Overview of your latest job postings.
              </p>
            </div>

            <a
              href="/recruiter/jobs"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </a>
          </div>

          <div className="divide-y divide-slate-100">
            {recentJobs.map((job) => (
              <div
                key={job.title}
                className="p-6 transition hover:bg-slate-50"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <p className="text-slate-400">Applications</p>
                      <p className="font-bold text-slate-900">
                        {job.applications}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Shortlisted</p>
                      <p className="font-bold text-indigo-600">
                        {job.shortlisted}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        job.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="rounded-xl bg-indigo-600 p-6 text-white">
          <div className="text-4xl">🤖</div>

          <h2 className="mt-5 text-xl font-bold">
            AI Recruitment Insight
          </h2>

          <p className="mt-3 text-sm leading-6 text-indigo-100">
            Your AI matching system has identified 18 high-potential
            candidates across your active job postings.
          </p>

          <div className="mt-6 rounded-lg bg-white/10 p-4">
            <p className="text-sm text-indigo-100">
              Top Match
            </p>

            <p className="mt-1 font-semibold">
              Python Developer
            </p>

            <p className="mt-1 text-sm text-indigo-200">
              94% average candidate match
            </p>
          </div>

          <a
            href="/recruiter/jobs"
            className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Review Candidates
          </a>
        </div>
      </div>

      {/* Hiring activity */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Hiring Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Candidate activity across your recruitment pipeline.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Activity
            label="New Applications"
            value="128"
            description="This week"
          />

          <Activity
            label="AI Shortlisted"
            value="32"
            description="This week"
          />

          <Activity
            label="Interviews"
            value="14"
            description="Scheduled"
          />

          <Activity
            label="Offers"
            value="5"
            description="In progress"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

function Activity({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}