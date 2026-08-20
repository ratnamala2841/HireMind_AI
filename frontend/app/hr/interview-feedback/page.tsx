"use client";

import { useState } from "react";
import Link from "next/link";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

type Feedback = {
  id: number;
  candidate: string;
  role: string;
  round: string;
  interviewer: string;
  technical: number;
  communication: number;
  overall: number;
  recommendation: "Hire" | "Hold" | "Reject";
  comments: string;
};

const initialFeedback: Feedback[] = [
  {
    id: 1,
    candidate: "Priya Sharma",
    role: "AI/ML Engineer",
    round: "Technical Round",
    interviewer: "Rahul Mehta",
    technical: 9,
    communication: 8,
    overall: 9,
    recommendation: "Hire",
    comments:
      "Strong understanding of machine learning concepts and practical implementation.",
  },
  {
    id: 2,
    candidate: "Vikram Singh",
    role: "Data Scientist",
    round: "Technical Round",
    interviewer: "Anita Rao",
    technical: 8,
    communication: 8,
    overall: 8,
    recommendation: "Hire",
    comments:
      "Good analytical thinking and strong SQL and Python knowledge.",
  },
  {
    id: 3,
    candidate: "Rahul Kumar",
    role: "Full Stack Developer",
    round: "Managerial Round",
    interviewer: "Arjun Kumar",
    technical: 8,
    communication: 7,
    overall: 8,
    recommendation: "Hold",
    comments:
      "Good technical skills. Communication can be improved further.",
  },
];

function recommendationStyle(
  recommendation: Feedback["recommendation"]
) {
  switch (recommendation) {
    case "Hire":
      return "bg-green-50 text-green-600";

    case "Hold":
      return "bg-yellow-50 text-yellow-600";

    case "Reject":
      return "bg-red-50 text-red-600";
  }
}

export default function InterviewFeedbackPage() {
  const [feedback, setFeedback] =
    useState<Feedback[]>(initialFeedback);

  const [selected, setSelected] = useState<Feedback | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [candidate, setCandidate] = useState("");
  const [role, setRole] = useState("");
  const [round, setRound] = useState("Technical Round");
  const [interviewer, setInterviewer] = useState("");
  const [technical, setTechnical] = useState("8");
  const [communication, setCommunication] = useState("8");
  const [recommendation, setRecommendation] =
    useState<Feedback["recommendation"]>("Hire");
  const [comments, setComments] = useState("");

  function saveFeedback() {
    if (!candidate.trim() || !interviewer.trim()) {
      alert("Please enter candidate and interviewer details.");
      return;
    }

    const tech = Number(technical);
    const comm = Number(communication);
    const overall = Math.round((tech + comm) / 2);

    const newFeedback: Feedback = {
      id: Date.now(),
      candidate,
      role: role || "Software Engineer",
      round,
      interviewer,
      technical: tech,
      communication: comm,
      overall,
      recommendation,
      comments:
        comments || "Interview feedback recorded by HR.",
    };

    setFeedback((current) => [newFeedback, ...current]);

    setCandidate("");
    setRole("");
    setInterviewer("");
    setTechnical("8");
    setCommunication("8");
    setRecommendation("Hire");
    setComments("");
    setShowForm(false);

    alert("Interview feedback saved successfully!");
  }

  return (
    <HRDashboardLayout>
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Hiring Manager
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Interview Feedback
            </h1>

            <p className="mt-2 text-slate-500">
              Review interview evaluations and make informed hiring
              decisions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + Add Feedback
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Summary
          title="Interviews"
          value="25"
          description="Completed / scheduled"
        />

        <Summary
          title="Hire"
          value={
            String(
              feedback.filter(
                (item) => item.recommendation === "Hire"
              ).length
            )
          }
          description="Positive recommendations"
          green
        />

        <Summary
          title="Hold"
          value={
            String(
              feedback.filter(
                (item) => item.recommendation === "Hold"
              ).length
            )
          }
          description="Needs review"
        />

        <Summary
          title="Avg. Score"
          value="8.4/10"
          description="Interview performance"
        />
      </div>

      {/* FEEDBACK LIST */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Interview Feedback
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review interviewer evaluations and recommendations.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {feedback.map((item) => (
            <div
              key={item.id}
              className="p-6 transition hover:bg-slate-50"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                    {item.candidate.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.candidate}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.role}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.round} • {item.interviewer}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    Technical
                  </p>

                  <p className="mt-1 font-bold text-indigo-600">
                    {item.technical}/10
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    Communication
                  </p>

                  <p className="mt-1 font-bold text-indigo-600">
                    {item.communication}/10
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    Overall
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {item.overall}/10
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${recommendationStyle(
                    item.recommendation
                  )}`}
                >
                  {item.recommendation}
                </span>

                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                  View Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIEW FEEDBACK MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                  Interview Feedback
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selected.candidate}
                </h2>

                <p className="text-sm text-slate-500">
                  {selected.role}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Info
                label="Round"
                value={selected.round}
              />

              <Info
                label="Interviewer"
                value={selected.interviewer}
              />

              <Info
                label="Technical"
                value={`${selected.technical}/10`}
              />

              <Info
                label="Communication"
                value={`${selected.communication}/10`}
              />

              <Info
                label="Overall"
                value={`${selected.overall}/10`}
              />

              <Info
                label="Recommendation"
                value={selected.recommendation}
              />
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-400">
                COMMENTS
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                {selected.comments}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD FEEDBACK MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                  HR Evaluation
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Add Interview Feedback
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Candidate Name"
                value={candidate}
                onChange={setCandidate}
                placeholder="Candidate name"
              />

              <Field
                label="Role"
                value={role}
                onChange={setRole}
                placeholder="Job role"
              />

              <Field
                label="Interviewer"
                value={interviewer}
                onChange={setInterviewer}
                placeholder="Interviewer name"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Interview Round
                </label>

                <select
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Technical Round</option>
                  <option>HR Round</option>
                  <option>Managerial Round</option>
                  <option>Final Round</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Technical Score
                </label>

                <select
                  value={technical}
                  onChange={(e) => setTechnical(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}/10
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Communication Score
                </label>

                <select
                  value={communication}
                  onChange={(e) => setCommunication(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}/10
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Recommendation
                </label>

                <select
                  value={recommendation}
                  onChange={(e) =>
                    setRecommendation(
                      e.target.value as Feedback["recommendation"]
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="Hire">Hire</option>
                  <option value="Hold">Hold</option>
                  <option value="Reject">Reject</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Interview Comments
                </label>

                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  placeholder="Enter interviewer comments..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveFeedback}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Save Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </HRDashboardLayout>
  );
}

function Summary({
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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
      />
    </div>
  );
}