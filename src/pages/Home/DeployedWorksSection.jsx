import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

const deployedItems = [
  {
    id: "gcx-1",
    projectName: "GCX",
    type: "image",
    src: "/gcx image 1.jpg",
    alt: "GCX trading floor video wall display",
    caption: "Trading Floor Video Wall Display",
  },
  {
    id: "gcx-2",
    projectName: "GCX",
    type: "image",
    src: "/GCX 2.jpg",
    alt: "GCX operations and ticker deployment",
    caption: "Operations & Market Ticker Display",
  },
  {
    id: "grid-1",
    projectName: "Grid",
    type: "video",
    src: "/Grid 1.mp4",
    alt: "Grid multi-display screen management demo",
    caption: "Multi-Display Network Demonstration",
  },
  {
    id: "grid-2",
    projectName: "Grid",
    type: "video",
    src: "/Grid 2.mp4",
    alt: "Grid central control dashboard demo",
    caption: "Centralized Screen Control & Layout Demo",
  },
];

const projects = [
  {
    id: "gcx",
    name: "GCX",
    description: "Commodity exchange trading floor at Ministry of Finance.",
    items: deployedItems.filter((i) => i.projectName === "GCX"),
  },
  {
    id: "grid",
    name: "GRID",
    description: "Centralized screen management platform and live display network.",
    items: deployedItems.filter((i) => i.projectName === "Grid"),
  },
];

function LightboxModal({ initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scrollContainerRef = useRef(null);

  const activeItem = deployedItems[currentIndex] || deployedItems[0];

  const goToIndex = (index) => {
    if (index < 0 || index >= deployedItems.length) return;
    setCurrentIndex(index);

    const container = scrollContainerRef.current;
    if (container && container.children[index]) {
      container.children[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  // Scroll to initial index on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const frame = requestAnimationFrame(() => {
      const targetChild = container.children[initialIndex];
      if (targetChild) {
        targetChild.scrollIntoView({ behavior: "instant", inline: "center", block: "nearest" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [initialIndex]);

  // Handle keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToIndex(Math.max(0, currentIndex - 1));
      } else if (e.key === "ArrowRight") {
        goToIndex(Math.min(deployedItems.length - 1, currentIndex + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [currentIndex, onClose]);

  // Track active slide when user scrolls or swipes horizontally
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth;
    if (itemWidth > 0) {
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex >= 0 && newIndex < deployedItems.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Deployed Works Gallery"
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl text-white select-none transition-all duration-300"
    >
      {/* Top Header Bar */}
      <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-8">
        {/* Project Name and Index Indicator */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {activeItem.projectName}
          </h2>
          <span className="text-white/40">•</span>
          <span className="text-sm font-medium text-white/70 sm:text-base">
            {activeItem.caption}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
            {currentIndex + 1} / {deployedItems.length}
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery (Esc)"
          className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition-all hover:scale-105 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      {/* Main Horizontal Scrollable Gallery Container */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Left Floating Arrow */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={() => goToIndex(currentIndex - 1)}
            aria-label="Previous item"
            className="absolute left-4 z-30 hidden size-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90 sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Floating Arrow */}
        {currentIndex < deployedItems.length - 1 && (
          <button
            type="button"
            onClick={() => goToIndex(currentIndex + 1)}
            aria-label="Next item"
            className="absolute right-4 z-30 hidden size-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90 sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scroll Track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex size-full snap-x snap-mandatory overflow-x-auto scroll-smooth outline-none scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {deployedItems.map((item, index) => (
            <div
              key={item.id}
              className="flex h-full min-w-full shrink-0 snap-center items-center justify-center p-4 sm:p-8"
            >
              <div className="relative flex max-h-[78vh] max-w-[92vw] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    controls
                    playsInline
                    autoPlay={index === currentIndex}
                    className="max-h-[76vh] w-auto max-w-full rounded-xl object-contain"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-[76vh] w-auto max-w-full rounded-xl object-contain"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation & Indicator Bar */}
      <footer className="relative z-20 flex h-16 shrink-0 items-center justify-center gap-2 border-t border-white/10 px-4">
        {deployedItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goToIndex(index)}
            aria-label={`Go to ${item.projectName} ${item.type} ${index + 1}`}
            className={[
              "flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan",
              index === currentIndex
                ? "bg-brand-cyan text-white shadow-lg scale-105"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white",
            ].join(" ")}
          >
            <span>{item.projectName}</span>
            <span className="text-[11px] opacity-75">#{index + 1}</span>
          </button>
        ))}
      </footer>
    </div>
  );
}

function DeployedWorksSection({ id = "deployed-works", isStandalonePage = false }) {
  const sectionRef = useRef(null);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          const heading = section.querySelector(".deployed-heading");
          const projectGroups = gsap.utils.toArray(".deployed-project-group");

          if (reduceMotion) {
            gsap.set([heading, projectGroups], { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            heading,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }
          );

          gsap.fromTo(
            projectGroups,
            { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.2,
              ease: "power3.out",
              delay: 0.15,
            }
          );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative overflow-hidden bg-brand-surface py-14 sm:py-16 md:py-20 lg:py-24 ${
        isStandalonePage ? "min-h-screen" : ""
      }`}
    >
      <div className="relative z-1 mx-auto max-w-310 px-4 sm:px-6 md:px-8 lg:px-10">
        <h2 className="deployed-heading text-[32px] font-bold leading-tight tracking-tight text-brand-cyan sm:text-[38px] md:text-[44px] lg:text-[48px]">
          Deployed Works
        </h2>

        {/* Projects Stack */}
        <div className="mt-10 flex flex-col gap-12 sm:mt-12 sm:gap-14 md:gap-16">
          {projects.map((project) => (
            <div key={project.id} className="deployed-project-group">
              <h3 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-brand-muted sm:text-lg md:text-xl">
                {project.description}
              </p>

              {/* Media row / grid */}
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
                {project.items.map((item) => {
                  const itemOverallIndex = deployedItems.findIndex((d) => d.id === item.id);
                  const isImage = item.type === "image";

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveModalIndex(itemOverallIndex)}
                      className={[
                        "group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-brand-border bg-white shadow-brand-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cyan/40 hover:shadow-xl",
                        isImage ? "aspect-4/3" : "aspect-video bg-black",
                      ].join(" ")}
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          controls
                          playsInline
                          preload="metadata"
                          className="size-full object-cover"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModalIndex !== null && (
        <LightboxModal
          initialIndex={activeModalIndex}
          onClose={() => setActiveModalIndex(null)}
        />
      )}
    </section>
  );
}

export default DeployedWorksSection;
