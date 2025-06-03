import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
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

  const ImageGallery = ({ images, isVisible, delay }: { images: string[]; isVisible: boolean; delay: number }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
      if (images.length <= 1 || !isAutoPlaying) return;

      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }, [images.length, isAutoPlaying]);

    const goToSlide = (index: number) => {
      setCurrentImageIndex(index);
      setIsAutoPlaying(false); // Pause auto-play when user manually navigates
    };

    const goToPrevious = () => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsAutoPlaying(false);
    };

    const goToNext = () => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsAutoPlaying(false);
    };

    const toggleAutoPlay = () => {
      setIsAutoPlaying(!isAutoPlaying);
    };

    if (images.length === 0) return null;

    return (
      <div
        className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="relative w-full max-w-lg mx-auto">
          <div className="relative overflow-hidden rounded-xl shadow-2xl bg-black/10 backdrop-blur-sm">
            {/* Main Image Container */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  alt={`Image ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                    index === currentImageIndex
                      ? 'opacity-100 transform scale-100'
                      : 'opacity-0 transform scale-105'
                  }`}
                  loading="lazy"
                />
              ))}
            </div>

            {images.length > 1 && (
              <>
                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Auto-play Toggle */}
                <button
                  onClick={toggleAutoPlay}
                  className="absolute top-3 left-3 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
                  title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isAutoPlaying ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                        index === currentImageIndex
                          ? "bg-white scale-125 shadow-lg"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>

                {/* Progress Bar for Auto-play */}
                {isAutoPlaying && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
                      style={{
                        animation: 'slideProgress 4s linear infinite'
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Thumbnails for multiple images */}
          {images.length > 1 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'border-white shadow-lg scale-105'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img
                    src={`/${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

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
