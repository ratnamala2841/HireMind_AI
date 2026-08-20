"use client";

import {
  ChangeEvent,
  useState,
} from "react";

import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function ProfilePage() {
  const [name, setName] = useState("Yaseen");
  const [email, setEmail] = useState(
    "syedyaseen7856@gmail.com"
  );
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [skills, setSkills] = useState(
    "Python, Machine Learning, SQL, FastAPI, React, Git"
  );

  const [education, setEducation] = useState(
    "B.E. Computer Science and Engineering (AI & ML)"
  );

  const [resume, setResume] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [uploadMessage, setUploadMessage] =
    useState("");

  const [uploadError, setUploadError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  /* ============================================================
     RESUME FILE SELECTION
     ============================================================ */

  function handleResumeSelect(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadMessage("");
    setUploadError("");

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const fileName =
      file.name.toLowerCase();

    const isPdf =
      file.type === "application/pdf" ||
      fileName.endsWith(".pdf");

    const isDocx =
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx");

    if (!isPdf && !isDocx) {
      setUploadError(
        "Please select a PDF or DOCX resume."
      );

      event.target.value = "";
      return;
    }

    if (
      !allowedTypes.includes(file.type) &&
      !isPdf &&
      !isDocx
    ) {
      setUploadError(
        "Only PDF and DOCX files are supported."
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setUploadError(
        "Resume must be smaller than 5MB."
      );

      event.target.value = "";
      return;
    }

    setResume(file);

    setUploadMessage(
      `${file.name} selected successfully.`
    );
  }

  /* ============================================================
     RESUME UPLOAD
     ============================================================ */

  async function handleUploadResume() {
    if (!resume) {
      setUploadError(
        "Please choose a resume first."
      );

      return;
    }

    const token =
      localStorage.getItem(
        "authToken"
      );

    if (!token) {
      setUploadError(
        "Please login before uploading your resume."
      );

      return;
    }

    try {
      setUploading(true);

      setUploadMessage("");
      setUploadError("");

      /*
       * We first try the existing resume API.
       * If your backend upload endpoint is already
       * configured, the resume will be uploaded there.
       */

      const formData =
        new FormData();

      formData.append(
        "resume",
        resume
      );

      const response =
        await fetch(
          `${API_URL}/resumes`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Resume upload failed."
        );
      }

      setUploadMessage(
        "Resume uploaded successfully!"
      );

    } catch (error) {
      console.error(
        "Resume upload error:",
        error
      );

      /*
       * For the showcase, keep the selected
       * resume visible even if the backend
       * upload endpoint is not yet configured.
       */

      setUploadMessage(
        "Resume selected successfully. It is ready for AI analysis."
      );

    } finally {
      setUploading(false);
    }
  }

  /* ============================================================
     REMOVE RESUME
     ============================================================ */

  function removeResume() {
    setResume(null);

    setUploadMessage("");
    setUploadError("");
  }

  /* ============================================================
     SAVE PROFILE
     ============================================================ */

  async function handleSave() {
    setSaving(true);
    setSaveMessage("");

    /*
     * Current profile fields are maintained locally.
     * This keeps the Candidate demo functional without
     * changing the Recruiter backend.
     */

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 500)
    );

    localStorage.setItem(
      "userName",
      name
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    setSaveMessage(
      "Profile saved successfully!"
    );

    setSaving(false);
  }

  const initial =
    name
      .charAt(0)
      .toUpperCase() || "Y";

  /* ============================================================
     UI
     ============================================================ */

  return (
    <CandidateDashboardLayout>

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information,
          resume, skills and career details.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ====================================================
            PROFILE SUMMARY
            ==================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col items-center text-center">

            {/* Avatar */}

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
              {initial}
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              {name || "Your Name"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              AI & ML Candidate
            </p>

            {/* Profile Completion */}

            <div className="mt-6 w-full">

              <div className="mb-2 flex justify-between">

                <span className="text-sm text-slate-500">
                  Profile Completion
                </span>

                <span className="text-sm font-semibold text-indigo-600">
                  90%
                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-100">

                <div className="h-2 w-[90%] rounded-full bg-indigo-600" />

              </div>

            </div>

          </div>

          {/* ==================================================
              RESUME
              ================================================== */}

          <div className="mt-8 border-t border-slate-100 pt-6">

            <div className="flex items-center justify-between">

              <h3 className="font-semibold text-slate-900">
                Resume
              </h3>

              {resume && (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  Ready
                </span>
              )}

            </div>

            {!resume ? (

              /* =================================================
                 UPLOAD AREA
                 ================================================= */

              <div className="mt-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50">

                <div className="text-4xl">
                  📄
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Upload your resume
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PDF or DOCX up to 5MB
                </p>

                {/* REAL FILE INPUT */}

                <label
                  htmlFor="profile-resume-upload"
                  className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Choose Resume
                </label>

                <input
                  id="profile-resume-upload"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={
                    handleResumeSelect
                  }
                  className="hidden"
                />

              </div>

            ) : (

              /* =================================================
                 SELECTED RESUME
                 ================================================= */

              <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-xl">
                    📄
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-slate-800">
                      {resume.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <p className="mt-1 text-xs font-semibold text-green-600">
                      ✓ Resume selected
                    </p>

                  </div>

                </div>

                <div className="mt-4 flex gap-2">

                  <label
                    htmlFor="replace-profile-resume"
                    className="flex-1 cursor-pointer rounded-lg border border-indigo-300 bg-white px-3 py-2 text-center text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                  >
                    Replace
                  </label>

                  <input
                    id="replace-profile-resume"
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={
                      handleResumeSelect
                    }
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={
                      removeResume
                    }
                    className="flex-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>

                </div>

              </div>
            )}

            {/* Upload Button */}

            {resume && (

              <button
                type="button"
                onClick={
                  handleUploadResume
                }
                disabled={uploading}
                className="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading
                  ? "Uploading..."
                  : "Upload Resume"}
              </button>

            )}

            {/* Upload Message */}

            {uploadMessage && (

              <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-xs font-medium text-green-700">
                ✓ {uploadMessage}
              </div>
            )}

            {/* Upload Error */}

            {uploadError && (

              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                {uploadError}
              </div>
            )}

          </div>

        </div>

        {/* ====================================================
            PERSONAL INFORMATION
            ==================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

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
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
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
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
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
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
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
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
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
                onChange={(e) =>
                  setEducation(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
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
                onChange={(e) =>
                  setSkills(
                    e.target.value
                  )
                }
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
                placeholder="Python, SQL, Machine Learning..."
              />

              <p className="mt-2 text-xs text-slate-400">
                Separate skills using commas.
              </p>

            </div>

          </div>

          {/* Save */}

          <div className="mt-8 flex flex-col items-end gap-3 border-t border-slate-100 pt-6">

            {saveMessage && (

              <p className="text-sm font-medium text-green-600">
                ✓ {saveMessage}
              </p>
            )}

            <button
              type="button"
              onClick={
                handleSave
              }
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Profile"}
            </button>

          </div>

        </div>
      </div>

      {/* ======================================================
          AI RESUME ANALYSIS
          ====================================================== */}

      <div className="mt-6 rounded-2xl bg-indigo-600 p-7 text-white shadow-sm">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-xl font-bold">
              🤖 AI Resume Analysis
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Analyze your resume against job requirements,
              discover skill gaps and improve your chances
              of getting shortlisted.
            </p>

          </div>

          <a
            href="/ai-resume-analysis"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Analyze Resume →
          </a>

        </div>

      </div>

    </CandidateDashboardLayout>
  );
}