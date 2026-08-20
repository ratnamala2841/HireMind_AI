"use client";

import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";
import { useState } from "react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [jobRecommendations, setJobRecommendations] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your Candidate account, privacy and notification preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Account */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Account Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your basic Candidate account information.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                defaultValue="Yaseen"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                defaultValue="syedyaseen7856@gmail.com"
                type="email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Notification Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose which updates you want to receive.
          </p>

          <div className="mt-5 space-y-4">
            <SettingToggle
              title="Email Notifications"
              description="Receive important application and recruitment updates."
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />

            <SettingToggle
              title="Job Recommendations"
              description="Receive job recommendations based on your skills and profile."
              checked={jobRecommendations}
              onChange={setJobRecommendations}
            />

            <SettingToggle
              title="Interview Reminders"
              description="Get reminders about upcoming interviews and recruitment events."
              checked={interviewReminders}
              onChange={setInterviewReminders}
            />
          </div>
        </section>

        {/* Privacy */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Privacy
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Control how recruiters can discover your profile.
          </p>

          <div className="mt-5">
            <SettingToggle
              title="Profile Visibility"
              description="Allow recruiters to discover your Candidate profile for relevant opportunities."
              checked={profileVisibility}
              onChange={setProfileVisibility}
            />
          </div>
        </section>

        {/* Career Preferences */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Career Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tell HireMind AI what kind of opportunities you are looking for.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Preferred Role
              </label>

              <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500">
                <option>AI / ML Intern</option>
                <option>Python Developer</option>
                <option>Full Stack Developer</option>
                <option>Data Science Intern</option>
                <option>Backend Developer</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Work Preference
              </label>

              <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500">
                <option>Any</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>
          </div>
        </section>

        {/* Save */}
        <div className="flex flex-col items-end gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          {saved && (
            <span className="text-sm font-semibold text-green-600">
              ✓ Settings saved successfully
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl bg-slate-50 p-4">
      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}