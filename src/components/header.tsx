"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Link, useLocation } from "react-router-dom"
import { Globe } from "lucide-react"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const location = useLocation()

  const navigationItems = [
    { key: "home", path: "/" },
    { key: "term1", path: "/term1" },
    { key: "term2", path: "/term2" },
    { key: "term3", path: "/term3" },
    { key: "products", path: "/products" },
    { key: "connect", path: "/connect" },
    { key: "faq", path: "/faq" },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en")
  }

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              TOHE
            </Link>
            <nav className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-slate-700 ${
                    location.pathname === item.path ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language.toUpperCase()}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
