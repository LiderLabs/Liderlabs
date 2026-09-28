import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const capabilities = [
  {
    title: "Purpose-Driven Solutions",
    description:
      "Aligning technology with your core business objectives to unlock exponential value and operational clarity.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="m13 3-7 10h5l-1 8 8-11h-5V3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Tailored Technology",
    description:
      "Custom-built architectures designed strictly for your specific operational scale, security requirements, and regulatory needs.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="m9 7-5 5 5 5M15 7l5 5-5 5M13.5 5l-3 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Scalable & Future-Ready",
    description:
      "Resilient cloud-native systems that grow seamlessly alongside your enterprise roadmap without breaking down.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="M5 18V7M5 18h14M8 14l3-3 3 1 4-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "End-to-End Expertise",
    description:
      "From initial product discovery through development, infrastructure deployment, and continuous ongoing maintenance.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <rect
          x="5"
          y="9"
          width="6"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <rect
          x="13"
          y="5"
          width="6"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M11 12h2M8 9V7h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Strong Partnership Approach",
    description:
      "We embed deeply as an extension of your internal team, guaranteeing radical transparency and shared accountability.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="M8 12 11 9c1-1 2.5-1 3.5 0l1 1M16 12l-3 3c-1 1-2.5 1-3.5 0l-1-1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="m7 9-2 2a3 3 0 0 0 0 4l1 1M17 15l2-2a3 3 0 0 0 0-4l-1-1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Mission-Critical Velocity",
    description:
      "Rigorous agile delivery loops delivering verifiable business value, bulletproof automated tests, and uninterrupted delivery.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="M7 16h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.8 3.2 3.2 0 0 0 7 16Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const mobileSignalPath = `
  M195 0
  C195 95 155 145 165 225
  C175 310 235 350 225 435
  C215 525 160 575 170 665
  C180 755 215 805 195 840
`;

const tabletSignalPath = `
  M384 0
  C384 95 325 145 335 225
  C345 310 450 350 440 440
  C430 530 325 580 340 670
  C355 755 415 810 384 840
`;

const desktopSignalPath = `
  M640 0
  C640 95 715 125 760 190
  C820 275 770 350 665 405
  C555 465 520 565 585 650
  C620 700 640 760 640 840
`;

function AboutSignal({
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

      <g ref={dotRef} filter={`url(#${filterId})`}>
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
          r="1.8"
          fill="white"
        />
      </g>
    </svg>
  );
}

function AboutWhoWeAreSection() {
  const sectionRef = useRef(null);

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

          const label = section.querySelector(".about-who-label");
          const heading = section.querySelector(".about-who-heading");
          const copy = section.querySelector(".about-who-copy");

          const capabilityLabel = section.querySelector(
            ".about-capability-label",
          );

          const cards = gsap.utils.toArray(
            ".about-capability-card",
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
                capabilityLabel,
                cards,
                ".about-capability-icon",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
                autoAlpha: 1,
              },
            );

            gsap.set(".about-card-sheen", {
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
            y: desktop ? 36 : 28,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: 22,
            autoAlpha: 0,
          });

          gsap.set(capabilityLabel, {
            y: 14,
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
                    duration: 0.72,
                  },
                  "-=0.22",
                )
                .to(
                  copy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.62,
                  },
                  "-=0.42",
                )
                .to(
                  capabilityLabel,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.4,
                  },
                  "-=0.18",
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
              strokeDashoffset: desktop ? -150 : -120,
              duration: desktop ? 8 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 1,
              scale: desktop ? 0.88 : 0.8,
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
                    ? "bottom 28%"
                    : tablet
                      ? "bottom 18%"
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
                },
                0.97,
              );
          }

          if (!desktop) {
            cards.forEach((card, index) => {
              const icon = card.querySelector(
                ".about-capability-icon",
              );

              const sheen = card.querySelector(
                ".about-card-sheen",
              );

              const direction =
                mobile || index % 2 === 0 ? -1 : 1;

              gsap.set(card, {
                x: mobile ? 0 : direction * 18,
                y: 30,
                scale: 0.975,
                autoAlpha: 0,
              });

              gsap.set(icon, {
                scale: 0.7,
                rotate: direction * -6,
                autoAlpha: 0,
              });

              gsap.set(sheen, {
                xPercent: -130,
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
                      duration: 0.6,
                    })
                    .to(
                      icon,
                      {
                        scale: 1,
                        rotate: 0,
                        autoAlpha: 1,
                        duration: 0.42,
                        ease: "back.out(1.7)",
                      },
                      "-=0.38",
                    )
                    .to(
                      sheen,
                      {
                        xPercent: 130,
                        autoAlpha: 1,
                        duration: 0.75,
                        ease: "power2.inOut",
                      },
                      "-=0.35",
                    )
                    .to(
                      sheen,
                      {
                        autoAlpha: 0,
                        duration: 0.2,
                      },
                      "-=0.18",
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
            const column = index % 3;

            const xOffset =
              column === 0
                ? -28
                : column === 2
                  ? 28
                  : 0;

            const icon = card.querySelector(
              ".about-capability-icon",
            );

            const sheen = card.querySelector(
              ".about-card-sheen",
            );

            gsap.set(card, {
              x: xOffset,
              y: 42,
              scale: 0.965,
              autoAlpha: 0,
            });

            gsap.set(icon, {
              scale: 0.7,
              rotate: -6,
              autoAlpha: 0,
            });

            gsap.set(sheen, {
              xPercent: -135,
              autoAlpha: 0,
            });
          });

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "bottom 32%",
              scrub: 0.62,
              invalidateOnRefresh: true,
            },
          });

          const cardPositions = [
            0.18,
            0.28,
            0.38,
            0.52,
            0.62,
            0.72,
          ];

          cards.forEach((card, index) => {
            const position = cardPositions[index];

            const icon = card.querySelector(
              ".about-capability-icon",
            );

            const sheen = card.querySelector(
              ".about-card-sheen",
            );

            story.to(
              card,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.14,
                ease: "power2.out",
              },
              position,
            );

            if (icon) {
              story
                .to(
                  icon,
                  {
                    scale: 1.12,
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
            }

            if (sheen) {
              story
                .to(
                  sheen,
                  {
                    xPercent: 130,
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
                    duration: 0.08,
                  },
                  position + 0.15,
                );
            }

            story
              .to(
                card,
                {
                  boxShadow:
                    "0 18px 45px rgba(16,146,191,0.10)",
                  duration: 0.08,
                },
                position + 0.03,
              )
              .to(
                card,
                {
                  boxShadow:
                    "0 8px 28px rgba(15,35,55,0.06)",
                  duration: 0.12,
                },
                position + 0.14,
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
        lg:px-10
        lg:py-24
      "
    >
      <AboutSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 840"
        filterId="about-who-mobile-glow"
        opacity={0.18}
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

      <AboutSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 840"
        filterId="about-who-tablet-glow"
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

      <AboutSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1280 840"
        filterId="about-who-desktop-glow"
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
        <div className="max-w-[820px]">
          <div
            className="
              about-who-label
              inline-flex
              rounded-full
              bg-brand-primary-light
              px-3
              py-1.5
            "
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
              Who We Are
            </span>
          </div>

          <h2
            className="
              about-who-heading
              mt-4
              max-w-[760px]
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
            Driving Digital Transformation with Passion and Expertise
          </h2>

          <div
            className="
              about-who-copy
              mt-5
              max-w-[830px]
              space-y-4
              sm:mt-6
            "
          >
            <p className="text-[13px] leading-6 text-brand-muted sm:text-[14px] sm:leading-7 md:text-[15px]">
              Lider Technologies is a premier team of expert developers,
              architects, and innovators. We are committed to delivering
              high-quality software solutions that don&apos;t just meet
              requirements but redefine what&apos;s possible for our clients.
            </p>

            <p className="text-[13px] leading-6 text-brand-muted sm:text-[14px] sm:leading-7 md:text-[15px]">
              Our approach combines deep technical proficiency with a genuine
              passion for problem-solving, ensuring that every line of code we
              write contributes to your long-term digital success across the
              African continent and beyond.
            </p>
          </div>
        </div>

        <p
          className="
            about-capability-label
            mt-12
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-brand-muted
            sm:mt-14
          "
        >
          What Sets Us Apart
        </p>

        <div
          className="
            mt-5
            grid
            gap-3
            sm:mt-6
            sm:gap-4
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              className="
                about-capability-card
                group
                relative
                flex
                min-h-50
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-brand-border-light
                bg-white
                p-5
                shadow-brand-card
                transition-[transform,border-color,box-shadow]
                duration-300
                hover:-translate-y-1
                hover:border-brand-primary/15
                hover:shadow-[0_14px_35px_rgba(15,35,55,0.08)]
                sm:p-6
              "
            >
              <div
                aria-hidden="true"
                className="
                  about-card-sheen
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
                <div
                  className="
                    about-capability-icon
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-brand-primary-light
                    text-brand-primary
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  {capability.icon}
                </div>

                <h3 className="mt-5 text-[15px] font-semibold leading-6 text-brand-ink sm:mt-6 md:text-[16px]">
                  {capability.title}
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-brand-muted md:text-[14px]">
                  {capability.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutWhoWeAreSection;