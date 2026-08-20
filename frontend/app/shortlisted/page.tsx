"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { useState } from "react";

type Candidate = {
  id: number;
  name: string;
  role: string;
  company: string;
  matchScore: number;
  experience: string;
  skills: string[];
  applied: string;
  status: string;
  summary: string;
  education: string;
  projects: string[];
  aptitude: string;
  technical: string;
  assessment: string;
  communication: string;
};

const shortlistedCandidates: Candidate[] = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    company: "TechNova",
    matchScore: 92,
    experience: "2.5 Years",
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    applied: "Aug 12, 2026",
    status: "Shortlisted",

    summary:
      "Strong full-stack candidate with relevant experience in modern web development, backend APIs, and PostgreSQL.",

    education: "B.E. Computer Science and Engineering",

    projects: [
      "Recruitment Management Platform",
      "E-Commerce Web Application",
      "Real-Time Chat Application",
    ],

    aptitude: "Passed",
    technical: "Passed",
    assessment: "Passed",
    communication: "Passed",
  },

  {
    id: 2,
    name: "Priya Sharma",
    role: "AI/ML Engineer",
    company: "DataSphere",
    matchScore: 89,
    experience: "2 Years",
    skills: ["Python", "TensorFlow", "Machine Learning", "SQL"],
    applied: "Aug 11, 2026",
    status: "Shortlisted",

    summary:
      "Strong AI/ML profile with practical machine learning experience and good alignment with the technical requirements.",

    education: "B.Tech Artificial Intelligence and Machine Learning",

    projects: [
      "Customer Churn Prediction",
      "Image Classification System",
      "AI Recommendation Engine",
    ],

    aptitude: "Passed",
    technical: "Passed",
    assessment: "Passed",
    communication: "Passed",
  },

  {
    id: 3,
    name: "Arjun Patel",
    role: "Backend Developer",
    company: "CloudWorks",
    matchScore: 86,
    experience: "1.8 Years",
    skills: ["Python", "FastAPI", "PostgreSQL", "REST API"],
    applied: "Aug 10, 2026",
    status: "Shortlisted",

    summary:
      "Backend-focused candidate with strong Python, API development, database, and server-side development skills.",

    education: "B.E. Computer Science and Engineering",

    projects: [
      "FastAPI Banking API",
      "Employee Management System",
      "Cloud-Based REST API",
    ],

    aptitude: "Passed",
    technical: "Passed",
    assessment: "Pending",
    communication: "Passed",
  },

  {
    id: 4,
    name: "Sneha Reddy",
    role: "Frontend Developer",
    company: "AI Labs",
    matchScore: 84,
    experience: "1.5 Years",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    applied: "Aug 8, 2026",
    status: "Shortlisted",

    summary:
      "Frontend developer with strong React and Next.js experience and good UI development and responsive design skills.",

    education: "B.Tech Computer Science and Engineering",

    projects: [
      "AI Dashboard",
      "Online Learning Platform",
      "Responsive Portfolio Website",
    ],

    aptitude: "Passed",
    technical: "Passed",
    assessment: "Passed",
    communication: "Passed",
  },
];

function getMatchStyle(score: number) {
  if (score >= 90) {
    return "text-green-600";
  }

  if (score >= 80) {
    return "text-indigo-600";
  }

  return "text-yellow-600";
}

function getEvaluationStyle(value: string) {
  if (value === "Passed") {
    return "bg-green-50 text-green-600";
  }

  if (value === "Pending") {
    return "bg-yellow-50 text-yellow-600";
  }

  return "bg-slate-50 text-slate-600";
}

