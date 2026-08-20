"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

export default function CreateOfferPage() {
  const router = useRouter();

  const [candidate, setCandidate] = useState("Rahul Kumar");
  const [email, setEmail] = useState("rahul.kumar@example.com");
  const [role, setRole] = useState("AI/ML Engineer");
  const [department, setDepartment] = useState(
    "Artificial Intelligence"
  );
  const [salary, setSalary] = useState("800000");
  const [location, setLocation] = useState("Chennai");
  const [joiningDate, setJoiningDate] = useState("2026-09-15");
  const [employmentType, setEmploymentType] =
    useState("Full Time");
  const [probation, setProbation] = useState("6 Months");
  const [workingHours, setWorkingHours] =
    useState("9:00 AM – 6:00 PM");
  const [rules, setRules] = useState(
    "Maintain confidentiality of company information.\nFollow the company code of conduct.\nFollow working hours and attendance policies.\nProtect company data and systems.\nComply with applicable company policies."
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Demo flow for now.
    // Backend persistence and email sending will be connected in Step 3/4.
    alert("Offer generated successfully!");

    router.push("/hr/offers");
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
              Generate Offer
            </h1>

            <p className="mt-2 text-slate-500">
              Create an employment offer for a selected candidate.
            </p>
          </div>

          <Link
            href="/hr/offers"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Back to Offers
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Candidate Information */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Candidate Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Details of the selected candidate.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Candidate Name"
                value={candidate}
                onChange={setCandidate}
              />

              <Input
                label="Candidate Email"
                type="email"
                value={email}
                onChange={setEmail}
              />

              <Input
                label="Job Position"
                value={role}
                onChange={setRole}
              />

              <Input
                label="Department"
                value={department}
                onChange={setDepartment}
              />
            </div>
          </section>

          {/* Offer Summary */}
          <section className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
              Offer Summary
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {role}
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {candidate}
            </p>

            <div className="mt-6 space-y-4">
              <SummaryItem
                label="Annual CTC"
                value={`₹${Number(salary || 0).toLocaleString("en-IN")}`}
              />

              <SummaryItem
                label="Location"
                value={location}
              />

              <SummaryItem
                label="Employment"
                value={employmentType}
              />

              <SummaryItem
                label="Joining"
                value={joiningDate || "Not selected"}
              />
            </div>
          </section>

          {/* Employment Details */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Employment Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Define the basic terms of employment.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Annual CTC (₹)"
                type="number"
                value={salary}
                onChange={setSalary}
              />

              <Input
                label="Work Location"
                value={location}
                onChange={setLocation}
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Joining Date
                </label>

                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) =>
                    setJoiningDate(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Employment Type
                </label>

                <select
                  value={employmentType}
                  onChange={(e) =>
                    setEmploymentType(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Probation Period
                </label>

                <select
                  value={probation}
                  onChange={(e) =>
                    setProbation(e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>None</option>
                </select>
              </div>

              <Input
                label="Working Hours"
                value={workingHours}
                onChange={setWorkingHours}
              />
            </div>
          </section>

          {/* Company Rules */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Company Rules & Terms
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                These terms will appear in the candidate's offer letter.
              </p>
            </div>

            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              rows={7}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-indigo-500"
              placeholder="Enter company rules and employment terms..."
            />

            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              <Rule text="Confidentiality" />
              <Rule text="Code of Conduct" />
              <Rule text="Attendance Policy" />
              <Rule text="Data Security" />
              <Rule text="Company Policies" />
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="font-semibold text-slate-900">
                Ready to create this offer?
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                You can review the complete offer before sending it to the
                candidate.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hr/offers"
                className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Generate Offer →
              </button>
            </div>
          </div>
        </div>
      </form>
    </HRDashboardLayout>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
      />
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-indigo-100 pb-3 last:border-0">
      <p className="text-xs text-indigo-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-3 text-center text-xs font-medium text-slate-600">
      ✓ {text}
    </div>
  );
}