import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [crop, setCrop] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { token } = useAuth()

  const previewUrl = useMemo(() => {
    if (!selectedImage) return ''
    return URL.createObjectURL(selectedImage)
  }, [selectedImage])

  const handleFileSelect = (file) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    setError('')
    setSelectedImage(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    handleFileSelect(file)
  }

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('No image selected. Please upload a leaf image first.')
      return
    }

    setError('')
    setIsLoading(true)

    const formData = new FormData()
    formData.append('crop', crop.trim())
    formData.append('image', selectedImage)

    if (city.trim()) {
      formData.append('city', city.trim())
    }

    try {
      const response = await apiRequest('/predict', {
        method: 'POST',
        token,
        body: formData,
      })

      navigate('/result', {
        state: {
          previewUrl,
          ...response.data,
        },
      })
    } catch (err) {
      setError(err.message || 'Unable to analyze image.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-5 sm:space-y-6">
      <div className="float-in">
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Upload Leaf Image
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/75 sm:text-base">
          Drag and drop a crop leaf image or browse from your device.
        </p>
      </div>

      <div
        className="glass float-in stagger-1 rounded-3xl border-2 border-dashed border-emerald-100/35 p-5 text-center sm:p-8"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="mx-auto mb-5 grid w-full max-w-xl gap-3 text-left sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold tracking-wide text-emerald-100/80 uppercase">
              Crop
            </span>

            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="strawberry or sapota"
              className="w-full rounded-xl border border-emerald-100/25 bg-emerald-950/45 px-3 py-2.5 text-sm text-emerald-50 outline-none placeholder:text-emerald-100/35 focus:border-emerald-100/45"
            />

            <p className="text-xs text-emerald-50/55">
              Type the fruit name directly.
            </p>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold tracking-wide text-emerald-100/80 uppercase">
              City (Optional)
            </span>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Hyderabad"
              className="w-full rounded-xl border border-emerald-100/25 bg-emerald-950/45 px-3 py-2.5 text-sm text-emerald-50 outline-none placeholder:text-emerald-100/35 focus:border-emerald-100/45"
            />
          </label>
        </div>

        <p className="text-xl font-semibold text-emerald-100">
          Upload Image
        </p>

        <p className="mt-2 text-sm text-emerald-50/70">
          Drag and Drop Here
        </p>

        <label className="mt-6 inline-flex w-full max-w-xs cursor-pointer items-center justify-center rounded-full bg-emerald-200 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-100 sm:w-auto">
          Browse

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />
        </label>
      </div>

      {previewUrl && (
        <div className="glass float-in stagger-2 rounded-2xl p-3 sm:p-4">
          <h2 className="font-heading text-lg font-bold text-emerald-100">
            Image Preview
          </h2>

          <img
            src={previewUrl}
            alt="Selected leaf preview"
            className="mt-3 max-h-[260px] w-full rounded-xl object-cover sm:max-h-[340px]"
          />
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-sm font-medium text-red-100">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-900 border-r-transparent"></span>
            Analyzing...
          </>
        ) : (
          'Analyze'
        )}
      </button>
    </section>
  )
}