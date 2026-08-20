"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

const demoOffer = {
  candidate: "Rahul Kumar",
  email: "syedyaseen7856@gmail.com",
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

export default function OfferPreviewPage() {
  const params = useParams();
  const router = useRouter();

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const offerId = params.id;

  async function handleSendOffer() {
    setSending(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/offers/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidate: demoOffer.candidate,
            email: demoOffer.email,
            role: demoOffer.role,
            department: demoOffer.department,
            salary: demoOffer.salary,
            location: demoOffer.location,
            joiningDate: demoOffer.joiningDate,
            employmentType: demoOffer.employmentType,
            probation: demoOffer.probation,
            workingHours: demoOffer.workingHours,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to send offer email."
        );
      }

      setSent(true);

      alert(
        `Offer sent successfully to ${demoOffer.email}`
      );
    } catch (error) {
      console.error("Send offer error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to send offer email."
      );
    } finally {
      setSending(false);
    }
  }

  function handleBack() {
    router.push("/hr/offers");
  }

  return (
    <HRDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Hiring Manager
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Offer Preview
            </h1>

            <p className="mt-2 text-slate-500">
              Review the employment offer before sending it to the candidate.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Back to Offers
          </button>
        </div>
      </div>

      {/* Status */}
      {sent && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-700">
            ✓ Offer sent successfully
          </p>

          <p className="mt-1 text-sm text-green-600">
            The offer email has been successfully sent to the candidate.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Offer Letter */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          {/* Letter Header */}
          <div className="border-b border-slate-200 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
              H
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              HireMind AI
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Offer of Employment
            </p>
          </div>

          <div className="p-8">
            {/* Greeting */}
            <div>
              <p className="text-sm text-slate-500">
                Dear
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {demoOffer.candidate},
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We are pleased to offer you the position of{" "}
                <strong>{demoOffer.role}</strong> at{" "}
                <strong>HireMind AI</strong>. We believe your skills and
                experience will be a valuable addition to our team.
              </p>
            </div>

            {/* Job Details */}
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
                  label="Employment Type"
                  value={demoOffer.employmentType}
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
                  label="Working Hours"
                  value={demoOffer.workingHours}
                />

                <Detail
                  label="Probation Period"
                  value={demoOffer.probation}
                />

                <Detail
                  label="Annual CTC"
                  value={demoOffer.salary}
                  highlight
                />
              </div>
            </div>

            {/* Compensation */}
            <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 p-5">
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

              <p className="mt-2 text-sm text-slate-500">
                By accepting this offer, the candidate agrees to follow the
                applicable company policies and employment terms.
              </p>

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

            {/* Closing */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-sm leading-7 text-slate-600">
                We look forward to welcoming you to HireMind AI. Please
                review this offer carefully and respond through your HireMind
                AI account.
              </p>

              <p className="mt-6 text-sm font-semibold text-slate-800">
                Sincerely,
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Hiring Manager
              </p>

              <p className="text-sm text-slate-500">
                HireMind AI
              </p>
            </div>
          </div>
        </section>

        {/* Action Panel */}
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Offer Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review the offer and send it to the selected candidate.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              CANDIDATE
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {demoOffer.candidate}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {demoOffer.email}
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              POSITION
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {demoOffer.role}
            </p>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
              ANNUAL CTC
            </p>

            <p className="mt-1 text-xl font-bold text-indigo-600">
              {demoOffer.salary}
            </p>
          </div>

          {/* Send Offer */}
          <button
            type="button"
            onClick={handleSendOffer}
            disabled={sending || sent}
            className={`mt-6 w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition ${
              sent
                ? "cursor-not-allowed bg-green-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            } disabled:opacity-70`}
          >
            {sending
              ? "Sending Offer..."
              : sent
              ? "✓ Offer Sent"
              : "Send Offer"}
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="mt-3 w-full rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Save as Draft
          </button>

          <div className="mt-6 rounded-lg border border-green-100 bg-green-50 p-4">
            <p className="text-xs font-semibold text-green-700">
              📧 Email Automation Active
            </p>

            <p className="mt-1 text-xs leading-5 text-green-600">
              Sending this offer will automatically email the candidate with
              the employment details, salary, joining date, and company rules.
            </p>
          </div>
        </aside>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row">
        <Link
          href="/hr/offers"
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          ← All Offers
        </Link>

        <Link
          href="/hr/candidates"
          className="rounded-lg border border-indigo-300 px-5 py-3 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
        >
          View Candidates
        </Link>
      </div>
    </HRDashboardLayout>
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