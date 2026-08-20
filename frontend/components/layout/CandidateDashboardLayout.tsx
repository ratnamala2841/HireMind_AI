import CandidateSidebar from "./CandidateSidebar";
import CandidateNavbar from "./CandidateNavbar";

export default function CandidateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <CandidateSidebar />
      <CandidateNavbar />

      <main className="ml-64 pt-16">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}