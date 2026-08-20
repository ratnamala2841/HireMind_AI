"use client";

import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

const interviews = [
  {
    id: 1,
    role: "AI/ML Intern",
    company: "TechNova",
    type: "Technical Interview",
    date: "August 25, 2026",
    time: "10:30 AM",
    mode: "Online",
    interviewer: "Technical Hiring Team",
    status: "Upcoming",
    meeting: "Google Meet",
  },
  {
    id: 2,
    role: "Python Developer",
    company: "DataSphere",
    type: "HR Interview",
    date: "August 28, 2026",
    time: "2:00 PM",
    mode: "Online",
    interviewer: "HR Team",
    status: "Scheduled",
    meeting: "Microsoft Teams",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Upcoming":
      return "bg-green-50 text-green-700 border-green-200";

    case "Scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200";

    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

export default function CandidateInterviewsPage() {
  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          My Interviews
        </h1>

        <p className="mt-2 text-slate-500">
          View your upcoming interviews, meeting details and interview
          schedule.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Upcoming Interviews
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            2
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Applications in Interview
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            2
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Next Interview
          </p>

          <p className="mt-2 text-lg font-bold text-slate-900">
            Aug 25
          </p>
        </div>
      </div>

      {/* Interview List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Interview Schedule
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your scheduled interviews and recruitment meetings.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                {/* Interview Information */}
                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                    📅
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {interview.type}
                      </h3>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          interview.status
                        )}`}
                      >
                        {interview.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-medium text-indigo-600">
                      {interview.role}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {interview.company}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          DATE
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {interview.date}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          TIME
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {interview.time}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          MODE
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {interview.mode}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          INTERVIEWER
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {interview.interviewer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col gap-3 lg:w-44">

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `Interview: ${interview.type}\n\nDate: ${interview.date}\nTime: ${interview.time}\nMode: ${interview.mode}\nPlatform: ${interview.meeting}`
                      )
                    }
                    className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `${interview.meeting} meeting link will be available shortly before the interview.`
                      )
                    }
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                  >
                    Join Interview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preparation Card */}
      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl">
            💡
          </div>

          <div>
            <h3 className="font-semibold text-indigo-900">
              Interview Preparation
            </h3>

            <p className="mt-1 text-sm leading-6 text-indigo-700">
              Review the job description, prepare your technical questions,
              test your camera and microphone, and join the interview a few
              minutes early.
            </p>
          </div>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}