import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const previewUrl = useMemo(() => {
    if (!selectedImage) {
      return ''
    }
    return URL.createObjectURL(selectedImage)
  }, [selectedImage])

  const handleFileSelect = (file) => {
    if (!file) {
      return
    }

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

  const handleAnalyze = () => {
    if (!selectedImage) {
      setError('No image selected. Please upload a leaf image first.')
      return
    }

    setError('')
    setIsLoading(true)

    // Simulate an API call before moving to result page.
    setTimeout(() => {
      navigate('/result', {
        state: {
          imageName: selectedImage.name,
          previewUrl,
          disease: 'Powdery Mildew',
          confidence: 97,
          severity: 'Moderate',
          treatment:
            'Apply sulfur-based fungicide early morning and avoid excessive overhead watering.',
          cause: 'Warm days + humid nights created ideal conditions for fungal growth.',
        },
      })
      setIsLoading(false)
    }, 1200)
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="float-in">
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">Upload Leaf Image</h1>
        <p className="mt-2 text-emerald-50/75">Drag and drop a crop leaf image or browse from your device.</p>
      </div>

      <div
        className="glass float-in stagger-1 rounded-3xl border-2 border-dashed border-emerald-100/35 p-8 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-xl font-semibold text-emerald-100">Upload Image</p>
        <p className="mt-2 text-sm text-emerald-50/70">Drag and Drop Here</p>

        <label className="mt-6 inline-flex cursor-pointer rounded-full bg-emerald-200 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-emerald-100">
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
        <div className="glass float-in stagger-2 rounded-2xl p-4">
          <h2 className="font-heading text-lg font-bold text-emerald-100">Image Preview</h2>
          <img
            src={previewUrl}
            alt="Selected leaf preview"
            className="mt-3 max-h-[340px] w-full rounded-xl object-cover"
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
        className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-900 border-r-transparent" />
            Analyzing...
          </>
        ) : (
          'Analyze'
        )}
      </button>
    </section>
  )
}
