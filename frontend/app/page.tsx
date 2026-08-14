import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <div className="text-2xl font-bold">
          Hire<span className="text-indigo-400">Mind</span>
          <span className="text-sm ml-1 text-indigo-300">AI</span>
        </div>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-slate-600 hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-24 text-center">
        <div className="inline-block px-4 py-2 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
          🤖 AI-Powered Recruitment Platform
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Hire Smarter.
          <br />
          <span className="text-indigo-400">Recruit Better.</span>
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-400">
          HireMind AI helps recruiters understand candidates, match resumes
          with jobs, explain rankings and make better hiring decisions.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/register"
            className="px-7 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold"
          >
            Start Recruiting →
          </Link>

          <Link
            href="/login"
            className="px-7 py-3 rounded-lg border border-slate-600 hover:bg-slate-800 font-semibold"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Intelligent Recruitment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            icon="📄"
            title="AI Resume Parsing"
            description="Extract candidate skills, experience and education automatically."
          />

          <Feature
            icon="🎯"
            title="Resume–Job Matching"
            description="Match candidates with jobs using intelligent scoring."
          />

          <Feature
            icon="📊"
            title="Explainable Ranking"
            description="Understand why a candidate received their match score."
          />

          <Feature
            icon="⚖️"
            title="Fair Screening"
            description="Support fair and blind candidate screening."
          />

          <Feature
            icon="🧠"
            title="AI Interview Assistant"
            description="Generate interview questions and summarize feedback."
          />

          <Feature
            icon="📈"
            title="Recruitment Intelligence"
            description="Track hiring metrics and identify recruitment bottlenecks."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-slate-500">
        © 2026 HireMind AI — Intelligent Recruitment Platform
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition">
      <div className="text-3xl mb-4">{icon}</div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-slate-400">{description}</p>
    </div>
  );
}