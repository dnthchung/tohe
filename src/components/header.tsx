// src/components/header.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "/vite.svg";
import { LanguageToggle } from "@/components/languageToggle";

export function Header() {
  const { t } = useTranslation("header");
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: "home", path: "/" },
    { key: "chapter1", path: "/chapter1" },
    { key: "chapter2", path: "/chapter2" },
    { key: "chapter3", path: "/chapter3" },
    { key: "products", path: "/products" },
    { key: "connect", path: "/connect" },
    { key: "faq", path: "/faq" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center py-3 px-4">
      <div
        className={`
          w-full max-w-6xl bg-slate-800/70 backdrop-blur-md shadow-sm
          transition-all duration-300 rounded-none
          ${mobileOpen ? "rounded-b-2xl" : "md:rounded-full"}
        `}
      >
        {/* TOP ROW */}
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="TO HE" className="h-8 w-8" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map(({ key, path }) => (
              <Link
                key={key}
                to={path}
                className={`
                  relative px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${pathname === path ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}
                  after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                  after:bg-white after:scale-x-0 after:transition-transform after:duration-300
                  hover:after:scale-x-100
                `}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Language + Burger */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            {/* Mobile burger button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors" aria-label="Toggle mobile menu">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
            ${mobileOpen ? "max-h-[80vh] py-4" : "max-h-0 py-0"}
          `}
        >
          <nav className="flex flex-col gap-2 px-4 max-h-[70vh] overflow-y-auto">
            {navItems.map(({ key, path }) => (
              <Link
                key={key}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`
                  px-3 py-2 rounded-md text-base font-medium transition-colors
                  ${pathname === path ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}
                `}
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
