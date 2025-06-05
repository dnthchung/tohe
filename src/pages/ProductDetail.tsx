import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import nenGradient from "/images/Nền gradient.png";

interface AnimalData {
  id: string;
  animal: string;
  intro: string;
  passage1: string;
  passage2: string;
  images: {
    card: string;
    product: string;
  };
  characteristics: string[];
  years: string[];
}

export function ProductDetail() {
  const { animalName } = useParams();
  const { t } = useTranslation("12ty");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      if (!animalName) return;

      const animal = t(animalName, { returnObjects: true }) as AnimalData;
      if (!animal || !animal.animal) return;

      const imageUrls = [nenGradient, animal.images.card, animal.images.product];
      const promises = imageUrls.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          }),
      );

      try {
        await Promise.all(promises);
        setIsLoading(false);
        // Delay để tạo hiệu ứng xuất hiện mượt mà
        setTimeout(() => setShowContent(true), 100);
      } catch {
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 100);
      }
    };

    preloadImages();
  }, [animalName, t]);

  if (!animalName) return <div className="text-white py-10 text-center">No animal selected.</div>;

  const animal = t(animalName, { returnObjects: true }) as AnimalData;

  if (!animal || !animal.animal) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h2 className="text-2xl font-bold">Animal not found</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden oswald text-white">
      {/* Single Section with Gradient Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-32">
        {/* Background */}
        <img src={nenGradient} alt="Gradient background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black/20 z-5" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Card and Animal Images */}
          <div className="flex flex-col space-y-8">
            {/* Animal Image */}
            <div
              className={`backdrop-blur-sm rounded-xl p-8 border border-white/10 group hover:z-50 relative transform transition-all duration-1000 ease-out ${
                showContent ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative overflow-visible">
                <img
                  src={animal.images.product}
                  alt="Animal"
                  className="mx-auto w-72 md:w-80 lg:w-96 h-72 object-cover rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 group-hover:shadow-2xl group-hover:shadow-white/20"
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
              </div>
            </div>

            {/* Card Image */}
            <div
              className={`backdrop-blur-sm rounded-xl p-8 border border-white/10 group hover:z-50 relative transform transition-all duration-1000 ease-out ${
                showContent ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative overflow-visible">
                <img
                  src={animal.images.card}
                  alt="Card"
                  className="mx-auto w-72 md:w-80 lg:w-96 rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Information */}
          <div className="space-y-6">
            {/* Animal Name */}
            <div
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:bg-black/50 transition-all duration-1000 ease-out ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2 drop-shadow-lg">{animal.animal}</h1>
            </div>

            {/* Intro */}
            <div
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:bg-black/50 transition-all duration-1000 ease-out group ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="text-xl font-bold mb-4 text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-colors">Giới thiệu</h2>
              <p className="text-white/90 text-base leading-relaxed">{animal.intro}</p>
            </div>

            {/* Tò He Description */}
            <div
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:bg-black/50 transition-all duration-1000 ease-out group ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <h2 className="text-xl font-bold mb-4 text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-colors">Mô tả Tò He</h2>
              <p className="text-white/90 text-base leading-relaxed">{animal.passage1}</p>
            </div>

            {/* Zodiac Insight */}
            <div
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:bg-black/50 transition-all duration-1000 ease-out group ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ animationDelay: "0.7s" }}
            >
              <h2 className="text-xl font-bold mb-4 text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-colors">Đặc điểm tính cách</h2>
              <p className="text-white/90 text-base leading-relaxed mb-4">{animal.passage2}</p>
            </div>

            {/* Characteristics */}
            <div
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:bg-black/50 transition-all duration-1000 ease-out group ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ animationDelay: "0.9s" }}
            >
              <h2 className="text-xl font-bold mb-4 text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-colors">Đặc điểm nổi bật</h2>
              <div className="grid grid-cols-2 gap-3">
                {animal.characteristics.map((char, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-r from-orange-500/30 to-red-500/30 text-white text-center py-2 px-3 rounded-lg text-sm font-medium border border-orange-400/30 hover:from-orange-500/40 hover:to-red-500/40 hover:scale-105 transition-all duration-500 cursor-pointer transform ${
                      showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ animationDelay: `${1.1 + idx * 0.1}s` }}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>

            {/* Years */}
            <div
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:bg-black/50 transition-all duration-1000 ease-out group ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ animationDelay: "1.3s" }}
            >
              <h2 className="text-xl font-bold mb-4 text-yellow-300 drop-shadow-lg group-hover:text-yellow-200 transition-colors">Các năm tương ứng</h2>
              <div className="flex flex-wrap gap-3">
                {animal.years.map((year, idx) => (
                  <span
                    key={idx}
                    className={`bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white px-4 py-2 rounded-lg font-medium border border-blue-400/30 hover:from-blue-500/40 hover:to-purple-500/40 hover:scale-105 transition-all duration-500 cursor-pointer shadow-lg transform ${
                      showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                    style={{ animationDelay: `${1.5 + idx * 0.1}s` }}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse transform transition-all duration-1000 ease-out ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3 + 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
