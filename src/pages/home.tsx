//home.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Custom backgrounds
import biaChiHang from "/images/Bìa chị hằng.png";
import biaChuCuoi from "/images/Bìa chú cuội.png";

// Characters
import chiHang from "/images/Chị Hằng.png";
import chuCuoi from "/images/Chú cuội.png";

// Background variations
import nenGradient from "/images/Nền gradient.png";
import nenSang from "/images/Nền sáng.png";

//Background núi - phải.png
import bgNuiPhai from "/images/Background núi - phải.png";
import bgNuiTrai from "/images/Background núi - trái.png";

import { Copyright } from "@/components/copyright";
import Logo from "/Logo.png";

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
  const [mountainOpacity, setMountainOpacity] = useState(0);
  const [chiHangOpacity, setChiHangOpacity] = useState(0);
  const [chuCuoiOpacity, setChuCuoiOpacity] = useState(0);

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

  // Enhanced scroll effect with smooth mountain transitions
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);

      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;

      // Define transition zones
      const fadeInStart = screenHeight * 0.8; // Start fading in at 80% of first screen
      const fadeInEnd = screenHeight * 1.2; // Fully visible at 120% of first screen
      const fadeOutStart = screenHeight * 2.8; // Start fading out at 280% of first screen
      const fadeOutEnd = screenHeight * 3.2; // Fully hidden at 320% of first screen

      let opacity = 0;

      if (scrollY >= fadeInStart && scrollY <= fadeInEnd) {
        // Fade in phase
        const progress = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        opacity = Math.min(1, progress);
      } else if (scrollY > fadeInEnd && scrollY < fadeOutStart) {
        // Fully visible phase
        opacity = 1;
      } else if (scrollY >= fadeOutStart && scrollY <= fadeOutEnd) {
        // Fade out phase
        const progress = (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        opacity = Math.max(0, 1 - progress);
      }

      // Apply easing function for smoother transitions
      const easedOpacity = opacity === 0 || opacity === 1 ? opacity : -Math.cos(opacity * Math.PI) / 2 + 0.5; // easeInOutSine

      setMountainOpacity(easedOpacity);

      // Character visibility with smooth transitions
      // Chị Hằng (Section 4)
      const section4Start = screenHeight * 3;
      const section4End = screenHeight * 4;
      const section4FadeInStart = section4Start - screenHeight / 3; // 1/3 màn hình trước khi vào section
      const section4FadeOutEnd = section4End; // Ẩn khi hết section

      let chiHangOp = 0;
      if (scrollY >= section4FadeInStart && scrollY < section4Start) {
        // Fade in khi chớm vào section
        const progress = (scrollY - section4FadeInStart) / (screenHeight / 3);
        chiHangOp = Math.min(1, progress);
      } else if (scrollY >= section4Start && scrollY < section4FadeOutEnd) {
        // Hiện hoàn toàn trong section
        chiHangOp = 1;
      } else if (scrollY >= section4FadeOutEnd) {
        // Ẩn dần khi ra khỏi section
        const fadeOutDistance = screenHeight / 3;
        const progress = Math.min(1, (scrollY - section4End) / fadeOutDistance);
        chiHangOp = Math.max(0, 1 - progress);
      }

      // Chú Cuội (Section 5)
      const section5Start = screenHeight * 4;
      const section5End = screenHeight * 5;
      const section5FadeInStart = section5Start - screenHeight / 3; // 1/3 màn hình trước khi vào section
      const section5FadeOutEnd = section5End; // Ẩn khi hết section

      let chuCuoiOp = 0;
      if (scrollY >= section5FadeInStart && scrollY < section5Start) {
        // Fade in khi chớm vào section
        const progress = (scrollY - section5FadeInStart) / (screenHeight / 3);
        chuCuoiOp = Math.min(1, progress);
      } else if (scrollY >= section5Start && scrollY < section5FadeOutEnd) {
        // Hiện hoàn toàn trong section
        chuCuoiOp = 1;
      } else if (scrollY >= section5FadeOutEnd) {
        // Ẩn dần khi ra khỏi section
        const fadeOutDistance = screenHeight / 3;
        const progress = Math.min(1, (scrollY - section5End) / fadeOutDistance);
        chuCuoiOp = Math.max(0, 1 - progress);
      }

      // Apply easing
      const easedChiHangOpacity = chiHangOp === 0 || chiHangOp === 1 ? chiHangOp : -Math.cos(chiHangOp * Math.PI) / 2 + 0.5;
      const easedChuCuoiOpacity = chuCuoiOp === 0 || chuCuoiOp === 1 ? chuCuoiOp : -Math.cos(chuCuoiOp * Math.PI) / 2 + 0.5;

      setChiHangOpacity(easedChiHangOpacity);
      setChuCuoiOpacity(easedChuCuoiOpacity);
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
      <div className="absolute inset-0 bg-black/20 z-5" />

      {/* Parallax layers */}
      <img
        src={biaChuCuoi}
        className="fixed left-0 bottom-0 w-[70vw] z-10 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: "translateX(calc(var(--scroll) * -1))",
        }}
        alt="Chu Cuội"
      />
      <img
        src={biaChiHang}
        className="fixed right-0 bottom-0 w-[70vw] z-10 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: "translateX(calc(var(--scroll) * 1))",
        }}
        alt="Chị Hằng"
      />

      {/* Enhanced Mountain backgrounds with smooth transitions */}
      <img
        src={bgNuiTrai}
        className="fixed bottom-0 left-0 w-auto h-130 z-15 pointer-events-none transition-all duration-500 ease-out"
        style={{
          opacity: mountainOpacity,
          transform: `translateY(${(1 - mountainOpacity) * 20}px) scale(${0.95 + mountainOpacity * 0.05})`,
        }}
        alt="Núi trái"
      />
      <img
        src={bgNuiPhai}
        className="fixed bottom-0 right-0 w-auto h-130 z-15 pointer-events-none transition-all duration-500 ease-out"
        style={{
          opacity: mountainOpacity,
          transform: `translateY(${(1 - mountainOpacity) * 20}px) scale(${0.95 + mountainOpacity * 0.05})`,
        }}
        alt="Núi phải"
      />

      {/* SECTION 1 - Welcome */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenGradient} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div
          className="relative z-10 transition-transform duration-700 ease-out"
          style={{
            transform: "translateY(calc(var(--scroll) * 0.2))",
          }}
        >
          <img src={Logo} alt="Logo mặt trăng" className="w-100 h-100 object-contain mx-auto" />
        </div>
      </section>

      {/* SECTION 2 - Poem */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Background" />
        <div className="relative z-10 px-6 text-center max-w-4xl">
          <p
            className="milestone-script text-3xl md:text-4xl lg:text-5xl font-normal italic leading-relaxed whitespace-pre-line text-white/95 tracking-wide"
            style={{
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            {t("poem") || "Tớ hẹn mối em một dòng\nEm mua một cái cho chồng em chơi.\nChồng em đánh hông thi thôi\nEm mua cái khác em chơi một mình"}
          </p>
        </div>
      </section>

      {/* SECTION 3 - Content 1 */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 px-6 max-w-4xl">
          <p className="faustina text-2xl font-medium leading-relaxed text-left whitespace-pre-line text-white">{t("section1") || "Section 1 content goes here."}</p>
        </div>
      </section>

      {/* SECTION 4 - Chuyện tò he 1 với Chị Hằng */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center justify-between pl-20">
          {/* Nội dung bên trái */}
          <div className="w-1/2 pl-8 pr-4">
            <p className="faustina text-2xl font-medium leading-relaxed text-left whitespace-pre-line text-white">{t("section2") || "Section 2 content goes here."}</p>
          </div>

          {/* Chị Hằng bên phải */}
          <div className="w-1/2 flex justify-start pl-2">
            <img
              src={chiHang}
              alt="Chị Hằng"
              className="max-w-full h-auto object-contain transition-all duration-700 ease-out"
              style={{
                maxHeight: "80vh",
                opacity: chiHangOpacity,
                transform: `translateY(${(1 - chiHangOpacity) * 30}px) scale(${0.9 + chiHangOpacity * 0.1})`,
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 - Chuyện tò he 2 với Chú Cuội */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Chú Cuội bên trái */}
          <div className="w-1/2 flex justify-end pr-2">
            <img
              src={chuCuoi}
              alt="Chú Cuội"
              className="max-w-full h-auto object-contain transition-all duration-700 ease-out"
              style={{
                maxHeight: "80vh",
                opacity: chuCuoiOpacity,
                transform: `translateY(${(1 - chuCuoiOpacity) * 30}px) scale(${0.9 + chuCuoiOpacity * 0.1})`,
              }}
            />
          </div>

          {/* Nội dung bên phải */}
          <div className="w-1/2 pl-4">
            <p className="faustina text-2xl font-medium leading-relaxed text-left whitespace-pre-line text-white">{t("section3") || "Section 3 content goes here."}</p>
          </div>
        </div>
      </section>

      {/* Footer luôn dính đáy */}
      <footer className="relative z-10">
        <Copyright />
      </footer>
    </div>
  );
}
