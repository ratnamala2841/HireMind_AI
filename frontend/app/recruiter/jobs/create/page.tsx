"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full Time");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    /* --------------------------------------------------------
       Validate required frontend fields
       -------------------------------------------------------- */

    if (!title || !department || !location || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    /* --------------------------------------------------------
       Get authentication token
       -------------------------------------------------------- */

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Your session has expired. Please log in again.");
      router.push("/login");
      return;
    }

    try {
      setIsSubmitting(true);

      /* --------------------------------------------------------
         Convert frontend employment type
         into backend enum
         -------------------------------------------------------- */

      let jobType = "FULL_TIME";

      if (type === "Part Time") {
        jobType = "PART_TIME";
      } else if (type === "Internship") {
        jobType = "INTERNSHIP";
      } else if (type === "Contract") {
        jobType = "CONTRACT";
      }

      /* --------------------------------------------------------
         Send job to backend

         IMPORTANT:
         recruiterId and companyId are NOT sent here.

         The backend gets them from:
         JWT -> userId -> Recruiter -> companyId
         -------------------------------------------------------- */

      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          description,
          location,

          jobType,
          workMode: "ONSITE",
          experienceLevel: "ENTRY",

          minExperience: 0,
          maxExperience: 1,

          salaryMin: null,
          salaryMax: null,

          currency: "INR",
          openings: 1,

          /*
           * Department is currently a frontend field.
           * It is not being sent as a separate database field
           * because the current backend job API does not require
           * a department property.
           */

          ...(skills.trim()
            ? {
                skillsText: skills.trim(),
              }
            : {}),
        }),
      });

      /* --------------------------------------------------------
         Read backend response
         -------------------------------------------------------- */

      const data = await response.json();

      /* --------------------------------------------------------
         Backend returned an error
         -------------------------------------------------------- */

      if (!response.ok || !data.success) {
        if (response.status === 401) {
          localStorage.removeItem("authToken");
          alert("Your session has expired. Please log in again.");
          router.push("/login");
          return;
        }

        if (response.status === 403) {
          alert(
            data.message ||
              "Only recruiters can create jobs."
          );
          return;
        }

        throw new Error(
          data.message || "Failed to create job"
        );
      }

      /* --------------------------------------------------------
         Job successfully created
         -------------------------------------------------------- */

      console.log(
        "Job created successfully:",
        data.job
      );

      alert("Job created successfully!");

      router.push("/recruiter/jobs");
    } catch (error) {
      console.error(
        "Create job error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create job. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          ← Back to Jobs
        </button>

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create New Job
          </h1>

          <p className="mt-2 text-slate-500">
            Create a job posting and find the best
            candidates using HireMind AI.
          </p>
        </div>

        {/* Job form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">

            {/* Job Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Job Title *
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. AI/ML Intern"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Department *
              </label>

              <input
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                placeholder="e.g. Artificial Intelligence"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Location *
              </label>

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="e.g. Chennai / Remote"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employment Type
              </label>

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Required Skills
            </label>

            <input
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="Python, Machine Learning, SQL, FastAPI"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate skills using commas.
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Job Description *
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={7}
              placeholder="Describe the role, responsibilities and requirements..."
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-4">

            {/* Cancel */}
            <button
              type="button"
              onClick={() =>
                router.push("/recruiter/jobs")
              }
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            {/* Create */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Creating..."
                : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}