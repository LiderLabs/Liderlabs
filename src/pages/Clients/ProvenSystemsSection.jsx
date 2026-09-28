import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

import washlabImage from "../../assets/images/washlab-bg.png";
import styleoImage from "../../assets/images/styleo-bg.png";
import taliImage from "../../assets/images/tali-bg.png";
import gridImage from "../../assets/images/grid-bg.png";
import portaImage from "../../assets/images/porta-bg.png";

const projects = [
  {
    name: "Washlab",
    category: "University Laundry App",
    description:
      "A laundry application designed for university students, making it easier to access and manage laundry services on campus.",
    url: "https://washlab.app/",
    image: washlabImage,
  },
  {
    name: "Styleo",
    category: "Beauty Platform",
    description:
      "A beauty application designed for stylists and customers to connect around beauty and personal care services.",
    url: "https://styleoapp.com/",
    image: styleoImage,
  },
  {
    name: "Tali",
    category: "Management System",
    description:
      "A management application designed to help organizations manage workflows, operations, and everyday business processes.",
    url: null,
    image: taliImage,
  },
  {
    name: "Grid",
    category: "Screen Management",
    description:
      "A centralized screen management platform built on top of a Node server and dashboard, allowing multiple screens and applications to be controlled from one place.",
    url: null,
    image: gridImage,
  },
  {
    name: "Porta",
    category: "Digital Check-In",
    description:
      "A digital check-in system designed to manage guest and visitor arrivals and departures through a simple check-in and check-out workflow.",
    url: null,
    image: portaImage,
  },
];

const mobileSignalPath = `
  M195 0
  C195 95 150 140 160 225
  C170 315 235 360 225 450
  C215 540 165 600 175 690
  C185 770 215 820 195 860
`;

const tabletSignalPath = `
  M384 0
  C384 95 315 140 325 225
  C335 315 455 360 445 450
  C435 540 330 600 340 690
  C350 770 420 820 384 860
`;

const desktopSignalPath = `
  M610 0
  C610 95 535 145 500 220
  C465 300 525 355 610 390
  C700 430 760 485 720 560
  C680 630 625 690 610 760
  C600 805 605 835 610 860
`;

function ProvenSystemsSignal({
  path,
  pathRef,
  dotRef,
  viewBox,
  filterId,
  opacity,
  className,
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      className={className}
    >
      <defs>
        <filter
          id={filterId}
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feGaussianBlur stdDeviation="4" result="blur" />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={path}
        stroke="currentColor"
        strokeWidth="5"
        strokeDasharray="7 12"
        strokeLinecap="round"
        opacity="0.03"
        vectorEffect="non-scaling-stroke"
      />

      <path
        ref={pathRef}
        d={path}
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="7 12"
        strokeLinecap="round"
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
      />

      <g ref={dotRef} filter={`url(#${filterId})`}>
        <circle
          cx="0"
          cy="0"
          r="11"
          fill="currentColor"
          opacity="0.13"
        />

        <circle
          cx="0"
          cy="0"
          r="5"
          fill="currentColor"
        />

        <circle
          cx="0"
          cy="0"
          r="1.8"
          fill="white"
        />
      </g>
    </svg>
  );
}

function ProvenSystemsSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const mobilePathRef = useRef(null);
  const mobileDotRef = useRef(null);

  const tabletPathRef = useRef(null);
  const tabletDotRef = useRef(null);

  const desktopPathRef = useRef(null);
  const desktopDotRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          mobile: "(max-width: 767px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const {
            mobile,
            tablet,
            desktop,
            reduceMotion,
          } = context.conditions;

          const heading = section.querySelector(
            ".proven-heading",
          );

          const copy = section.querySelector(
            ".proven-copy",
          );

          const cards = gsap.utils.toArray(
            ".proven-system-card",
          );

          const observers = [];

          const observeOnce = (
            element,
            callback,
            options = {},
          ) => {
            if (!element) return;

            const observer = new IntersectionObserver(
              ([entry]) => {
                if (!entry?.isIntersecting) return;

                callback();
                observer.disconnect();
              },
              options,
            );

            observer.observe(element);
            observers.push(observer);
          };

          if (reduceMotion) {
            gsap.set(
              [
                heading,
                copy,
                cards,
                ".proven-system-image-wrap",
                ".proven-system-content",
                ".proven-system-category",
                ".proven-system-status",
                ".proven-system-rail",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                scaleX: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(".proven-system-sheen", {
              autoAlpha: 0,
            });

            gsap.set(
              [
                mobileDotRef.current,
                tabletDotRef.current,
                desktopDotRef.current,
              ],
              {
                autoAlpha: 0,
              },
            );

            return;
          }

          gsap.set(heading, {
            y: mobile ? 36 : 30,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: mobile ? 26 : 20,
            autoAlpha: 0,
          });

          observeOnce(
            heading,
            () => {
              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(heading, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.7,
                })
                .to(
                  copy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.55,
                  },
                  "-=0.38",
                );
            },
            {
              threshold: 0.1,
              rootMargin: mobile
                ? "0px 0px -4% 0px"
                : "0px 0px -6% 0px",
            },
          );

          let signalPath = null;
          let signalDot = null;

          if (mobile) {
            signalPath = mobilePathRef.current;
            signalDot = mobileDotRef.current;
          }

          if (tablet) {
            signalPath = tabletPathRef.current;
            signalDot = tabletDotRef.current;
          }

          if (desktop) {
            signalPath = desktopPathRef.current;
            signalDot = desktopDotRef.current;
          }

          if (signalPath && signalDot) {
            gsap.to(signalPath, {
              strokeDashoffset: desktop ? -150 : -125,
              duration: desktop ? 9 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 1,
              scale: mobile ? 0.92 : 0.84,
              transformOrigin: "50% 50%",
            });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,

                  start: desktop
                    ? "top 76%"
                    : tablet
                      ? "top 88%"
                      : "top 92%",

                  end: desktop
                    ? "bottom 30%"
                    : tablet
                      ? "bottom 14%"
                      : "bottom 8%",

                  scrub: desktop
                    ? 0.6
                    : tablet
                      ? 0.76
                      : 0.66,

                  invalidateOnRefresh: true,
                },
              })
              .to(
                signalDot,
                {
                  motionPath: {
                    path: signalPath,
                    align: signalPath,
                    alignOrigin: [0.5, 0.5],
                    start: 0,
                    end: 1,
                  },

                  duration: 1,
                  ease: "none",
                },
                0,
              )
              .to(
                signalDot,
                {
                  scale: mobile ? 1.45 : 1.3,
                  duration: 0.06,
                  ease: "power2.out",
                },
                0.92,
              )
              .to(
                signalDot,
                {
                  scale: 0.9,
                  duration: 0.08,
                  ease: "power2.inOut",
                },
                0.97,
              );
          }

          if (!desktop) {
            cards.forEach((card, index) => {
              const imageWrap = card.querySelector(
                ".proven-system-image-wrap",
              );

              const category = card.querySelector(
                ".proven-system-category",
              );

              const content = card.querySelector(
                ".proven-system-content",
              );

              const status = card.querySelector(
                ".proven-system-status",
              );

              const rail = card.querySelector(
                ".proven-system-rail",
              );

              const sheen = card.querySelector(
                ".proven-system-sheen",
              );

              const direction =
                tablet && index % 2 === 1 ? 1 : -1;

              gsap.set(card, {
                x: tablet ? direction * 20 : 0,
                y: mobile ? 48 : 38,
                scale: mobile ? 0.96 : 0.975,
                autoAlpha: 0,
              });

              gsap.set(imageWrap, {
                scale: 1.06,
              });

              gsap.set(category, {
                y: -12,
                scale: 0.95,
                autoAlpha: 0,
              });

              gsap.set(content, {
                y: 20,
                autoAlpha: 0,
              });

              gsap.set(status, {
                y: 10,
                autoAlpha: 0,
              });

              gsap.set(rail, {
                scaleX: 0,
                transformOrigin: "left center",
              });

              gsap.set(sheen, {
                xPercent: -140,
                autoAlpha: 0,
              });

              observeOnce(
                card,
                () => {
                  gsap
                    .timeline({
                      defaults: {
                        ease: "power3.out",
                      },
                    })
                    .to(card, {
                      x: 0,
                      y: 0,
                      scale: 1,
                      autoAlpha: 1,
                      duration: mobile ? 0.68 : 0.62,
                    })
                    .to(
                      rail,
                      {
                        scaleX: 1,
                        duration: 0.4,
                        ease: "power2.out",
                      },
                      "-=0.42",
                    )
                    .to(
                      imageWrap,
                      {
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                      },
                      "-=0.52",
                    )
                    .to(
                      category,
                      {
                        y: 0,
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.4,
                      },
                      "-=0.62",
                    )
                    .to(
                      content,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.48,
                      },
                      "-=0.34",
                    )
                    .to(
                      status,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.36,
                      },
                      "-=0.24",
                    )
                    .to(
                      sheen,
                      {
                        xPercent: 140,
                        autoAlpha: 1,
                        duration: 0.7,
                        ease: "power2.inOut",
                      },
                      "-=0.46",
                    )
                    .to(
                      sheen,
                      {
                        autoAlpha: 0,
                        duration: 0.16,
                      },
                      "-=0.15",
                    );
                },
                {
                  threshold: tablet ? 0.12 : 0.07,
                  rootMargin: tablet
                    ? "0px 0px -7% 0px"
                    : "0px 0px -3% 0px",
                },
              );
            });

            return () => {
              observers.forEach((observer) => {
                observer.disconnect();
              });
            };
          }

          cards.forEach((card, index) => {
            const column = index % 3;

            const xOffset =
              column === 0
                ? -28
                : column === 2
                  ? 28
                  : 0;

            const imageWrap = card.querySelector(
              ".proven-system-image-wrap",
            );

            const category = card.querySelector(
              ".proven-system-category",
            );

            const content = card.querySelector(
              ".proven-system-content",
            );

            const status = card.querySelector(
              ".proven-system-status",
            );

            const rail = card.querySelector(
              ".proven-system-rail",
            );

            const sheen = card.querySelector(
              ".proven-system-sheen",
            );

            gsap.set(card, {
              x: xOffset,
              y: 44,
              scale: 0.965,
              autoAlpha: 0.2,
            });

            gsap.set(imageWrap, {
              scale: 1.055,
            });

            gsap.set(category, {
              y: -10,
              autoAlpha: 0,
            });

            gsap.set(content, {
              y: 18,
              autoAlpha: 0,
            });

            gsap.set(status, {
              y: 8,
              autoAlpha: 0,
            });

            gsap.set(rail, {
              scaleX: 0,
              transformOrigin: "left center",
            });

            gsap.set(sheen, {
              xPercent: -140,
              autoAlpha: 0,
            });
          });

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              end: "bottom 38%",
              scrub: 0.62,
              invalidateOnRefresh: true,
            },
          });

          const positions = [
            0.05,
            0.2,
            0.35,
            0.56,
            0.72,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const imageWrap = card.querySelector(
              ".proven-system-image-wrap",
            );

            const category = card.querySelector(
              ".proven-system-category",
            );

            const content = card.querySelector(
              ".proven-system-content",
            );

            const status = card.querySelector(
              ".proven-system-status",
            );

            const rail = card.querySelector(
              ".proven-system-rail",
            );

            const sheen = card.querySelector(
              ".proven-system-sheen",
            );

            story.to(
              card,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                borderColor:
                  "rgba(23,109,140,0.20)",
                boxShadow:
                  "0 18px 42px rgba(15,35,55,0.09)",
                duration: 0.14,
                ease: "power2.out",
              },
              position,
            );

            story.to(
              rail,
              {
                scaleX: 1,
                duration: 0.11,
                ease: "power2.out",
              },
              position + 0.01,
            );

            story.to(
              imageWrap,
              {
                scale: 1,
                duration: 0.18,
                ease: "power2.out",
              },
              position + 0.01,
            );

            story.to(
              category,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.1,
                ease: "power2.out",
              },
              position + 0.03,
            );

            story.to(
              content,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.12,
                ease: "power2.out",
              },
              position + 0.05,
            );

            story.to(
              status,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.1,
                ease: "power2.out",
              },
              position + 0.08,
            );

            story
              .to(
                sheen,
                {
                  xPercent: 140,
                  autoAlpha: 1,
                  duration: 0.16,
                  ease: "power1.inOut",
                },
                position + 0.02,
              )
              .to(
                sheen,
                {
                  autoAlpha: 0,
                  duration: 0.06,
                },
                position + 0.16,
              );

            story.to(
              card,
              {
                boxShadow:
                  "0 8px 26px rgba(15,35,55,0.055)",
                duration: 0.12,
              },
              position + 0.18,
            );
          });

          return () => {
            observers.forEach((observer) => {
              observer.disconnect();
            });
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  const renderCardContent = (project) => (
    <>
      <div
        className="
          relative
          overflow-hidden
          border-b
          border-brand-border-light
          bg-brand-surface-blue
        "
      >
        <div
          className="
            proven-system-image-wrap
            relative
            aspect-8/5
            w-full
            overflow-hidden
            bg-brand-surface-blue
          "
        >
          <img
            src={project.image}
            alt={`${project.name} project preview`}
            loading="lazy"
            decoding="async"
            className="
              proven-system-image
              size-full
              object-cover
              object-top
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.025]
            "
          />
        </div>

        <span
          className="
            proven-system-category
            absolute
            left-4
            top-4
            z-10
            rounded-full
            border
            border-white/60
            bg-white/90
            px-3
            py-1.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-brand-primary
            shadow-[0_4px_15px_rgba(15,35,55,0.08)]
            backdrop-blur-md
            md:text-[10px]
          "
        >
          {project.category}
        </span>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-12
            bg-gradient-to-t
            from-black/[0.06]
            to-transparent
          "
        />

        <div
          aria-hidden="true"
          className="
            proven-system-sheen
            pointer-events-none
            absolute
            inset-y-0
            left-0
            w-1/2
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />
      </div>

      <div
        className="
          proven-system-content
          flex
          flex-1
          flex-col
          bg-white
          p-5
          sm:p-6
        "
      >
        <h3
          className="
            text-[20px]
            font-semibold
            tracking-[-0.025em]
            text-brand-ink
            md:text-[21px]
          "
        >
          {project.name}
        </h3>

        <p
          className="
            mt-3
            max-w-[330px]
            text-[12px]
            leading-6
            text-brand-muted
            md:text-[13px]
          "
        >
          {project.description}
        </p>

        <div
          className="
            proven-system-status
            mt-auto
            pt-6
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-brand-primary/60
          "
        >
          {project.url ? "Live product" : "In Progress"}
        </div>
      </div>
    </>
  );

  const cardClasses = `
    proven-system-card
    group
    relative
    flex
    min-h-[430px]
    flex-col
    overflow-hidden
    rounded-[18px]
    border
    border-brand-border-light
    bg-white
    shadow-[0_8px_26px_rgba(15,35,55,0.055)]
    transition-[transform,border-color,box-shadow]
    duration-300
    ease-out
    hover:-translate-y-1
    hover:border-brand-primary/25
    hover:shadow-[0_18px_42px_rgba(15,35,55,0.11)]
    motion-reduce:transform-none
  `;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        px-4
        py-14
        sm:px-6
        sm:py-16
        md:px-8
        md:py-20
        lg:px-10
        lg:py-24
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-[18%]
          size-85
          rounded-full
          bg-brand-cyan/[0.035]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-[5%]
          size-90
          rounded-full
          bg-brand-primary/[0.04]
          blur-[110px]
        "
      />

      <ProvenSystemsSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 860"
        filterId="proven-mobile-glow"
        opacity={0.21}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          size-full
          overflow-visible
          text-brand-cyan
          md:hidden
        "
      />

      <ProvenSystemsSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 860"
        filterId="proven-tablet-glow"
        opacity={0.19}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          hidden
          size-full
          overflow-visible
          text-brand-cyan
          md:block
          lg:hidden
        "
      />

      <ProvenSystemsSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1220 860"
        filterId="proven-desktop-glow"
        opacity={0.17}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          hidden
          size-full
          overflow-visible
          text-brand-cyan
          lg:block
        "
      />

      <div className="relative z-10 mx-auto max-w-[1220px]">
        <div
          className="
            grid
            gap-5
            lg:grid-cols-[1fr_0.75fr]
            lg:items-end
            lg:gap-8
          "
        >
          <h2
            className="
              proven-heading
              text-[30px]
              font-bold
              leading-[1.05]
              tracking-[-0.04em]
              text-brand-ink
              sm:text-[32px]
              md:text-[38px]
              lg:text-[40px]
            "
          >
            Proven Systems in Production
          </h2>

          <p
            className="
              proven-copy
              max-w-[460px]
              text-[13px]
              leading-6
              text-brand-muted
              md:text-[14px]
              lg:justify-self-end
              lg:text-right
            "
          >
            Real digital products designed to solve operational challenges
            across services, management, connected environments, and guest
            experiences.
          </p>
        </div>

        <div
          ref={gridRef}
          className="
            mt-9
            grid
            gap-5
            sm:mt-10
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {projects.map((project) =>
            project.url ? (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name} website`}
                className={`
                  ${cardClasses}
                  cursor-pointer
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2
                `}
              >
                <span
                  aria-hidden="true"
                  className="
                    proven-system-rail
                    absolute
                    left-0
                    top-0
                    z-20
                    h-0.5
                    w-full
                    origin-left
                    bg-brand-cyan
                  "
                />

                {renderCardContent(project)}
              </a>
            ) : (
              <article
                key={project.name}
                className={`
                  ${cardClasses}
                  cursor-default
                `}
              >
                <span
                  aria-hidden="true"
                  className="
                    proven-system-rail
                    absolute
                    left-0
                    top-0
                    z-20
                    h-0.5
                    w-full
                    origin-left
                    bg-brand-cyan
                  "
                />

                {renderCardContent(project)}
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default ProvenSystemsSection;