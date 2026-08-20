"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const demoOffer = {
  candidate: "Rahul Kumar",
  role: "AI/ML Engineer",
  department: "Artificial Intelligence",
  salary: "₹8,00,000 / year",
  location: "Chennai",
  joiningDate: "15 September 2026",
  employmentType: "Full Time",
  probation: "6 Months",
  workingHours: "9:00 AM – 6:00 PM",
  rules: [
    "Maintain confidentiality of company information.",
    "Follow the company code of conduct.",
    "Follow working hours and attendance policies.",
    "Protect company data and systems.",
    "Comply with applicable company policies.",
  ],
};

export default function CandidateOfferPage() {
  const params = useParams();
  const router = useRouter();

  const [status, setStatus] = useState<
    "pending" | "accepted" | "declined"
  >("pending");

  const [loading, setLoading] = useState(false);

  const offerId = params.id;

  async function handleDecision(
    decision: "accepted" | "declined"
  ) {
    setLoading(true);

    // Demo-only decision flow.
    // This is intentionally isolated from existing candidate pages.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus(decision);
    setLoading(false);
  }

  if (status === "accepted") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ✓
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Offer Accepted
            </h1>

            <p className="mt-3 text-slate-500">
              Congratulations, {demoOffer.candidate}! You have successfully
              accepted the employment offer for the{" "}
              <strong>{demoOffer.role}</strong> position.
            </p>

            <div className="mt-6 rounded-xl bg-green-50 p-5 text-left">
              <p className="text-sm font-semibold text-green-800">
                Next Steps
              </p>

              <ul className="mt-3 space-y-2 text-sm text-green-700">
                <li>✓ Your acceptance has been recorded.</li>
                <li>✓ HR will review your response.</li>
                <li>✓ Joining details will be shared with you.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => router.push("/candidate/application")}
              className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Go to My Applications
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (status === "declined") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              ×
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Offer Declined
            </h1>

            <p className="mt-3 text-slate-500">
              Your decision has been recorded. Thank you for considering
              the opportunity at HireMind AI.
            </p>

            <button
              type="button"
              onClick={() => router.push("/candidate/application")}
              className="mt-6 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to My Applications
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-indigo-600">
            HireMind AI
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Employment Offer
          </h1>

          <p className="mt-2 text-slate-500">
            Please review your offer carefully before making your decision.
          </p>
        </div>

        {/* Offer */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Letter Header */}
          <div className="border-b border-slate-200 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
              H
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              HireMind AI
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Official Offer of Employment
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Candidate */}
            <div>
              <p className="text-sm text-slate-500">Dear</p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {demoOffer.candidate},
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We are pleased to offer you the position of{" "}
                <strong>{demoOffer.role}</strong> at HireMind AI. We
                believe your skills and experience will be a valuable
                addition to our organization.
              </p>
            </div>

            {/* Employment Details */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Employment Details
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Position"
                  value={demoOffer.role}
                />

                <Detail
                  label="Department"
                  value={demoOffer.department}
                />

                <Detail
                  label="Annual CTC"
                  value={demoOffer.salary}
                  highlight
                />

                <Detail
                  label="Location"
                  value={demoOffer.location}
                />

                <Detail
                  label="Joining Date"
                  value={demoOffer.joiningDate}
                />

                <Detail
                  label="Employment Type"
                  value={demoOffer.employmentType}
                />

                <Detail
                  label="Probation"
                  value={demoOffer.probation}
                />

                <Detail
                  label="Working Hours"
                  value={demoOffer.workingHours}
                />
              </div>
            </div>

            {/* Compensation */}
            <div className="mt-8 rounded-xl bg-indigo-50 p-5">
              <h3 className="font-semibold text-indigo-900">
                Compensation
              </h3>

              <p className="mt-2 text-sm leading-6 text-indigo-700">
                Your annual Cost to Company (CTC) will be{" "}
                <strong>{demoOffer.salary}</strong>, subject to applicable
                company policies and statutory deductions.
              </p>
            </div>

            {/* Rules */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Company Rules & Terms
              </h3>

              <div className="mt-4 space-y-3">
                {demoOffer.rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-lg bg-slate-50 p-3"
                  >
                    <span className="font-semibold text-indigo-600">
                      {index + 1}.
                    </span>

                    <p className="text-sm leading-6 text-slate-600">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision */}
            <div className="mt-10 border-t border-slate-200 pt-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Your Decision
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Please select one of the options below to respond to this
                employment offer.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleDecision("accepted")}
                  className="rounded-xl bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700 disabled:opacity-60"
                >
                  {loading ? "Processing..." : "✓ Accept Offer"}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleDecision("declined")}
                  className="rounded-xl border border-red-300 bg-white px-6 py-4 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Decline Offer"}
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Offer ID: {String(offerId)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-sm font-semibold ${
          highlight ? "text-indigo-600" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}