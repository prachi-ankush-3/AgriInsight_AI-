import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const initialForm = {
  email: '',
  password: '',
}

export default function LoginPage() {
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [navigate, user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(formData)
      const targetPath = location.state?.from?.pathname || '/'
      navigate(targetPath, { replace: true })
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10 text-emerald-50">
      <div className="grid w-full max-w-5xl gap-8 overflow-hidden rounded-[2rem] border border-emerald-100/15 bg-emerald-950/50 shadow-2xl shadow-black/25 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-700 p-8 md:p-12">
          <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-lime-300/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="relative space-y-6">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide text-white/90">
              Secure Access
            </span>
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
                Sign in to inspect crops and manage analysis history.
              </h1>
              <p className="max-w-xl text-sm leading-6 text-emerald-50/80 md:text-base">
                The dashboard is locked until a user authenticates. Use the demo credentials on the
                right to enter the application.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/15 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100/80">
                Demo credentials
              </p>
              <div className="mt-3 space-y-2 text-sm text-white/90">
                <p>Email: admin@agriinsight.ai</p>
                <p>Password: Agri1234!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-8 md:p-12">
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100/70">
                Welcome back
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-white">Login</h2>
              <p className="mt-2 text-sm leading-6 text-emerald-50/70">
                Enter the credentials to continue into the app.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-emerald-50/80">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@agriinsight.ai"
                  className="w-full rounded-2xl border border-emerald-100/15 bg-emerald-950/50 px-4 py-3 text-emerald-50 outline-none transition placeholder:text-emerald-50/35 focus:border-emerald-200/60"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-emerald-50/80">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Agri1234!"
                  className="w-full rounded-2xl border border-emerald-100/15 bg-emerald-950/50 px-4 py-3 text-emerald-50 outline-none transition placeholder:text-emerald-50/35 focus:border-emerald-200/60"
                  autoComplete="current-password"
                  required
                />
              </label>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-emerald-200 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}