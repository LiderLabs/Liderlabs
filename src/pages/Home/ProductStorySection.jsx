import { useRef } from "react";

import {
  gsap,
  ScrollTrigger,
  useGSAP,
} from "../../lib/gsap";

import productShowcase1 from "../../assets/images/product-showcase-1.png";
import productShowcase2 from "../../assets/images/product-showcase-2.png";
import productShowcase3 from "../../assets/images/product-showcase-3.png";
import productShowcase4 from "../../assets/images/product-showcase-4.jpg";

const solutions = [
  {
    number: "01",
    title: "UI/UX Design",
    description:
      "Human-centered design that turns ideas into intuitive and beautiful experiences.",
    image: productShowcase1,
  },
  {
    number: "02",
    title: "Web App Development",
    description:
      "Scalable, secure, and high-performance web applications tailored to your business needs.",
    image: productShowcase2,
  },
  {
    number: "03",
    title: "Mobile App Development",
    description:
      "Powerful mobile experiences for iOS and Android that keep your users engaged.",
    image: productShowcase3,
  },
  {
    number: "04",
    title: "IT Consultancy",
    description:
      "Strategic guidance to help you make the right technology decisions and accelerate growth.",
    image: productShowcase4,
  },
];

const mobileSignalPath = `
  M195 0
  C195 105 150 155 160 245
  C170 335 235 380 230 470
  C225 565 160 625 165 715
  C170 805 215 850 195 900
`;

const tabletSignalPath = `
  M384 0
  C384 100 320 155 330 245
  C340 335 455 375 445 470
  C435 565 325 625 335 720
  C345 810 415 855 384 900
`;

const desktopSignalPath = `
  M640 0
  C640 90 600 145 505 190
  C380 250 235 250 180 345
  C125 440 210 555 360 610
  C500 660 650 620 790 555
  C930 490 1090 505 1110 625
  C1130 735 825 775 640 880
`;

function StorySignal({
  path,
  pathRef,
  dotRef,
  viewBox,
  className,
  filterId,
  opacity = 0.38,
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
          <feGaussianBlur
            stdDeviation="4"
            result="blur"
          />

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
        strokeDasharray="7 11"
        strokeLinecap="round"
        opacity="0.06"
        vectorEffect="non-scaling-stroke"
      />

      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="7 11"
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
          r="10"
          fill="currentColor"
          opacity="0.14"
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
          r="1.75"
          fill="white"
        />
      </g>
    </svg>
  );
}

