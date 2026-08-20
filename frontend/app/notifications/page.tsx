"use client";

import CandidateDashboardLayout from "@/components/layout/CandidateDashboardLayout";
import { useState } from "react";

type Notification = {
  id: number;
  type: "application" | "interview" | "resume" | "assessment";
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "application",
    title: "Application Submitted",
    message:
      "Your application for AI/ML Intern at TechNova was submitted successfully.",
    time: "Today",
    unread: true,
  },
  {
    id: 2,
    type: "interview",
    title: "Interview Update",
    message:
      "Your interview schedule will appear here when a recruiter schedules an interview.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 3,
    type: "resume",
    title: "Resume Ready",
    message:
      "Your resume is ready for AI-powered analysis and job matching.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 4,
    type: "assessment",
    title: "New Assessment Available",
    message:
      "A new technical assessment is available in your Candidate dashboard.",
    time: "3 days ago",
    unread: false,
  },
];

function getIcon(type: Notification["type"]) {
  switch (type) {
    case "application":
      return "📋";
    case "interview":
      return "📅";
    case "resume":
      return "🤖";
    case "assessment":
      return "💻";
    default:
      return "🔔";
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  }

  return (
    <CandidateDashboardLayout>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="mt-2 text-slate-500">
            Stay updated about your applications, interviews and career
            activity.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification Summary */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Notifications
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {notifications.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Unread
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {unreadCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Recent Activity
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            Active
          </p>
        </div>
      </div>

      {/* Notifications */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
              🔔
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No notifications
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You're all caught up. New activity will appear here.
            </p>
          </div>
        ) : (
          <div>
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`flex flex-col gap-4 p-6 transition hover:bg-slate-50 md:flex-row md:items-start ${
                  index !== notifications.length - 1
                    ? "border-b border-slate-100"
                    : ""
                } ${
                  notification.unread
                    ? "bg-indigo-50/40"
                    : "bg-white"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                    notification.unread
                      ? "bg-indigo-100"
                      : "bg-slate-100"
                  }`}
                >
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-slate-900">
                      {notification.title}
                    </h2>

                    {notification.unread && (
                      <span className="rounded-full bg-indigo-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        New
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {notification.time}
                  </p>
                </div>

                {/* Action */}
                {notification.unread && (
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="shrink-0 self-start rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Notification Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage how you receive important Candidate updates.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">
              📋 Applications
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Application status updates
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">
              📅 Interviews
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Interview scheduling alerts
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">
              💼 Job Matches
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Relevant job recommendations
            </p>
          </div>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}