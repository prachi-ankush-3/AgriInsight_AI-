import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden text-emerald-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-4 sm:px-5 md:px-8 md:pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
