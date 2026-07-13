export default function AppLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-lime-300 via-emerald-300 to-teal-400 p-[2px] shadow-lg shadow-emerald-900/40">
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-emerald-950/90">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-emerald-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3c4.5 1.5 8 5.2 9 9.8c-4.2.6-7.6-.3-10.2-2.4C8 8.3 6.4 5.8 5.6 3.2C7.7 2.6 9.9 2.5 12 3Z" />
            <path d="M11 11c-1 3.2-3.4 5.8-7 7.2" />
          </svg>
        </div>
      </div>
      <div>
        <p className="font-heading text-lg leading-5 font-bold text-white">AgriInsight AI</p>
        <p className="text-xs text-emerald-100/80">Smart Crop Diagnosis</p>
      </div>
    </div>
  )
}
