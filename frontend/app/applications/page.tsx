import DashboardLayout from "@/components/layout/DashboardLayout";

const applications = [
  {
    company: "TechNova",
    role: "AI/ML Intern",
    applied: "Aug 12, 2026",
    status: "Shortlisted",
    score: "91%",
  },
  {
    company: "DataSphere",
    role: "Python Developer",
    applied: "Aug 10, 2026",
    status: "Interview",
    score: "87%",
  },
  {
    company: "CloudWorks",
    role: "Backend Intern",
    applied: "Aug 8, 2026",
    status: "Applied",
    score: "76%",
  },
  {
    company: "AI Labs",
    role: "Generative AI Intern",
    applied: "Aug 5, 2026",
    status: "Under Review",
    score: "84%",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Shortlisted":
      return "bg-green-50 text-green-600";

    case "Interview":
      return "bg-blue-50 text-blue-600";

    case "Under Review":
      return "bg-yellow-50 text-yellow-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function ApplicationsPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          My Applications
        </h1>

        <p className="mt-2 text-slate-500">
          Track the status of all your job applications.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Applications
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            12
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Shortlisted
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            4
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Interviews
          </p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-600">
            2
          </h2>
        </div>
      </div>

      {/* Applications */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Applications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest job applications and their current status.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {applications.map((application) => (
            <div
              key={`${application.company}-${application.role}`}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                
                {/* Company */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                    {application.company.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {application.role}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {application.company}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Applied on {application.applied}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-xs text-slate-400">
                      AI Match
                    </p>

                    <p className="mt-1 font-bold text-indigo-600">
                      {application.score}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${getStatusStyle(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>

                  <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600">
                    View
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