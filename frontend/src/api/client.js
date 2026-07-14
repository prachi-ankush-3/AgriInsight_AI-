const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '')

function buildErrorMessage(payload, status) {
  if (payload && typeof payload === 'object') {
    if (typeof payload.message === 'string' && payload.message.trim()) {
      return payload.message
    }
    if (typeof payload.detail === 'string' && payload.detail.trim()) {
      return payload.detail
    }
  }
  return `Request failed (${status})`
}

export async function apiRequest(path, options = {}) {
  const { method = 'GET', token, body, headers = {} } = options
  const finalHeaders = { ...headers }

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`
  }

  const isFormData = body instanceof FormData
  if (body && !isFormData) {
    finalHeaders['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    throw new Error(buildErrorMessage(payload, response.status))
  }

  return payload
}

export { API_BASE_URL }
