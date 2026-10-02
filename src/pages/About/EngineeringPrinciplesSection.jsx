import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const principles = [
  {
    number: "01",
    title: "Understand Before We Build",
    description:
      "We begin by understanding the business problem, the people affected by it, and the operational realities the solution needs to support.",
  },
  {
    number: "02",
    title: "Engineer for Reliability",
    description:
      "We build systems with maintainability, security, performance, and resilience considered from the beginning rather than added later.",
  },
  {
    number: "03",
    title: "Design for Growth",
    description:
      "Our software is structured to evolve with changing requirements, increasing users, new integrations, and expanding business operations.",
  },
  {
    number: "04",
    title: "Stay Accountable",
    description:
      "We work collaboratively, communicate clearly, and remain accountable from the first conversation through delivery and continued support.",
  },
];

const mobileSignalPath = `
  M195 0
  C195 90 150 130 160 205
  C170 280 230 320 220 395
  C210 470 165 515 175 590
  C185 665 220 720 195 760
`;

const tabletSignalPath = `
  M384 0
  C384 90 310 135 325 210
  C340 285 455 320 445 400
  C435 480 325 520 340 595
  C355 675 420 720 384 760
`;

const desktopSignalPath = `
  M640 0
  C545 65 390 80 320 160
  C270 220 430 280 640 275
  C820 270 980 280 965 360
  C945 445 720 455 505 465
  C355 475 300 525 380 565
  C470 610 560 610 640 640
`;

