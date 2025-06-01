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

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      {/* Parallax layers */}
      <img
        src={biaChuCuoi}
        className="fixed left-0 bottom-0 w-[80vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * -1))" }}
        alt="sub2"
      />
      <img
        src={biaChiHang}
        className="fixed right-0 bottom-0 w-[80vw] z-10 pointer-events-none will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * 1))" }}
        alt="sub1"
      />

      {/* SECTION 1 - Welcome */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenGradient} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <h1
          className="relative z-10 text-4xl md:text-6xl font-bold drop-shadow-md will-change-transform transition-transform duration-300 ease-out"
          style={{ transform: "translateY(calc(var(--scroll) * 0.2))" }}
        >
          Welcome to TOHE
        </h1>
      </section>

      {/* SECTION 2 - Poem */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-lg font-bold leading-relaxed whitespace-pre-line max-w-3xl">{t("poem") || "This is the poem section. Centered and full‑screen."}</p>
        </div>
      </section>

      {/* SECTION 3 - Content 1 */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section1") || "Section 1 content goes here."}</p>
        </div>
      </section>

      {/* SECTION 4 - Chuyện tò he 1 */}
      <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden">
        <img src={bg2} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
          <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section2") || "Section 2 content goes here."}</p>
        </div>
      </section>

      {/* SECTION 5 - Chuyện tò he 2 */}
      <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden">
        <img src={bg2} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">CHUYỆN TÒ HE</h2>
          <p className="max-w-3xl text-lg font-medium leading-relaxed whitespace-pre-line">{t("section3") || "Section 3 content goes here."}</p>
        </div>
      </section>
    </div>
  );
}
