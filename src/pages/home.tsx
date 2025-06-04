//home.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import biaChiHang from "/images/Bìa chị hằng.png";
import biaChuCuoi from "/images/Bìa chú cuội.png";
import nenGradient from "/images/Nền gradient.png";
import nenSang from "/images/Nền sáng.png";
import { Copyright } from "@/components/copyright";

// Loading component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-xl font-semibold">Đang tải...</p>
      <p className="text-sm opacity-70 mt-2">Loading resources...</p>
    </div>
  </div>
);

export function HomePage() {
  const { t } = useTranslation("home");
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const imagesToPreload = [biaChiHang, biaChuCuoi, nenGradient, nenSang];

    const preloadImages = async () => {
      try {
        const imagePromises = imagesToPreload.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });
        });

        await Promise.all(imagePromises);

        // Add a small delay for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Still show content even if some images fail to load
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  // Scroll effect
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  // Show loading screen while resources are loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      {/* Overlay for better contrast */}
      {/* <div className="absolute inset-0 bg-black/20 z-5" /> */}

      {/* Parallax layers */}
      <img
        src={biaChuCuoi}
        className="fixed left-0 bottom-0 w-[80vw] z-10 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * -1))" }}
        alt="Chu Cuội"
      />
      <img
        src={biaChiHang}
        className="fixed right-0 bottom-0 w-[80vw] z-10 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: "translateX(calc(var(--scroll) * 1))" }}
        alt="Chị Hằng"
      />

      {/* SECTION 1 - Welcome */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenGradient} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10" style={{ transform: "translateY(calc(var(--scroll) * 0.2))" }}>
          <svg viewBox="0 0 500 200" className="w-[90vw] max-w-4xl mx-auto">
            <defs>
              <path id="curve" d="M 50 150 Q 250 0 450 150" fill="transparent" />
            </defs>
            <text fill="white" fontSize="24" fontWeight="bold">
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                CHUYỆN TÒ HE - TO HE TALES
              </textPath>
            </text>
          </svg>
        </div>
      </section>

      {/* SECTION 2 - Poem */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-2xl font-semibold leading-relaxed whitespace-pre-line max-w-4xl">{t("poem") || "This is the poem section. Centered and full‑screen."}</p>
        </div>
      </section>

      {/* SECTION 3 - Content 1 */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <p className="text-2xl font-medium leading-relaxed whitespace-pre-line max-w-4xl">{t("section1") || "Section 1 content goes here."}</p>
        </div>
      </section>

      {/* SECTION 4 - Chuyện tò he 1 */}
      <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">CHUYỆN TÒ HE</h2>
          <p className="text-2xl font-medium leading-relaxed whitespace-pre-line max-w-4xl">{t("section2") || "Section 2 content goes here."}</p>
        </div>
      </section>

      {/* SECTION 5 - Chuyện tò he 2 */}
      <section className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">CHUYỆN TÒ HE</h2>
          <p className="text-2xl font-medium leading-relaxed whitespace-pre-line max-w-4xl">{t("section3") || "Section 3 content goes here."}</p>
        </div>
      </section>

      {/* Footer luôn dính đáy */}
      <footer className="relative z-10">
        <Copyright />
      </footer>
    </div>
  );
}
