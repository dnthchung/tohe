// src/components/layout/header.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Logo from "/vite.svg";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { t, i18n } = useTranslation("header");
  const { pathname } = useLocation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const navItems = [
    { key: "home", path: "/" },
    { key: "term1", path: "/term1" },
    { key: "term2", path: "/term2" },
    { key: "term3", path: "/term3" },
    { key: "products", path: "/products" },
    { key: "connect", path: "/connect" },
    { key: "faq", path: "/faq" },
  ];

  const toggleLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <header className="w-full py-3 px-4 flex justify-center fixed top-0 left-0 right-0 z-50">
      <div className="w-full max-w-6xl rounded-full bg-slate-800/70 backdrop-blur-md shadow-sm">
        {/* main row */}
        <div className="flex items-center justify-between h-14 px-4 relative">
          {/* logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="TOHE" className="h-8 w-8" />
          </Link>

          {/* nav center */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4">
            {navItems.map(({ key, path }) => (
              <Link
                key={key}
                to={path}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${pathname === path ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}
                  after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-white
                  after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* language dropdown */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="font-semibold text-xs text-white hover:bg-white/10 flex items-center gap-1" onClick={() => setShowLangMenu(!showLangMenu)}>
              {i18n.language.toUpperCase()}
              <ChevronDown className="w-3 h-3" />
            </Button>
            {showLangMenu && (
              <div className="absolute right-0 mt-1 bg-white rounded shadow text-sm text-slate-800 z-10">
                <button onClick={() => toggleLang("vi")} className="px-3 py-1 hover:bg-slate-100 w-full text-left">
                  Tiếng Việt
                </button>
                <button onClick={() => toggleLang("en")} className="px-3 py-1 hover:bg-slate-100 w-full text-left">
                  English
                </button>
              </div>
            )}
          </div>
        </div>

        {/* mobile nav */}
        <nav className="md:hidden flex flex-wrap gap-2 pb-4 px-4 justify-center">
          {navItems.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === path ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
