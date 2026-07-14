import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AppLogo from './AppLogo'
import { useAuth } from '../context/AuthContext'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Upload', path: '/upload' },
  { label: 'Result', path: '/result' },
  { label: 'History', path: '/history' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const getLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-emerald-200 text-emerald-950'
        : 'text-emerald-50/90 hover:bg-emerald-50/15'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100/20 bg-emerald-950/55 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5 md:px-8 md:py-4">
        <Link to="/" className="shrink-0">
          <AppLogo />
        </Link>

        <button
          type="button"
          className="rounded-md border border-emerald-100/20 p-2 text-emerald-100 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((item) => (
            <NavLink key={item.path} to={item.path} className={getLinkClass}>
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
            className="rounded-full border border-emerald-100/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-50/15"
          >
            Logout
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mx-4 mb-4 rounded-2xl border border-emerald-50/20 bg-emerald-900/85 p-3 shadow-xl shadow-black/20 md:hidden sm:mx-5">
          <div className="flex flex-col gap-2">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={getLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                logout()
                navigate('/login', { replace: true })
              }}
              className="rounded-full border border-emerald-100/20 px-4 py-2 text-left text-sm font-semibold text-emerald-100 transition hover:bg-emerald-50/15"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
