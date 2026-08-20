"use client";

import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";

type Candidate = {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  certifications: string[];
  projects: string[];
  degree: string;
  institution: string;
  graduationYear: string;
  applicationDate: string;
  status: string;
  matchScore: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  projectRelevance: number;
  ranking: string;
  explanation: string;
  interviewStatus: string;
  interviewDate: string;
  interviewScore: string;
};

const candidates: Record<string, Candidate> = {
  "1": {
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    company: "TechNova",
    email: "rahul.kumar@example.com",
    phone: "+91 98765 43210",
    location: "Chennai, India",
    experience: "2.5 Years",
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    certifications: ["AWS Cloud Practitioner"],
    projects: [
      "Recruitment Management Platform",
      "AI Resume Matching System",
    ],
    degree: "B.E. Computer Science",
    institution: "XYZ University",
    graduationYear: "2024",
    applicationDate: "Aug 12, 2026",
    status: "SHORTLISTED",
    matchScore: 92,
    skillsMatch: 95,
    experienceMatch: 90,
    educationMatch: 88,
    projectRelevance: 94,
    ranking: "Top 5%",
    explanation:
      "Strong alignment with the required full-stack skills, relevant project experience, and PostgreSQL knowledge.",
    interviewStatus: "Not Scheduled",
    interviewDate: "Not Scheduled",
    interviewScore: "Pending",
  },

  "2": {
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    company: "DataSphere",
    email: "priya.sharma@example.com",
    phone: "+91 98765 12345",
    location: "Bangalore, India",
    experience: "2 Years",
    skills: ["Python", "TensorFlow", "Machine Learning", "SQL"],
    certifications: ["Google Machine Learning Certificate"],
    projects: [
      "Customer Prediction Model",
      "Computer Vision Classification System",
    ],
    degree: "B.E. Artificial Intelligence and Machine Learning",
    institution: "ABC Institute of Technology",
    graduationYear: "2024",
    applicationDate: "Aug 11, 2026",
    status: "SHORTLISTED",
    matchScore: 89,
    skillsMatch: 92,
    experienceMatch: 87,
    educationMatch: 90,
    projectRelevance: 88,
    ranking: "Top 10%",
    explanation:
      "Strong Python and machine learning skills with highly relevant AI projects and academic background.",
    interviewStatus: "Not Scheduled",
    interviewDate: "Not Scheduled",
    interviewScore: "Pending",
  },

  "3": {
    name: "Arjun Patel",
    role: "Backend Developer",
    company: "CloudWorks",
    email: "arjun.patel@example.com",
    phone: "+91 91234 56789",
    location: "Hyderabad, India",
    experience: "1.8 Years",
    skills: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
    certifications: ["Backend Development Certificate"],
    projects: [
      "FastAPI E-Commerce Backend",
      "PostgreSQL Analytics API",
    ],
    degree: "B.Tech Computer Science",
    institution: "DEF University",
    graduationYear: "2025",
    applicationDate: "Aug 10, 2026",
    status: "SHORTLISTED",
    matchScore: 86,
    skillsMatch: 89,
    experienceMatch: 84,
    educationMatch: 85,
    projectRelevance: 87,
    ranking: "Top 15%",
    explanation:
      "Good backend development experience with strong Python, FastAPI, and PostgreSQL skills.",
    interviewStatus: "Not Scheduled",
    interviewDate: "Not Scheduled",
    interviewScore: "Pending",
  },

  "4": {
    name: "Sneha Reddy",
    role: "Frontend Developer",
    company: "AI Labs",
    email: "sneha.reddy@example.com",
    phone: "+91 99887 66554",
    location: "Chennai, India",
    experience: "1.5 Years",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    certifications: ["Frontend Development Certificate"],
    projects: [
      "AI Dashboard Interface",
      "Next.js Recruitment Portal",
    ],
    degree: "B.E. Computer Science",
    institution: "GHI Institute",
    graduationYear: "2025",
    applicationDate: "Aug 8, 2026",
    status: "SHORTLISTED",
    matchScore: 84,
    skillsMatch: 87,
    experienceMatch: 81,
    educationMatch: 84,
    projectRelevance: 86,
    ranking: "Top 20%",
    explanation:
      "Good frontend development skills with relevant React and Next.js project experience.",
    interviewStatus: "Not Scheduled",
    interviewDate: "Not Scheduled",
    interviewScore: "Pending",
  },
};

function ScoreCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-2xl font-bold text-indigo-600">
        {value}%
      </p>
    </div>
  );
}

function ResumePreview({
  candidate,
  onClose,
}: {
  candidate: Candidate;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Resume Preview
            </h2>

            <p className="text-sm text-slate-500">
              {candidate.name} • {candidate.role}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        {/* Resume */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto bg-slate-100 p-6">

          <div className="mx-auto max-w-3xl bg-white p-8 shadow-sm">

            {/* Resume Header */}
            <div className="border-b border-slate-200 pb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                {candidate.name}
              </h1>

              <p className="mt-1 text-lg font-medium text-indigo-600">
                {candidate.role}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <span>{candidate.email}</span>
                <span>{candidate.phone}</span>
                <span>{candidate.location}</span>
              </div>
            </div>

            {/* Professional Summary */}
            <section className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">
                Professional Summary
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                {candidate.experience} experienced{" "}
                {candidate.role} with strong technical skills,
                relevant project experience and a strong
                alignment with the requirements of the position.
              </p>
            </section>

            {/* Skills */}
            <section className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">
                Technical Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">
                Experience
              </h3>

              <div className="mt-2">
                <p className="font-semibold text-slate-800">
                  {candidate.role}
                </p>

                <p className="text-sm text-slate-500">
                  {candidate.experience}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Relevant professional experience in{" "}
                  {candidate.role.toLowerCase()} with practical
                  experience in the technologies listed above.
                </p>
              </div>
            </section>

            {/* Projects */}
            <section className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">
                Projects
              </h3>

              <div className="mt-3 space-y-3">
                {candidate.projects.map((project) => (
                  <div key={project}>
                    <p className="font-semibold text-slate-800">
                      {project}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Developed and implemented project features
                      using relevant technologies and development
                      practices.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">
                Education
              </h3>

              <p className="mt-2 font-semibold text-slate-800">
                {candidate.degree}
              </p>

              <p className="text-sm text-slate-500">
                {candidate.institution} •{" "}
                {candidate.graduationYear}
              </p>
            </section>

            {/* Certifications */}
            <section className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">
                Certifications
              </h3>

              <ul className="mt-2 space-y-1">
                {candidate.certifications.map((certification) => (
                  <li
                    key={certification}
                    className="text-sm text-slate-600"
                  >
                    • {certification}
                  </li>
                ))}
              </ul>
            </section>

            {/* AI Evaluation */}
            <section className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">
                HireMind AI Evaluation
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Overall Match
                  </p>

                  <p className="mt-1 text-xl font-bold text-indigo-600">
                    {candidate.matchScore}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Skills
                  </p>

                  <p className="mt-1 font-bold text-slate-700">
                    {candidate.skillsMatch}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Experience
                  </p>

                  <p className="mt-1 font-bold text-slate-700">
                    {candidate.experienceMatch}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Projects
                  </p>

                  <p className="mt-1 font-bold text-slate-700">
                    {candidate.projectRelevance}%
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const candidate = candidates[params.id];

  const [showResume, setShowResume] = useState(false);

  if (!candidate) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Candidate Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The requested candidate could not be found.
          </p>

          <Link
            href="/shortlisted"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Shortlisted Candidates
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  function downloadResume() {
    const resumeText = `
${candidate.name}
${candidate.role}

CONTACT
Email: ${candidate.email}
Phone: ${candidate.phone}
Location: ${candidate.location}

PROFESSIONAL SUMMARY
${candidate.experience} experienced ${candidate.role}.

TECHNICAL SKILLS
${candidate.skills.join(", ")}

CERTIFICATIONS
${candidate.certifications.join("\n")}

PROJECTS
${candidate.projects.join("\n")}

EDUCATION
${candidate.degree}
${candidate.institution}
Graduation Year: ${candidate.graduationYear}

HIREMIND AI EVALUATION
Overall Match: ${candidate.matchScore}%
Skills Match: ${candidate.skillsMatch}%
Experience Match: ${candidate.experienceMatch}%
Education Match: ${candidate.educationMatch}%
Project Relevance: ${candidate.projectRelevance}%

AI Ranking: ${candidate.ranking}

AI Explanation:
${candidate.explanation}
`;

    const blob = new Blob([resumeText], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${candidate.name.replace(/\s+/g, "_")}_Resume.txt`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout>

      {/* Back */}
      <div className="mb-6">
        <Link
          href="/shortlisted"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Shortlisted Candidates
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-100 text-2xl font-bold text-indigo-600">
              {candidate.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {candidate.name}
              </h1>

              <p className="mt-1 font-medium text-slate-700">
                {candidate.role}
              </p>

              <p className="text-sm text-slate-500">
                {candidate.company}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
              {candidate.status}
            </span>

            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
              AI Match {candidate.matchScore}%
            </span>

          </div>
        </div>
      </div>

      {/* Personal Information */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Personal Information
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-xs text-slate-400">
              Email
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.email}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Phone
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.phone}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Location
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.location}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Experience
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.experience}
            </p>
          </div>

        </div>
      </section>

      {/* Professional Information */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Professional Information
        </h2>

        <div className="mt-5">

          <p className="text-xs text-slate-400">
            Technical Skills
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>

        <div className="mt-6">

          <p className="text-xs text-slate-400">
            Certifications
          </p>

          <ul className="mt-2 space-y-2">
            {candidate.certifications.map(
              (certification) => (
                <li
                  key={certification}
                  className="text-sm text-slate-700"
                >
                  • {certification}
                </li>
              )
            )}
          </ul>

        </div>

        <div className="mt-6">

          <p className="text-xs text-slate-400">
            Projects
          </p>

          <ul className="mt-2 space-y-2">
            {candidate.projects.map((project) => (
              <li
                key={project}
                className="text-sm text-slate-700"
              >
                • {project}
              </li>
            ))}
          </ul>

        </div>

      </section>

      {/* Education */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Education
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-3">

          <div>
            <p className="text-xs text-slate-400">
              Degree
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.degree}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Institution
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.institution}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Graduation Year
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.graduationYear}
            </p>
          </div>

        </div>
      </section>

      {/* Application Information */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Application Information
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-xs text-slate-400">
              Job Applied For
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.role}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Application Date
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.applicationDate}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Current Status
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              {candidate.status}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Recruitment Stage
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              Shortlisted
            </p>
          </div>

        </div>
      </section>

      {/* AI Evaluation */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              AI Evaluation
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explainable candidate evaluation based on job relevance.
            </p>
          </div>

          <div className="text-right">

            <p className="text-xs text-slate-400">
              Overall Match
            </p>

            <p className="text-3xl font-bold text-indigo-600">
              {candidate.matchScore}%
            </p>

          </div>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <ScoreCard
            label="Skills Match"
            value={candidate.skillsMatch}
          />

          <ScoreCard
            label="Experience Match"
            value={candidate.experienceMatch}
          />

          <ScoreCard
            label="Education Match"
            value={candidate.educationMatch}
          />

          <ScoreCard
            label="Project Relevance"
            value={candidate.projectRelevance}
          />

        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-5">

          <p className="text-sm font-semibold text-slate-700">
            AI Ranking
          </p>

          <p className="mt-1 text-sm text-indigo-600">
            {candidate.ranking}
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            AI Explanation
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {candidate.explanation}
          </p>

        </div>

      </section>

      {/* Interview Information */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Interview Information
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-3">

          <div>
            <p className="text-xs text-slate-400">
              Interview Status
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.interviewStatus}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Interview Date
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.interviewDate}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Interview Score
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {candidate.interviewScore}
            </p>
          </div>

        </div>

      </section>

      {/* Candidate Actions */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Candidate Actions
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">

          {/* VIEW RESUME */}
          <button
            type="button"
            onClick={() => setShowResume(true)}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View Resume
          </button>

          {/* DOWNLOAD RESUME */}
          <button
            type="button"
            onClick={downloadResume}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
          >
            Download Resume
          </button>

          {/* SCHEDULE INTERVIEW */}
          <button
            type="button"
            onClick={() =>
              alert(
                `Interview scheduling opened for ${candidate.name}.`
              )
            }
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
          >
            Schedule Interview
          </button>

        </div>

      </section>

      {/* Resume Modal */}
      {showResume && (
        <ResumePreview
          candidate={candidate}
          onClose={() => setShowResume(false)}
        />
      )}

    </DashboardLayout>
  );
}