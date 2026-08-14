import DashboardLayout from "@/components/layout/DashboardLayout";

const stats = [
  {
    title: "Applications",
    value: "12",
    icon: "📄",
    description: "Total applications",
  },
  {
    title: "Shortlisted",
    value: "4",
    icon: "⭐",
    description: "Applications shortlisted",
  },
  {
    title: "Interviews",
    value: "2",
    icon: "🎯",
    description: "Upcoming interviews",
  },
  {
    title: "Profile Score",
    value: "82%",
    icon: "📈",
    description: "Profile completeness",
  },
];

const applications = [
  {
    company: "TechNova",
    role: "AI/ML Intern",
    status: "Shortlisted",
    score: "91%",
  },
  {
    company: "DataSphere",
    role: "Python Developer",
    status: "Interview",
    score: "87%",
  },
  {
    company: "CloudWorks",
    role: "Backend Intern",
    status: "Applied",
    score: "76%",
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Candidate Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Track your applications and discover new opportunities.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="text-3xl">{stat.icon}</div>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                +12%
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              {stat.title}
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {stat.value}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Recent Applications
              </h2>

              <p className="text-sm text-slate-500">
                Track your latest job applications
              </p>
            </div>

            <a
              href="/applications"
              className="text-sm font-semibold text-indigo-600"
            >
              View all
            </a>
          </div>

          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.company}
                className="flex items-center justify-between rounded-lg border border-slate-100 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 font-bold text-indigo-600">
                    {application.company.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {application.role}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {application.company}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                    {application.status}
                  </span>

                  <p className="mt-2 text-sm font-semibold">
                    AI Match: {application.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-indigo-600 p-6 text-white">
          <div className="text-4xl">🤖</div>

          <h2 className="mt-5 text-xl font-bold">
            HireMind AI
          </h2>

          <p className="mt-3 text-sm leading-6 text-indigo-100">
            Improve your chances of getting hired. Complete your
            profile, upload your resume and discover jobs that match
            your skills.
          </p>

          <a
            href="/profile"
            className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600"
          >
            Complete Profile
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}