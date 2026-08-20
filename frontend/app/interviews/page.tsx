"use client";

import Link from "next/link";
import { useState } from "react";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

type Interview = {
  id: number;
  role: string;
  company: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  mode: string;
  interviewer: string;
  location: string;
  status: "Scheduled" | "Completed" | "Pending";
  meetingLink?: string;
  notes: string;
};

const interviews: Interview[] = [
  {
    id: 1,
    role: "AI/ML Intern",
    company: "TechNova",
    type: "Technical Interview",
    date: "Aug 22, 2026",
    time: "10:30 AM",
    duration: "45 minutes",
    mode: "Online",
    interviewer: "Rahul Mehta",
    location: "Google Meet",
    status: "Scheduled",
    meetingLink: "https://meet.google.com/",
    notes:
      "Please be prepared to discuss your Python, Machine Learning, SQL and Generative AI projects. Keep your resume and project details ready.",
  },
  {
    id: 2,
    role: "Python Developer",
    company: "DataSphere",
    type: "HR Interview",
    date: "Aug 24, 2026",
    time: "2:00 PM",
    duration: "30 minutes",
    mode: "Online",
    interviewer: "Anita Sharma",
    location: "Microsoft Teams",
    status: "Scheduled",
    meetingLink: "https://teams.microsoft.com/",
    notes:
      "The HR discussion will cover your background, career goals, communication skills and role expectations.",
  },
  {
    id: 3,
    role: "Backend Intern",
    company: "CloudWorks",
    type: "Technical Round",
    date: "Aug 18, 2026",
    time: "11:00 AM",
    duration: "60 minutes",
    mode: "Online",
    interviewer: "Vikram Rao",
    location: "Google Meet",
    status: "Completed",
    notes:
      "Technical round completed successfully. Evaluation is currently being reviewed by the hiring team.",
  },
  {
    id: 4,
    role: "Generative AI Intern",
    company: "AI Labs",
    type: "Final Interview",
    date: "Aug 27, 2026",
    time: "4:00 PM",
    duration: "45 minutes",
    mode: "Online",
    interviewer: "Priya Menon",
    location: "Google Meet",
    status: "Pending",
    meetingLink: "https://meet.google.com/",
    notes:
      "Final interview is pending confirmation. You will receive an updated notification once the interview is confirmed.",
  },
];

function getStatusStyle(status: Interview["status"]) {
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

function InterviewDetails({
  interview,
}: {
  interview: Interview;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-slate-50 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
            {interview.company.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {interview.role}
            </h2>

            <p className="mt-1 font-medium text-slate-700">
              {interview.company}
            </p>

            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                interview.status
              )}`}
            >
              {interview.status}
            </span>
          </div>
        </div>
      </div>

      {/* Interview Information */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Interview Information
        </h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <InfoBox
            label="Interview Type"
            value={interview.type}
          />

          <InfoBox
            label="Date"
            value={interview.date}
          />

          <InfoBox
            label="Time"
            value={interview.time}
          />

          <InfoBox
            label="Duration"
            value={interview.duration}
          />

          <InfoBox
            label="Mode"
            value={interview.mode}
          />

          <InfoBox
            label="Interviewer"
            value={interview.interviewer}
          />

          <InfoBox
            label="Location / Platform"
            value={interview.location}
          />

          <InfoBox
            label="Company"
            value={interview.company}
          />
        </div>
      </div>

      {/* Meeting */}
      {interview.meetingLink &&
        interview.status === "Scheduled" && (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
              Online Interview
            </p>

            <h3 className="mt-1 text-lg font-semibold text-indigo-900">
              Join your interview
            </h3>

            <p className="mt-2 text-sm leading-6 text-indigo-700">
              Join the interview using the meeting link at the scheduled
              time. Make sure your microphone and camera are working.
            </p>

            <a
              href={interview.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Join Interview
            </a>
          </div>
        )}

      {/* Instructions */}
      <div className="rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900">
          Interview Instructions
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {interview.notes}
        </p>
      </div>

      {/* Candidate Actions */}
      <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
        <Link
          href="/applications"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
        >
          View Application
        </Link>

        <Link
          href="/profile"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
        >
          View Profile
        </Link>

        <Link
          href="/dashboard"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function InterviewCard({
  interview,
  onView,
}: {
  interview: Interview;
  onView: () => void;
}) {
  return (
    <div className="p-6 transition hover:bg-slate-50">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Interview */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
            {interview.company.charAt(0)}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {interview.role}
            </h3>

            <p className="text-sm font-medium text-slate-700">
              {interview.company}
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
              className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
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
          onClick={onView}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          View Interview
        </button>
      </div>

      {/* Extra details */}
      <div className="mt-5 flex flex-wrap gap-5 border-t border-slate-100 pt-4 text-sm">
        <span className="text-slate-500">
          Location: {interview.location}
        </span>

        <span className="text-slate-500">
          Duration: {interview.duration}
        </span>

        <span className="text-slate-500">
          Interviewer: {interview.interviewer}
        </span>
      </div>
    </div>
  );
}

export default function CandidateInterviewsPage() {
  const [selectedInterview, setSelectedInterview] =
    useState<Interview | null>(null);

  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "Scheduled"
  );

  const completedInterviews = interviews.filter(
    (interview) => interview.status === "Completed"
  );

  const pendingInterviews = interviews.filter(
    (interview) => interview.status === "Pending"
  );

  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Interviews
            </h1>

            <p className="mt-2 text-slate-500">
              View your scheduled interviews, interview details and next steps.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Upcoming Interviews
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {upcomingInterviews.length}
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
            {completedInterviews.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Interviews completed
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {pendingInterviews.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Awaiting confirmation
          </p>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upcoming Interviews
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your scheduled interviews for the next stages of recruitment.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {upcomingInterviews.length > 0 ? (
            upcomingInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onView={() =>
                  setSelectedInterview(interview)
                }
              />
            ))
          ) : (
            <div className="p-10 text-center">
              <div className="text-3xl">
                Calendar
              </div>

              <p className="mt-3 font-medium text-slate-700">
                No upcoming interviews
              </p>

              <p className="mt-1 text-sm text-slate-500">
                You will see scheduled interviews here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Completed + Pending */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Completed */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Completed Interviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your previously completed interviews.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {completedInterviews.map((interview) => (
              <button
                key={interview.id}
                type="button"
                onClick={() =>
                  setSelectedInterview(interview)
                }
                className="w-full p-5 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {interview.role}
                    </p>

                    <p className="text-sm text-slate-500">
                      {interview.company}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {interview.date} • {interview.time}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Completed
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Pending Interviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Interviews awaiting confirmation or scheduling.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingInterviews.map((interview) => (
              <button
                key={interview.id}
                type="button"
                onClick={() =>
                  setSelectedInterview(interview)
                }
                className="w-full p-5 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {interview.role}
                    </p>

                    <p className="text-sm text-slate-500">
                      {interview.company}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {interview.date} • {interview.time}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Pending
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <h2 className="text-xl font-bold text-slate-900">
                Interview Details
              </h2>

              <button
                type="button"
                onClick={() =>
                  setSelectedInterview(null)
                }
                className="rounded-lg px-3 py-1 text-2xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <InterviewDetails
                interview={selectedInterview}
              />
            </div>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}