function PrinciplesSignal({
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
        opacity="0.035"
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

function EngineeringPrinciplesSection() {
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

          const label = section.querySelector(
            ".principles-label",
          );

          const heading = section.querySelector(
            ".principles-heading",
          );

          const copy = section.querySelector(
            ".principles-copy",
          );

          const cards = gsap.utils.toArray(
            ".principle-card",
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
                label,
                heading,
                copy,
                cards,
                ".principle-number",
                ".principle-rule",
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

            gsap.set(".principle-sheen", {
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

          gsap.set(label, {
            y: 14,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: desktop ? 34 : 28,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: 22,
            autoAlpha: 0,
          });

          observeOnce(
            label,
            () => {
              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(label, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.42,
                })
                .to(
                  heading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                  },
                  "-=0.2",
                )
                .to(
                  copy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.6,
                  },
                  "-=0.4",
                );
            },
            {
              threshold: mobile ? 0.08 : 0.12,
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
              strokeDashoffset: desktop ? -160 : -120,
              duration: desktop ? 9 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 1,
              scale: desktop ? 0.86 : 0.8,
              transformOrigin: "50% 50%",
            });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,

                  start: desktop
                    ? "top 78%"
                    : tablet
                      ? "top 88%"
                      : "top 92%",

                  end: desktop
                    ? "bottom 24%"
                    : tablet
                      ? "bottom 16%"
                      : "bottom 10%",

                  scrub: desktop
                    ? 0.6
                    : tablet
                      ? 0.8
                      : 0.7,

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
                  scale: desktop ? 1.35 : 1.15,
                  duration: 0.06,
                  ease: "power2.out",
                },
                0.91,
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
              const number = card.querySelector(
                ".principle-number",
              );

              const rule = card.querySelector(
                ".principle-rule",
              );

              const sheen = card.querySelector(
                ".principle-sheen",
              );

              const direction =
                mobile || index % 2 === 0 ? -1 : 1;

              gsap.set(card, {
                x: mobile ? 0 : direction * 18,
                y: 30,
                scale: 0.98,
                autoAlpha: 0,
              });

              gsap.set(number, {
                scale: 0.85,
                autoAlpha: 0,
              });

              gsap.set(rule, {
                scaleX: 0,
                transformOrigin: "left center",
              });

              gsap.set(sheen, {
                xPercent: -135,
                autoAlpha: 0,
              });

              observeOnce(
                card,
                () => {
                  const cardTimeline = gsap.timeline({
                    defaults: {
                      ease: "power3.out",
                    },
                  });

                  cardTimeline
                    .to(card, {
                      x: 0,
                      y: 0,
                      scale: 1,
                      autoAlpha: 1,
                      duration: tablet ? 0.62 : 0.56,
                    })
                    .to(
                      number,
                      {
                        scale: 1.1,
                        autoAlpha: 1,
                        color: "#1092bf",
                        duration: 0.3,
                        ease: "back.out(1.8)",
                      },
                      "-=0.38",
                    )
                    .to(
                      number,
                      {
                        scale: 1,
                        duration: 0.18,
                      },
                      "-=0.08",
                    )
                    .to(
                      rule,
                      {
                        scaleX: 1,
                        backgroundColor: "#1092bf",
                        duration: 0.35,
                        ease: "power2.out",
                      },
                      "-=0.36",
                    )
                    .to(
                      sheen,
                      {
                        xPercent: 135,
                        autoAlpha: 1,
                        duration: 0.75,
                        ease: "power2.inOut",
                      },
                      "-=0.4",
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
                  threshold: tablet ? 0.12 : 0.08,
                  rootMargin: tablet
                    ? "0px 0px -7% 0px"
                    : "0px 0px -4% 0px",
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
            const number = card.querySelector(
              ".principle-number",
            );

            const rule = card.querySelector(
              ".principle-rule",
            );

            const sheen = card.querySelector(
              ".principle-sheen",
            );

            const direction = index % 2 === 0 ? -1 : 1;

            gsap.set(card, {
              x: direction * 26,
              y: 36,
              scale: 0.975,
              autoAlpha: 0.3,
            });

            gsap.set(number, {
              scale: 0.9,
              color: "rgba(23,109,140,0.48)",
            });

            gsap.set(rule, {
              scaleX: 0.2,
              transformOrigin: "left center",
            });

            gsap.set(sheen, {
              xPercent: -135,
              autoAlpha: 0,
            });
          });

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 76%",
              end: "bottom 34%",
              scrub: 0.62,
              invalidateOnRefresh: true,
            },
          });

          const positions = [
            0.08,
            0.3,
            0.52,
            0.74,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const number = card.querySelector(
              ".principle-number",
            );

            const rule = card.querySelector(
              ".principle-rule",
            );

            const sheen = card.querySelector(
              ".principle-sheen",
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
                  "0 16px 38px rgba(15,35,55,0.08)",
                duration: 0.15,
                ease: "power2.out",
              },
              position,
            );

            story
              .to(
                number,
                {
                  color: "#1092bf",
                  scale: 1.12,
                  duration: 0.08,
                  ease: "power2.out",
                },
                position,
              )
              .to(
                number,
                {
                  scale: 1,
                  duration: 0.08,
                },
                position + 0.08,
              );

            story.to(
              rule,
              {
                scaleX: 1,
                backgroundColor: "#1092bf",
                duration: 0.12,
                ease: "power2.out",
              },
              position + 0.02,
            );

            story
              .to(
                sheen,
                {
                  xPercent: 135,
                  autoAlpha: 1,
                  duration: 0.17,
                  ease: "power1.inOut",
                },
                position + 0.03,
              )
              .to(
                sheen,
                {
                  autoAlpha: 0,
                  duration: 0.07,
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
              position + 0.16,
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
      id="principles"
      className="
        relative
        scroll-mt-[90px]
        overflow-hidden
        bg-brand-surface
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
          top-20
          size-72
          rounded-full
          bg-brand-cyan/[0.04]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-28
          bottom-16
          size-80
          rounded-full
          bg-brand-primary/[0.04]
          blur-3xl
        "
      />

      <PrinciplesSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 760"
        filterId="principles-mobile-glow"
        opacity={0.17}
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

      <PrinciplesSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 760"
        filterId="principles-tablet-glow"
        opacity={0.18}
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

      <PrinciplesSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1280 640"
        filterId="principles-desktop-glow"
        opacity={0.2}
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

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-8">
          <div>
           <div
  className="
    principles-label
    inline-flex
    flex-col
    items-start
  "
>
  <span
    className="
      text-[11px]
      font-semibold
      uppercase
      tracking-[0.18em]
      text-brand-primary
    "
  >
    How We Work
  </span>

  <span
    aria-hidden="true"
    className="
      mt-2
      h-0.5
      w-20
      rounded-full
      bg-brand-cyan
      sm:w-24
    "
  />
          </div>

            <h2
              className="
                principles-heading
                mt-4
                max-w-[600px]
                text-[30px]
                font-bold
                leading-[1.05]
                tracking-[-0.04em]
                text-brand-ink
                sm:text-[32px]
                md:text-[36px]
                lg:text-[40px]
              "
            >
              Engineering principles that guide every project
            </h2>
          </div>

          <p
            className="
              principles-copy
              max-w-[560px]
              text-[13px]
              leading-6
              text-brand-muted
              sm:text-[14px]
              sm:leading-7
              md:text-[15px]
              lg:justify-self-end
            "
          >
            Good software is more than code. Our approach combines technical
            discipline, clear communication, and a long-term view of the
            systems we create.
          </p>
        </div>

        <div
          ref={gridRef}
          className="
            relative
            mt-10
            grid
            gap-3
            sm:mt-12
            sm:gap-4
            md:grid-cols-2
          "
        >
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="
                principle-card
                group
                relative
                overflow-hidden
                rounded-xl
                border
                border-brand-border-light
                bg-white
                p-5
                shadow-brand-card
                transition-[transform,border-color,box-shadow]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/20
                hover:shadow-[0_14px_34px_rgba(15,35,55,0.08)]
                sm:p-6
                md:p-7
              "
            >
              <div
                aria-hidden="true"
                className="
                  principle-sheen
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  w-1/2
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-brand-cyan/[0.08]
                  to-transparent
                "
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <span
                    className="
                      principle-number
                      text-[12px]
                      font-bold
                      text-brand-primary
                    "
                  >
                    {principle.number}
                  </span>

                  <span
                    className="
                      principle-rule
                      h-px
                      w-8
                      origin-left
                      bg-brand-primary/25
                    "
                  />
                </div>

                <h3
                  className="
                    mt-5
                    text-[17px]
                    font-semibold
                    tracking-[-0.02em]
                    text-brand-ink
                    sm:mt-6
                    sm:text-[18px]
                    md:text-[20px]
                  "
                >
                  {principle.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[520px]
                    text-[13px]
                    leading-6
                    text-brand-muted
                    md:text-[14px]
                  "
                >
                  {principle.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EngineeringPrinciplesSection;