function ProductStorySection() {
  const sectionRef = useRef(null);

  const storyTrackRef = useRef(null);
  const storyStageRef = useRef(null);

  const mobileTimelineRef = useRef(null);
  const mobileLineBaseRef = useRef(null);
  const mobileLineFillRef = useRef(null);
  const mobileTimelineSignalRef = useRef(null);

  const mobilePathRef = useRef(null);
  const mobileDotRef = useRef(null);

  const tabletPathRef = useRef(null);
  const tabletDotRef = useRef(null);

  const desktopPathRef = useRef(null);
  const desktopDotRef = useRef(null);

  const timelineRef = useRef(null);
  const timelineFillRef = useRef(null);
  const timelineSignalRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const storyTrack = storyTrackRef.current;
      const storyStage = storyStageRef.current;

      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          mobile: "(max-width: 767px)",

          tablet:
            "(min-width: 768px) and (max-width: 1023px)",

          desktop: "(min-width: 1024px)",

          reduceMotion:
            "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const {
            mobile,
            tablet,
            desktop,
            reduceMotion,
          } = context.conditions;

          const label =
            section.querySelector(".product-label");

          const heading =
            section.querySelector(".product-heading");

          const intro =
            section.querySelector(".product-intro");

          const mobileHeader =
            section.querySelector(
              ".product-mobile-header",
            );

          const mobileStory =
            section.querySelector(
              ".product-mobile-story",
            );

          const mobileSteps = Array.from(
            section.querySelectorAll(
              ".product-mobile-step",
            ),
          );

          const steps = Array.from(
            section.querySelectorAll(
              ".product-step",
            ),
          );

          const imagePanels = Array.from(
            section.querySelectorAll(
              ".product-stage-panel",
            ),
          );

          const rightHeader =
            section.querySelector(
              ".product-right-header",
            );

          const visualShell =
            section.querySelector(
              ".product-visual-shell",
            );

          const glow =
            section.querySelector(".product-glow");

          /*
           * REDUCED MOTION
           */

          if (reduceMotion) {
            gsap.set(
              [
                label,
                heading,
                intro,
                mobileHeader,
                mobileSteps,
                steps,
                rightHeader,
                visualShell,
                imagePanels,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(glow, {
              scale: 1,
              autoAlpha: 1,
            });

            gsap.set(
              ".product-mobile-image",
              {
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(
              ".product-mobile-dot",
              {
                scale: 1,
                backgroundColor: "#1092bf",
                borderColor: "#1092bf",
              },
            );

            gsap.set(
              ".product-mobile-dot-core",
              {
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(
              [
                mobileTimelineSignalRef.current,
                mobileDotRef.current,
                tabletDotRef.current,
                desktopDotRef.current,
                timelineSignalRef.current,
              ],
              {
                autoAlpha: 0,
              },
            );

            if (mobileLineFillRef.current) {
              gsap.set(
                mobileLineFillRef.current,
                {
                  scaleY: 1,
                },
              );
            }

            if (timelineFillRef.current) {
              gsap.set(
                timelineFillRef.current,
                {
                  scaleY: 1,
                },
              );
            }

            if (storyTrack) {
              gsap.set(storyTrack, {
                height: "auto",
              });
            }

            if (storyStage) {
              gsap.set(storyStage, {
                position: "relative",
                top: "auto",
                height: "auto",
              });
            }

            return;
          }

          /*
           * MAIN INTRO
           */

          gsap.fromTo(
            label,
            {
              y: 14,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,

              duration: 0.42,

              ease: "power3.out",

              scrollTrigger: {
                trigger: label,

                start: "top 94%",

                once: true,

                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            heading,
            {
              y: mobile ? 30 : 34,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,

              duration: 0.68,

              ease: "power3.out",

              scrollTrigger: {
                trigger: heading,

                start: "top 94%",

                once: true,

                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            intro,
            {
              y: 22,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,

              duration: 0.58,

              ease: "power3.out",

              scrollTrigger: {
                trigger: intro,

                start: "top 94%",

                once: true,

                invalidateOnRefresh: true,
              },
            },
          );

          /*
           * MOBILE
           */

          if (mobile) {
            if (mobileHeader) {
              gsap.fromTo(
                mobileHeader,
                {
                  y: 26,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.65,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: mobileHeader,

                    start: "top 94%",

                    once: true,

                    invalidateOnRefresh: true,
                  },
                },
              );
            }

            const firstStep =
              mobileSteps[0];

            const lastStep =
              mobileSteps[
                mobileSteps.length - 1
              ];

            /*
             * Calculate the exact vertical
             * positions of bullet 01 and 04.
             *
             * Each dot is:
             * mt-1 = 4px
             * size-4 = 16px
             *
             * Center = 12px from step top.
             */

            const getRailStart = () => {
              if (!firstStep) return 12;

              return firstStep.offsetTop + 12;
            };

            const getRailEnd = () => {
              if (!lastStep) {
                return getRailStart();
              }

              return lastStep.offsetTop + 12;
            };

            const getRailDistance = () =>
              Math.max(
                getRailEnd() -
                  getRailStart(),
                0,
              );

            /*
             * Keep the rail exactly between
             * the first and final bullet.
             */

            const updateMobileRail = () => {
              const start =
                getRailStart();

              const distance =
                getRailDistance();

              if (mobileLineBaseRef.current) {
                gsap.set(
                  mobileLineBaseRef.current,
                  {
                    y: start,
                    height: distance,
                  },
                );
              }

              if (mobileLineFillRef.current) {
                gsap.set(
                  mobileLineFillRef.current,
                  {
                    y: start,
                    height: distance,
                    transformOrigin:
                      "top center",
                  },
                );
              }
            };

            updateMobileRail();

            ScrollTrigger.addEventListener(
              "refreshInit",
              updateMobileRail,
            );

            /*
             * TRAVELLING MOBILE SIGNAL
             *
             * This is now the same concept
             * as the desktop timeline dot.
             */

            if (
              firstStep &&
              lastStep &&
              mobileTimelineSignalRef.current &&
              mobileLineFillRef.current
            ) {
              gsap.set(
                mobileLineFillRef.current,
                {
                  scaleY: 0,
                },
              );

              gsap.set(
                mobileTimelineSignalRef.current,
                {
                  x: 0,

                  y: () =>
                    getRailStart() - 6,

                  scale: 0.85,

                  autoAlpha: 1,

                  transformOrigin:
                    "50% 50%",
                },
              );

              const mobileRailTimeline =
                gsap.timeline({
                  scrollTrigger: {
                    trigger: firstStep,

                    /*
                     * The signal begins when
                     * bullet 01 crosses 58%
                     * of the viewport.
                     */

                    start: "top 58%",

                    /*
                     * It finishes exactly when
                     * bullet 04 reaches the
                     * same viewport position.
                     */

                    endTrigger: lastStep,
                    end: "top 58%",

                    scrub: 0.55,

                    invalidateOnRefresh: true,
                  },
                });

              mobileRailTimeline
                .to(
                  mobileLineFillRef.current,
                  {
                    scaleY: 1,

                    duration: 1,

                    ease: "none",
                  },
                  0,
                )
                .to(
                  mobileTimelineSignalRef.current,
                  {
                    y: () =>
                      getRailEnd() - 6,

                    duration: 1,

                    ease: "none",
                  },
                  0,
                );
            }

            /*
             * MOBILE PRODUCTS
             *
             * Content reveal and bullet
             * activation happen when the
             * travelling signal reaches
             * that product.
             */

            mobileSteps.forEach(
              (step) => {
                const copy =
                  step.querySelector(
                    ".product-mobile-copy",
                  );

                const image =
                  step.querySelector(
                    ".product-mobile-image",
                  );

                const dot =
                  step.querySelector(
                    ".product-mobile-dot",
                  );

                const dotCore =
                  step.querySelector(
                    ".product-mobile-dot-core",
                  );

                const number =
                  step.querySelector(
                    ".product-mobile-number",
                  );

                /*
                 * QUIET DOT
                 */

                if (dot) {
                  gsap.set(dot, {
                    scale: 0.82,

                    backgroundColor:
                      "#f7f9fb",

                    borderColor:
                      "rgba(23,109,140,0.32)",

                    boxShadow:
                      "0 0 0 0 rgba(16,146,191,0)",
                  });
                }

                if (dotCore) {
                  gsap.set(dotCore, {
                    scale: 0.5,
                    autoAlpha: 0,
                  });
                }

                /*
                 * BULLET ACTIVATION
                 *
                 * Reversible so scrolling upward
                 * behaves like desktop.
                 */

                if (dot) {
                  gsap.to(dot, {
                    scale: 1,

                    backgroundColor:
                      "#1092bf",

                    borderColor:
                      "#1092bf",

                    boxShadow:
                      "0 0 0 5px rgba(16,146,191,0.10)",

                    duration: 0.28,

                    ease: "back.out(1.8)",

                    scrollTrigger: {
                      trigger: step,

                      start: "top 58%",

                      toggleActions:
                        "play none none reverse",

                      invalidateOnRefresh: true,
                    },
                  });
                }

                if (dotCore) {
                  gsap.to(dotCore, {
                    scale: 1,
                    autoAlpha: 1,

                    duration: 0.2,

                    ease: "back.out(2)",

                    scrollTrigger: {
                      trigger: step,

                      start: "top 58%",

                      toggleActions:
                        "play none none reverse",

                      invalidateOnRefresh: true,
                    },
                  });
                }

                /*
                 * NUMBER ACTIVATION
                 */

                if (number) {
                  gsap.to(number, {
                    color: "#1092bf",
                    scale: 1.12,

                    duration: 0.22,

                    ease: "power2.out",

                    scrollTrigger: {
                      trigger: step,

                      start: "top 58%",

                      toggleActions:
                        "play none none reverse",

                      invalidateOnRefresh: true,
                    },

                    onComplete: () => {
                      gsap.to(number, {
                        scale: 1,
                        duration: 0.16,
                      });
                    },
                  });
                }

                /*
                 * PRODUCT CONTENT
                 *
                 * Reveal once the signal reaches
                 * the product. Content stays
                 * visible afterward for safe
                 * mobile scrolling.
                 */

                const productReveal =
                  gsap.timeline({
                    scrollTrigger: {
                      trigger: step,

                      start: "top 58%",

                      once: true,

                      invalidateOnRefresh: true,
                    },

                    defaults: {
                      ease: "power3.out",
                    },
                  });

                if (copy) {
                  productReveal.fromTo(
                    copy,
                    {
                      y: 24,
                      autoAlpha: 0,
                    },
                    {
                      y: 0,
                      autoAlpha: 1,

                      duration: 0.55,
                    },
                    0,
                  );
                }

                if (image) {
                  productReveal.fromTo(
                    image,
                    {
                      y: 26,

                      scale: 1.045,

                      autoAlpha: 0,
                    },
                    {
                      y: 0,

                      scale: 1,

                      autoAlpha: 1,

                      duration: 0.72,

                      ease: "power3.out",
                    },
                    0.12,
                  );
                }
              },
            );

            /*
             * DECORATIVE BACKGROUND SIGNAL
             */

            if (
              mobilePathRef.current &&
              mobileDotRef.current
            ) {
              gsap.to(
                mobilePathRef.current,
                {
                  strokeDashoffset: -130,

                  duration: 7,

                  repeat: -1,

                  ease: "none",
                },
              );

              gsap.set(
                mobileDotRef.current,
                {
                  autoAlpha: 1,

                  scale: 0.8,

                  transformOrigin:
                    "50% 50%",
                },
              );

              gsap.to(
                mobileDotRef.current,
                {
                  motionPath: {
                    path:
                      mobilePathRef.current,

                    align:
                      mobilePathRef.current,

                    alignOrigin: [
                      0.5,
                      0.5,
                    ],

                    start: 0,
                    end: 1,
                  },

                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      mobileStory ??
                      section,

                    start: "top 92%",

                    end: "bottom 12%",

                    scrub: 0.75,

                    invalidateOnRefresh: true,
                  },
                },
              );
            }

            return () => {
              ScrollTrigger.removeEventListener(
                "refreshInit",
                updateMobileRail,
              );
            };
          }

          /*
           * TABLET / DESKTOP
           */

          if (!storyTrack || !storyStage) {
            return;
          }

          gsap.fromTo(
            rightHeader,
            {
              y: 24,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,

              duration: 0.65,

              ease: "power3.out",

              scrollTrigger: {
                trigger: storyTrack,

                start: "top 88%",

                once: true,

                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            visualShell,
            {
              y: 26,
              scale: 0.985,
              autoAlpha: 0,
            },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,

              duration: 0.7,

              ease: "power3.out",

              scrollTrigger: {
                trigger: storyTrack,

                start: "top 88%",

                once: true,

                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            glow,
            {
              scale: 0.86,
              autoAlpha: 0,
            },
            {
              scale: 1,
              autoAlpha: 1,

              duration: 0.7,

              ease: "power3.out",

              scrollTrigger: {
                trigger: visualShell,

                start: "top 90%",

                once: true,
              },
            },
          );

          /*
           * Initial story state
           */

          gsap.set(steps, {
            x: 10,
            autoAlpha: 0.38,
          });

          if (steps[0]) {
            gsap.set(steps[0], {
              x: 0,
              autoAlpha: 1,
            });

            const firstDot =
              steps[0].querySelector(
                ".product-step-dot",
              );

            const firstNumber =
              steps[0].querySelector(
                ".product-step-number",
              );

            if (firstDot) {
              gsap.set(firstDot, {
                backgroundColor:
                  "#1092bf",

                borderColor:
                  "#1092bf",

                boxShadow:
                  "0 0 0 5px rgba(16,146,191,0.10)",
              });
            }

            if (firstNumber) {
              gsap.set(firstNumber, {
                color: "#1092bf",
              });
            }
          }

          gsap.set(imagePanels, {
            y: 18,

            scale: 0.985,

            autoAlpha: 0,

            transformOrigin:
              "50% 50%",
          });

          if (imagePanels[0]) {
            gsap.set(imagePanels[0], {
              y: 0,
              scale: 1,
              autoAlpha: 1,
            });
          }

          if (timelineFillRef.current) {
            gsap.set(
              timelineFillRef.current,
              {
                scaleY: 0,

                transformOrigin:
                  "top center",
              },
            );
          }

          if (timelineSignalRef.current) {
            gsap.set(
              timelineSignalRef.current,
              {
                y: 0,
                autoAlpha: 1,
              },
            );
          }

          /*
           * Responsive background signal
           */

          const signalPath = tablet
            ? tabletPathRef.current
            : desktopPathRef.current;

          const signalDot = tablet
            ? tabletDotRef.current
            : desktopDotRef.current;

          if (signalPath && signalDot) {
            gsap.to(signalPath, {
              strokeDashoffset: -150,

              duration: 8,

              repeat: -1,

              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 1,

              scale: desktop
                ? 0.9
                : 0.82,

              transformOrigin:
                "50% 50%",
            });

            gsap.to(signalDot, {
              motionPath: {
                path: signalPath,

                align: signalPath,

                alignOrigin: [
                  0.5,
                  0.5,
                ],

                start: 0,
                end: 1,
              },

              ease: "none",

              scrollTrigger: {
                trigger: storyTrack,

                start: tablet
                  ? "top top+=88"
                  : "top top+=92",

                end: "bottom bottom",

                scrub: 0.7,

                invalidateOnRefresh: true,
              },
            });
          }

          /*
           * STICKY STORY
           */

          const storyDuration = 4.4;

          const story =
            gsap.timeline({
              scrollTrigger: {
                trigger: storyTrack,

                start: tablet
                  ? "top top+=88"
                  : "top top+=92",

                end: "bottom bottom",

                scrub: 0.7,

                invalidateOnRefresh: true,
              },
            });

          if (timelineFillRef.current) {
            story.to(
              timelineFillRef.current,
              {
                scaleY: 1,

                duration: storyDuration,

                ease: "none",
              },
              0,
            );
          }

          if (
            timelineSignalRef.current &&
            timelineRef.current
          ) {
            story.to(
              timelineSignalRef.current,
              {
                y: () =>
                  Math.max(
                    timelineRef.current
                      .offsetHeight - 36,
                    0,
                  ),

                duration: storyDuration,

                ease: "none",
              },
              0,
            );
          }

          const transitions = [
            {
              from: 0,
              to: 1,
              position: 1.05,
            },
            {
              from: 1,
              to: 2,
              position: 2.1,
            },
            {
              from: 2,
              to: 3,
              position: 3.1,
            },
          ];

          transitions.forEach(
            ({
              from,
              to,
              position,
            }) => {
              const previousStep =
                steps[from];

              const nextStep =
                steps[to];

              const previousImage =
                imagePanels[from];

              const nextImage =
                imagePanels[to];

              if (previousStep) {
                story.to(
                  previousStep,
                  {
                    x: 0,

                    autoAlpha: 0.38,

                    duration: 0.18,

                    ease: "power2.inOut",
                  },
                  position,
                );
              }

              if (nextStep) {
                story.to(
                  nextStep,
                  {
                    x: 0,

                    autoAlpha: 1,

                    duration: 0.24,

                    ease: "power2.out",
                  },
                  position + 0.04,
                );

                const nextDot =
                  nextStep.querySelector(
                    ".product-step-dot",
                  );

                const nextNumber =
                  nextStep.querySelector(
                    ".product-step-number",
                  );

                if (nextDot) {
                  story
                    .to(
                      nextDot,
                      {
                        backgroundColor:
                          "#1092bf",

                        borderColor:
                          "#1092bf",

                        boxShadow:
                          "0 0 0 5px rgba(16,146,191,0.10)",

                        scale: 1.18,

                        duration: 0.12,
                      },
                      position + 0.04,
                    )
                    .to(
                      nextDot,
                      {
                        scale: 1,

                        duration: 0.14,
                      },
                      position + 0.16,
                    );
                }

                if (nextNumber) {
                  story.to(
                    nextNumber,
                    {
                      color: "#1092bf",

                      duration: 0.14,
                    },
                    position + 0.04,
                  );
                }
              }

              if (previousImage) {
                story.to(
                  previousImage,
                  {
                    y: -12,

                    scale: 1.01,

                    autoAlpha: 0,

                    duration: 0.2,

                    ease: "power2.inOut",
                  },
                  position,
                );
              }

              if (nextImage) {
                story.fromTo(
                  nextImage,
                  {
                    y: 18,

                    scale: 0.985,

                    autoAlpha: 0,
                  },
                  {
                    y: 0,

                    scale: 1,

                    autoAlpha: 1,

                    duration: 0.3,

                    ease: "power3.out",
                  },
                  position + 0.08,
                );
              }
            },
          );

          /*
           * IT CONSULTANCY HOLD
           */

          if (imagePanels[3]) {
            story.to(
              imagePanels[3],
              {
                y: 0,

                scale: 1,

                autoAlpha: 1,

                duration: 1.1,

                ease: "none",
              },
              3.3,
            );
          }
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
        bg-brand-surface
        px-4
        pb-14
        pt-14
        sm:px-6
        sm:pb-16
        sm:pt-16
        md:px-8
        lg:px-10
        lg:pb-20
        lg:pt-24
      "
    >
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1320px]
        "
      >
        {/* INTRO */}

        <div className="max-w-[700px]">
          <div
            className="
              product-label
              inline-flex
              rounded-full
              bg-brand-primary-light
              px-3
              py-1.5
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-brand-primary
              "
            >
              What We Do
            </span>
          </div>

          <h2
            className="
              product-heading
              mt-4
              max-w-[620px]
              text-[30px]
              font-bold
              leading-[1.04]
              tracking-[-0.04em]
              text-brand-ink
              sm:text-[34px]
              md:text-[38px]
              lg:text-[42px]
            "
          >
            Complete digital solutions for modern businesses
          </h2>

          <p
            className="
              product-intro
              mt-5
              max-w-[540px]
              text-[13px]
              leading-6
              text-brand-muted
              sm:text-[14px]
              sm:leading-7
              md:text-[15px]
            "
          >
            From idea to impact — we design, build, and support digital products
            that drive real growth.
          </p>
        </div>

        {/* MOBILE */}

        <div
          className="
            product-mobile-story
            relative
            mt-10
            md:hidden
          "
        >
          <StorySignal
            path={mobileSignalPath}
            pathRef={mobilePathRef}
            dotRef={mobileDotRef}
            viewBox="0 0 390 900"
            filterId="product-mobile-signal-glow"
            opacity={0.3}
            className="
              pointer-events-none
              absolute
              inset-0
              z-[1]
              size-full
              overflow-visible
              text-brand-cyan
            "
          />

          <div className="relative z-10">
            <div
              className="
                product-mobile-header
                mb-9
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-brand-muted
                "
              >
                Built for Teams
              </p>

              <h3
                className="
                  mt-2
                  text-[24px]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-brand-ink
                "
              >
                Digital products that move{" "}
                <span className="text-brand-primary">
                  businesses forward
                </span>
              </h3>
            </div>

            {/* MOBILE TIMELINE */}

            <div
              ref={mobileTimelineRef}
              className="relative"
            >
              {/* Quiet rail */}

              <div
                ref={mobileLineBaseRef}
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-[7px]
                  top-0
                  z-[2]
                  w-px
                  bg-brand-primary/15
                "
              />

              {/* Cyan completed rail */}

              <div
                ref={mobileLineFillRef}
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-[7px]
                  top-0
                  z-[3]
                  w-0.5
                  origin-top
                  bg-brand-cyan
                "
              />

              {/* TRAVELLING SIGNAL */}

              <div
                ref={mobileTimelineSignalRef}
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-px
                  top-0
                  z-30
                  flex
                  size-3
                  items-center
                  justify-center
                  rounded-full
                  bg-brand-cyan
                  shadow-[0_0_0_5px_rgba(16,146,191,0.12),0_0_20px_rgba(16,146,191,0.48)]
                  will-change-transform
                "
              >
                <span
                  className="
                    size-1
                    rounded-full
                    bg-white
                  "
                />
              </div>

              <div className="space-y-12">
                {solutions.map(
                  (solution) => (
                    <article
                      key={solution.number}
                      className="
                        product-mobile-step
                        relative
                        grid
                        grid-cols-[20px_minmax(0,1fr)]
                        gap-4
                      "
                    >
                      {/* BULLET */}

                      <div
                        className="
                          relative
                          z-20
                          mt-1
                        "
                      >
                        <div
                          className="
                            product-mobile-dot
                            flex
                            size-4
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-brand-primary/30
                            bg-brand-surface
                          "
                        >
                          <span
                            className="
                              product-mobile-dot-core
                              size-1.5
                              rounded-full
                              bg-white
                            "
                          />
                        </div>
                      </div>

                      {/* PRODUCT */}

                      <div
                        className="
                          product-mobile-copy
                          min-w-0
                        "
                      >
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                          "
                        >
                          <span
                            className="
                              product-mobile-number
                              inline-block
                              text-[12px]
                              font-semibold
                              text-brand-primary
                            "
                          >
                            {solution.number}
                          </span>

                          <span className="text-brand-border">
                            —
                          </span>

                          <h3
                            className="
                              text-[16px]
                              font-semibold
                              text-brand-ink
                            "
                          >
                            {solution.title}
                          </h3>
                        </div>

                        <p
                          className="
                            mt-2
                            text-[13px]
                            leading-6
                            text-brand-muted
                          "
                        >
                          {solution.description}
                        </p>

                        <div
                          className="
                            mt-5
                            overflow-hidden
                            rounded-[18px]
                            border
                            border-brand-border/60
                            bg-white
                            shadow-brand-card
                          "
                        >
                          <img
                            src={solution.image}
                            alt={`${solution.title} showcase`}
                            loading="lazy"
                            decoding="async"
                            onLoad={() => {
                              requestAnimationFrame(
                                () => {
                                  ScrollTrigger.refresh();
                                },
                              );
                            }}
                            className="
                              product-mobile-image
                              block
                              h-auto
                              w-full
                              object-contain
                              will-change-transform
                            "
                          />
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TABLET / DESKTOP */}

        <div
          ref={storyTrackRef}
          className="
            product-story-track
            relative
            mt-12
            hidden
            md:block
            md:h-[420svh]
            lg:mt-14
            lg:h-[440svh]
          "
        >
          <div
            ref={storyStageRef}
            className="
              product-story-stage
              sticky
              top-[88px]
              flex
              h-[calc(100svh-88px)]
              items-center
              lg:top-[92px]
              lg:h-[calc(100svh-92px)]
            "
          >
            <StorySignal
              path={tabletSignalPath}
              pathRef={tabletPathRef}
              dotRef={tabletDotRef}
              viewBox="0 0 768 900"
              filterId="product-tablet-signal-glow"
              opacity={0.32}
              className="
                pointer-events-none
                absolute
                inset-0
                z-[1]
                size-full
                overflow-visible
                text-brand-cyan
                lg:hidden
              "
            />

            <StorySignal
              path={desktopSignalPath}
              pathRef={desktopPathRef}
              dotRef={desktopDotRef}
              viewBox="0 0 1280 880"
              filterId="product-desktop-signal-glow"
              opacity={0.38}
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

            <div
              className="
                relative
                z-10
                grid
                w-full
                gap-10
                md:grid-cols-[0.92fr_1.08fr]
                md:items-center
                lg:grid-cols-[0.9fr_1.1fr]
                lg:gap-20
              "
            >
              {/* TIMELINE */}

              <div>
                <div
                  ref={timelineRef}
                  className="
                    relative
                    max-w-[540px]
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      left-2
                      top-4
                      h-[calc(100%-30px)]
                      w-px
                      bg-brand-primary/15
                    "
                  />

                  <div
                    ref={timelineFillRef}
                    aria-hidden="true"
                    className="
                      absolute
                      left-2
                      top-4
                      h-[calc(100%-30px)]
                      w-0.5
                      origin-top
                      bg-brand-cyan
                    "
                  />

                  <div
                    ref={timelineSignalRef}
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-0.5
                      top-3
                      z-20
                      size-3
                      rounded-full
                      bg-brand-cyan
                      shadow-[0_0_0_5px_rgba(16,146,191,0.10),0_0_18px_rgba(16,146,191,0.40)]
                    "
                  >
                    <span
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        size-1
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-white
                      "
                    />
                  </div>

                  <div className="space-y-7 lg:space-y-8">
                    {solutions.map(
                      (solution) => (
                        <div
                          key={solution.number}
                          className="
                            product-step
                            relative
                            grid
                            grid-cols-[20px_minmax(0,1fr)]
                            gap-4
                            lg:gap-5
                          "
                        >
                          <div
                            className="
                              relative
                              z-10
                              mt-1
                            "
                          >
                            <div
                              className="
                                product-step-dot
                                size-4
                                rounded-full
                                border
                                border-brand-primary/30
                                bg-brand-surface
                              "
                            />
                          </div>

                          <div>
                            <div
                              className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                              "
                            >
                              <span
                                className="
                                  product-step-number
                                  text-[12px]
                                  font-semibold
                                  text-brand-primary/65
                                "
                              >
                                {solution.number}
                              </span>

                              <span className="text-brand-border">
                                —
                              </span>

                              <h3
                                className="
                                  product-step-title
                                  text-[16px]
                                  font-semibold
                                  text-brand-ink
                                  lg:text-[17px]
                                "
                              >
                                {solution.title}
                              </h3>
                            </div>

                            <p
                              className="
                                mt-2
                                max-w-[440px]
                                text-[13px]
                                leading-6
                                text-brand-muted
                                lg:text-[14px]
                              "
                            >
                              {solution.description}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* VISUAL */}

              <div className="flex min-w-0 flex-col">
                <div
                  className="
                    product-right-header
                    text-right
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-brand-muted
                    "
                  >
                    Built for Teams
                  </p>

                  <h3
                    className="
                      ml-auto
                      mt-2
                      max-w-[510px]
                      text-[26px]
                      font-bold
                      leading-[1.08]
                      tracking-[-0.035em]
                      text-brand-ink
                      lg:text-[32px]
                    "
                  >
                    Digital products that move{" "}
                    <span className="text-brand-primary">
                      businesses forward
                    </span>
                  </h3>
                </div>

                <div
                  className="
                    product-visual-shell
                    relative
                    mt-7
                    lg:mt-9
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      product-glow
                      pointer-events-none
                      absolute
                      left-1/2
                      top-1/2
                      h-[70%]
                      w-3/4
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-brand-cyan/10
                      blur-[70px]
                    "
                  />

                  <div
                    className="
                      relative
                      mx-auto
                      h-90
                      w-full
                      max-w-[680px]
                      lg:h-[430px]
                      xl:h-[500px]
                    "
                  >
                    {solutions.map(
                      (solution) => (
                        <div
                          key={solution.number}
                          className="
                            product-stage-panel
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            p-2
                          "
                        >
                          <img
                            src={solution.image}
                            alt={`${solution.title} showcase`}
                            loading="lazy"
                            decoding="async"
                            className="
                              max-h-full
                              max-w-full
                              rounded-[22px]
                              border
                              border-brand-border/60
                              object-contain
                              shadow-[0_22px_55px_rgba(15,35,55,0.12)]
                            "
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductStorySection;