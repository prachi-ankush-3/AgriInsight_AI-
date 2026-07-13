import { createContext, useContext, useState } from 'react'

const AUTH_STORAGE_KEY = 'agriinsight_auth_user'
const DEMO_CREDENTIALS = {
  email: 'admin@agriinsight.ai',
  password: 'Agri1234!',
}

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  const login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (
      normalizedEmail !== DEMO_CREDENTIALS.email ||
      password !== DEMO_CREDENTIALS.password
    ) {
      throw new Error('Invalid email or password.')
    }

    const nextUser = { email: normalizedEmail }
    setUser(nextUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}