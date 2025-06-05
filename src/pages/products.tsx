import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import nenGradient from "/images/Nền gradient.png";
import nenSang from "/images/Nền sáng.png";
import hopToHe from "../assets/12congiap/Hộp.png";
import chuot from "../assets/12congiap/1.png";
import trau from "../assets/12congiap/2.png";
import ho from "../assets/12congiap/3.png";
import meo from "../assets/12congiap/4.png";
import rong from "../assets/12congiap/5.png";
import ran from "../assets/12congiap/6.png";
import ngua from "../assets/12congiap/7.png";
import de from "../assets/12congiap/8.png";
import khi from "../assets/12congiap/9.png";
import ga from "../assets/12congiap/10.png";
import cho from "../assets/12congiap/11.png";
import lon from "../assets/12congiap/12.png";
import { Copyright } from "@/components/copyright";

const animalCards = [
  { id: "1", name: "chuot", img: chuot },
  { id: "2", name: "trau", img: trau },
  { id: "3", name: "ho", img: ho },
  { id: "4", name: "meo", img: meo },
  { id: "5", name: "rong", img: rong },
  { id: "6", name: "ran", img: ran },
  { id: "7", name: "ngua", img: ngua },
  { id: "8", name: "de", img: de },
  { id: "9", name: "khi", img: khi },
  { id: "10", name: "ga", img: ga },
  { id: "11", name: "cho", img: cho },
  { id: "12", name: "lon", img: lon },
];

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

export function ProductsPage() {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false); // Thêm state riêng cho animation
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [boxMoved, setBoxMoved] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      const imageUrls = [nenGradient, nenSang, hopToHe, ...animalCards.map((card) => card.img)];
      const imagePromises = imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        // Add minimum loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
          // Delay để tạo hiệu ứng animation
          setTimeout(() => {
            setShowContent(true);
          }, 100); // Delay 100ms sau khi loading xong
        }, 1500);
      } catch (error) {
        console.error("Error loading images:", error);
        // Still proceed even if some images fail to load
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            setShowContent(true);
          }, 100);
        }, 2000);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isLoading && showContent) {
      // Animation sequence for section 1
      const boxMoveTimer = setTimeout(() => {
        setBoxMoved(true);
      }, 500); // Giảm delay xuống

      const contentTimer = setTimeout(() => {
        setContentVisible(true);
      }, 800); // Content appears after box has moved

      // Animate cards appearing one by one for section 3
      const cardsTimer = setTimeout(() => {
        animalCards.forEach((_, index) => {
          setTimeout(() => {
            setVisibleCards((prev) => new Set([...prev, index]));
          }, index * 100); // Stagger animation by 100ms
        });
      }, 1200); // Delayed to start after section 1 animations

      return () => {
        clearTimeout(boxMoveTimer);
        clearTimeout(contentTimer);
        clearTimeout(cardsTimer);
      };
    }
  }, [isLoading, showContent]); // Thay đổi dependency

  // Show loading screen while resources are loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden oswald">
      {/* Section 1: Combined layout with box and content side by side */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-6">
        {/* Background using nenGradient image */}
        <img src={nenGradient} className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Light Background" />
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20 z-5" />

        {/* Content for section 1 */}
        <div className="relative z-10 flex flex-col items-center px-4 py-8 w-full max-w-7xl">
          {/* Header with fade-in animation */}
          <div className="pt-16 mb-12 text-center">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-6 transition-all duration-1000 transform ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {t("title")}
            </h1>
            <p
              className={`text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed transition-all duration-1000 transform delay-200 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {t("description")}
            </p>
          </div>

          {/* Main content layout - Box and paragraphs side by side */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">
            {/* Box Display with synchronized animation */}
            <div className={`transition-all duration-1000 transform flex-shrink-0 ${contentVisible ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 translate-x-8"}`}>
              <img src={hopToHe} alt="Hộp Tò He" className="w-[300px] md:w-[400px] lg:w-[500px] drop-shadow-2xl hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Content paragraphs with slide-in animation */}
            <div className={`flex flex-col gap-8 max-w-2xl transition-all duration-1000 transform ${contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {/* First paragraph */}
              <div className="bg-black/40 backdrop-blur-sm rounded-lg shadow-lg p-6 lg:p-8">
                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed font-medium">{t("content.passage1.text")}</p>
              </div>

              {/* Second paragraph */}
              <div className="bg-black/40 backdrop-blur-sm rounded-lg shadow-lg p-6 lg:p-8">
                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed font-medium">{t("content.passage2.text")}</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={`mt-16 transition-all duration-1000 delay-1000 transform ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="animate-bounce">
              <svg className="w-6 h-6 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm mt-2">{t("explore-zodiac")}</p>
          </div>
        </div>
      </section>

      {/* Section 2: Grid 12 con giáp với nền sáng */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Background using nenGradient image */}
        <img src={nenSang} className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Gradient Background" />
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20 z-5" />

        {/* Content for section 2 */}
        <div className="relative z-10 flex flex-col items-center px-4 py-16 text-white">
          {/* Section title */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl mb-4">{t("title-box")}</h2>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-lg">{t("description-box")}</p>
          </div>

          {/* Card Grid - 4 columns x 3 rows with staggered animation */}
          <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-4xl w-full">
            {animalCards.map((card, index) => (
              <div
                key={card.id}
                className={`
                  relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 rounded-xl overflow-hidden
                  ${visibleCards.has(index) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/products/${card.name}`)}
              >
                {/* Hình ảnh */}
                <div className="relative overflow-hidden">
                  <img src={card.img} alt={card.name} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1" />
                  {/* Shimmer ánh sáng khi hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  {/* Overlay ánh sáng khi hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-black/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Số thứ tự hiển thị khi hover */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 shadow-lg">
                {t(`zodiac-animals.${index}`)}
                </div>

                {/* Gradient viền glow khi hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 -z-10 blur-sm group-hover:blur-md pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Footer luôn dính đáy */}
      <footer className="relative z-10">
        <Copyright />
      </footer>
    </div>
  );
}