export default function ShortlistedPage() {
  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const [showResume, setShowResume] = useState(false);

  const averageMatch = Math.round(
    shortlistedCandidates.reduce(
      (sum, candidate) => sum + candidate.matchScore,
      0
    ) / shortlistedCandidates.length
  );

  const readyForInterview = shortlistedCandidates.filter(
    (candidate) =>
      candidate.aptitude === "Passed" &&
      candidate.technical === "Passed" &&
      candidate.assessment === "Passed" &&
      candidate.communication === "Passed"
  ).length;

  function downloadResume(candidate: Candidate) {
    const resumeText = `
HIREMIND AI
CANDIDATE RESUME
====================================

NAME
${candidate.name}

ROLE
${candidate.role}

COMPANY
${candidate.company}

PROFESSIONAL SUMMARY
${candidate.summary}

EXPERIENCE
${candidate.experience}

EDUCATION
${candidate.education}

TECHNICAL SKILLS
${candidate.skills.join(", ")}

PROJECTS
${candidate.projects.map((project) => `- ${project}`).join("\n")}

AI MATCH SCORE
${candidate.matchScore}%

EVALUATION STATUS
Aptitude Test: ${candidate.aptitude}
Technical Test: ${candidate.technical}
Assessment: ${candidate.assessment}
Communication: ${candidate.communication}

Applied On
${candidate.applied}

Generated by HireMind AI Recruitment Platform
`;

    const blob = new Blob([resumeText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${candidate.name.replace(
      /\s+/g,
      "_"
    )}_Resume.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Shortlisted Candidates
        </h1>

        <p className="mt-2 text-slate-500">
          Review shortlisted candidates, AI evaluations, resumes, and
          recruitment readiness.
        </p>
      </div>

      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="mb-8 grid gap-5 md:grid-cols-3">

        {/* TOTAL SHORTLISTED */}
        <Link
          href="/shortlisted/total"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">

            <div>
              <p className="text-sm text-slate-500">
                Total Shortlisted
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {shortlistedCandidates.length}
              </h2>
            </div>

            <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
              View Details
            </span>

          </div>

          <p className="mt-3 text-sm text-slate-500">
            Candidates selected for further evaluation.
          </p>

          <p className="mt-4 text-xs font-semibold text-indigo-600">
            View shortlisted candidate details →
          </p>
        </Link>


        {/* AVERAGE MATCH */}
        <Link
          href="/shortlisted/match"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">

            <div>
              <p className="text-sm text-slate-500">
                Average Match
              </p>

              <h2 className="mt-2 text-3xl font-bold text-indigo-600">
                {averageMatch}%
              </h2>
            </div>

            <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
              Analytics
            </span>

          </div>

          <p className="mt-3 text-sm text-slate-500">
            Average AI candidate-job match.
          </p>

          <p className="mt-4 text-xs font-semibold text-indigo-600">
            View graphs and AI analytics →
          </p>
        </Link>


        {/* READY FOR INTERVIEW */}
        <Link
          href="/shortlisted/interviews"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">

            <div>
              <p className="text-sm text-slate-500">
                Ready for Interview
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {readyForInterview}
              </h2>
            </div>

            <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600">
              View Stages
            </span>

          </div>

          <p className="mt-3 text-sm text-slate-500">
            Candidates ready for the interview stage.
          </p>

          <p className="mt-4 text-xs font-semibold text-green-600">
            View interview readiness →
          </p>
        </Link>

      </div>


      {/* =====================================================
          EXISTING CANDIDATE LIST
          ===================================================== */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Shortlisted Candidates
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review candidate evaluations and access their resumes.
          </p>

        </div>

        <div className="divide-y divide-slate-100">

          {shortlistedCandidates.map((candidate) => (

            <div
              key={candidate.id}
              className="p-6 transition hover:bg-slate-50"
            >

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                {/* Candidate */}
                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                    {candidate.name.charAt(0)}
                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-slate-900">
                      {candidate.name}
                    </h3>

                    <p className="text-sm font-medium text-slate-700">
                      {candidate.role}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {candidate.company}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Applied on {candidate.applied}
                    </p>

                  </div>

                </div>


                {/* Candidate Details */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                  {/* AI Match */}
                  <div>

                    <p className="text-xs text-slate-400">
                      AI Match
                    </p>

                    <p
                      className={`mt-1 text-xl font-bold ${getMatchStyle(
                        candidate.matchScore
                      )}`}
                    >
                      {candidate.matchScore}%
                    </p>

                  </div>


                  {/* Experience */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Experience
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {candidate.experience}
                    </p>

                  </div>


                  {/* Evaluation */}
                  <div className="grid grid-cols-2 gap-2 text-xs">

                    <span
                      className={`rounded-full px-3 py-1 font-medium ${getEvaluationStyle(
                        candidate.aptitude
                      )}`}
                    >
                      Aptitude: {candidate.aptitude}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 font-medium ${getEvaluationStyle(
                        candidate.technical
                      )}`}
                    >
                      Technical: {candidate.technical}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 font-medium ${getEvaluationStyle(
                        candidate.assessment
                      )}`}
                    >
                      Assessment: {candidate.assessment}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 font-medium ${getEvaluationStyle(
                        candidate.communication
                      )}`}
                    >
                      Communication: {candidate.communication}
                    </span>

                  </div>


                  {/* Status */}
                  <span className="rounded-full bg-green-50 px-4 py-2 text-center text-xs font-semibold text-green-600">
                    {candidate.status}
                  </span>


                  {/* View Evaluation */}
                  <button
                    type="button"
                    onClick={() => setSelectedCandidate(candidate)}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View Evaluation
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          EVALUATION MODAL
          ===================================================== */}

      {selectedCandidate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">

          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
                  {selectedCandidate.name.charAt(0)}
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedCandidate.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {selectedCandidate.role} •{" "}
                    {selectedCandidate.company}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg px-3 py-1 text-2xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>

            </div>


            <div className="p-6">

              {/* Candidate Overview */}
              <section>

                <h3 className="text-xl font-semibold text-slate-900">
                  Candidate Overview
                </h3>

                <div className="mt-4 grid gap-4 md:grid-cols-4">

                  <InfoBox
                    label="AI Match"
                    value={`${selectedCandidate.matchScore}%`}
                  />

                  <InfoBox
                    label="Experience"
                    value={selectedCandidate.experience}
                  />

                  <InfoBox
                    label="Company"
                    value={selectedCandidate.company}
                  />

                  <InfoBox
                    label="Status"
                    value="Shortlisted"
                  />

                </div>

              </section>


              {/* Evaluation */}
              <section className="mt-7">

                <h3 className="text-xl font-semibold text-slate-900">
                  Candidate Evaluation
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  AI-assisted evaluation across recruitment stages.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">

                  <EvaluationBox
                    label="Aptitude Test"
                    value={selectedCandidate.aptitude}
                  />

                  <EvaluationBox
                    label="Technical Test"
                    value={selectedCandidate.technical}
                  />

                  <EvaluationBox
                    label="Assessment"
                    value={selectedCandidate.assessment}
                  />

                  <EvaluationBox
                    label="Communication"
                    value={selectedCandidate.communication}
                  />

                </div>

              </section>


              {/* Resume */}
              <section className="mt-7 rounded-xl border border-slate-200 bg-white">

                <div className="border-b border-slate-200 p-5">

                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div>

                      <h3 className="text-xl font-semibold text-slate-900">
                        Candidate Resume
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Review the candidate&apos;s resume and professional
                        background.
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <button
                        type="button"
                        onClick={() => setShowResume(true)}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        View Resume
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          downloadResume(selectedCandidate)
                        }
                        className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
                      >
                        Download Resume
                      </button>

                    </div>

                  </div>

                </div>


                {/* Resume Preview */}
                <div className="p-6">

                  <div className="rounded-xl bg-slate-50 p-6">

                    <div className="border-b border-slate-200 pb-5">

                      <h4 className="text-2xl font-bold text-slate-900">
                        {selectedCandidate.name}
                      </h4>

                      <p className="mt-1 font-medium text-indigo-600">
                        {selectedCandidate.role}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {selectedCandidate.company}
                      </p>

                    </div>


                    <div className="mt-5 grid gap-6 md:grid-cols-2">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Professional Summary
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {selectedCandidate.summary}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Education
                        </p>

                        <p className="mt-2 text-sm text-slate-600">
                          {selectedCandidate.education}
                        </p>

                      </div>

                    </div>


                    <div className="mt-6">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Technical Skills
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">

                        {selectedCandidate.skills.map((skill) => (

                          <span
                            key={skill}
                            className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-600"
                          >
                            {skill}
                          </span>

                        ))}

                      </div>

                    </div>


                    <div className="mt-6">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Projects
                      </p>

                      <ul className="mt-3 space-y-2">

                        {selectedCandidate.projects.map((project) => (

                          <li
                            key={project}
                            className="text-sm text-slate-600"
                          >
                            • {project}
                          </li>

                        ))}

                      </ul>

                    </div>

                  </div>

                </div>

              </section>


              {/* Actions */}
              <div className="mt-7 flex flex-wrap justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCandidate(null);
                    window.location.href = "/interviews";
                  }}
                  className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Schedule Interview
                </button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          FULL RESUME MODAL
          ===================================================== */}

      {showResume && selectedCandidate && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-4">

          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Resume
                </h2>

                <p className="text-sm text-slate-500">
                  {selectedCandidate.name}
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowResume(false)}
                className="rounded-lg px-3 py-1 text-2xl text-slate-400 hover:bg-slate-100"
              >
                ×
              </button>

            </div>


            <div className="p-8">

              {/* Resume Header */}
              <div className="border-b border-slate-200 pb-6">

                <h1 className="text-3xl font-bold text-slate-900">
                  {selectedCandidate.name}
                </h1>

                <p className="mt-2 text-lg font-medium text-indigo-600">
                  {selectedCandidate.role}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedCandidate.company}
                </p>

              </div>


              <ResumeSection title="Professional Summary">

                <p className="leading-7 text-slate-600">
                  {selectedCandidate.summary}
                </p>

              </ResumeSection>


              <ResumeSection title="Experience">

                <p className="text-slate-600">
                  {selectedCandidate.experience} of relevant
                  professional experience.
                </p>

              </ResumeSection>


              <ResumeSection title="Education">

                <p className="text-slate-600">
                  {selectedCandidate.education}
                </p>

              </ResumeSection>


              <ResumeSection title="Technical Skills">

                <div className="flex flex-wrap gap-2">

                  {selectedCandidate.skills.map((skill) => (

                    <span
                      key={skill}
                      className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </ResumeSection>


              <ResumeSection title="Projects">

                <div className="space-y-3">

                  {selectedCandidate.projects.map((project) => (

                    <div
                      key={project}
                      className="rounded-lg bg-slate-50 p-4"
                    >
                      <p className="font-medium text-slate-800">
                        {project}
                      </p>
                    </div>

                  ))}

                </div>

              </ResumeSection>


              <ResumeSection title="AI Evaluation">

                <div className="grid gap-4 md:grid-cols-2">

                  <EvaluationBox
                    label="AI Match"
                    value={`${selectedCandidate.matchScore}%`}
                  />

                  <EvaluationBox
                    label="Aptitude Test"
                    value={selectedCandidate.aptitude}
                  />

                  <EvaluationBox
                    label="Technical Test"
                    value={selectedCandidate.technical}
                  />

                  <EvaluationBox
                    label="Assessment"
                    value={selectedCandidate.assessment}
                  />

                  <EvaluationBox
                    label="Communication"
                    value={selectedCandidate.communication}
                  />

                </div>

              </ResumeSection>


              <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">

                <button
                  type="button"
                  onClick={() =>
                    downloadResume(selectedCandidate)
                  }
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Download Resume
                </button>

                <button
                  type="button"
                  onClick={() => setShowResume(false)}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}


/* =========================================================
   INFO BOX
   ========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   EVALUATION BOX
   ========================================================= */

function EvaluationBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const passed =
    value === "Passed" ||
    value.endsWith("%");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 font-semibold ${
          passed
            ? "text-green-600"
            : value === "Pending"
            ? "text-yellow-600"
            : "text-slate-700"
        }`}
      >
        {passed && value === "Passed" ? "✓ " : ""}
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   RESUME SECTION
   ========================================================= */

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">

      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <div className="mt-3">
        {children}
      </div>

    </section>
  );
}