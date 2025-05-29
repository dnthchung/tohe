import { Header } from "./header"
import { Outlet } from "react-router-dom"
import { Footer } from "./footer"

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
