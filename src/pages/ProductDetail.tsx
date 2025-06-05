import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
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

// Mapping từ tên động vật sang tên file JSON
const animalToFileMapping: { [key: string]: string } = {
  chuot: "ty",
  trau: "suu",
  ho: "dan",
  meo: "mao",
  rong: "thin",
  ran: "ti",
  ngua: "ngo",
  de: "mui",
  khi: "than",
  ga: "dau",
  cho: "tuat",
  lon: "hoi"
};

export function ProductDetail() {
  const { animalName } = useParams(); // ex: "chuot", "trau", "ho"
  const { i18n, t } = useTranslation();
  const { t: tCommon } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animal, setAnimal] = useState<AnimalData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!animalName) return;

      console.log("Current language:", i18n.language, "Detected language:", i18n.resolvedLanguage);

      // Chuyển đổi tên động vật sang tên file JSON
      const fileName = animalToFileMapping[animalName];
      if (!fileName) {
        console.error(`No mapping found for animal: ${animalName}`);
        setIsLoading(false);
        return;
      }

                                    const namespace = `12${fileName}`; // → "12ty", "12suu", ...
      try {
        // Thử fetch trực tiếp thay vì dựa vào i18next backend
        const currentLang = i18n.language || 'vi';
        console.log("Fetching data for:", { animalName, fileName, namespace, currentLang });

        const response = await fetch(`/locales/${currentLang}/${namespace}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${namespace}.json: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Fetched JSON data:", jsonData);

        const data = jsonData[animalName] as AnimalData;
        console.log("Extracted animal data:", data);

        if (!data || typeof data !== 'object' || !data.animal) {
          console.error("Data validation failed:", { data, type: typeof data, jsonData, animalName });
          throw new Error("Invalid data structure");
        }

        // Preload images
        const imageUrls = [nenGradient, data.images.card, data.images.product];
        const preload = imageUrls.map(
          (src) =>
            new Promise((res, rej) => {
              const img = new Image();
              img.onload = () => res(true);
              img.onerror = () => rej();
              img.src = src;
            }),
        );
        await Promise.all(preload);

        setAnimal(data);
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 100);
      } catch (err) {
        console.error("Failed to load animal data:", err);
        setIsLoading(false);
      }
    };

    loadData();
  }, [animalName, i18n, t]);

  if (!animalName) {
    return <div className="text-white py-10 text-center">{tCommon("productDetail.noAnimalSelected")}</div>;
  }

  if (isLoading || !animal) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p>{tCommon("productDetail.loadingContent")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden faustina text-white">
      <section className="relative min-h-screen flex flex-col items-center justify-center py-20">
        <img src={nenGradient} alt="Gradient background" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black/20 z-5" />

        <div className="relative z-10 max-w-7xl w-full px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Hình ảnh */}
          <div className="flex flex-col space-y-8">
            {/* Hình sản phẩm */}
            <div
              className={`backdrop-blur-sm rounded-xl p-8 border border-white/10 group relative transition-all duration-1000 ease-out ${
                showContent ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
              }`}
            >
              <div className="relative overflow-visible">
                <img
                  src={animal.images.product}
                  alt="Animal"
                  className="mx-auto w-72 md:w-80 lg:w-96 h-72 object-cover rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 group-hover:shadow-2xl group-hover:shadow-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
              </div>
            </div>

            {/* Hình thẻ */}
            <div
              className={`backdrop-blur-sm rounded-xl p-8 border border-white/10 group relative transition-all duration-1000 ease-out ${
                showContent ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
              }`}
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

          {/* Right - Thông tin */}
          <div className="space-y-6">
            {/* Tên con giáp */}
            <div
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 transition-all duration-1000 ease-out ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2 drop-shadow-lg">{animal.animal}</h1>
            </div>

            {/* Giới thiệu */}
            <div className="info-block" style={{ transitionDelay: "0.2s" }}>
              <h2 className="section-title">{tCommon("productDetail.introduction")}</h2>
              <p className="section-text faustina">{animal.intro}</p>
            </div>

            {/* Mô tả Tò He */}
            <div className="info-block" style={{ transitionDelay: "0.3s" }}>
              <h2 className="section-title">{tCommon("productDetail.toHeDescription")}</h2>
              <p className="section-text faustina">{animal.passage1}</p>
            </div>

            {/* Đặc điểm tính cách */}
            <div className="info-block" style={{ transitionDelay: "0.4s" }}>
              <h2 className="section-title">{tCommon("productDetail.personalityTraits")}</h2>
              <p className="section-text faustina">{animal.passage2}</p>
            </div>

            {/* Đặc điểm nổi bật */}
            <div className="info-block" style={{ transitionDelay: "0.5s" }}>
              <h2 className="section-title">{tCommon("productDetail.keyCharacteristics")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {animal.characteristics.map((char, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-orange-500/30 to-red-500/30 text-white text-center py-2 px-3 rounded-lg text-sm font-medium border border-orange-400/30 hover:scale-105 transition-all duration-300"
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>

            {/* Các năm tương ứng */}
            <div className="info-block" style={{ transitionDelay: "0.6s" }}>
              <h2 className="section-title">{tCommon("productDetail.correspondingYears")}</h2>
              <div className="flex flex-wrap gap-3">
                {animal.years.map((year, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white px-4 py-2 rounded-lg font-medium border border-blue-400/30 hover:scale-105 transition-all duration-300"
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
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

      <style>{`
        .info-block {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 1s ease-out;
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #facc15;
          margin-bottom: 0.75rem;
          text-shadow: 0 0 5px #000;
        }
        .section-text {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.75;
        }
      `}</style>
    </div>
  );
}
