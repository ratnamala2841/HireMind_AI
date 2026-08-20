"use client";

import { useState } from "react";
import Link from "next/link";
import HRDashboardLayout from "@/components/layout/HRDashboardLayout";

type OfferStatus = "Draft" | "Sent" | "Accepted" | "Pending";

type Offer = {
  id: number;
  candidate: string;
  role: string;
  department: string;
  salary: string;
  location: string;
  joiningDate: string;
  employmentType: string;
  status: OfferStatus;
};

const initialOffers: Offer[] = [
  {
    id: 1,
    candidate: "Rahul Kumar",
    role: "AI/ML Engineer",
    department: "Artificial Intelligence",
    salary: "₹8,00,000 / year",
    location: "Chennai",
    joiningDate: "15 Sep 2026",
    employmentType: "Full Time",
    status: "Sent",
  },
  {
    id: 2,
    candidate: "Priya Sharma",
    role: "Backend Developer",
    department: "Engineering",
    salary: "₹7,00,000 / year",
    location: "Bangalore",
    joiningDate: "22 Sep 2026",
    employmentType: "Full Time",
    status: "Accepted",
  },
  {
    id: 3,
    candidate: "Arjun Patel",
    role: "Full Stack Developer",
    department: "Engineering",
    salary: "₹6,50,000 / year",
    location: "Hyderabad",
    joiningDate: "01 Oct 2026",
    employmentType: "Full Time",
    status: "Pending",
  },
  {
    id: 4,
    candidate: "Sneha Reddy",
    role: "Frontend Developer",
    department: "Engineering",
    salary: "₹6,00,000 / year",
    location: "Chennai",
    joiningDate: "05 Oct 2026",
    employmentType: "Full Time",
    status: "Draft",
  },
];

function getStatusStyle(status: OfferStatus) {
  switch (status) {
    case "Accepted":
      return "bg-green-50 text-green-600";

    case "Sent":
      return "bg-blue-50 text-blue-600";

    case "Pending":
      return "bg-yellow-50 text-yellow-600";

    case "Draft":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function HROffersPage() {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | OfferStatus>("All");

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.candidate
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      offer.role.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || offer.status === filter;

    return matchesSearch && matchesFilter;
  });

  function markAsSent(id: number) {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === id
          ? { ...offer, status: "Sent" }
          : offer
      )
    );

    alert("Offer sent successfully!");
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
              Offer Management
            </h1>

            <p className="mt-2 text-slate-500">
              Create, review, and track employment offers for selected
              candidates.
            </p>
          </div>

          <Link
            href="/hr/offers/create"
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            + Generate Offer
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Offers"
          value={String(offers.length)}
          description="Offers created"
        />

        <StatCard
          title="Sent"
          value={String(
            offers.filter((offer) => offer.status === "Sent").length
          )}
          description="Offers delivered"
        />

        <StatCard
          title="Accepted"
          value={String(
            offers.filter((offer) => offer.status === "Accepted").length
          )}
          description="Candidates accepted"
          green
        />

        <StatCard
          title="Pending"
          value={String(
            offers.filter(
              (offer) =>
                offer.status === "Pending" ||
                offer.status === "Draft"
            ).length
          )}
          description="Awaiting response"
        />
      </div>

      {/* Main Card */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Employment Offers
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track offer letters and candidate responses.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search candidate or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "All" | OfferStatus)
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="divide-y divide-slate-100">
          {filteredOffers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl">📄</div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No offers found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-6 transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  {/* Candidate */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                      {offer.candidate.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {offer.candidate}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {offer.role}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {offer.department}
                      </p>
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <p className="text-xs text-slate-400">
                      CTC
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {offer.salary}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {offer.location}
                    </p>
                  </div>

                  {/* Joining */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Joining Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {offer.joiningDate}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${getStatusStyle(
                      offer.status
                    )}`}
                  >
                    {offer.status}
                  </span>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/hr/offers/${offer.id}`}
                      className="rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      View
                    </Link>

                    {offer.status === "Draft" && (
                      <button
                        type="button"
                        onClick={() => markAsSent(offer.id)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        Send
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Information Banner */}
      <section className="mt-6 rounded-xl bg-indigo-600 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-200">
              Automated Offer Workflow
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Send professional offers to selected candidates.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Generate an offer containing job details, salary, joining date,
              employment terms, and company policies. Candidates can review
              and respond to the offer.
            </p>
          </div>

          <Link
            href="/hr/offers/create"
            className="shrink-0 rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Generate Offer
          </Link>
        </div>
      </section>
    </HRDashboardLayout>
  );
}

function StatCard({
  title,
  value,
  description,
  green = false,
}: {
  title: string;
  value: string;
  description: string;
  green?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${
          green ? "text-green-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}