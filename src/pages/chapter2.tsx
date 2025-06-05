import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
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
  height: number;
  isEven: boolean;
}

export function Chapter2Page() {
  const { t } = useTranslation("chapter2");
  const content = t("content", { returnObjects: true }) as ChapterContent;

  const [scrollY, setScrollY] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [visibleChunks, setVisibleChunks] = useState<Set<string>>(new Set());
  const [popupImage, setPopupImage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CHUNK_HEIGHT = window.innerHeight;
  const BUFFER_SIZE = 2;
  const glassStyle = "bg-black/40 backdrop-blur-sm rounded-lg shadow-lg";

  const contentChunks = useMemo(() => {
    if (!content || typeof content !== "object") return [];
    const chunks: ContentChunk[] = [];
    let passageCounter = 0;

    chunks.push({
      id: "title",
      sectionTitle: "Title",
      sectionIndex: -1,
      paragraph: { passage: 0, text: "", images: [] },
      type: "title",
      height: CHUNK_HEIGHT,
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
          height: CHUNK_HEIGHT,
          isEven: passageCounter % 2 === 0,
        });
        passageCounter++;
      });
    });

    return chunks;
  }, [content, CHUNK_HEIGHT]);

  const chunkPositions = useMemo(() => {
    let currentPosition = 0;
    return contentChunks.map((chunk) => {
      const position = currentPosition;
      currentPosition += chunk.height;
      return { ...chunk, top: position, bottom: currentPosition };
    });
  }, [contentChunks]);

  const totalHeight = chunkPositions.length > 0 ? chunkPositions[chunkPositions.length - 1].bottom : 0;

  const visibleChunkIndices = useMemo(() => {
    const visibleIndices: number[] = [];
    chunkPositions.forEach((chunk, index) => {
      const chunkTop = chunk.top;
      const chunkBottom = chunk.bottom;
      const viewportTop = scrollY - BUFFER_SIZE * CHUNK_HEIGHT;
      const viewportBottom = scrollY + containerHeight + BUFFER_SIZE * CHUNK_HEIGHT;
      if (chunkBottom >= viewportTop && chunkTop <= viewportBottom) {
        visibleIndices.push(index);
      }
    });
    return visibleIndices;
  }, [scrollY, containerHeight, chunkPositions, CHUNK_HEIGHT]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const newScrollY = scrollRef.current.scrollTop;
      setScrollY(newScrollY);
      document.documentElement.style.setProperty("--scroll", `${newScrollY}px`);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const chunkId = entry.target.getAttribute("data-chunk-id");
          if (chunkId) {
            setVisibleChunks((prev) => {
              const newSet = new Set(prev);
              entry.isIntersecting ? newSet.add(chunkId) : newSet.delete(chunkId);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -100px 0px", root: scrollRef.current },
    );

    const chunkElements = document.querySelectorAll("[data-chunk-id]");
    chunkElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleChunkIndices]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    contentChunks.forEach((chunk) => {
      chunk.paragraph.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [contentChunks]);

  const renderChunk = useCallback(
    (chunkData: (typeof chunkPositions)[0]) => {
      const isVisible = visibleChunks.has(chunkData.id);
      const topOffset = chunkData.top;
      const chunkHeight = chunkData.height;
      const hasImages = chunkData.paragraph.images.length > 0;
      const isEvenImageCount = chunkData.paragraph.images.length % 2 === 0 && chunkData.paragraph.images.length >= 2;
      const contentOnLeft = chunkData.isEven;

      if (chunkData.type === "title") {
        return (
          <div
            key={chunkData.id}
            data-chunk-id={chunkData.id}
            className="absolute w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ top: topOffset, height: chunkHeight + 2 }}
          >
            <img
              src={nenHong2}
              className="absolute top-0 left-0 w-full z-0"
              alt="Background"
              loading="lazy"
              style={{ objectFit: "cover", objectPosition: "center top", height: chunkHeight + 4, width: "100%", transform: "translateY(-2px)" }}
            />
            <div className="relative z-10 text-center px-6 w-full max-w-6xl">
              <h1
                className={`whitespace-pre-line text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg text-center leading-tight max-w-[90vw] md:max-w-5xl mx-auto transition-all duration-1500 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {t("title")}
              </h1>
              <p
                className={`text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed transition-all duration-1500 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {t("description")}
              </p>
            </div>
          </div>
        );
      }

      return (
        <div key={chunkData.id} data-chunk-id={chunkData.id} className="absolute w-full flex items-center justify-center overflow-hidden" style={{ top: topOffset, height: chunkHeight + 2 }}>
          <img
            src={nenHong2}
            className="absolute top-0 left-0 w-full z-0"
            alt="Background"
            loading="lazy"
            style={{ objectFit: "cover", objectPosition: "center top", height: chunkHeight + 4, width: "100%", transform: "translateY(-2px)" }}
          />

          {isEvenImageCount ? (
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center">
              {chunkData.paragraph.passage === 1 && <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{chunkData.sectionTitle}</h2>}
              <div className={`${glassStyle} p-8 mb-8 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <p className="text-lg md:text-xl text-white whitespace-pre-wrap leading-relaxed font-medium">{chunkData.paragraph.text}</p>
              </div>
              <div
                className={`grid gap-4 w-full
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-${chunkData.paragraph.images.length >= 4 ? "3" : "2"}
              lg:grid-cols-${chunkData.paragraph.images.length >= 6 ? "3" : "2"}
              xl:grid-cols-${chunkData.paragraph.images.length >= 6 ? "4" : "3"}`}
              >
                {chunkData.paragraph.images.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Image ${index + 1}`}
                    loading="lazy"
                    onClick={() => setPopupImage(imgSrc)}
                    className={`rounded-lg shadow-md object-cover w-full cursor-pointer max-h-[250px]
                    transition-transform duration-500 ease-in-out hover:scale-105 hover:z-10`}
                    style={{ aspectRatio: "4 / 3" }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex items-center">
              <div className={`grid grid-cols-1 ${hasImages ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-12 items-center w-full min-h-[80vh]"`}>
                <div
                  className={`space-y-6 ${hasImages ? (contentOnLeft ? "lg:order-1" : "lg:order-2") : "lg:col-span-1 max-w-4xl mx-auto"} transition-all duration-1200 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  {chunkData.paragraph.passage === 1 && <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center lg:text-left">{chunkData.sectionTitle}</h2>}
                  <div className={`${glassStyle} p-8`}>
                    <p className="text-lg md:text-xl text-white whitespace-pre-wrap leading-relaxed font-medium">{chunkData.paragraph.text}</p>
                  </div>
                </div>
                {hasImages && (
                  <div className={`${contentOnLeft ? "lg:order-2" : "lg:order-1"} h-full flex items-center justify-center`}>
                    <img
                      src={chunkData.paragraph.images[0]}
                      alt="Image"
                      loading="lazy"
                      onClick={() => setPopupImage(chunkData.paragraph.images[0])}
                      className="rounded-lg shadow-md object-cover w-full max-w-md cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    },
    [visibleChunks, glassStyle, t],
  );

  return !content || typeof content !== "object" ? (
    <div className="relative w-full h-screen flex items-center justify-center">
      <img src={nenHong2} className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Background" />
      <div className="relative z-10 text-center">
        <p className="text-lg text-white">Loading content...</p>
      </div>
    </div>
  ) : (
    <>
      {popupImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={() => setPopupImage(null)}>
          <img src={popupImage} className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg transition-transform duration-300 scale-100 hover:scale-105" alt="Zoomed" />
          <button className="absolute top-4 right-4 text-white text-2xl font-bold" onClick={() => setPopupImage(null)}>
            ×
          </button>
        </div>
      )}
      <div className="oswald relative w-full h-screen overflow-hidden">
        <div className="fixed inset-0 w-full h-full z-0" style={{ backgroundImage: `url(${nenHong2})`, backgroundSize: "cover", backgroundPosition: "center top", backgroundAttachment: "fixed" }} />
        <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden relative z-10" onScroll={handleScroll} style={{ scrollBehavior: "smooth" }}>
          <div ref={containerRef} className="relative w-full" style={{ height: totalHeight }}>
            {visibleChunkIndices.map((i) => renderChunk(chunkPositions[i]))}
          </div>
        </div>
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
          {chunkPositions.map((chunkData) => (
            <button
              key={chunkData.id}
              onClick={() => scrollRef.current?.scrollTo({ top: chunkData.top, behavior: "smooth" })}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/30 ${
                visibleChunks.has(chunkData.id) ? "bg-white scale-150 shadow-lg border-white" : "bg-white/40 hover:bg-white/60 hover:scale-125"
              }`}
              title={chunkData.type === "title" ? "Title" : `${chunkData.sectionTitle} - Passage ${chunkData.paragraph.passage}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
