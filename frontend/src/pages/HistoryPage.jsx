import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/client'
import { useAuth } from '../context/AuthContext'

const statusStyles = {
  Stable: 'bg-emerald-300/25 text-emerald-100',
  Attention: 'bg-red-300/20 text-red-100',
  Moderate: 'bg-amber-300/25 text-amber-100',
}

export default function HistoryPage() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    let isMounted = true

    const loadHistory = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await apiRequest('/history', { token })

        if (isMounted) {
          setItems(response?.data?.items ?? [])
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to fetch history.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadHistory()

    return () => {
      isMounted = false
    }
  }, [token])

  const getStatusLabel = (item) => {
    const diseaseName = item.disease?.toLowerCase() || ''

    if (diseaseName.includes('healthy')) {
      return 'Stable'
    }

    if (item.confidence >= 90) {
      return 'Attention'
    }

    return 'Moderate'
  }

  const filteredHistory = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) return items

    return items.filter(
      (item) =>
        item.disease.toLowerCase().includes(normalized) ||
        getStatusLabel(item).toLowerCase().includes(normalized) ||
        (item.created_at || '').toLowerCase().includes(normalized),
    )
  }, [items, query])

  const handleDelete = async (predictionId) => {
    try {
      await apiRequest(`/history/${predictionId}`, {
        method: 'DELETE',
        token,
      })

      setItems((current) =>
        current.filter((entry) => entry.id !== predictionId),
      )
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete report.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="float-in">
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Scan History
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/75 sm:text-base">
          Review previous reports and monitor crop health trends.
        </p>
      </div>

      <div className="glass float-in stagger-1 rounded-2xl p-4 md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by disease, date, or status"
            className="min-w-0 w-full flex-1 rounded-xl border border-emerald-100/25 bg-emerald-950/45 px-4 py-2.5 text-sm text-emerald-50 outline-none ring-0 placeholder:text-emerald-100/40 focus:border-emerald-100/40"
          />

          <button
            type="button"
            className="w-full rounded-xl border border-emerald-100/30 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-100/10 sm:w-auto"
          >
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <p className="rounded-xl border border-emerald-100/25 bg-emerald-950/50 px-4 py-4 text-sm text-emerald-100/80">
            Loading history...
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-4 text-sm text-rose-100">
            {error}
          </p>
        )}

        {!isLoading && filteredHistory.length === 0 ? (
          <p className="rounded-xl border border-emerald-100/25 bg-emerald-950/50 px-4 py-4 text-sm text-emerald-100/80">
            No reports found for your search.
          </p>
        ) : (
          filteredHistory.map((item, idx) => (
            <article
              key={item.id}
              className={`glass float-in rounded-2xl p-4 md:p-5 ${
                idx > 0 ? 'stagger-1' : ''
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-emerald-100/70 uppercase">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>

                  <h3 className="font-heading mt-1 text-xl font-bold text-white">
                    {item.disease}
                  </h3>

                  <p className="mt-1 text-sm text-emerald-50/75">
                    Confidence: {item.confidence}%
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      statusStyles[getStatusLabel(item)] ??
                      'bg-slate-300/20 text-slate-100'
                    }`}
                  >
                    {getStatusLabel(item)}
                  </span>

                  <button
                    type="button"
                    className="rounded-full bg-emerald-200 px-4 py-2 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100"
                    onClick={() => navigate('/result', { state: item })}
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-rose-300/40 px-4 py-2 text-xs font-bold text-rose-100 transition hover:bg-rose-500/15"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
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