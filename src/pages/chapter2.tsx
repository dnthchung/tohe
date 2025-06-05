import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import nenHong2 from "/images/Nền hồng nhạt fixed mây.png";

interface Paragraph {
  passage: number;
  text: string;
  images: string[];
}

interface ChapterContent {
  [section: string]: Paragraph[];
}

interface ContentChunk {
  id: string;
  sectionTitle: string;
  sectionIndex: number;
  paragraph: Paragraph;
  type: "title" | "content";
  isEven: boolean;
}

export function Chapter2Page() {
  const { t } = useTranslation("chapter2");
  const content = t("content", { returnObjects: true }) as ChapterContent;
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const glassStyle = "bg-black/40 backdrop-blur-sm rounded-lg shadow-lg";

  const contentChunks: ContentChunk[] = (() => {
    if (!content || typeof content !== "object") return [];
    const chunks: ContentChunk[] = [];
    let passageCounter = 0;

    chunks.push({
      id: "title",
      sectionTitle: "Title",
      sectionIndex: -1,
      paragraph: { passage: 0, text: "", images: [] },
      type: "title",
      isEven: false,
    });

    Object.entries(content).forEach(([sectionTitle, paragraphs], sectionIndex) => {
      paragraphs.forEach((paragraph) => {
        chunks.push({
          id: `section-${sectionIndex}-passage-${paragraph.passage}`,
          sectionTitle,
          sectionIndex,
          paragraph,
          type: "content",
          isEven: passageCounter % 2 === 0,
        });
        passageCounter++;
      });
    });

    return chunks;
  })();

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            if (entry.intersectionRatio > 0.5) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      {
        threshold: [0.1, 0.5, 0.8],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => observerRef.current?.disconnect();
  }, [contentChunks]);

  const renderChunk = (chunk: ContentChunk) => {
    const hasImages = chunk.paragraph.images.length > 0;
    const isEvenImageCount = chunk.paragraph.images.length % 2 === 0 && chunk.paragraph.images.length >= 2;
    const contentOnLeft = chunk.isEven;
    const isVisible = visibleSections.has(chunk.id);

    return (
      <div
        key={chunk.id}
        ref={(el) => {
          sectionRefs.current[chunk.id] = el;
        }}
        className={`relative w-full min-h-screen flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-6 transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        id={chunk.id}
      >
        {/* Background with proper responsive handling */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${nenHong2})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Content with enhanced animations */}
        {chunk.type === "title" ? (
          <div
            className={`relative z-10 text-center px-4 sm:px-6 w-full max-w-6xl transition-all duration-1200 delay-300 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white drop-shadow-2xl leading-tight">{t("title")}</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">{t("description")}</p>
          </div>
        ) : isEvenImageCount ? (
          <div
            className={`relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {chunk.paragraph.passage === 1 && (
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 transition-all duration-800 delay-400 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                {chunk.sectionTitle}
              </h2>
            )}
            <div className={`${glassStyle} p-4 sm:p-6 md:p-8 w-full transition-all duration-800 delay-500 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-98"}`}>
              <p className="text-base sm:text-lg md:text-xl text-white whitespace-pre-wrap leading-relaxed font-medium oswald">{chunk.paragraph.text}</p>
            </div>
            <div
              className={`grid gap-3 sm:gap-4 w-full transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${
                chunk.paragraph.images.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : chunk.paragraph.images.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : chunk.paragraph.images.length <= 4
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {chunk.paragraph.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Image ${index + 1}`}
                  loading="lazy"
                  onClick={() => setPopupImage(imgSrc)}
                  className={`rounded-lg shadow-md object-cover w-full cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    chunk.paragraph.images.length === 1 ? "max-h-[400px]" : "max-h-[250px] sm:max-h-[300px]"
                  }`}
                  style={{
                    aspectRatio: chunk.paragraph.images.length === 1 ? "16 / 10" : "4 / 3",
                    transitionDelay: `${index * 100}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 sm:gap-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className={`space-y-4 sm:space-y-6 w-full lg:w-1/2 ${hasImages ? (contentOnLeft ? "order-1" : "order-2") : ""} transition-all duration-800 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${contentOnLeft ? "translate-x-8" : "-translate-x-8"}`
              }`}
            >
              {chunk.paragraph.passage === 1 && <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center lg:text-left oswald drop-shadow-lg">{chunk.sectionTitle}</h2>}
              <div className={`${glassStyle} p-4 sm:p-6 md:p-8`}>
                <p className="text-base sm:text-lg md:text-xl text-white whitespace-pre-wrap leading-relaxed font-medium">{chunk.paragraph.text}</p>
              </div>
            </div>
            {hasImages && (
              <div
                className={`w-full lg:w-1/2 flex justify-center items-center transition-all duration-800 delay-600 ${contentOnLeft ? "order-2" : "order-1"} ${
                  isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${contentOnLeft ? "-translate-x-8" : "translate-x-8"}`
                }`}
              >
                <ImageGallery images={chunk.paragraph.images} isVisible={isVisible} delay={800} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {popupImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setPopupImage(null)}>
          <img src={popupImage} className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl transition-all duration-300 scale-100 hover:scale-105" alt="Zoomed" />
          <button
            className="absolute top-4 right-4 text-white text-2xl sm:text-3xl font-bold hover:scale-110 transition-transform duration-200 bg-black/30 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setPopupImage(null);
            }}
          >
            ×
          </button>
        </div>
      )}

      <div
        className="relative w-full min-h-screen oswald overflow-x-hidden chapter2-bg"
        style={{
          backgroundImage: `url(${nenHong2})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-10">{contentChunks.map((chunk) => renderChunk(chunk))}</div>

        {/* Enhanced Navigation Dots */}
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2 sm:space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-3">
          {contentChunks.map((chunk, index) => {
            const isActive = activeSection === chunk.id;
            const isCompleted = visibleSections.has(chunk.id) && activeSection !== chunk.id;

            return (
              <button
                key={chunk.id}
                onClick={() =>
                  sectionRefs.current[chunk.id]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
                className={`relative rounded-full transition-all duration-500 ease-out transform ${
                  isActive ? "w-8 h-3 sm:w-10 sm:h-4 bg-white scale-110 shadow-lg" : isCompleted ? "w-3 h-3 sm:w-4 sm:h-4 bg-white/80 scale-100" : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/40 scale-90"
                } hover:bg-white hover:scale-125 border border-white/30`}
                title={chunk.type === "title" ? "Title" : `${chunk.sectionTitle} - Passage ${chunk.paragraph.passage}`}
              >
                {/* Active indicator pulse */}
                {isActive && <div className="absolute inset-0 rounded-full bg-white animate-pulse opacity-50" />}

                {/* Progress indicator */}
                {isCompleted && <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/60 to-white/80" />}
              </button>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }

          /* Smooth scrolling for better UX */
          html {
            scroll-behavior: smooth;
          }

          /* Ensure responsive background on all devices */
          @media (max-width: 640px) {
            .chapter2-bg {
              background-attachment: scroll !important;
            }
          }
        `,
        }}
      />
    </>
  );
}
