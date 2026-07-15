import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../api/client'

const AUTH_STORAGE_KEY = 'agriinsight_auth_session'

const AuthContext = createContext(null)

function readStoredSession() {
  try {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY)
    return storedSession ? JSON.parse(storedSession) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession())
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    const restoreSession = async () => {
      const stored = readStoredSession()
      if (!stored?.token) {
        if (isMounted) {
          setSession(null)
          setIsAuthReady(true)
        }
        return
      }

      try {
        const response = await apiRequest('/auth/me', { token: stored.token })
        if (isMounted) {
          const nextSession = { token: stored.token, user: response.data }
          setSession(nextSession)
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession))
        }
      } catch {
        if (isMounted) {
          setSession(null)
          localStorage.removeItem(AUTH_STORAGE_KEY)
        }
      } finally {
        if (isMounted) {
          setIsAuthReady(true)
        }
      }
    }

    restoreSession()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async ({ email, password }) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: {
        email: email.trim().toLowerCase(),
        password,
      },
    })

    const token = response?.data?.token?.access_token
    const user = response?.data?.user
    if (!token || !user) {
      throw new Error('Login response is invalid.')
    }

    const nextSession = { token, user }
    setSession(nextSession)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession))
  }

  const logout = () => {
    setSession(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthReady,
      login,
      logout,
    }),
    [session, isAuthReady],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}