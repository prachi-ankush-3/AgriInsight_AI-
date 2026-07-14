import { useLocation, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../api/client'

const fallbackResult = null

const severityStyles = {
  Mild: 'bg-emerald-300/25 text-emerald-100',
  Moderate: 'bg-amber-300/25 text-amber-100',
  Severe: 'bg-red-300/25 text-red-100',
}

function normalizeReportUrl(reportUrl) {
  if (!reportUrl) {
    return ''
  }
  if (/^https?:\/\//i.test(reportUrl)) {
    return reportUrl
  }
  return `${API_BASE_URL}${reportUrl.startsWith('/') ? '' : '/'}${reportUrl}`
}

function parseSeverity(treatment = '') {
  const match = treatment.match(/severity:\s*([a-z]+)/i)
  if (!match) {
    return 'Moderate'
  }
  const value = match[1].toLowerCase()
  if (value === 'high') {
    return 'Severe'
  }
  if (value === 'low') {
    return 'Mild'
  }
  return 'Moderate'
}

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const result = state ?? fallbackResult
  const severity = parseSeverity(result?.treatment)
  const reportUrl = normalizeReportUrl(result?.report_url)

  if (!result) {
    return (
      <section className="space-y-6">
        <div className="float-in">
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">Scan Result Report</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/75 sm:text-base">
            No report selected. Upload a leaf image or open a report from history.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-full bg-emerald-200 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-100"
            onClick={() => navigate('/upload')}
          >
            Upload Image
          </button>
          <button
            type="button"
            className="rounded-full border border-emerald-100/30 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-100/10"
            onClick={() => navigate('/history')}
          >
            Open History
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="float-in">
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">Scan Result Report</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/75 sm:text-base">
          AI-generated summary for <span className="font-semibold">{result.image_name}</span>
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <article className="glass float-in rounded-2xl p-4 sm:p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold tracking-wide text-emerald-100/80 uppercase">Disease</h2>
          <p className="font-heading mt-2 text-2xl font-bold text-white sm:text-3xl">{result.disease}</p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-emerald-100/80">
              <span>Confidence</span>
              <span>{result.confidence}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-emerald-950/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lime-300 to-emerald-300"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="text-sm text-emerald-100/80">Severity:</span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                severityStyles[severity] ?? 'bg-slate-300/20 text-slate-100'
              }`}
            >
              {severity}
            </span>
          </div>
        </article>

        <article className="glass float-in stagger-1 rounded-2xl p-4 sm:p-5">
          <h2 className="font-heading text-lg font-bold text-emerald-100">Recommended Action</h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80">{result.treatment}</p>
        </article>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="glass float-in stagger-2 rounded-2xl p-4 sm:p-5">
          <h3 className="font-heading text-lg font-bold text-emerald-100">Weather Advisory</h3>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80">{result.weather}</p>
        </article>

        <article className="glass float-in stagger-2 rounded-2xl p-4 sm:p-5">
          <h3 className="font-heading text-lg font-bold text-emerald-100">Next Steps</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-50/80">
            <li>Isolate infected plants if possible.</li>
            <li>Repeat scan after 3 to 5 days.</li>
            <li>Track progress from the history tab.</li>
          </ul>
        </article>
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
        {reportUrl && (
          <a
            href={reportUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-100/30 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-100/10 sm:w-auto"
          >
            Download PDF Report
          </a>
        )}
        <button
          type="button"
          className="rounded-full bg-emerald-200 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-100 sm:w-auto"
          onClick={() => navigate('/upload')}
        >
          Scan Again
        </button>
        <button
          type="button"
          className="rounded-full border border-emerald-100/30 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-100/10 sm:w-auto"
          onClick={() => navigate('/history')}
        >
          View History
        </button>
      </div>
    </section>
  )
}
