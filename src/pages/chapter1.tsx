import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ImageGallery } from "../components/ImageGallery";
import nenHong2 from "/images/Nền hồng nhạt fixed mây.png"


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

export function Chapter1Page() {
  const { t } = useTranslation("chapter1");
  const content = t("content", { returnObjects: true }) as ChapterContent;
  const [scrollY, setScrollY] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [visibleChunks, setVisibleChunks] = useState<Set<string>>(new Set());
  const [expandedParagraphs, setExpandedParagraphs] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CHUNK_HEIGHT = window.innerHeight; // Mỗi passage chiếm full screen
  const BUFFER_SIZE = 2;
  const MAX_TEXT_LENGTH = 300; // Giới hạn ký tự cho đoạn văn

  const glassStyle = "bg-black/40 backdrop-blur-sm rounded-lg shadow-lg";

  // Toggle expand/collapse for a specific paragraph
  const toggleParagraphExpansion = useCallback((chunkId: string) => {
    setExpandedParagraphs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chunkId)) {
        newSet.delete(chunkId);
      } else {
        newSet.add(chunkId);
      }
      return newSet;
    });
  }, []);

  // Function to truncate text
  const getTruncatedText = useCallback((text: string, chunkId: string) => {
    const isExpanded = expandedParagraphs.has(chunkId);
    if (text.length <= MAX_TEXT_LENGTH || isExpanded) {
      return text;
    }
    return text.substring(0, MAX_TEXT_LENGTH) + "...";
  }, [expandedParagraphs, MAX_TEXT_LENGTH]);

  // Check if text needs truncation
  const needsTruncation = useCallback((text: string) => {
    return text.length > MAX_TEXT_LENGTH;
  }, [MAX_TEXT_LENGTH]);

  const contentChunks = useMemo(() => {
    if (!content || typeof content !== "object") return [];

    const chunks: ContentChunk[] = [];
    let passageCounter = 0;

    // Title chunk
    chunks.push({
      id: "title",
      sectionTitle: "Title",
      sectionIndex: -1,
      paragraph: { passage: 0, text: "", images: [] },
      type: "title",
      height: CHUNK_HEIGHT,
      isEven: false,
    });

    // Content chunks - một chunk cho mỗi passage
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
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -100px 0px",
        root: scrollRef.current,
      }
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

  const renderChunk = useCallback(
    (chunkData: (typeof chunkPositions)[0], _index: number) => {
      const isVisible = visibleChunks.has(chunkData.id);
      const topOffset = chunkData.top;
      const chunkHeight = chunkData.height;

      if (chunkData.type === "title") {
        return (
          <div
            key={chunkData.id}
            data-chunk-id={chunkData.id}
            className="absolute w-full flex flex-col items-center justify-center overflow-hidden"
            style={{ top: topOffset, height: chunkHeight }}
          >
            <img
              src={nenHong2}
              className="absolute top-0 left-0 w-full h-full z-0"
              alt="Background"
              loading="lazy"
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                minHeight: '100%',
                width: '100%'
              }}
            />
            <div className="relative z-10 text-center px-6">
              <h1
                className={`text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg transition-all duration-1500 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                {t("title")}
              </h1>
              <p
                className={`text-xl md:text-2xl text-white max-w-4xl leading-relaxed transition-all duration-1500 ease-out ${
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

      const hasImages = chunkData.paragraph.images.length > 0;
      const contentOnLeft = chunkData.isEven;

      return (
        <div
          key={chunkData.id}
          data-chunk-id={chunkData.id}
          className="absolute w-full flex items-center justify-center overflow-hidden"
          style={{ top: topOffset, height: chunkHeight }}
        >
          <img
            src={nenHong2}
            className="absolute top-0 left-0 w-full h-full z-0"
            alt="Background"
            loading="lazy"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              minHeight: '100%',
              width: '100%'
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex items-center">
            <div className={`grid grid-cols-1 ${hasImages ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 items-center w-full min-h-[80vh]`}>

              {/* Content */}
              <div
                className={`space-y-6 ${
                  hasImages ? (contentOnLeft ? 'lg:order-1' : 'lg:order-2') : 'lg:col-span-1 max-w-4xl mx-auto'
                } transition-all duration-1200 ease-out ${
                  isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${contentOnLeft ? 'translate-x-[-50px]' : 'translate-x-[50px]'}`
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                {/* Only show section title for passage 1 */}
                {chunkData.paragraph.passage === 1 && (
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center lg:text-left">
                    {chunkData.sectionTitle}
                  </h2>
                )}

                <div className={`${glassStyle} p-8`}>
                  <p className="text-lg md:text-xl text-white whitespace-pre-wrap leading-relaxed font-medium">
                    {getTruncatedText(chunkData.paragraph.text, chunkData.id)}
                  </p>

                  {needsTruncation(chunkData.paragraph.text) && (
                    <button
                      onClick={() => toggleParagraphExpansion(chunkData.id)}
                      className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 text-sm font-medium"
                    >
                      {expandedParagraphs.has(chunkData.id) ? "Ẩn bớt" : "Hiển thị đầy đủ"}
                    </button>
                  )}
                </div>
              </div>

              {/* Images */}
              {hasImages && (
                <div
                  className={`${contentOnLeft ? 'lg:order-2' : 'lg:order-1'} h-full flex items-center justify-center`}
                >
                  <ImageGallery
                    images={chunkData.paragraph.images}
                    isVisible={isVisible}
                    delay={600}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },
    [visibleChunks, glassStyle, t, getTruncatedText, needsTruncation, toggleParagraphExpansion, expandedParagraphs]
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
      <style>
        {`
          @keyframes slideProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
      <div className="relative w-full h-screen overflow-hidden">
        <div
          ref={scrollRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden"
          onScroll={handleScroll}
          style={{ scrollBehavior: "smooth" }}
        >
          <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: totalHeight }}
          >
            {visibleChunkIndices.map((i) => renderChunk(chunkPositions[i], i))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300"
            style={{
              width: `${Math.min(100, (scrollY / (totalHeight - containerHeight)) * 100)}%`,
            }}
          />
        </div>

        {/* Navigation dots */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
          {chunkPositions.map((chunkData) => (
            <button
              key={chunkData.id}
              onClick={() =>
                scrollRef.current?.scrollTo({
                  top: chunkData.top,
                  behavior: "smooth",
                })
              }
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                visibleChunks.has(chunkData.id)
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              title={
                chunkData.type === "title"
                  ? "Title"
                  : `${chunkData.sectionTitle} - Passage ${chunkData.paragraph.passage}`
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
