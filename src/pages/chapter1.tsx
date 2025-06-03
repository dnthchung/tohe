import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import nenHong from "/images/Nền hồng.png";

interface Paragraph {
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
  chunkIndex: number;
  paragraphs: Paragraph[];
  type: "title" | "content";
}

export function Chapter1Page() {
  const { t } = useTranslation("chapter1");
  const content = t("content", { returnObjects: true }) as ChapterContent;

  // Virtual scrolling state
  const [scrollY, setScrollY] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [visibleChunks, setVisibleChunks] = useState<Set<string>>(new Set());

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Configuration
  const MAX_PARAGRAPHS_PER_CHUNK = 2; // Max paragraphs per chunk
  const ESTIMATED_PARAGRAPH_HEIGHT = 200; // Estimated height per paragraph
  const BASE_CHUNK_HEIGHT = 400; // Base height for title and spacing
  const BUFFER_SIZE = 2; // Number of chunks to render above/below viewport

  const glassStyle = "bg-black/40 backdrop-blur-sm rounded-lg shadow-lg";

  // Content chunking logic with dynamic height calculation
  const contentChunks = useMemo(() => {
    if (!content || typeof content !== "object") return [];

    const chunks: (ContentChunk & { height: number })[] = [];
    const sections = Object.entries(content);

    // Add title chunk
    chunks.push({
      id: "title",
      sectionTitle: "Title",
      sectionIndex: -1,
      chunkIndex: 0,
      paragraphs: [],
      type: "title",
      height: 800, // Fixed height for title
    });

    sections.forEach(([sectionTitle, paragraphs], sectionIndex) => {
      if (!Array.isArray(paragraphs)) return;

      // Split paragraphs into chunks based on content
      for (let i = 0; i < paragraphs.length; i += MAX_PARAGRAPHS_PER_CHUNK) {
        const chunkParagraphs = paragraphs.slice(i, i + MAX_PARAGRAPHS_PER_CHUNK);
        const chunkIndex = Math.floor(i / MAX_PARAGRAPHS_PER_CHUNK);

        // Calculate dynamic height based on content
        let chunkHeight = BASE_CHUNK_HEIGHT;

        // Add height for section title (only for first chunk)
        if (chunkIndex === 0) {
          chunkHeight += 100;
        }

        // Add height for each paragraph
        chunkParagraphs.forEach((para) => {
          if (para?.text) {
            // Estimate height based on text length
            const textLength = para.text.length;
            const estimatedLines = Math.ceil(textLength / 80); // ~80 chars per line
            chunkHeight += Math.max(ESTIMATED_PARAGRAPH_HEIGHT, estimatedLines * 25);
          }

          // Add height for images
          if (para?.images && para.images.length > 0) {
            chunkHeight += 400; // Height for image slider
          }
        });

        // Minimum height to ensure good spacing
        chunkHeight = Math.max(chunkHeight, 600);

        chunks.push({
          id: `section-${sectionIndex}-chunk-${chunkIndex}`,
          sectionTitle,
          sectionIndex,
          chunkIndex,
          paragraphs: chunkParagraphs,
          type: "content",
          height: chunkHeight,
        });
      }
    });

    return chunks;
  }, [content]);

  // Calculate cumulative positions for each chunk
  const chunkPositions = useMemo(() => {
    let currentPosition = 0;
    return contentChunks.map((chunk) => {
      const position = currentPosition;
      currentPosition += chunk.height;
      return {
        ...chunk,
        top: position,
        bottom: currentPosition,
      };
    });
  }, [contentChunks]);

  // Calculate total height from actual chunk heights
  const totalHeight = chunkPositions.length > 0 ? chunkPositions[chunkPositions.length - 1].bottom : 0;

  // Calculate visible chunks based on scroll position
  const visibleChunkIndices = useMemo(() => {
    const visibleIndices: number[] = [];

    chunkPositions.forEach((chunk, index) => {
      // Check if chunk is in viewport (with buffer)
      const chunkTop = chunk.top;
      const chunkBottom = chunk.bottom;
      const viewportTop = scrollY - BUFFER_SIZE * 400; // Buffer area
      const viewportBottom = scrollY + containerHeight + BUFFER_SIZE * 400;

      if (chunkBottom >= viewportTop && chunkTop <= viewportBottom) {
        visibleIndices.push(index);
      }
    });

    return visibleIndices;
  }, [scrollY, containerHeight, chunkPositions]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const newScrollY = scrollRef.current.scrollTop;
      setScrollY(newScrollY);

      // Update CSS custom property for parallax effects
      document.documentElement.style.setProperty("--scroll", `${newScrollY}px`);
    }
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const chunkId = entry.target.getAttribute("data-chunk-id");
          if (chunkId) {
            setVisibleChunks((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(chunkId);
              } else {
                newSet.delete(chunkId);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px",
        root: scrollRef.current,
      },
    );

    // Observe visible chunks
    const chunkElements = document.querySelectorAll("[data-chunk-id]");
    chunkElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleChunkIndices]);

  // Handle container resize
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

  // Image slider component
  const ImageSlider = ({ images, sectionTitle, isVisible, delay }: { images: string[]; sectionTitle: string; isVisible: boolean; delay: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div className={`${glassStyle} p-4 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} style={{ transitionDelay: `${delay}ms` }}>
          <img src={`/${images[0]}`} alt={`Illustration for ${sectionTitle}`} className="w-full h-auto object-contain rounded max-h-96" loading="lazy" />
        </div>
      );
    }

    return (
      <div className={`${glassStyle} p-4 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`} style={{ transitionDelay: `${delay}ms` }}>
        <div className="relative">
          <img src={`/${images[currentIndex]}`} alt={`Illustration ${currentIndex + 1} for ${sectionTitle}`} className="w-full h-auto object-contain rounded max-h-96" loading="lazy" />

          {/* Navigation buttons */}
          <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-3">
            {images.map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>

          {/* Image counter */}
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    );
  };

  // Render individual chunk
  const renderChunk = useCallback(
    (chunkData: (typeof chunkPositions)[0], index: number) => {
      const isVisible = visibleChunks.has(chunkData.id);
      const topOffset = chunkData.top;
      const chunkHeight = chunkData.height;

      if (chunkData.type === "title") {
        return (
          <div
            key={chunkData.id}
            data-chunk-id={chunkData.id}
            className="absolute w-full flex flex-col items-center justify-center overflow-hidden"
            style={{
              top: topOffset,
              height: chunkHeight,
              transform: `translateZ(0)`, // Force GPU acceleration
            }}
          >
            <img src={nenHong} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" loading="lazy" />
            <div className="relative z-10 text-center px-6">
              <h1
                className={`text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-sm transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {t("title")}
              </h1>
              <p
                className={`text-xl text-white max-w-4xl leading-relaxed transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: "300ms" }}
              >
                {t("description")}
              </p>
            </div>
          </div>
        );
      }

      // Collect all images from this chunk for the slider
      const allImages = chunkData.paragraphs.reduce((acc, para) => {
        if (para.images && Array.isArray(para.images)) {
          return [...acc, ...para.images];
        }
        return acc;
      }, [] as string[]);

      return (
        <div
          key={chunkData.id}
          data-chunk-id={chunkData.id}
          className="absolute w-full flex flex-col justify-center items-center overflow-hidden py-8"
          style={{
            top: topOffset,
            height: chunkHeight,
            transform: `translateZ(0)`, // Force GPU acceleration
          }}
        >
          <img src={nenHong} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" loading="lazy" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            {/* Section Title - show for first chunk of each section */}
            {chunkData.chunkIndex === 0 && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-white text-center transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                {chunkData.sectionTitle}
              </h2>
            )}

            {/* Main content layout: Text left, Images right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left column: Text content */}
              <div className="space-y-6">
                {chunkData.paragraphs.map((para, paraIndex) => {
                  if (!para || typeof para !== "object" || !para.text) return null;

                  return (
                    <div
                      key={paraIndex}
                      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{
                        transitionDelay: `${300 + paraIndex * 200}ms`,
                      }}
                    >
                      <div className={`${glassStyle} p-6`}>
                        <p className="text-lg text-white whitespace-pre-wrap leading-relaxed font-medium">{para.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right column: Image slider */}
              {allImages.length > 0 && (
                <div className="sticky top-8">
                  <ImageSlider images={allImages} sectionTitle={chunkData.sectionTitle} isVisible={isVisible} delay={500} />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    },
    [visibleChunks, glassStyle, t],
  );

  if (!content || typeof content !== "object") {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <img src={nenHong} className="absolute top-0 left-0 w-full h-full object-fill z-0" alt="Background" />
        <div className="relative z-10 text-center">
          <p className="text-lg text-white">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Virtual scroll container */}
      <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden" onScroll={handleScroll} style={{ scrollBehavior: "smooth" }}>
        {/* Virtual content container */}
        <div ref={containerRef} className="relative w-full" style={{ height: totalHeight }}>
          {/* Render only visible chunks */}
          {visibleChunkIndices.map((chunkIndex) => {
            const chunkData = chunkPositions[chunkIndex];
            return chunkData ? renderChunk(chunkData, chunkIndex) : null;
          })}
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300"
          style={{
            width: `${Math.min(100, (scrollY / (totalHeight - containerHeight)) * 100)}%`,
          }}
        />
      </div>

      {/* Chunk navigation - optional */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-1">
        {chunkPositions.map((chunkData, index) => (
          <button
            key={chunkData.id}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  top: chunkData.top,
                  behavior: "smooth",
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${visibleChunks.has(chunkData.id) ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"}`}
            title={chunkData.type === "title" ? "Title" : `${chunkData.sectionTitle} - Part ${chunkData.chunkIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
