import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const capabilities = [
  {
    title: "Purpose-Driven Solutions",
    description:
      "Aligning technology with your core business objectives to unlock exponential value.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="7"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M12 8v8M8 12h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Tailored Technology",
    description:
      "Custom-built architectures designed strictly for your specific operational scale and needs.",
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
      "Resilient cloud-native systems that grow seamlessly alongside your enterprise roadmap.",
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
      "From initial product discovery through development, infrastructure, and ongoing maintenance.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="m6 8 6-3 6 3-6 3-6-3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M6 8v7l6 4 6-4V8M12 11v8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Strong Partnership Approach",
    description:
      "We embed deeply as an extension of your internal team, guaranteeing radical transparency and shared accountability at every project milestone.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="m8 12 3-3c1-1 2.5-1 3.5 0l1 1M16 12l-3 3c-1 1-2.5 1-3.5 0l-1-1"
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
];

const mobileSignalPath = `
  M195 0
  C195 90 160 140 165 215
  C170 290 225 335 220 420
  C215 505 165 555 170 645
  C175 735 220 790 195 880
`;

const tabletSignalPath = `
  M384 0
  C384 95 330 145 335 225
  C340 305 430 350 425 435
  C420 525 335 565 340 655
  C345 745 410 805 384 900
`;

const desktopSignalPath = `
  M640 0
  C640 100 640 180 640 275
  C640 335 535 365 430 405
  C400 475 400 560 430 625
  C465 710 555 770 640 880
`;

function WhoWeAreSection() {
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

          const label =
            section.querySelector(".who-label");

          const heading =
            section.querySelector(".who-heading");

          const copy =
            section.querySelector(".who-copy");

          const divider =
            section.querySelector(".who-divider");

          const subLabel =
            section.querySelector(".who-sub-label");

          const cards =
            gsap.utils.toArray(".who-card");

          const observers = [];

          const observeOnce = (
            element,
            callback,
            options = {},
          ) => {
            if (!element) return;

            const observer =
              new IntersectionObserver(
                ([entry]) => {
                  if (!entry?.isIntersecting) {
                    return;
                  }

                  callback();
                  observer.disconnect();
                },
                options,
              );

            observer.observe(element);
            observers.push(observer);
          };

          /*
           * REDUCED MOTION
           */

          if (reduceMotion) {
            gsap.set(
              [
                label,
                heading,
                copy,
                subLabel,
                cards,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(divider, {
              scaleX: 1,
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

          /*
           * INTRO
           */

          gsap.set(label, {
            y: 16,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: desktop
              ? 36
              : tablet
                ? 32
                : 30,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: desktop ? 28 : 22,
            autoAlpha: 0,
          });

          gsap.set(divider, {
            scaleX: 0,
            transformOrigin: "left center",
          });

          gsap.set(subLabel, {
            y: 14,
            autoAlpha: 0,
          });

          observeOnce(
            section,
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
                  duration: 0.45,
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
                )
                .to(
                  divider,
                  {
                    scaleX: 1,
                    duration: 0.65,
                  },
                  "-=0.3",
                )
                .to(
                  subLabel,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.4,
                  },
                  "-=0.3",
                );
            },
            {
              threshold: mobile ? 0.06 : 0.12,
              rootMargin: mobile
                ? "0px 0px -2% 0px"
                : "0px 0px -6% 0px",
            },
          );

          /*
           * MOBILE / TABLET CARDS
           *
           * Dedicated ScrollTriggers are more reliable
           * on tall mobile viewports.
           */

          if (!desktop) {
            cards.forEach((card, index) => {
              gsap.fromTo(
                card,
                {
                  y: mobile ? 52 : 42,
                  scale: mobile ? 0.95 : 0.97,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,

                  duration: mobile
                    ? 0.75
                    : 0.68,

                  delay: tablet
                    ? (index % 2) * 0.07
                    : 0,

                  ease: "power3.out",

                  scrollTrigger: {
                    trigger: card,

                    start: mobile
                      ? "top 94%"
                      : "top 90%",

                    once: true,

                    invalidateOnRefresh: true,
                  },

                  onComplete: () => {
                    gsap.set(card, {
                      clearProps: "transform",
                    });
                  },
                },
              );
            });
          } else {
            gsap.set(cards, {
              y: 46,
              scale: 0.97,
              autoAlpha: 0,
            });
          }

          /*
           * ACTIVE SIGNAL
           */

          let path = null;
          let dot = null;

          if (mobile) {
            path = mobilePathRef.current;
            dot = mobileDotRef.current;
          }

          if (tablet) {
            path = tabletPathRef.current;
            dot = tabletDotRef.current;
          }

          if (desktop) {
            path = desktopPathRef.current;
            dot = desktopDotRef.current;
          }

          if (path && dot) {
            gsap.to(path, {
              strokeDashoffset: desktop
                ? -160
                : -120,

              duration: desktop ? 8 : 7,

              repeat: -1,

              ease: "none",
            });

            gsap.set(dot, {
              autoAlpha: 1,

              scale: desktop
                ? 0.9
                : tablet
                  ? 0.85
                  : 0.8,

              transformOrigin: "50% 50%",
            });

            const story = gsap.timeline({
              scrollTrigger: {
                trigger: section,

                start: desktop
                  ? "top 82%"
                  : tablet
                    ? "top 88%"
                    : "top 92%",

                end: desktop
                  ? "bottom 38%"
                  : tablet
                    ? "bottom 22%"
                    : "bottom 12%",

                scrub: desktop
                  ? 1.1
                  : tablet
                    ? 0.95
                    : 0.8,

                invalidateOnRefresh: true,
              },
            });

            story.to(
              dot,
              {
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  start: 0,
                  end: 1,
                },

                duration: 1,
                ease: "none",
              },
              0,
            );

            /*
             * Desktop cards remain part of the
             * section storytelling timeline.
             */

            if (desktop) {
              story.to(
                cards,
                {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,

                  duration: 0.3,

                  stagger: 0.1,

                  ease: "power2.out",
                },
                0.18,
              );
            }

            story
              .to(
                dot,
                {
                  scale: desktop
                    ? 1.35
                    : tablet
                      ? 1.2
                      : 1.15,

                  duration: 0.08,

                  ease: "power2.out",
                },
                0.9,
              )
              .to(
                dot,
                {
                  scale: 1,
                  duration: 0.1,
                },
                0.97,
              );
          }

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
        py-12
        sm:px-6
        sm:py-14
        md:px-8
        md:py-16
        lg:px-10
        lg:py-20
      "
    >
      {/* Mobile signal */}

      <svg
        aria-hidden="true"
        viewBox="0 0 390 880"
        preserveAspectRatio="none"
        fill="none"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          size-full
          overflow-visible
          text-brand-cyan
          md:hidden
        "
      >
        <defs>
          <filter
            id="who-mobile-glow"
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
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
          d={mobileSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="6 10"
          strokeLinecap="round"
          opacity="0.07"
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={mobilePathRef}
          d={mobileSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 10"
          strokeLinecap="round"
          opacity="0.42"
          vectorEffect="non-scaling-stroke"
        />

        <g
          ref={mobileDotRef}
          filter="url(#who-mobile-glow)"
        >
          <circle
            cx="0"
            cy="0"
            r="9"
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

      {/* Tablet signal */}

      <svg
        aria-hidden="true"
        viewBox="0 0 768 900"
        preserveAspectRatio="none"
        fill="none"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          hidden
          size-full
          overflow-visible
          text-brand-cyan
          md:block
          lg:hidden
        "
      >
        <defs>
          <filter
            id="who-tablet-glow"
            x="-150%"
            y="-150%"
            width="400%"
            height="400%"
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
          d={tabletSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="7 11"
          strokeLinecap="round"
          opacity="0.07"
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={tabletPathRef}
          d={tabletSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeDasharray="7 11"
          strokeLinecap="round"
          opacity="0.46"
          vectorEffect="non-scaling-stroke"
        />

        <g
          ref={tabletDotRef}
          filter="url(#who-tablet-glow)"
        >
          <circle
            cx="0"
            cy="0"
            r="10"
            fill="currentColor"
            opacity="0.15"
          />

          <circle
            cx="0"
            cy="0"
            r="5.5"
            fill="currentColor"
          />

          <circle
            cx="0"
            cy="0"
            r="2"
            fill="white"
          />
        </g>
      </svg>

      {/* Desktop signal */}

      <svg
        aria-hidden="true"
        viewBox="0 0 1280 880"
        preserveAspectRatio="none"
        fill="none"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          hidden
          size-full
          overflow-visible
          text-brand-cyan
          lg:block
        "
      >
        <defs>
          <filter
            id="who-desktop-glow"
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
          >
            <feGaussianBlur
              stdDeviation="5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={desktopSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray="8 12"
          strokeLinecap="round"
          opacity="0.08"
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={desktopPathRef}
          d={desktopSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeDasharray="8 12"
          strokeLinecap="round"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
        />

        <g
          ref={desktopDotRef}
          filter="url(#who-desktop-glow)"
        >
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="currentColor"
            opacity="0.16"
          />

          <circle
            cx="0"
            cy="0"
            r="6"
            fill="currentColor"
          />

          <circle
            cx="0"
            cy="0"
            r="2"
            fill="white"
          />
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className="
            rounded-[22px]
            border
            border-brand-border
            bg-brand-surface/60
            px-5
            py-8
            shadow-brand-card
            sm:px-6
            sm:py-10
            md:px-8
            lg:px-14
            lg:py-12
          "
        >
          <div
            className="
              grid
              gap-8
              sm:gap-10
              lg:grid-cols-[0.95fr_1.05fr]
              lg:gap-20
            "
          >
            <div>
              <div
                className="
                  who-label
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
                  Who We Are
                </span>
              </div>

              <h2
                className="
                  who-heading
                  mt-4
                  max-w-[540px]
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
            </div>

            <div className="who-copy max-w-[600px] lg:pt-3">
              <p
                className="
                  text-[13px]
                  font-medium
                  leading-6
                  text-brand-text
                  sm:text-[14px]
                  sm:leading-7
                  md:text-[15px]
                "
              >
                Lider Technologies is a premier team of expert developers,
                architects, and innovators. We are committed to delivering
                high-quality software solutions that don&apos;t just meet
                requirements but redefine what&apos;s possible for our clients.
              </p>

              <p
                className="
                  mt-4
                  text-[13px]
                  leading-6
                  text-brand-muted
                  sm:text-[14px]
                  sm:leading-7
                  md:text-[15px]
                "
              >
                Our approach combines deep technical proficiency with a genuine
                passion for problem-solving, ensuring that every line of code we
                write contributes to your long-term digital success.
              </p>
            </div>
          </div>

          <div
            className="
              my-8
              overflow-hidden
              sm:my-10
              lg:my-12
            "
          >
            <div className="who-divider h-px bg-brand-border-light" />
          </div>

          <p
            className="
              who-sub-label
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-brand-muted
            "
          >
            What Sets Us Apart
          </p>

          <div
            className="
              who-cards
              mt-5
              grid
              gap-3
              sm:mt-6
              sm:gap-4
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {capabilities.map((item, index) => (
              <article
                key={item.title}
                className={[
                  "who-card",
                  "relative flex min-h-48 flex-col rounded-xl",
                  "border border-brand-border bg-white",
                  "p-5 sm:p-6",
                  "transition-[border-color,box-shadow] duration-300",
                  "motion-reduce:transition-none",
                  "hover:border-brand-primary/20",
                  "hover:shadow-brand-card",
                  index === capabilities.length - 1
                    ? "md:col-span-2 lg:col-span-2"
                    : "",
                ].join(" ")}
              >
                <div
                  className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-brand-primary-light
                    text-brand-primary
                  "
                >
                  {item.icon}
                </div>

                <h3
                  className="
                    mt-5
                    text-[15px]
                    font-semibold
                    leading-6
                    text-brand-ink
                    md:text-[16px]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[600px]
                    text-[13px]
                    leading-6
                    text-brand-muted
                    md:text-[14px]
                  "
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAreSection;