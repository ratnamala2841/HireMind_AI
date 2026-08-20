"use client";

import Link from "next/link";
import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";

const recommendedJobs = [
  {
    id: 1,
    title: "AI/ML Intern",
    company: "TechNova",
    location: "Chennai",
    type: "Full Time",
    match: "92%",
    skills: ["Python", "Machine Learning", "AI"],
  },
  {
    id: 2,
    title: "AI/ML Intern",
    company: "CloudWorks",
    location: "Chennai",
    type: "Internship",
    match: "88%",
    skills: ["Python", "FastAPI", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataSphere",
    location: "Bangalore",
    type: "Internship",
    match: "86%",
    skills: ["Python", "Pandas", "Machine Learning"],
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "InnovateTech",
    location: "Hyderabad",
    type: "Full Time",
    match: "84%",
    skills: ["Node.js", "Express", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Generative AI Intern",
    company: "AI Labs",
    location: "Bangalore",
    type: "Internship",
    match: "81%",
    skills: ["Python", "LLMs", "Generative AI"],
  },
  {
    id: 6,
    title: "Python Developer",
    company: "NextGen Solutions",
    location: "Chennai",
    type: "Full Time",
    match: "79%",
    skills: ["Python", "FastAPI", "SQL"],
  },
];

const recentApplications = [
  {
    title: "AI/ML Intern",
    company: "TechNova",
    date: "20 Aug 2026",
    status: "Applied",
  },
  {
    title: "Backend Developer",
    company: "CloudWorks",
    date: "19 Aug 2026",
    status: "Under Review",
  },
  {
    title: "Data Science Intern",
    company: "DataSphere",
    date: "18 Aug 2026",
    status: "Shortlisted",
  },
  {
    title: "Generative AI Intern",
    company: "AI Labs",
    date: "17 Aug 2026",
    status: "Applied",
  },
];

const upcomingInterviews = [
  {
    role: "AI/ML Intern",
    company: "TechNova",
    date: "25 Aug 2026",
    time: "10:00 AM",
    type: "Technical",
  },
  {
    role: "Backend Developer",
    company: "CloudWorks",
    date: "27 Aug 2026",
    time: "2:00 PM",
    type: "HR Round",
  },
];

const stats = [
  {
    title: "Applications",
    value: "12",
    description: "Jobs you have applied for",
    icon: "📄",
  },
  {
    title: "Shortlisted",
    value: "4",
    description: "Applications shortlisted",
    icon: "⭐",
  },
  {
    title: "Interviews",
    value: "2",
    description: "Interviews scheduled",
    icon: "📅",
  },
];

export default function DashboardPage() {
  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your career journey with HireMind AI.
        </p>
      </div>

      {/* Stats */}
      <section className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {stat.description}
                </p>
              </div>

              <div className="text-3xl">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Recommended Jobs + Profile */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        {/* Recommended Jobs */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Recommended Jobs
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Opportunities that match your profile and skills.
              </p>
            </div>

            <Link
              href="/jobs"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-slate-100">

            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 transition hover:bg-slate-50"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                  <div className="flex items-start gap-4">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-2xl font-bold text-indigo-600">
                      {job.company.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-slate-600">
                        {job.company}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        📍 {job.location} • {job.type}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">

                    <div className="mb-3 rounded-lg bg-green-50 px-4 py-2 text-center">
                      <p className="text-xs text-green-600">
                        AI Match
                      </p>

                      <p className="text-lg font-bold text-green-600">
                        {job.match}
                      </p>
                    </div>

                    <Link
                      href={`/jobs/${job.id}`}
                      className="block rounded-lg border border-indigo-600 px-4 py-2 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* Profile Strength */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            Profile Strength
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Complete your profile to improve your AI job matches.
          </p>

          <div className="mt-6">

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Profile completion
              </span>

              <span className="text-sm font-bold text-indigo-600">
                80%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[80%] rounded-full bg-indigo-600" />
            </div>

          </div>

          <div className="mt-6 space-y-3">

            <ProfileItem
              label="Basic Information"
              completed
            />

            <ProfileItem
              label="Education"
              completed
            />

            <ProfileItem
              label="Skills"
              completed
            />

            <ProfileItem
              label="Resume"
              completed
            />

          </div>

          <Link
            href="/profile"
            className="mt-6 block rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View Profile
          </Link>

        </section>
      </div>

      {/* Recent Applications */}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest applications and their current recruitment stage.
            </p>
          </div>

          <Link
            href="/applications"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all
          </Link>

        </div>

        <div className="divide-y divide-slate-100">

          {recentApplications.map((application, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                  {application.company.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {application.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {application.company}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Applied on {application.date}
                  </p>
                </div>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${
                  application.status === "Shortlisted"
                    ? "bg-green-50 text-green-600"
                    : application.status === "Under Review"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {application.status}
              </span>

            </div>
          ))}

        </div>

      </section>

      {/* Upcoming Interviews */}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Upcoming Interviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep track of your upcoming recruitment activities.
            </p>
          </div>

          <Link
            href="/interviews"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View interviews
          </Link>

        </div>

        <div className="divide-y divide-slate-100">

          {upcomingInterviews.map((interview, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-5 p-6 md:flex-row md:items-center"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                  {interview.company.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {interview.role}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {interview.company}
                  </p>
                </div>

              </div>

              <div className="grid gap-3 text-sm sm:grid-cols-3">

                <div>
                  <p className="text-xs text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {interview.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Time
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {interview.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Interview
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {interview.type}
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-green-50 px-4 py-2 text-center text-xs font-semibold text-green-600">
                Scheduled
              </span>

            </div>
          ))}

        </div>

      </section>

      {/* Career Tip */}
      <section className="mt-6 rounded-xl bg-indigo-600 p-6 text-white shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold text-indigo-200">
              HireMind AI Career Tip
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Keep your resume and skills updated.
            </h2>

            <p className="mt-2 text-sm text-indigo-100">
              A complete profile helps HireMind AI recommend more relevant opportunities.
            </p>
          </div>

          <Link
            href="/profile"
            className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Update Profile
          </Link>

        </div>

      </section>

    </CandidateDashboardLayout>
  );
}

function ProfileItem({
  label,
  completed,
}: {
  label: string;
  completed: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">

      <span className="text-sm font-medium text-slate-600">
        {label}
      </span>

      <span
        className={
          completed
            ? "text-sm font-semibold text-green-600"
            : "text-sm font-semibold text-amber-600"
        }
      >
        {completed ? "✓ Done" : "Pending"}
      </span>

    </div>
  );
}