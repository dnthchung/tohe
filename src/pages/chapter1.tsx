import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import nenHong from "/images/Nền hồng.png";

interface Paragraph {
  text: string;
  images: string[];
}

interface ChapterContent {
  [section: string]: Paragraph[];
}

export function Chapter1Page() {
  const { t } = useTranslation("chapter1");
  const content = t("content", { returnObjects: true }) as ChapterContent;
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const glassStyle = "bg-black/40 backdrop-blur-sm rounded-lg shadow-lg";

  // Scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("data-section-id");
          if (sectionId) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(sectionId);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px",
      },
    );

    sectionRefs.current.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [content]);

  const setSectionRef = (sectionId: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(sectionId, el);
    } else {
      sectionRefs.current.delete(sectionId);
    }
  };

  if (!content || typeof content !== "object") {
    return (
      <div className="relative w-full overflow-x-hidden">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <img src={nenHong} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
          <div className="relative z-10 text-center">
            <p className="text-lg text-white">Loading content...</p>
          </div>
        </section>
      </div>
    );
  }

  const sections = Object.entries(content);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Title Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <img src={nenHong} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 text-center px-6 pt-[80px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-sm">{t("title")}</h1>
          <p className="text-xl text-white max-w-4xl leading-relaxed">{t("description")}</p>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map(([sectionTitle, paragraphs], sectionIndex) => {
        const sectionId = `section-${sectionIndex}`;
        if (!Array.isArray(paragraphs)) return null;

        return (
          <section key={sectionTitle} ref={setSectionRef(sectionId)} data-section-id={sectionId} className="relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden py-16">
            <img src={nenHong} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
              {/* Section Title */}
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 text-white text-center transition-all duration-1000 ease-out ${
                  visibleSections.has(sectionId) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {sectionTitle}
              </h2>

              {/* Section Content */}
              <div className="space-y-8">
                {paragraphs.map((para, index) => {
                  if (!para || typeof para !== "object" || !para.text) return null;

                  return (
                    <div
                      key={index}
                      className={`transition-all duration-1000 ease-out ${visibleSections.has(sectionId) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{
                        transitionDelay: `${300 + index * 200}ms`,
                      }}
                    >
                      {/* Paragraph Text */}
                      <div className={`${glassStyle} p-6 mb-6`}>
                        <p className="text-lg text-white whitespace-pre-wrap leading-relaxed font-medium">{para.text}</p>
                      </div>

                      {/* Paragraph Images */}
                      {para.images && Array.isArray(para.images) && para.images.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          {para.images.map((img, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`${glassStyle} p-4 transition-all duration-700 hover:scale-105 ${visibleSections.has(sectionId) ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                              style={{
                                transitionDelay: `${500 + index * 200 + imgIndex * 150}ms`,
                              }}
                            >
                              <img src={`/${img}`} alt={`Illustration ${imgIndex + 1} for ${sectionTitle}`} className="w-full h-auto object-contain rounded" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
