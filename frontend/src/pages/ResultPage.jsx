import { useLocation, useNavigate } from 'react-router-dom'

const fallbackResult = {
  disease: 'Powdery Mildew',
  confidence: 97,
  severity: 'Moderate',
  treatment:
    'Use potassium bicarbonate spray every 7 days and remove heavily infected leaves.',
  cause: 'High humidity and poor airflow around the canopy accelerated fungal spread.',
  imageName: 'sample-leaf.jpg',
}

const severityStyles = {
  Mild: 'bg-emerald-300/25 text-emerald-100',
  Moderate: 'bg-amber-300/25 text-amber-100',
  Severe: 'bg-red-300/25 text-red-100',
}

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const result = { ...fallbackResult, ...(state ?? {}) }

  return (
    <section className="space-y-6">
      <div className="float-in">
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">Scan Result Report</h1>
        <p className="mt-2 text-emerald-50/75">
          AI-generated summary for <span className="font-semibold">{result.imageName}</span>
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <article className="glass float-in rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold tracking-wide text-emerald-100/80 uppercase">Disease</h2>
          <p className="font-heading mt-2 text-3xl font-bold text-white">{result.disease}</p>

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
                severityStyles[result.severity] ?? 'bg-slate-300/20 text-slate-100'
              }`}
            >
              {result.severity}
            </span>
          </div>
        </article>

        <article className="glass float-in stagger-1 rounded-2xl p-5">
          <h2 className="font-heading text-lg font-bold text-emerald-100">Recommended Action</h2>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80">{result.treatment}</p>
        </article>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="glass float-in stagger-2 rounded-2xl p-5">
          <h3 className="font-heading text-lg font-bold text-emerald-100">Likely Cause</h3>
          <p className="mt-3 text-sm leading-6 text-emerald-50/80">{result.cause}</p>
        </article>

        <article className="glass float-in stagger-2 rounded-2xl p-5">
          <h3 className="font-heading text-lg font-bold text-emerald-100">Next Steps</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-50/80">
            <li>Isolate infected plants if possible.</li>
            <li>Repeat scan after 3 to 5 days.</li>
            <li>Track progress from the history tab.</li>
          </ul>
        </article>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="button"
          className="rounded-full bg-emerald-200 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-100"
          onClick={() => navigate('/upload')}
        >
          Scan Again
        </button>
        <button
          type="button"
          className="rounded-full border border-emerald-100/30 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-100/10"
          onClick={() => navigate('/history')}
        >
          View History
        </button>
      </div>
    </section>
  )
}
