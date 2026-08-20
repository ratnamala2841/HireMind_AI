"use client";

import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

export default function OffersPage() {
  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Offers
        </h1>

        <p className="mt-2 text-slate-500">
          View and manage job offers received from employers.
        </p>
      </div>

      {/* Success Banner */}
      <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl">
            🎉
          </div>

          <div>
            <h2 className="text-lg font-bold text-green-800">
              Your offers will appear here
            </h2>

            <p className="mt-1 text-sm leading-6 text-green-700">
              Once a recruiter selects you for a position, your offer
              details will be available on this page.
            </p>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Active Offers
            </p>

            <span className="text-xl">🎁</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-indigo-600">
            0
          </p>

          <p className="mt-1 text-xs text-slate-400">
            No active offers
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Accepted
            </p>

            <span className="text-xl">✅</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-green-600">
            0
          </p>

          <p className="mt-1 text-xs text-slate-400">
            No accepted offers
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Pending
            </p>

            <span className="text-xl">⏳</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-amber-600">
            0
          </p>

          <p className="mt-1 text-xs text-slate-400">
            No pending offers
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">
          🎁
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          No offers yet
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
          Keep applying to relevant jobs and completing your assessments.
          When a recruiter sends you an offer, it will appear here.
        </p>

        <a
          href="/jobs"
          className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Find Jobs →
        </a>
      </div>

      {/* How Offers Work */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          How Offers Work
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-5">
            <div className="text-2xl">📋</div>

            <h3 className="mt-3 font-semibold text-slate-900">
              Apply
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Apply to jobs that match your skills and career goals.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="text-2xl">🤝</div>

            <h3 className="mt-3 font-semibold text-slate-900">
              Get Selected
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Recruiters review your profile, resume and application.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="text-2xl">🎉</div>

            <h3 className="mt-3 font-semibold text-slate-900">
              Receive Offer
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Selected candidates can view and respond to their offer here.
            </p>
          </div>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}