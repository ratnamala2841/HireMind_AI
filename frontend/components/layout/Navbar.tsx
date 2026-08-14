export default function Navbar() {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Welcome back 👋
          </h2>
          <p className="text-xs text-slate-500">
            Manage your recruitment journey
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 hover:bg-slate-100">
            🔔
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              Y
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Yaseen
              </p>
              <p className="text-xs text-slate-500">
                Candidate
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}