import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-plant.svg'

const features = [
  {
    title: 'Disease Detection',
    description: 'Detect leaf diseases quickly from a single image with AI-powered analysis.',
  },
  {
    title: 'Fast Analysis',
    description: 'Get diagnosis results in seconds so action can be taken immediately.',
  },
  {
    title: 'History',
    description: 'Track previous scans and compare crop health trends over time.',
  },
  {
    title: 'AI Report',
    description: 'Review confidence, severity, and treatment guidance in one report.',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-14">
      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-6 float-in">
          <span className="inline-flex rounded-full border border-emerald-200/30 bg-emerald-200/10 px-4 py-1 text-xs font-semibold tracking-wide text-emerald-100">
            Intelligent Leaf Diagnostics
          </span>
          <h1 className="font-heading text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Protect Your Crops With Smarter Plant Health Insights
          </h1>
          <p className="max-w-xl text-sm leading-6 text-emerald-50/80 sm:text-base md:text-lg">
            Upload a leaf image, analyze disease risk instantly, and manage all reports from one
            clean dashboard made for real farming workflows.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-full bg-emerald-200 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-100 sm:w-auto"
            >
              Get Started
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center justify-center rounded-full border border-emerald-100/30 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-100/10 sm:w-auto"
            >
              View History
            </Link>
          </div>
        </div>

        <div className="relative float-in stagger-1">
          <div className="absolute -top-4 -left-2 h-24 w-24 rounded-full bg-lime-300/20 blur-2xl" />
          <div className="absolute -right-3 -bottom-4 h-28 w-28 rounded-full bg-emerald-300/25 blur-2xl" />
          <div className="glass relative rounded-3xl p-4 sm:p-5">
            <img
              src={heroImg}
              alt="Farmer and leaf diagnosis illustration"
              className="mx-auto h-auto w-full max-w-md rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="float-in stagger-2">
          <h2 className="font-heading text-3xl font-bold text-white">Features</h2>
          <p className="text-emerald-50/75">Everything needed for quick and reliable disease screening.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`glass float-in rounded-2xl p-5 ${index > 1 ? 'stagger-3' : 'stagger-2'}`}
            >
              <h3 className="font-heading text-xl font-bold text-emerald-100">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/80">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
