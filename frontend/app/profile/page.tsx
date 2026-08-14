"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfilePage() {
  const [name, setName] = useState("Yaseen");
  const [email, setEmail] = useState("yaseen@example.com");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState(
    "Python, Machine Learning, SQL, FastAPI, React, Git"
  );
  const [education, setEducation] = useState(
    "B.E. Computer Science and Engineering (AI & ML)"
  );

  function handleSave() {
    alert("Profile saved successfully!");
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information, skills and career details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Profile Summary */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
              Y
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              {name || "Your Name"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              AI & ML Candidate
            </p>

            <div className="mt-6 w-full">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-slate-500">
                  Profile Completion
                </span>

                <span className="text-sm font-semibold text-indigo-600">
                  82%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[82%] rounded-full bg-indigo-600" />
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="font-semibold text-slate-900">
              Resume
            </h3>

            <div className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-center">
              <div className="text-2xl">📄</div>

              <p className="mt-2 text-sm font-medium text-slate-700">
                Upload your resume
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PDF or DOCX up to 5MB
              </p>

              <button className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Upload Resume
              </button>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Keep your profile information up to date.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Location
              </label>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="City, Country"
              />
            </div>

            {/* Education */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Education
              </label>

              <input
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="Your education"
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Skills
              </label>

              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="Python, SQL, Machine Learning..."
              />

              <p className="mt-2 text-xs text-slate-400">
                Separate skills using commas.
              </p>
            </div>
          </div>

          {/* Save */}
          <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
            <button
              onClick={handleSave}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}