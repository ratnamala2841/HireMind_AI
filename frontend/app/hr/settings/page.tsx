"use client";

import { useState } from "react";
import Link from "next/link";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

export default function HRSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [candidateAlerts, setCandidateAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
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
              HR Settings
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your hiring preferences, notifications, and AI recruitment
              settings.
            </p>
          </div>

          <Link
            href="/hr"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Account Information */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Hiring Manager Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your HR account information.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              value="Hiring Manager"
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Role
            </label>

            <input
              type="text"
              value="HR & Recruitment"
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value="hr@hiremind.ai"
              readOnly
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Notification Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose which recruitment updates you want to receive.
          </p>
        </div>

        <div className="space-y-4">
          <SettingToggle
            title="Email Notifications"
            description="Receive important recruitment updates through email."
            enabled={emailNotifications}
            onChange={setEmailNotifications}
          />

          <SettingToggle
            title="New Candidate Alerts"
            description="Get notified when candidates apply for active jobs."
            enabled={candidateAlerts}
            onChange={setCandidateAlerts}
          />

          <SettingToggle
            title="Interview Reminders"
            description="Receive reminders about upcoming candidate interviews."
            enabled={interviewReminders}
            onChange={setInterviewReminders}
          />
        </div>
      </section>

      {/* AI Settings */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            AI Recruitment Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure how HireMind AI assists your recruitment workflow.
          </p>
        </div>

        <SettingToggle
          title="AI Candidate Recommendations"
          description="Use AI match scores and candidate profiles to recommend relevant candidates."
          enabled={aiRecommendations}
          onChange={setAiRecommendations}
        />

        <div className="mt-5 rounded-lg bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-700">
            🤖 AI Matching Enabled
          </p>

          <p className="mt-1 text-xs leading-5 text-indigo-600">
            HireMind AI will analyze candidate skills, experience, education,
            and job requirements to generate candidate relevance scores.
          </p>
        </div>
      </section>

      {/* Recruitment Preferences */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Recruitment Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure your default recruitment workflow.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Default Candidate Status
            </label>

            <select
              defaultValue="Under Review"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-indigo-500"
            >
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Interview</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Minimum AI Match Score
            </label>

            <select
              defaultValue="70%"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-indigo-500"
            >
              <option>60%</option>
              <option>70%</option>
              <option>80%</option>
              <option>90%</option>
            </select>
          </div>
        </div>
      </section>

      {/* Save */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">
              Save your preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Apply the selected HR settings to your account.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Save Settings
          </button>
        </div>

        {saved && (
          <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-600">
            ✓ HR settings saved successfully.
          </div>
        )}
      </section>
    </HRDashboardLayout>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl bg-slate-50 p-4">
      <div>
        <h3 className="font-semibold text-slate-800">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-label={`Toggle ${title}`}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}