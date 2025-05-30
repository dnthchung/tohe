// // src/components/layout/Header.tsx
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";
// import Logo from "/vite.svg";

// export function Header() {
//   const { t, i18n } = useTranslation("header");
//   const { pathname } = useLocation();

//   const navItems = [
//     { key: "home", path: "/" },
//     { key: "term1", path: "/term1" },
//     { key: "term2", path: "/term2" },
//     { key: "term3", path: "/term3" },
//     { key: "products", path: "/products" },
//     { key: "connect", path: "/connect" },
//     { key: "faq", path: "/faq" },
//   ];

//   const toggleLang = () => i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");

//   return (
//     <header className="w-full py-3 px-4 flex justify-center fixed top-0 left-0 right-0 z-50">
//       {/* pill container */}
//       <div className="w-full max-w-6xl rounded-full bg-slate-800/70 backdrop-blur-md shadow-sm">
//         {/* main row */}
//         <div className="flex items-center justify-between h-14 px-4">
//           {/* logo + nav desktop */}
//           <div className="flex items-center gap-6">
//             <Link to="/" className="flex-shrink-0">
//               <img src={Logo} alt="TOHE" className="h-8 w-8" />
//             </Link>

//             <nav className="hidden md:flex items-center gap-4">
//               {navItems.map(({ key, path }) => (
//                 <Link
//                   key={key}
//                   to={path}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === path ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
//                 >
//                   {t(key)}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* language switch */}
//           <Button variant="ghost" size="sm" onClick={toggleLang} className="font-semibold text-xs text-white hover:bg-white/10">
//             {i18n.language.toUpperCase()}
//           </Button>
//         </div>

//         {/* mobile nav */}
//         <nav className="md:hidden flex flex-wrap gap-2 pb-4 px-4">
//           {navItems.map(({ key, path }) => (
//             <Link
//               key={key}
//               to={path}
//               className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === path ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
//             >
//               {t(key)}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }

// src/components/layout/Header.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
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
    <header className="w-full py-3 px-4 flex justify-center fixed top-0 left-0 right-0 z-50">
      {/* pill container */}
      <div className="w-full max-w-6xl rounded-full bg-slate-800/70 backdrop-blur-md shadow-sm">
        {/* main row */}
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
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${pathname === path ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}
                    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-white
                    after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* language switch */}
          <Button variant="ghost" size="sm" onClick={toggleLang} className="font-semibold text-xs text-white hover:bg-white/10">
            {i18n.language.toUpperCase()}
          </Button>
        </div>

        {/* mobile nav */}
        <nav className="md:hidden flex flex-wrap gap-2 pb-4 px-4">
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
