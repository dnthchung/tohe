// src/pages/home.tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Backgrounds
import bg1 from "/images/bg1.png";
import bg2 from "/images/bg2.png";
import bg3 from "/images/bg3.png";

// Custom backgrounds
import biaChiHang from "/images/Bìa chị hằng.png";
import biaChuCuoi from "/images/Bìa chú cuội.png";
import biaNenTrongSuot from "/images/Bìa nền trong suốt.png";
import bia from "/images/Bìa.png";

// Characters
import chiHang from "/images/Chị Hằng.png";
import chuCuoi from "/images/Chú cuội.png";

// Background variations
import nenGradient from "/images/Nền gradient.png";
import nenHongNhat from "/images/Nền hồng nhạt.png";
import nenHong from "/images/Nền hồng.png";
import nenSang from "/images/Nền sáng.png";

// Decorative & Parallax
import nightSky from "/images/night-sky-998641.jpg";
import sub1 from "/images/sub1.png";
import sub2 from "/images/sub2.png";
import subSvg1 from "/images/sub1.svg";
import subSvg2 from "/images/sub2.svg";

export function HomePage() {
  const { t } = useTranslation("home");

  // Set --scroll custom property on root for parallax math
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      {/* Parallax decorative layers (always visible) */}
      <img
        src={sub2}
        className="fixed left-0 bottom-0 w-[50vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * -1))" }}
        alt="sub2"
      />

      <img
        src={sub1}
        className="fixed right-0 bottom-0 w-[50vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * 1))" }}
        alt="sub1"
      />

      {/* -------------- FIRST SCREEN -------------- */}
      <section className="relative h-screen flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${nenGradient})` }}>
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md will-change-transform transition-transform duration-300 ease-out" style={{ transform: "translateY(calc(var(--scroll) * 0.2))" }}>
          Welcome to TOHE
        </h1>
      </section>

      {/* -------------- SECTION 1 -------------- */}
      <section className="h-screen flex items-center justify-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${nenSang})` }}>
        <p className="text-lg font-bold leading-relaxed whitespace-pre-line max-w-3xl">{t("poem") || "This is the poem section. Centered and full‑screen."}</p>
      </section>

      {/* -------------- SECTION 2 -------------- */}
      <section className="h-screen flex items-center justify-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${nenSang})` }}>
        <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section1") || "Section 1 content goes here."}</p>
      </section>

      {/* -------------- SECTION 3 -------------- */}
      <section className="h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${bg2})` }}>
        <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
        <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section2") || "Section 2 content goes here."}</p>
      </section>

      {/* -------------- SECTION 4 -------------- */}
      <section className="h-screen flex flex-col justify-center items-center text-center text-white bg-cover bg-center px-6" style={{ backgroundImage: `url(${bg2})` }}>
        <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
        <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section3") || "Section 3 content goes here."}</p>
      </section>
    </div>
  );
}
