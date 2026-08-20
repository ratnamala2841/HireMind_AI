"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

type CandidateStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Selected"
  | "Rejected";

type Candidate = {
  id: number;
  name: string;
  role: string;
  company: string;
  matchScore: number;
  experience: string;
  skills: string[];
  applied: string;
  status: CandidateStatus;

  email: string;
  phone: string;
  location: string;
  degree: string;
  institution: string;
  graduationYear: string;
  certifications: string[];
  projects: string[];
};

const candidates: Candidate[] = [
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
    email: "rahul.kumar@example.com",
    phone: "+91 98765 43210",
    location: "Chennai, India",
    degree: "B.E. Computer Science",
    institution: "XYZ University",
    graduationYear: "2024",
    certifications: ["AWS Cloud Practitioner"],
    projects: [
      "Recruitment Management Platform",
      "AI Resume Matching System",
    ],
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
    email: "priya.sharma@example.com",
    phone: "+91 98765 12345",
    location: "Bangalore, India",
    degree: "B.E. Artificial Intelligence and Machine Learning",
    institution: "ABC Institute of Technology",
    graduationYear: "2024",
    certifications: ["Google Machine Learning Certificate"],
    projects: [
      "Customer Prediction Model",
      "Computer Vision Classification System",
    ],
  },

  {
    id: 3,
    name: "Arjun Patel",
    role: "Backend Developer",
    company: "CloudWorks",
    matchScore: 86,
    experience: "1.8 Years",
    skills: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
    applied: "Aug 10, 2026",
    status: "Interview",
    email: "arjun.patel@example.com",
    phone: "+91 91234 56789",
    location: "Hyderabad, India",
    degree: "B.Tech Computer Science",
    institution: "DEF University",
    graduationYear: "2025",
    certifications: ["Backend Development Certificate"],
    projects: [
      "FastAPI E-Commerce Backend",
      "PostgreSQL Analytics API",
    ],
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
    status: "Under Review",
    email: "sneha.reddy@example.com",
    phone: "+91 99887 66554",
    location: "Chennai, India",
    degree: "B.E. Computer Science",
    institution: "GHI Institute",
    graduationYear: "2025",
    certifications: ["Frontend Development Certificate"],
    projects: [
      "AI Dashboard Interface",
      "Next.js Recruitment Portal",
    ],
  },

  {
    id: 5,
    name: "Vikram Singh",
    role: "Machine Learning Engineer",
    company: "TechNova",
    matchScore: 81,
    experience: "2 Years",
    skills: ["Python", "PyTorch", "NLP"],
    applied: "Aug 7, 2026",
    status: "Under Review",
    email: "vikram.singh@example.com",
    phone: "+91 98765 67890",
    location: "Mumbai, India",
    degree: "B.Tech Artificial Intelligence",
    institution: "National Institute of Technology",
    graduationYear: "2024",
    certifications: ["Deep Learning Specialization"],
    projects: [
      "Natural Language Processing System",
      "Sentiment Analysis Platform",
    ],
  },

  {
    id: 6,
    name: "Ananya Iyer",
    role: "Software Engineer",
    company: "DataSphere",
    matchScore: 78,
    experience: "1.2 Years",
    skills: ["Java", "Spring Boot", "MySQL"],
    applied: "Aug 6, 2026",
    status: "Applied",
    email: "ananya.iyer@example.com",
    phone: "+91 98765 11223",
    location: "Bangalore, India",
    degree: "B.E. Computer Science",
    institution: "Anna University",
    graduationYear: "2025",
    certifications: ["Java Programming Certificate"],
    projects: [
      "Enterprise Employee Management System",
      "Spring Boot REST API",
    ],
  },

  {
    id: 7,
    name: "Karthik Rao",
    role: "Data Analyst",
    company: "CloudWorks",
    matchScore: 75,
    experience: "1 Year",
    skills: ["Python", "SQL", "Power BI"],
    applied: "Aug 5, 2026",
    status: "Applied",
    email: "karthik.rao@example.com",
    phone: "+91 98765 44556",
    location: "Chennai, India",
    degree: "B.Sc. Data Science",
    institution: "Madras University",
    graduationYear: "2025",
    certifications: ["Microsoft Power BI Certification"],
    projects: [
      "Sales Analytics Dashboard",
      "Business Intelligence Reporting System",
    ],
  },

  {
    id: 8,
    name: "Meera Nair",
    role: "Generative AI Engineer",
    company: "AI Labs",
    matchScore: 94,
    experience: "3 Years",
    skills: ["Python", "LLMs", "LangChain"],
    applied: "Aug 4, 2026",
    status: "Selected",
    email: "meera.nair@example.com",
    phone: "+91 98765 77889",
    location: "Kochi, India",
    degree: "M.Tech Artificial Intelligence",
    institution: "Kerala Technological University",
    graduationYear: "2023",
    certifications: ["Generative AI Professional Certificate"],
    projects: [
      "Enterprise AI Copilot",
      "LLM-Based Recruitment Assistant",
    ],
  },
];

