// src/components/layout/Header.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

// logo (lấy tạm vite.svg; đổi path tuỳ dự án)
import Logo from "/vite.svg";

export function Header() {
  const { t, i18n } = useTranslation("header");
  const { pathname } = useLocation();

  const navItems = [
    { key: "home", path: "/" },
    { key: "term1", path: "/term1" },
    { key: "term2", path: "/term2" },
    { key: "term3", path: "/term3" },
    { key: "products", path: "/products" },
    { key: "connect", path: "/connect" },
    { key: "faq", path: "/faq" },
  ];

  const toggleLang = () => i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");

  return (
    // <header className="w-full py-3 px-4 flex justify-center fixed top-0 left-0 right-0 z-50">
    <header className="w-full py-3 px-4 flex justify-center fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/20 to-transparent">
      {/* “viên thuốc”  */}
      <div className="w-full max-w-6xl rounded-full bg-slate-100 dark:bg-slate-800/60 shadow-sm">
        {/* hàng chính */}
        <div className="flex items-center justify-between h-14 px-4">
          {/* logo + nav desktop */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex-shrink-0">
              <img src={Logo} alt="TOHE" className="h-8 w-8" />
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              {navItems.map(({ key, path }) => (
                <Link
                  key={key}
                  to={path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${pathname === path ? "bg-slate-300/60 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/60"}`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* đổi ngôn ngữ */}
          <Button variant="ghost" size="sm" onClick={toggleLang} className="font-semibold text-xs">
            {i18n.language.toUpperCase()}
          </Button>
        </div>

        {/* nav mobile */}
        <nav className="md:hidden flex flex-wrap gap-2 pb-4 px-4">
          {navItems.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${pathname === path ? "bg-slate-300/60 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/60"}`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
