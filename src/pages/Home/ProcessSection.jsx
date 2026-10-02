import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const stages = [
  {
    number: "01",
    label: "CONCEPT",
    title: "WE FIND THE STORY WORTH TELLING",
    description:
      "We listen first. Then we map the terrain. Wireframing, user journeys, validating enterprise feasibility, and capturing the core narrative.",
    footerLabel: "Discovery Spec",
    footerText: "Requirements mapped · User journeys · Scope defined",
    variant: "light",
  },
  {
    number: "02",
    label: "BUILD",
    title: "WE SCULPT THE WORLD IN THREE DIMENSIONS",
    description:
      "Models take shape. Motion begins. Modern full-stack architectures are developed using clean engineering principles and continuous testing.",
    footerLabel: "Sprint Cycle 04",
    footerText: "CI/CD pipeline · QA tests · Feature validation",
    variant: "dark",
  },
  {
    number: "03",
    label: "LAUNCH",
    title: "WE TUNE IT UNTIL IT RUNS TRUE",
    description:
      "Every detail is checked before release. Performance, responsiveness, reliability, monitoring, and deployment are refined for production.",
    footerLabel: "Zero-Downtime Rollout",
    footerText: "Deployment · Monitoring · Production ready",
    variant: "light",
    status: "LIVE",
  },
];

const mobileSignalPath = `
  M195 0
  C195 95 150 145 160 230
  C170 315 230 360 225 450
  C220 540 165 600 170 690
  C175 780 220 835 195 900
`;

const tabletSignalPath = `
  M384 0
  C384 95 315 150 325 235
  C335 320 455 360 445 455
  C435 550 325 610 335 700
  C345 795 420 850 384 900
`;

const desktopSignalPath = `
  M610 0
  C610 100 520 175 360 235
  C230 285 175 355 220 430
  C285 530 455 505 610 470
  C755 435 925 470 1010 555
  C1090 635 980 755 820 790
  C720 815 650 845 610 900
`;

function ProcessSignal({
  path,
  pathRef,
  dotRef,
  viewBox,
  className,
  filterId,
  opacity,
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
        strokeDasharray="7 12"
        strokeLinecap="round"
        opacity="0.055"
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

function ProcessHeader() {
  return (
    <div className="process-header text-center">
      {/* PROCESS LABEL */}

      <div
        className="
          process-label
          inline-flex
          flex-col
          items-center
        "
      >
        <span
          className="
            process-label-text
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-brand-primary
          "
        >
          Process
        </span>

        <span
          aria-hidden="true"
          className="
            relative
            mt-2
            h-0.5
            w-16
            overflow-hidden
            rounded-full
            bg-brand-primary/10
            sm:w-20
          "
        >
          <span
            className="
              process-label-line
              absolute
              inset-0
              origin-center
              rounded-full
              bg-brand-cyan
            "
          />

          <span
            className="
              process-label-sheen
              absolute
              -left-5
              top-1/2
              h-1
              w-8
              -translate-y-1/2
              rounded-full
              bg-white/90
              blur-[1px]
            "
          />
        </span>
      </div>

      <h2
        className="
          process-heading
          mt-4
          text-[30px]
          font-bold
          tracking-[-0.04em]
          text-brand-ink
          sm:text-[34px]
          md:text-[38px]
          lg:text-[42px]
        "
      >
        FROM IDEA TO DIMENSION
      </h2>

      <p
        className="
          process-description
          mt-3
          text-[13px]
          leading-6
          text-brand-muted
          sm:text-[14px]
        "
      >
        A clear path from first sketch to final render.
      </p>
    </div>
  );
}

function StageCard({
  stage,
  index,
  className = "",
}) {
  return (
    <article
      className={[
        "process-card",
        `process-card-${index + 1}`,
        "relative flex h-full min-h-[360px] flex-col",
        "rounded-[18px] border border-brand-border",
        "bg-white p-5 shadow-brand-card",
        "sm:p-6 lg:p-7",
        "will-change-transform",
        className,
      ].join(" ")}
    >
      {/* STAGE META */}

      <div
        className="
          process-stage-meta
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            process-stage-number
            inline-block
            text-[11px]
            font-semibold
            text-brand-primary
          "
        >
          {stage.number}
        </span>

        <span
          className="
            relative
            inline-block
            pb-1
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-brand-primary
            after:absolute
            after:bottom-0
            after:left-0
            after:h-0.5
            after:w-full
            after:rounded-full
            after:bg-brand-cyan
          "
        >
          {stage.label}
        </span>
      </div>

      {/* TITLE */}

      <h3
        className="
          process-stage-title
          mt-6
          max-w-[310px]
          text-[17px]
          font-bold
          leading-[1.15]
          tracking-[-0.025em]
          text-brand-ink
          sm:text-[18px]
          lg:text-[19px]
        "
      >
        {stage.title}
      </h3>

      {/* DESCRIPTION */}

      <p
        className="
          process-stage-description
          mt-4
          text-[13px]
          leading-6
          text-brand-muted
          lg:text-[14px]
        "
      >
        {stage.description}
      </p>

      {/* SERVICES */}

      <span
        className="
          process-stage-description
          mt-5
          inline-flex
          w-fit
          items-center
          gap-2
          text-[12px]
          font-semibold
          text-brand-primary
        "
      >
        Services

        <span
          aria-hidden="true"
          className="process-arrow inline-block"
        >
          →
        </span>
      </span>

      {/* FOOTER */}

      <div
        className="
          process-stage-footer
          mt-auto
          pt-7
        "
      >
        <div
          className="
            mb-5
            h-px
            bg-brand-border-light
          "
        />

        <div
          className={[
            "process-footer-box",
            "rounded-xl border px-4 py-4",

            stage.variant === "dark"
              ? "border-brand-navy bg-brand-navy"
              : "border-brand-border-light bg-brand-surface-blue",
          ].join(" ")}
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <p
              className={[
                "truncate text-[12px] font-semibold",

                stage.variant === "dark"
                  ? "text-white"
                  : "text-brand-ink",
              ].join(" ")}
            >
              {stage.footerLabel}
            </p>

            {stage.status && (
              <span
                className="
                  process-live
                  shrink-0
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-emerald-500
                "
              >
                {stage.status}
              </span>
            )}
          </div>

          <p
            className={[
              "mt-2 text-[11px] leading-5",

              stage.variant === "dark"
                ? "text-white/60"
                : "text-brand-muted",
            ].join(" ")}
          >
            {stage.footerText}
          </p>
        </div>
      </div>
    </article>
  );
}

function ProcessSection() {
  const sectionRef = useRef(null);

  const desktopTrackRef = useRef(null);
  const desktopStageRef = useRef(null);

  const mobilePathRef = useRef(null);
  const mobileDotRef = useRef(null);

  const tabletPathRef = useRef(null);
  const tabletDotRef = useRef(null);

  const desktopPathRef = useRef(null);
  const desktopDotRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      const desktopTrack =
        desktopTrackRef.current;

      const desktopStage =
        desktopStageRef.current;

      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          mobile:
            "(max-width: 767px)",

          tablet:
            "(min-width: 768px) and (max-width: 1023px)",

          desktop:
            "(min-width: 1024px)",

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

          const header =
            section.querySelector(
              ".process-main-header",
            );

          const label =
            header?.querySelector(
              ".process-label",
            );

          const heading =
            header?.querySelector(
              ".process-heading",
            );

          const description =
            header?.querySelector(
              ".process-description",
            );

          const flowCards = Array.from(
            section.querySelectorAll(
              ".process-flow-card",
            ),
          );

          const desktopCards = Array.from(
            section.querySelectorAll(
              ".process-desktop-card",
            ),
          );

          /*
           * REDUCED MOTION
           */

          if (reduceMotion) {
            gsap.set(
              [
                label,
                heading,
                description,
                ...flowCards,
                ...desktopCards,
                ".process-stage-meta",
                ".process-stage-title",
                ".process-stage-description",
                ".process-stage-footer",
              ],

              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

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

          /*
           * HEADER ENTRANCE
           */

          if (header) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: header,

                  start: "top 92%",

                  once: true,

                  invalidateOnRefresh: true,
                },

                defaults: {
                  ease: "power3.out",
                },
              })

              .fromTo(
                label,

                {
                  y: 14,
                  autoAlpha: 0,
                },

                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.42,
                },
              )

              .fromTo(
                heading,

                {
                  y: 30,
                  autoAlpha: 0,
                },

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.68,
                },

                "-=0.2",
              )

              .fromTo(
                description,

                {
                  y: 18,
                  autoAlpha: 0,
                },

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.5,
                },

                "-=0.34",
              );
          }

          /*
           * MOBILE + TABLET
           */

          if (!desktop) {
            flowCards.forEach(
              (card) => {
                const meta =
                  card.querySelector(
                    ".process-stage-meta",
                  );

                const title =
                  card.querySelector(
                    ".process-stage-title",
                  );

                const body =
                  Array.from(
                    card.querySelectorAll(
                      ".process-stage-description",
                    ),
                  );

                const footer =
                  card.querySelector(
                    ".process-stage-footer",
                  );

                const number =
                  card.querySelector(
                    ".process-stage-number",
                  );

                const arrow =
                  card.querySelector(
                    ".process-arrow",
                  );

                const footerBox =
                  card.querySelector(
                    ".process-footer-box",
                  );

                const live =
                  card.querySelector(
                    ".process-live",
                  );

                const entrance =
                  gsap.timeline({
                    scrollTrigger: {
                      trigger: card,

                      start: mobile
                        ? "top 94%"
                        : "top 90%",

                      once: true,

                      invalidateOnRefresh: true,
                    },

                    defaults: {
                      ease: "power3.out",
                    },
                  });

                entrance
                  .fromTo(
                    card,

                    {
                      y: mobile
                        ? 46
                        : 38,

                      scale: mobile
                        ? 0.965
                        : 0.98,

                      autoAlpha: 0,
                    },

                    {
                      y: 0,
                      scale: 1,
                      autoAlpha: 1,

                      duration: mobile
                        ? 0.72
                        : 0.66,
                    },
                  )

                  .fromTo(
                    meta,

                    {
                      y: 14,
                      autoAlpha: 0,
                    },

                    {
                      y: 0,
                      autoAlpha: 1,

                      duration: 0.34,
                    },

                    "-=0.4",
                  )

                  .fromTo(
                    title,

                    {
                      y: 18,
                      autoAlpha: 0,
                    },

                    {
                      y: 0,
                      autoAlpha: 1,

                      duration: 0.44,
                    },

                    "-=0.25",
                  )

                  .fromTo(
                    body,

                    {
                      y: 16,
                      autoAlpha: 0,
                    },

                    {
                      y: 0,
                      autoAlpha: 1,

                      duration: 0.4,

                      stagger: 0.06,
                    },

                    "-=0.3",
                  )

                  .fromTo(
                    footer,

                    {
                      y: 18,
                      autoAlpha: 0,
                    },

                    {
                      y: 0,
                      autoAlpha: 1,

                      duration: 0.42,
                    },

                    "-=0.26",
                  );

                /*
                 * CARD LANDING
                 */

                entrance
                  .to(
                    card,

                    {
                      y: -3,

                      duration: 0.14,

                      ease: "power2.out",
                    },

                    "-=0.18",
                  )

                  .to(card, {
                    y: 0,

                    duration: 0.18,

                    ease: "power2.inOut",
                  });

                /*
                 * NUMBER PULSE
                 */

                if (number) {
                  entrance
                    .to(
                      number,

                      {
                        scale: 1.16,
                        color: "#1092bf",

                        duration: 0.13,
                      },

                      "-=0.34",
                    )

                    .to(number, {
                      scale: 1,

                      duration: 0.16,
                    });
                }

                /*
                 * ARROW MOVEMENT
                 */

                if (arrow) {
                  entrance
                    .to(
                      arrow,

                      {
                        x: 4,

                        duration: 0.14,

                        ease: "power2.out",
                      },

                      "-=0.28",
                    )

                    .to(arrow, {
                      x: 0,

                      duration: 0.16,

                      ease: "power2.inOut",
                    });
                }

                /*
                 * FOOTER PANEL
                 */

                if (footerBox) {
                  entrance.fromTo(
                    footerBox,

                    {
                      scale: 0.98,
                    },

                    {
                      scale: 1,

                      duration: 0.3,

                      ease: "power2.out",
                    },

                    "-=0.28",
                  );
                }

                /*
                 * LAUNCH LIVE
                 */

                if (live) {
                  entrance
                    .to(
                      live,

                      {
                        scale: 1.14,

                        duration: 0.12,

                        ease: "back.out(2)",
                      },

                      "-=0.26",
                    )

                    .to(live, {
                      scale: 1,

                      duration: 0.16,
                    });
                }
              },
            );

            /*
             * MOBILE / TABLET SIGNAL
             */

            const signalPath = mobile
              ? mobilePathRef.current
              : tabletPathRef.current;

            const signalDot = mobile
              ? mobileDotRef.current
              : tabletDotRef.current;

            if (signalPath && signalDot) {
              gsap.to(signalPath, {
                strokeDashoffset: -130,

                duration: 7,

                repeat: -1,

                ease: "none",
              });

              gsap.set(signalDot, {
                autoAlpha: 1,

                scale: 0.8,

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
                  trigger: section,

                  start: "top 92%",

                  end: "bottom 14%",

                  scrub: mobile
                    ? 0.75
                    : 0.8,

                  invalidateOnRefresh: true,
                },
              });
            }

            return;
          }

          /*
           * DESKTOP STORY
           */

          if (
            !desktopTrack ||
            !desktopStage ||
            !desktopCards.length
          ) {
            return;
          }

          const getCardParts = (card) => ({
            meta: card.querySelector(
              ".process-stage-meta",
            ),

            title: card.querySelector(
              ".process-stage-title",
            ),

            body: Array.from(
              card.querySelectorAll(
                ".process-stage-description",
              ),
            ),

            footer: card.querySelector(
              ".process-stage-footer",
            ),

            footerBox: card.querySelector(
              ".process-footer-box",
            ),

            number: card.querySelector(
              ".process-stage-number",
            ),

            arrow: card.querySelector(
              ".process-arrow",
            ),

            live: card.querySelector(
              ".process-live",
            ),
          });

          const cardParts =
            desktopCards.map(
              getCardParts,
            );

          /*
           * INITIAL STATES
           */

          desktopCards.forEach(
            (card, index) => {
              gsap.set(card, {
                y:
                  index === 0
                    ? -4
                    : 24,

                scale:
                  index === 0
                    ? 1.01
                    : 0.975,

                autoAlpha:
                  index === 0
                    ? 1
                    : 0.3,

                borderColor:
                  index === 0
                    ? "rgba(16,146,191,0.30)"
                    : "#dce7ec",

                boxShadow:
                  index === 0
                    ? "0 18px 46px rgba(16,146,191,0.12)"
                    : "0 8px 28px rgba(15,35,55,0.06)",
              });

              const {
                meta,
                title,
                body,
                footer,
              } = cardParts[index];

              if (index === 0) {
                gsap.set(
                  [
                    meta,
                    title,
                    ...body,
                    footer,
                  ],

                  {
                    y: 0,
                    autoAlpha: 1,
                  },
                );
              } else {
                gsap.set(meta, {
                  y: 10,
                  autoAlpha: 0,
                });

                gsap.set(title, {
                  y: 14,
                  autoAlpha: 0,
                });

                gsap.set(body, {
                  y: 14,
                  autoAlpha: 0,
                });

                gsap.set(footer, {
                  y: 16,
                  autoAlpha: 0,
                });
              }
            },
          );

          const story =
            gsap.timeline({
              scrollTrigger: {
                trigger: desktopTrack,

                start:
                  "top top+=112",

                end:
                  "bottom bottom",

                scrub: 0.7,

                invalidateOnRefresh: true,
              },
            });

          /*
           * CONCEPT HOLD
           */

          const introHold = {
            progress: 0,
          };

          story.to(
            introHold,

            {
              progress: 1,

              duration: 0.55,

              ease: "none",
            },

            0,
          );

          /*
           * ACTIVATE BUILD
           */

          const card1 =
            desktopCards[0];

          const card2 =
            desktopCards[1];

          const card3 =
            desktopCards[2];

          if (card1 && card2) {
            const parts =
              cardParts[1];

            story
              .to(
                card1,

                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 0.74,

                  borderColor:
                    "#dce7ec",

                  boxShadow:
                    "0 8px 28px rgba(15,35,55,0.06)",

                  duration: 0.2,

                  ease: "power2.inOut",
                },

                0.65,
              )

              .to(
                card2,

                {
                  y: -4,
                  scale: 1.01,
                  autoAlpha: 1,

                  borderColor:
                    "rgba(16,146,191,0.30)",

                  boxShadow:
                    "0 18px 46px rgba(16,146,191,0.12)",

                  duration: 0.22,

                  ease: "power3.out",
                },

                0.68,
              )

              .to(
                parts.meta,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.14,
                },

                0.74,
              )

              .to(
                parts.title,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.17,
                },

                0.8,
              )

              .to(
                parts.body,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.18,

                  stagger: 0.035,
                },

                0.86,
              )

              .to(
                parts.footer,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.2,
                },

                0.94,
              );

            if (parts.number) {
              story
                .to(
                  parts.number,

                  {
                    scale: 1.18,
                    color: "#1092bf",

                    duration: 0.1,
                  },

                  0.76,
                )

                .to(
                  parts.number,

                  {
                    scale: 1,

                    duration: 0.12,
                  },

                  0.86,
                );
            }

            if (parts.arrow) {
              story
                .to(
                  parts.arrow,

                  {
                    x: 5,

                    duration: 0.1,
                  },

                  0.96,
                )

                .to(
                  parts.arrow,

                  {
                    x: 0,

                    duration: 0.13,
                  },

                  1.06,
                );
            }
          }

          /*
           * BUILD HOLD
           */

          const buildHold = {
            progress: 0,
          };

          story.to(
            buildHold,

            {
              progress: 1,

              duration: 0.55,

              ease: "none",
            },

            1.16,
          );

          /*
           * ACTIVATE LAUNCH
           */

          if (card2 && card3) {
            const parts =
              cardParts[2];

            story
              .to(
                card2,

                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 0.74,

                  borderColor:
                    "#dce7ec",

                  boxShadow:
                    "0 8px 28px rgba(15,35,55,0.06)",

                  duration: 0.2,

                  ease: "power2.inOut",
                },

                1.75,
              )

              .to(
                card3,

                {
                  y: -4,
                  scale: 1.01,
                  autoAlpha: 1,

                  borderColor:
                    "rgba(16,146,191,0.30)",

                  boxShadow:
                    "0 18px 46px rgba(16,146,191,0.12)",

                  duration: 0.22,

                  ease: "power3.out",
                },

                1.78,
              )

              .to(
                parts.meta,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.14,
                },

                1.84,
              )

              .to(
                parts.title,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.17,
                },

                1.9,
              )

              .to(
                parts.body,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.18,

                  stagger: 0.035,
                },

                1.96,
              )

              .to(
                parts.footer,

                {
                  y: 0,
                  autoAlpha: 1,

                  duration: 0.2,
                },

                2.04,
              );

            if (parts.number) {
              story
                .to(
                  parts.number,

                  {
                    scale: 1.18,
                    color: "#1092bf",

                    duration: 0.1,
                  },

                  1.86,
                )

                .to(
                  parts.number,

                  {
                    scale: 1,

                    duration: 0.12,
                  },

                  1.96,
                );
            }

            if (parts.arrow) {
              story
                .to(
                  parts.arrow,

                  {
                    x: 5,

                    duration: 0.1,
                  },

                  2.06,
                )

                .to(
                  parts.arrow,

                  {
                    x: 0,

                    duration: 0.13,
                  },

                  2.16,
                );
            }

            if (parts.live) {
              story
                .to(
                  parts.live,

                  {
                    scale: 1.18,

                    duration: 0.1,

                    ease: "back.out(2)",
                  },

                  2.1,
                )

                .to(
                  parts.live,

                  {
                    scale: 1,

                    duration: 0.14,
                  },

                  2.2,
                );
            }
          }

          /*
           * FINAL LAUNCH HOLD
           */

          const launchHold = {
            progress: 0,
          };

          story.to(
            launchHold,

            {
              progress: 1,

              duration: 1.15,

              ease: "none",
            },

            2.28,
          );

          /*
           * DESKTOP SIGNAL
           */

          if (
            desktopPathRef.current &&
            desktopDotRef.current
          ) {
            gsap.to(
              desktopPathRef.current,

              {
                strokeDashoffset: -180,

                duration: 8,

                repeat: -1,

                ease: "none",
              },
            );

            gsap.set(
              desktopDotRef.current,

              {
                autoAlpha: 1,

                scale: 0.9,

                transformOrigin:
                  "50% 50%",
              },
            );

            gsap.to(
              desktopDotRef.current,

              {
                motionPath: {
                  path:
                    desktopPathRef.current,

                  align:
                    desktopPathRef.current,

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
                    desktopTrack,

                  start:
                    "top top+=112",

                  end:
                    "bottom bottom",

                  scrub: 0.7,

                  invalidateOnRefresh: true,
                },
              },
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
        bg-white
      "
    >
      {/* HEADER */}

      <div
        className="
          process-main-header
          relative
          z-20
          mx-auto
          max-w-[1220px]
          px-4
          pt-14
          sm:px-6
          sm:pt-16
          md:px-8
          lg:px-10
          lg:pt-20
        "
      >
        <ProcessHeader />
      </div>

      {/* MOBILE / TABLET */}

      <div
        className="
          relative
          px-4
          pb-14
          pt-10
          sm:px-6
          sm:pb-16
          sm:pt-12
          md:px-8
          lg:hidden
        "
      >
        <ProcessSignal
          path={mobileSignalPath}
          pathRef={mobilePathRef}
          dotRef={mobileDotRef}
          viewBox="0 0 390 900"
          filterId="process-mobile-signal-glow"
          opacity={0.3}
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

        <ProcessSignal
          path={tabletSignalPath}
          pathRef={tabletPathRef}
          dotRef={tabletDotRef}
          viewBox="0 0 768 900"
          filterId="process-tablet-signal-glow"
          opacity={0.32}
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
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-[1220px]
            gap-4
            sm:gap-5
            md:grid-cols-2
          "
        >
          {stages.map(
            (stage, index) => (
              <div
                key={stage.number}
                className={
                  index ===
                  stages.length - 1
                    ? "md:col-span-2"
                    : ""
                }
              >
                <StageCard
                  stage={stage}
                  index={index}
                  className="process-flow-card"
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* DESKTOP STORY */}

      <div
        ref={desktopTrackRef}
        className="
          process-desktop-track
          relative
          mt-10
          hidden
          h-[275svh]
          lg:block
        "
      >
        <div
          ref={desktopStageRef}
          className="
            sticky
            top-[112px]
            h-[calc(100svh-132px)]
            overflow-hidden
            px-10
          "
        >
          <ProcessSignal
            path={desktopSignalPath}
            pathRef={desktopPathRef}
            dotRef={desktopDotRef}
            viewBox="0 0 1220 900"
            filterId="process-desktop-signal-glow"
            opacity={0.4}
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

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              h-full
              w-full
              max-w-[1220px]
              items-center
              py-5
            "
          >
            <div
              className="
                grid
                w-full
                grid-cols-3
                gap-5
                xl:gap-6
              "
            >
              {stages.map(
                (stage, index) => (
                  <div
                    key={stage.number}
                    className="
                      min-w-0
                      overflow-visible
                      p-1
                    "
                  >
                    <StageCard
                      stage={stage}
                      index={index}
                      className="process-desktop-card"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;