const statusOptions = [
  "All",
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

function getStatusStyle(status: CandidateStatus) {
  switch (status) {
    case "Shortlisted":
      return "bg-green-50 text-green-600";

    case "Interview":
      return "bg-blue-50 text-blue-600";

    case "Selected":
      return "bg-emerald-50 text-emerald-600";

    case "Under Review":
      return "bg-yellow-50 text-yellow-600";

    case "Rejected":
      return "bg-red-50 text-red-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getMatchStyle(score: number) {
  if (score >= 90) {
    return "text-green-600";
  }

  if (score >= 80) {
    return "text-indigo-600";
  }

  return "text-yellow-600";
}

function ResumeModal({
  candidate,
  onClose,
}: {
  candidate: Candidate;
  onClose: () => void;
}) {
  const downloadResume = () => {
    const resumeText = `
HIREMIND AI - CANDIDATE RESUME

${candidate.name}
${candidate.role}
${candidate.company}

CONTACT INFORMATION
Email: ${candidate.email}
Phone: ${candidate.phone}
Location: ${candidate.location}

PROFESSIONAL SUMMARY
${candidate.name} is a ${candidate.role} with ${candidate.experience} of
professional experience. The candidate has applied for a position at
${candidate.company}.

EDUCATION
Degree: ${candidate.degree}
Institution: ${candidate.institution}
Graduation Year: ${candidate.graduationYear}

SKILLS
${candidate.skills.map((skill) => `• ${skill}`).join("\n")}

CERTIFICATIONS
${candidate.certifications.map((item) => `• ${item}`).join("\n")}

PROJECTS
${candidate.projects.map((item) => `• ${item}`).join("\n")}

AI RECRUITMENT EVALUATION
AI Match Score: ${candidate.matchScore}%
Application Date: ${candidate.applied}
Recruitment Status: ${candidate.status}

Generated by HireMind AI
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Resume Preview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {candidate.name} • {candidate.role}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {/* Resume */}
        <div className="p-8">
          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <div className="border-b border-slate-200 pb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                {candidate.name}
              </h1>

              <p className="mt-2 text-lg font-medium text-indigo-600">
                {candidate.role}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {candidate.company}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                <span>{candidate.email}</span>
                <span>{candidate.phone}</span>
                <span>{candidate.location}</span>
              </div>
            </div>

            {/* Summary */}
            <section className="mt-7">
              <h3 className="text-lg font-bold text-slate-900">
                Professional Summary
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {candidate.name} is a {candidate.role} with{" "}
                {candidate.experience} of professional experience.
                The candidate has demonstrated relevant technical
                skills and project experience for the applied role.
              </p>
            </section>

            {/* Education */}
            <section className="mt-7">
              <h3 className="text-lg font-bold text-slate-900">
                Education
              </h3>

              <div className="mt-3 rounded-lg bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">
                  {candidate.degree}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {candidate.institution}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Graduation: {candidate.graduationYear}
                </p>
              </div>
            </section>

            {/* Skills */}
            <section className="mt-7">
              <h3 className="text-lg font-bold text-slate-900">
                Technical Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="mt-7">
              <h3 className="text-lg font-bold text-slate-900">
                Certifications
              </h3>

              <ul className="mt-3 space-y-2">
                {candidate.certifications.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-slate-600"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Projects */}
            <section className="mt-7">
              <h3 className="text-lg font-bold text-slate-900">
                Projects
              </h3>

              <ul className="mt-3 space-y-2">
                {candidate.projects.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-slate-600"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* AI Evaluation */}
            <section className="mt-7">
              <h3 className="text-lg font-bold text-slate-900">
                HireMind AI Evaluation
              </h3>

              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-indigo-50 p-4">
                  <p className="text-xs text-slate-500">
                    AI Match
                  </p>

                  <p
                    className={`mt-1 text-2xl font-bold ${getMatchStyle(
                      candidate.matchScore
                    )}`}
                  >
                    {candidate.matchScore}%
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Experience
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {candidate.experience}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Status
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {candidate.status}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400"
          >
            Close
          </button>

          <button
            type="button"
            onClick={downloadResume}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        candidate.name.toLowerCase().includes(searchValue) ||
        candidate.role.toLowerCase().includes(searchValue) ||
        candidate.company.toLowerCase().includes(searchValue) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchValue)
        );

      const matchesStatus =
        statusFilter === "All" ||
        candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalCandidates = candidates.length;

  const shortlistedCount = candidates.filter(
    (candidate) => candidate.status === "Shortlisted"
  ).length;

  const underReviewCount = candidates.filter(
    (candidate) => candidate.status === "Under Review"
  ).length;

  const interviewCount = candidates.filter(
    (candidate) => candidate.status === "Interview"
  ).length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          All Candidates
        </h1>

        <p className="mt-2 text-slate-500">
          Review, evaluate, and manage candidates across your
          recruitment pipeline.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Candidates
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {totalCandidates}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Across all applications
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Shortlisted
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {shortlistedCount}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Ready for next stage
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Under Review
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {underReviewCount}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Awaiting evaluation
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Interviews
          </p>

          <h2 className="mt-2 text-3xl font-bold text-indigo-600">
            {interviewCount}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Candidates in interview
          </p>
        </div>
      </div>

      {/* Candidates Container */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Candidate Pipeline
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and filter candidates based on their profile
                and recruitment status.
              </p>
            </div>

            <div className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredCandidates.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {totalCandidates}
              </span>{" "}
              candidates
            </div>
          </div>

          {/* Search + Filter */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by name, role, company, or skill..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "All"
                    ? "All Statuses"
                    : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Candidate List */}
        {filteredCandidates.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="p-6 transition hover:bg-slate-50"
              >
                <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
                  {/* Candidate Information */}
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
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:items-center">
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

                    {/* Skills */}
                    <div className="sm:col-span-2 xl:min-w-64">
                      <p className="text-xs text-slate-400">
                        Key Skills
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="mb-2 text-xs text-slate-400">
                        Status
                      </p>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-semibold ${getStatusStyle(
                          candidate.status
                        )}`}
                      >
                        {candidate.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/candidates/${candidate.id}`}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCandidate(candidate)
                        }
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        Review Resume
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              🔍
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No candidates found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
              className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Resume Modal */}
      {selectedCandidate && (
        <ResumeModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </DashboardLayout>
  );
}