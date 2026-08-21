"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

type Interview = {
  id: number;
  candidate: string;
  role: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  mode: string;
  interviewer: string;
  location: string;
  status: "Scheduled" | "Completed" | "Pending";
};

const interviews: Interview[] = [
  {
    id: 1,
    candidate: "Rahul Kumar",
    role: "AI/ML Engineer",
    type: "Technical Interview",
    date: "Aug 22, 2026",
    time: "10:30 AM",
    duration: "45 minutes",
    mode: "Online",
    interviewer: "Hiring Manager",
    location: "Google Meet",
    status: "Scheduled",
  },
  {
    id: 2,
    candidate: "Priya Sharma",
    role: "Python Developer",
    type: "HR Interview",
    date: "Aug 24, 2026",
    time: "2:00 PM",
    duration: "30 minutes",
    mode: "Online",
    interviewer: "HR Team",
    location: "Microsoft Teams",
    status: "Scheduled",
  },
  {
    id: 3,
    candidate: "Arun Kumar",
    role: "Backend Developer",
    type: "Technical Round",
    date: "Aug 18, 2026",
    time: "11:00 AM",
    duration: "60 minutes",
    mode: "Online",
    interviewer: "Technical Panel",
    location: "Google Meet",
    status: "Completed",
  },
];

function statusStyle(status: Interview["status"]) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-50 text-blue-700";
    case "Completed":
      return "bg-green-50 text-green-700";
    case "Pending":
      return "bg-yellow-50 text-yellow-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function RecruiterInterviewsPage() {
  const [selected, setSelected] = useState<Interview | null>(null);

  const scheduled = interviews.filter(
    (item) => item.status === "Scheduled"
  );

  const completed = interviews.filter(
    (item) => item.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Navbar />

      <main className="ml-64 pt-16">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                Recruiter
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Interview Management
              </h1>

              <p className="mt-2 text-slate-500">
                Schedule, review and manage candidate interviews.
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              + Schedule Interview
            </button>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Interviews
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {interviews.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Candidate interviews
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Upcoming
              </p>

              <p className="mt-2 text-3xl font-bold text-indigo-600">
                {scheduled.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Scheduled interviews
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {completed.length}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Interviews completed
              </p>
            </div>
          </div>

          {/* Interview list */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Candidate Interviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review and manage interviews for shortlisted candidates.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  className="p-6 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    {/* Candidate */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                        {interview.candidate.charAt(0)}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {interview.candidate}
                        </h3>

                        <p className="text-sm font-medium text-slate-700">
                          {interview.role}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {interview.type}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-slate-400">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {interview.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Time
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {interview.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Status
                        </p>

                        <span
                          className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                            interview.status
                          )}`}
                        >
                          {interview.status}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      type="button"
                      onClick={() => setSelected(interview)}
                      className="rounded-lg border border-indigo-200 px-5 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    <span>
                      Duration: {interview.duration}
                    </span>

                    <span>
                      Mode: {interview.mode}
                    </span>

                    <span>
                      Interviewer: {interview.interviewer}
                    </span>

                    <span>
                      Platform: {interview.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Interview Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selected.candidate} · {selected.role}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg px-3 py-1 text-2xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Candidate
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selected.candidate}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Role
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selected.role}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Interview Type
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selected.type}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Date & Time
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selected.date} · {selected.time}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Duration
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selected.duration}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Mode
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {selected.mode}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700"
              >
                Close
              </button>

              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Manage Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}