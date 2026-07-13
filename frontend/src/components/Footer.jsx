export default function Footer() {
  return (
    <footer className="mt-12 border-t border-emerald-100/20 bg-emerald-950/45">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-heading text-lg font-bold text-emerald-100">AgriInsight AI</h3>
          <p className="mt-2 text-sm text-emerald-50/70">
            AI-powered leaf disease detection with quick reports and diagnosis history.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-emerald-100">Core Features</h4>
          <ul className="mt-2 space-y-1 text-sm text-emerald-50/70">
            <li>Disease Detection</li>
            <li>Fast Analysis</li>
            <li>AI Report</li>
            <li>History Tracking</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-emerald-100">Built For</h4>
          <p className="mt-2 text-sm text-emerald-50/70">
            Farmers, agronomists, and crop advisors who need fast visual diagnostics.
          </p>
        </div>
      </div>
      <p className="border-t border-emerald-100/10 px-5 py-4 text-center text-xs text-emerald-50/60 md:px-8">
        Copyright {new Date().getFullYear()} AgriInsight AI. All rights reserved.
      </p>
    </footer>
  )
}
