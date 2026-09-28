import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const approaches = [
  {
    title: "Easy to build upon",
    description:
      "With a solid infrastructure in place, it’s easy to add new features and functionalities as your business evolves.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5"
        aria-hidden="true"
      >
        <path
          d="m12 3 7 4v10l-7 4-7-4V7l7-4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="m5 7 7 4 7-4M12 11v10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Utilizing your know-how",
    description:
      "Your custom software solution will be designed to incorporate your unique know-how and processes.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5"
        aria-hidden="true"
      >
        <path
          d="M7 8V6a5 5 0 0 1 10 0v2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <rect
          x="5"
          y="8"
          width="14"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M9 13h6M9 16h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Built by software experts",
    description:
      "Benefit from working with an agency, including a dedicated project manager to ensure smooth project delivery.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5"
        aria-hidden="true"
      >
        <circle
          cx="9"
          cy="8"
          r="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <circle
          cx="17"
          cy="10"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M4 19c.5-3.1 2.2-5 5-5s4.5 1.9 5 5M14 15c2.5 0 4.2 1.3 5 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const mobileSignalPath = `
  M195 0
  C195 85 150 125 160 195
  C170 270 230 305 220 380
  C210 455 165 505 175 575
  C180 620 205 650 195 670
`;

const tabletSignalPath = `
  M384 0
  C384 85 320 125 330 200
  C340 275 445 310 435 385
  C425 460 330 510 340 580
  C350 625 410 650 384 670
`;

const desktopSignalPath = `
  M610 0
  C610 90 530 120 490 190
  C445 270 505 330 610 350
  C725 370 765 430 715 500
  C675 555 630 600 610 670
`;

function ApproachSignal({
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
        fill="none"
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
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="7 12"
        strokeLinecap="round"
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
      />

      <g
        ref={dotRef}
        filter={`url(#${filterId})`}
      >
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

function OurApproachSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

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
            ".approach-heading",
          );

          const cards = gsap.utils.toArray(
            ".approach-card",
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
                cards,
                ".approach-icon",
                ".approach-title",
                ".approach-copy",
                ".approach-card-rail",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                scaleX: 1,
                rotate: 0,
                autoAlpha: 1,
              },
            );

            gsap.set(".approach-card-sheen", {
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
            y: mobile ? 36 : 28,
            autoAlpha: 0,
          });

          observeOnce(
            heading,
            () => {
              gsap.to(heading, {
                y: 0,
                autoAlpha: 1,
                duration: mobile ? 0.65 : 0.7,
                ease: "power3.out",
              });
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
              strokeDashoffset: desktop ? -140 : -120,
              duration: desktop ? 9 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 1,
              scale: mobile ? 0.92 : 0.82,
              transformOrigin: "50% 50%",
            });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,

                  start: desktop
                    ? "top 74%"
                    : tablet
                      ? "top 88%"
                      : "top 92%",

                  end: desktop
                    ? "bottom 34%"
                    : tablet
                      ? "bottom 18%"
                      : "bottom 10%",

                  scrub: desktop
                    ? 0.55
                    : tablet
                      ? 0.75
                      : 0.65,

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
                  scale: mobile ? 1.45 : 1.28,
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
              const icon = card.querySelector(
                ".approach-icon",
              );

              const title = card.querySelector(
                ".approach-title",
              );

              const copy = card.querySelector(
                ".approach-copy",
              );

              const rail = card.querySelector(
                ".approach-card-rail",
              );

              const sheen = card.querySelector(
                ".approach-card-sheen",
              );

              const direction =
                tablet && index % 2 === 1 ? 1 : -1;

              gsap.set(card, {
                x: tablet ? direction * 20 : 0,
                y: mobile ? 46 : 36,
                scale: mobile ? 0.96 : 0.975,
                autoAlpha: 0,
              });

              gsap.set(icon, {
                scale: 0.65,
                rotate: direction * -8,
                autoAlpha: 0,
              });

              gsap.set(title, {
                y: 16,
                autoAlpha: 0,
              });

              gsap.set(copy, {
                y: 14,
                autoAlpha: 0,
              });

              gsap.set(rail, {
                scaleX: 0,
                transformOrigin: "center",
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
                      duration: mobile ? 0.66 : 0.6,
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
                      icon,
                      {
                        scale: 1.14,
                        rotate: 0,
                        autoAlpha: 1,
                        duration: 0.4,
                        ease: "back.out(1.8)",
                      },
                      "-=0.38",
                    )
                    .to(
                      icon,
                      {
                        scale: 1,
                        duration: 0.16,
                      },
                      "-=0.08",
                    )
                    .to(
                      title,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.36,
                      },
                      "-=0.34",
                    )
                    .to(
                      copy,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.38,
                      },
                      "-=0.24",
                    )
                    .to(
                      sheen,
                      {
                        xPercent: 140,
                        autoAlpha: 1,
                        duration: 0.72,
                        ease: "power2.inOut",
                      },
                      "-=0.42",
                    )
                    .to(
                      sheen,
                      {
                        autoAlpha: 0,
                        duration: 0.18,
                      },
                      "-=0.16",
                    );
                },
                {
                  threshold: tablet ? 0.14 : 0.08,
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
            const icon = card.querySelector(
              ".approach-icon",
            );

            const title = card.querySelector(
              ".approach-title",
            );

            const copy = card.querySelector(
              ".approach-copy",
            );

            const rail = card.querySelector(
              ".approach-card-rail",
            );

            const sheen = card.querySelector(
              ".approach-card-sheen",
            );

            const xOffset =
              index === 0
                ? -32
                : index === 2
                  ? 32
                  : 0;

            gsap.set(card, {
              x: xOffset,
              y: 42,
              scale: 0.965,
              autoAlpha: 0.25,
            });

            gsap.set(icon, {
              scale: 0.68,
              rotate: -7,
              autoAlpha: 0.2,
            });

            gsap.set(title, {
              y: 12,
              autoAlpha: 0,
            });

            gsap.set(copy, {
              y: 10,
              autoAlpha: 0,
            });

            gsap.set(rail, {
              scaleX: 0,
              transformOrigin: "center",
            });

            gsap.set(sheen, {
              xPercent: -140,
              autoAlpha: 0,
            });
          });

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 78%",
              end: "top 32%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          const positions = [
            0.08,
            0.35,
            0.62,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const icon = card.querySelector(
              ".approach-icon",
            );

            const title = card.querySelector(
              ".approach-title",
            );

            const copy = card.querySelector(
              ".approach-copy",
            );

            const rail = card.querySelector(
              ".approach-card-rail",
            );

            const sheen = card.querySelector(
              ".approach-card-sheen",
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
                  "0 16px 36px rgba(15,35,55,0.08)",
                duration: 0.16,
                ease: "power2.out",
              },
              position,
            );

            story.to(
              rail,
              {
                scaleX: 1,
                duration: 0.12,
                ease: "power2.out",
              },
              position + 0.01,
            );

            story
              .to(
                icon,
                {
                  scale: 1.14,
                  rotate: 0,
                  autoAlpha: 1,
                  duration: 0.09,
                  ease: "back.out(1.8)",
                },
                position + 0.02,
              )
              .to(
                icon,
                {
                  scale: 1,
                  duration: 0.07,
                },
                position + 0.1,
              );

            story.to(
              title,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.1,
                ease: "power2.out",
              },
              position + 0.04,
            );

            story.to(
              copy,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.12,
                ease: "power2.out",
              },
              position + 0.07,
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
                position + 0.03,
              )
              .to(
                sheen,
                {
                  autoAlpha: 0,
                  duration: 0.06,
                },
                position + 0.17,
              );

            story.to(
              card,
              {
                boxShadow:
                  "0 8px 28px rgba(15,35,55,0.06)",
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
          -left-24
          top-16
          size-72
          rounded-full
          bg-brand-cyan/[0.035]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-10
          size-72
          rounded-full
          bg-brand-primary/[0.035]
          blur-3xl
        "
      />

      <ApproachSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 670"
        filterId="approach-mobile-glow"
        opacity={0.21}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          h-full
          w-full
          overflow-visible
          text-brand-cyan
          md:hidden
        "
      />

      <ApproachSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 670"
        filterId="approach-tablet-glow"
        opacity={0.19}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          hidden
          h-full
          w-full
          overflow-visible
          text-brand-cyan
          md:block
          lg:hidden
        "
      />

      <ApproachSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1220 670"
        filterId="approach-desktop-glow"
        opacity={0.17}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          hidden
          h-full
          w-full
          overflow-visible
          text-brand-cyan
          lg:block
        "
      />

      <div className="relative z-10 mx-auto max-w-[1220px]">
        <div className="text-center">
          <h2
            className="
              approach-heading
              text-[30px]
              font-bold
              tracking-[-0.04em]
              text-brand-ink
              sm:text-[32px]
              md:text-[36px]
              lg:text-[40px]
            "
          >
            Our approach
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="
            mt-9
            grid
            gap-4
            sm:mt-10
            sm:gap-5
            md:grid-cols-3
          "
        >
          {approaches.map((approach) => (
            <article
              key={approach.title}
              className="
                approach-card
                group
                relative
                flex
                min-h-55
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-brand-border-light
                bg-white
                px-5
                py-8
                text-center
                shadow-brand-card
                transition-[transform,border-color,box-shadow]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/20
                hover:shadow-[0_16px_36px_rgba(15,35,55,0.08)]
                sm:px-6
                md:px-7
              "
            >
              <span
                aria-hidden="true"
                className="
                  approach-card-rail
                  absolute
                  left-1/2
                  top-0
                  h-0.5
                  w-full
                  -translate-x-1/2
                  bg-brand-cyan
                "
              />

              <div
                aria-hidden="true"
                className="
                  approach-card-sheen
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  w-1/2
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-brand-cyan/[0.09]
                  to-transparent
                "
              />

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="
                    approach-icon
                    flex
                    size-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-brand-primary-light
                    text-brand-primary
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-105
                  "
                >
                  {approach.icon}
                </div>

                <h3
                  className="
                    approach-title
                    mt-5
                    text-[15px]
                    font-semibold
                    leading-6
                    text-brand-ink
                    sm:mt-6
                    md:text-[16px]
                  "
                >
                  {approach.title}
                </h3>

                <p
                  className="
                    approach-copy
                    mt-3
                    max-w-[310px]
                    text-[13px]
                    leading-6
                    text-brand-muted
                    md:text-[14px]
                  "
                >
                  {approach.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurApproachSection;