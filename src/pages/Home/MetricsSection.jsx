import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const metrics = [
  {
    value: 10,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    value: 45,
    suffix: "+",
    label: "Projects Hours",
  },
];

const mobileSignalPath = `
  M195 0
  C195 55 175 75 180 105
  C185 135 210 150 205 180
  C200 210 185 230 195 260
`;

const tabletSignalPath = `
  M384 0
  C384 55 350 75 355 105
  C360 135 415 150 410 180
  C405 210 370 230 384 260
`;

const desktopSignalPath = `
  M610 0
  C610 55 560 75 565 105
  C570 135 655 150 650 180
  C645 210 590 230 610 260
`;

function MetricsSignal({
  path,
  pathRef,
  dotRef,
  viewBox,
  filterId,
  className,
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
            stdDeviation="3"
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
        opacity="0.04"
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
          r="9"
          fill="currentColor"
          opacity="0.13"
        />

        <circle
          cx="0"
          cy="0"
          r="4.5"
          fill="currentColor"
        />

        <circle
          cx="0"
          cy="0"
          r="1.5"
          fill="white"
        />
      </g>
    </svg>
  );
}

function MetricsSection() {
  const sectionRef = useRef(null);

  const mobilePathRef = useRef(null);
  const mobileDotRef = useRef(null);

  const tabletPathRef = useRef(null);
  const tabletDotRef = useRef(null);

  const desktopPathRef = useRef(null);
  const desktopDotRef = useRef(null);

  const hasCountedRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;

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

          const cards =
            gsap.utils.toArray(".metric-card");

          const values =
            gsap.utils.toArray(".metric-value");

          const labels =
            gsap.utils.toArray(".metric-label");

          const rafIds = new Set();

          let observer = null;

          const setFinalValues = () => {
            values.forEach((element, index) => {
              if (!element) return;

              element.textContent =
                `${metrics[index].value}${metrics[index].suffix}`;
            });
          };

          const showEverything = () => {
            gsap.set(cards, {
              y: 0,
              autoAlpha: 1,
            });

            gsap.set(values, {
              scale: 1,
              autoAlpha: 1,
            });

            gsap.set(labels, {
              y: 0,
              autoAlpha: 1,
            });

            setFinalValues();
          };

          /*
           * REDUCED MOTION
           */

          if (reduceMotion) {
            showEverything();

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
           * IF COUNTERS ALREADY RAN
           *
           * Important when crossing breakpoints.
           */

          if (hasCountedRef.current) {
            showEverything();
          } else {
            gsap.set(cards, {
              y: mobile ? 34 : 28,
              autoAlpha: 0,
            });

            gsap.set(values, {
              scale: 0.88,
              autoAlpha: 0,
            });

            gsap.set(labels, {
              y: 10,
              autoAlpha: 0,
            });

            values.forEach((element, index) => {
              if (!element) return;

              element.textContent =
                `0${metrics[index].suffix}`;
            });

            /*
             * COUNT FUNCTION
             */

            const countValue = (
              element,
              target,
              suffix,
              duration,
            ) => {
              const startTime =
                performance.now();

              const tick = (now) => {
                const progress = Math.min(
                  (now - startTime) / duration,
                  1,
                );

                const eased =
                  1 -
                  Math.pow(
                    1 - progress,
                    3,
                  );

                const current =
                  Math.round(
                    target * eased,
                  );

                element.textContent =
                  `${current}${suffix}`;

                if (progress < 1) {
                  const rafId =
                    requestAnimationFrame(
                      tick,
                    );

                  rafIds.add(rafId);
                } else {
                  element.textContent =
                    `${target}${suffix}`;
                }
              };

              const rafId =
                requestAnimationFrame(
                  tick,
                );

              rafIds.add(rafId);
            };

            /*
             * SECTION ENTERS VIEW
             */

            observer =
              new IntersectionObserver(
                ([entry]) => {
                  if (
                    !entry?.isIntersecting ||
                    hasCountedRef.current
                  ) {
                    return;
                  }

                  hasCountedRef.current = true;

                  observer.disconnect();

                  /*
                   * CARD REVEAL
                   */

                  gsap.to(cards, {
                    y: 0,
                    autoAlpha: 1,

                    duration: mobile
                      ? 0.62
                      : 0.68,

                    stagger: mobile
                      ? 0.07
                      : 0.09,

                    ease: "power3.out",
                  });

                  /*
                   * VALUE + LABEL REVEALS
                   */

                  metrics.forEach(
                    (metric, index) => {
                      const valueElement =
                        values[index];

                      const labelElement =
                        labels[index];

                      if (!valueElement) {
                        return;
                      }

                      const delay =
                        index *
                        (mobile
                          ? 0.07
                          : 0.09);

                      gsap.to(
                        valueElement,
                        {
                          scale: 1,
                          autoAlpha: 1,

                          duration: 0.4,

                          delay,

                          ease: "back.out(1.5)",
                        },
                      );

                      if (labelElement) {
                        gsap.to(
                          labelElement,
                          {
                            y: 0,
                            autoAlpha: 1,

                            duration: 0.42,

                            delay:
                              delay + 0.12,

                            ease: "power2.out",
                          },
                        );
                      }

                      countValue(
                        valueElement,
                        metric.value,
                        metric.suffix,
                        metric.value >= 90
                          ? 1600
                          : 1350,
                      );
                    },
                  );
                },
                {
                  threshold: mobile
                    ? 0.08
                    : 0.12,

                  rootMargin: mobile
                    ? "0px 0px -3% 0px"
                    : "0px 0px -6% 0px",
                },
              );

            observer.observe(section);
          }

          /*
           * RESPONSIVE SIGNAL
           */

          let signalPath = null;
          let signalDot = null;

          if (mobile) {
            signalPath =
              mobilePathRef.current;

            signalDot =
              mobileDotRef.current;
          }

          if (tablet) {
            signalPath =
              tabletPathRef.current;

            signalDot =
              tabletDotRef.current;
          }

          if (desktop) {
            signalPath =
              desktopPathRef.current;

            signalDot =
              desktopDotRef.current;
          }

          if (signalPath && signalDot) {
            gsap.to(signalPath, {
              strokeDashoffset: -100,
              duration: 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 0,
              scale: 0.75,
              transformOrigin: "50% 50%",
            });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,

                  start: mobile
                    ? "top 90%"
                    : tablet
                      ? "top 84%"
                      : "top 72%",

                  toggleActions:
                    "play none none reverse",

                  invalidateOnRefresh: true,
                },
              })
              .set(signalDot, {
                autoAlpha: 1,
              })
              .to(
                signalDot,
                {
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

                  duration: mobile
                    ? 1.25
                    : 1.5,

                  ease: "power1.inOut",
                },
                0,
              )
              .to(
                signalDot,
                {
                  scale: 1.15,
                  duration: 0.15,
                  ease: "power2.out",
                },
                "-=0.2",
              )
              .to(
                signalDot,
                {
                  scale: 0.8,
                  autoAlpha: 0,
                  duration: 0.2,
                  ease: "power2.in",
                },
              );
          }

          return () => {
            observer?.disconnect();

            rafIds.forEach((rafId) => {
              cancelAnimationFrame(rafId);
            });

            rafIds.clear();
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
        border-y
        border-brand-border-light
        bg-brand-surface
        px-4
        py-8
        sm:px-6
        sm:py-10
        md:px-8
        lg:px-10
        lg:py-12
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-44
          w-[70%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-brand-cyan/[0.025]
          blur-[70px]
        "
      />

      <MetricsSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 260"
        filterId="metrics-mobile-signal-glow"
        opacity={0.24}
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

      <MetricsSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 260"
        filterId="metrics-tablet-signal-glow"
        opacity={0.25}
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

      <MetricsSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1220 260"
        filterId="metrics-desktop-signal-glow"
        opacity={0.26}
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
          mx-auto
          max-w-[1220px]
        "
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {metrics.map(
            (metric, index) => {
              const isFirstRow =
                index < 2;

              const isLeftColumn =
                index % 2 === 0;

              const isLastDesktop =
                index ===
                metrics.length - 1;

              return (
                <div
                  key={metric.label}
                  className={[
                    "metric-card",
                    "flex min-h-32 flex-col items-center justify-center",
                    "px-3 py-6 text-center sm:px-4",

                    isFirstRow
                      ? "border-b border-brand-border-light md:border-b-0"
                      : "",

                    isLeftColumn
                      ? "border-r border-brand-border-light"
                      : "",

                    !isLastDesktop
                      ? "md:border-r md:border-brand-border-light"
                      : "md:border-r-0",
                  ].join(" ")}
                >
                  <p
                    className="
                      metric-value
                      text-[38px]
                      font-bold
                      leading-none
                      tracking-[-0.045em]
                      text-brand-primary
                      sm:text-[40px]
                      md:text-[46px]
                      lg:text-[48px]
                    "
                  >
                    {`${metric.value}${metric.suffix}`}
                  </p>

                  <p
                    className="
                      metric-label
                      mt-3
                      max-w-32
                      text-[10px]
                      font-semibold
                      uppercase
                      leading-4
                      tracking-[0.14em]
                      text-brand-muted
                      md:text-[11px]
                    "
                  >
                    {metric.label}
                  </p>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;