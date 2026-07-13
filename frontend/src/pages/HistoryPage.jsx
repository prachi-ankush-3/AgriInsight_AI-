import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const scanHistory = [
  { id: 1, date: '12 July', disease: 'Healthy', status: 'Stable', confidence: 99 },
  { id: 2, date: '10 July', disease: 'Leaf Spot', status: 'Attention', confidence: 91 },
  { id: 3, date: '08 July', disease: 'Powdery Mildew', status: 'Moderate', confidence: 95 },
  { id: 4, date: '05 July', disease: 'Healthy', status: 'Stable', confidence: 98 },
]

const statusStyles = {
  Stable: 'bg-emerald-300/25 text-emerald-100',
  Attention: 'bg-red-300/20 text-red-100',
  Moderate: 'bg-amber-300/25 text-amber-100',
}

export default function HistoryPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filteredHistory = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return scanHistory
    }

    return scanHistory.filter(
      (item) =>
        item.disease.toLowerCase().includes(normalized) ||
        item.status.toLowerCase().includes(normalized) ||
        item.date.toLowerCase().includes(normalized),
    )
  }, [query])

  return (
    <section className="space-y-6">
      <div className="float-in">
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">Scan History</h1>
        <p className="mt-2 text-emerald-50/75">Review previous reports and monitor crop health trends.</p>
      </div>

      <div className="glass float-in stagger-1 rounded-2xl p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by disease, date, or status"
            className="min-w-[220px] flex-1 rounded-xl border border-emerald-100/25 bg-emerald-950/45 px-4 py-2.5 text-sm text-emerald-50 outline-none ring-0 placeholder:text-emerald-100/40 focus:border-emerald-100/40"
          />
          <button
            type="button"
            className="rounded-xl border border-emerald-100/30 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-100/10"
          >
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <p className="rounded-xl border border-emerald-100/25 bg-emerald-950/50 px-4 py-4 text-sm text-emerald-100/80">
            No reports found for your search.
          </p>
        ) : (
          filteredHistory.map((item, idx) => (
            <article
              key={item.id}
              className={`glass float-in rounded-2xl p-4 md:p-5 ${idx > 0 ? 'stagger-1' : ''}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-emerald-100/70 uppercase">{item.date}</p>
                  <h3 className="font-heading mt-1 text-xl font-bold text-white">{item.disease}</h3>
                  <p className="mt-1 text-sm text-emerald-50/75">Confidence: {item.confidence}%</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      statusStyles[item.status] ?? 'bg-slate-300/20 text-slate-100'
                    }`}
                  >
                    {item.status}
                  </span>
                  <button
                    type="button"
                    className="rounded-full bg-emerald-200 px-4 py-2 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100"
                    onClick={() => navigate('/result')}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
