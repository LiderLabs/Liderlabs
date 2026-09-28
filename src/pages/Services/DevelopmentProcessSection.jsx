import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const steps = [
  {
    number: "1",
    title: "Consultations",
    description:
      "Together with your team, we identify your data needs and create a concept of the integration.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5"
        aria-hidden="true"
      >
        <path
          d="M7 8h10M7 12h7M7 16h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Development",
    description:
      "Development of the solution and giving rigorous updates through a dedicated Project Manager.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5"
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
    number: "3",
    title: "Implementation",
    description:
      "Implementation of the solution and providing Extended Branch with ongoing support & training.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5"
        aria-hidden="true"
      >
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="m8 12 2.5 2.5L16 9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Maintenance",
    description:
      "Supporting you and your team in tool maintenance, fixes and adding new functionalities.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5"
        aria-hidden="true"
      >
        <path
          d="M12 8v4l3 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

function DevelopmentProcessSection() {
  const sectionRef = useRef(null);
  const processRef = useRef(null);

  const desktopActiveLineRef = useRef(null);
  const desktopSignalDotRef = useRef(null);

  const mobileActiveLineRef = useRef(null);
  const mobileSignalDotRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const process = processRef.current;

      if (!section || !process) return;

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

          const shell = section.querySelector(".development-shell");
          const heading = section.querySelector(".development-heading");

          const cards = gsap.utils.toArray(
            ".development-step-card",
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
                shell,
                heading,
                cards,
                ".development-step-number",
                ".development-step-icon",
                ".development-step-title",
                ".development-step-copy",
                ".development-step-rail",
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

            gsap.set(
              [
                desktopActiveLineRef.current,
                mobileActiveLineRef.current,
              ],
              {
                scaleX: 1,
                scaleY: 1,
              },
            );

            gsap.set(
              [
                desktopSignalDotRef.current,
                mobileSignalDotRef.current,
              ],
              {
                autoAlpha: 0,
              },
            );

            return;
          }

          gsap.set(shell, {
            y: mobile ? 44 : 34,
            scale: mobile ? 0.975 : 0.985,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 34 : 28,
            autoAlpha: 0,
          });

          observeOnce(
            shell,
            () => {
              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(shell, {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: mobile ? 0.7 : 0.72,
                })
                .to(
                  heading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.62,
                  },
                  "-=0.4",
                );
            },
            {
              threshold: 0.08,
              rootMargin: mobile
                ? "0px 0px -3% 0px"
                : "0px 0px -6% 0px",
            },
          );

          if (!desktop) {
            cards.forEach((card, index) => {
              const number = card.querySelector(
                ".development-step-number",
              );

              const icon = card.querySelector(
                ".development-step-icon",
              );

              const title = card.querySelector(
                ".development-step-title",
              );

              const copy = card.querySelector(
                ".development-step-copy",
              );

              const rail = card.querySelector(
                ".development-step-rail",
              );

              const direction =
                tablet && index % 2 === 1 ? 1 : -1;

              gsap.set(card, {
                x: tablet ? direction * 20 : 0,
                y: mobile ? 46 : 34,
                scale: mobile ? 0.96 : 0.975,
                autoAlpha: 0,
              });

              gsap.set(number, {
                scale: 0.72,
                autoAlpha: 0.6,
                backgroundColor: "#0d162b",
              });

              gsap.set(icon, {
                y: 12,
                scale: 0.7,
                rotate: direction * -6,
                autoAlpha: 0,
              });

              gsap.set(title, {
                y: 14,
                autoAlpha: 0,
              });

              gsap.set(copy, {
                y: 12,
                autoAlpha: 0,
              });

              gsap.set(rail, {
                scaleX: 0,
                transformOrigin: "center",
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
                      number,
                      {
                        scale: 1.18,
                        autoAlpha: 1,
                        backgroundColor: "#1092bf",
                        boxShadow:
                          "0 0 0 6px rgba(16,146,191,0.12)",
                        duration: 0.3,
                        ease: "back.out(1.9)",
                      },
                      "-=0.42",
                    )
                    .to(
                      number,
                      {
                        scale: 1,
                        duration: 0.16,
                      },
                      "-=0.08",
                    )
                    .to(
                      rail,
                      {
                        scaleX: 1,
                        duration: 0.38,
                        ease: "power2.out",
                      },
                      "-=0.36",
                    )
                    .to(
                      icon,
                      {
                        y: 0,
                        scale: 1.12,
                        rotate: 0,
                        autoAlpha: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)",
                      },
                      "-=0.35",
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
                      "-=0.3",
                    )
                    .to(
                      copy,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.4,
                      },
                      "-=0.24",
                    );
                },
                {
                  threshold: tablet ? 0.12 : 0.08,
                  rootMargin: tablet
                    ? "0px 0px -7% 0px"
                    : "0px 0px -3% 0px",
                },
              );
            });

            if (
              mobile &&
              mobileActiveLineRef.current &&
              mobileSignalDotRef.current
            ) {
              gsap.set(mobileActiveLineRef.current, {
                scaleY: 0,
                transformOrigin: "top center",
              });

              gsap.set(mobileSignalDotRef.current, {
                y: 0,
                scale: 0.9,
                autoAlpha: 1,
              });

              const mobileJourney = gsap.timeline({
                scrollTrigger: {
                  trigger: process,
                  start: "top 82%",
                  end: "bottom 18%",
                  scrub: 0.65,
                  invalidateOnRefresh: true,
                },
              });

              mobileJourney.to(
                mobileActiveLineRef.current,
                {
                  scaleY: 1,
                  duration: 1,
                  ease: "none",
                },
                0,
              );

              mobileJourney.to(
                mobileSignalDotRef.current,
                {
                  y: () => Math.max(process.offsetHeight - 12, 0),
                  duration: 1,
                  ease: "none",
                },
                0,
              );

              mobileJourney
                .to(
                  mobileSignalDotRef.current,
                  {
                    scale: 1.5,
                    duration: 0.05,
                    ease: "power2.out",
                  },
                  0.94,
                )
                .to(
                  mobileSignalDotRef.current,
                  {
                    scale: 0.9,
                    duration: 0.06,
                  },
                  0.99,
                );
            }

            return () => {
              observers.forEach((observer) => {
                observer.disconnect();
              });
            };
          }

          if (
            !desktopActiveLineRef.current ||
            !desktopSignalDotRef.current
          ) {
            return;
          }

          gsap.set(cards, {
            y: 32,
            scale: 0.97,
            autoAlpha: 0.28,
          });

          cards.forEach((card) => {
            gsap.set(
              card.querySelector(".development-step-number"),
              {
                scale: 0.8,
                autoAlpha: 0.75,
                backgroundColor: "#0d162b",
              },
            );

            gsap.set(
              card.querySelector(".development-step-icon"),
              {
                y: 10,
                scale: 0.8,
                autoAlpha: 0.4,
              },
            );

            gsap.set(
              card.querySelector(".development-step-title"),
              {
                y: 8,
                autoAlpha: 0.5,
              },
            );

            gsap.set(
              card.querySelector(".development-step-copy"),
              {
                y: 8,
                autoAlpha: 0.4,
              },
            );

            gsap.set(
              card.querySelector(".development-step-rail"),
              {
                scaleX: 0,
                transformOrigin: "center",
              },
            );
          });

          gsap.set(desktopActiveLineRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
          });

          gsap.set(desktopSignalDotRef.current, {
            x: 0,
            scale: 0.85,
            autoAlpha: 1,
          });

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: process,
              start: "top 76%",
              end: "bottom 38%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          story.to(
            desktopActiveLineRef.current,
            {
              scaleX: 1,
              duration: 1,
              ease: "none",
            },
            0,
          );

          story.to(
            desktopSignalDotRef.current,
            {
              x: () => process.offsetWidth * 0.76,
              duration: 1,
              ease: "none",
            },
            0,
          );

          const positions = [
            0.05,
            0.32,
            0.59,
            0.86,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const number = card.querySelector(
              ".development-step-number",
            );

            const icon = card.querySelector(
              ".development-step-icon",
            );

            const title = card.querySelector(
              ".development-step-title",
            );

            const copy = card.querySelector(
              ".development-step-copy",
            );

            const rail = card.querySelector(
              ".development-step-rail",
            );

            story.to(
              card,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                borderColor: "rgba(23,109,140,0.20)",
                boxShadow:
                  "0 14px 34px rgba(15,35,55,0.08)",
                duration: 0.12,
                ease: "power2.out",
              },
              position,
            );

            story
              .to(
                number,
                {
                  scale: 1.18,
                  autoAlpha: 1,
                  backgroundColor: "#1092bf",
                  boxShadow:
                    "0 0 0 6px rgba(16,146,191,0.12)",
                  duration: 0.07,
                  ease: "power2.out",
                },
                position,
              )
              .to(
                number,
                {
                  scale: 1,
                  duration: 0.07,
                },
                position + 0.07,
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

            story
              .to(
                icon,
                {
                  y: 0,
                  scale: 1.1,
                  autoAlpha: 1,
                  duration: 0.09,
                  ease: "back.out(1.7)",
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
              position + 0.06,
            );

            story.to(
              card,
              {
                boxShadow:
                  "0 4px 16px rgba(15,35,55,0.04)",
                duration: 0.12,
              },
              position + 0.15,
            );
          });

          story
            .to(
              desktopSignalDotRef.current,
              {
                scale: 1.45,
                duration: 0.05,
                ease: "power2.out",
              },
              0.94,
            )
            .to(
              desktopSignalDotRef.current,
              {
                scale: 0.95,
                duration: 0.06,
              },
              0.99,
            );

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
      <div className="mx-auto max-w-[1220px]">
        <div
          className="
            development-shell
            rounded-[22px]
            border
            border-brand-border-light
            bg-brand-surface-blue
            px-4
            py-9
            shadow-brand-card
            sm:px-6
            sm:py-10
            md:px-10
            lg:px-14
            lg:py-14
          "
        >
          <div className="text-center">
            <h2
              className="
                development-heading
                mx-auto
                text-[30px]
                font-bold
                leading-[1.02]
                tracking-[-0.04em]
                text-brand-ink
                sm:text-[32px]
                md:text-[36px]
                lg:text-[38px]
              "
            >
              <span className="md:hidden">
                How does the development process look like?
              </span>

              <span className="hidden md:block">
                <span className="whitespace-nowrap">
                  How does the development process
                </span>

                <span className="block">
                  look like?
                </span>
              </span>
            </h2>
          </div>

          <div
            ref={processRef}
            className="relative mt-12 sm:mt-14"
          >
            {/* Mobile vertical journey */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                left-1/2
                top-0
                z-0
                -translate-x-1/2
                border-l-2
                border-dashed
                border-brand-cyan/20
                md:hidden
              "
            />

            <div
              ref={mobileActiveLineRef}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                left-1/2
                top-0
                z-0
                w-0.5
                -translate-x-1/2
                origin-top
                bg-brand-cyan
                md:hidden
              "
            />

            <div
              ref={mobileSignalDotRef}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                z-30
                size-3.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-brand-cyan
                shadow-[0_0_0_7px_rgba(16,146,191,0.11),0_0_24px_rgba(16,146,191,0.42)]
                md:hidden
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

            {/* Desktop horizontal journey */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-[12%]
                right-[12%]
                top-0
                hidden
                h-px
                bg-brand-border
                lg:block
              "
            />

            <div
              ref={desktopActiveLineRef}
              aria-hidden="true"
              className="
                absolute
                left-[12%]
                right-[12%]
                top-0
                hidden
                h-0.5
                origin-left
                bg-brand-cyan
                lg:block
              "
            />

            <div
              ref={desktopSignalDotRef}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-[12%]
                top-0
                z-30
                hidden
                size-3.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-brand-cyan
                shadow-[0_0_0_6px_rgba(16,146,191,0.10),0_0_20px_rgba(16,146,191,0.35)]
                lg:block
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

            <div
              className="
                relative
                z-10
                grid
                gap-9
                md:grid-cols-2
                md:gap-x-5
                md:gap-y-10
                lg:grid-cols-4
                lg:gap-5
              "
            >
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="
                    development-step-card
                    group
                    relative
                    rounded-xl
                    border
                    border-brand-border-light
                    bg-white
                    px-5
                    pb-7
                    pt-10
                    text-center
                    shadow-[0_4px_16px_rgba(15,35,55,0.04)]
                    transition-[transform,border-color,box-shadow]
                    duration-300
                    ease-out
                    hover:-translate-y-1
                    hover:border-brand-primary/20
                    hover:shadow-[0_14px_32px_rgba(15,35,55,0.08)]
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      development-step-rail
                      absolute
                      left-1/2
                      top-0
                      h-0.5
                      w-[72%]
                      -translate-x-1/2
                      bg-brand-cyan
                    "
                  />

                  <div
                    className="
                      development-step-number
                      absolute
                      -top-3.5
                      left-1/2
                      z-30
                      flex
                      size-7
                      -translate-x-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-brand-ink
                      text-[11px]
                      font-bold
                      text-white
                      ring-4
                      ring-brand-surface-blue
                    "
                  >
                    {step.number}
                  </div>

                  <div
                    className="
                      development-step-icon
                      mx-auto
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
                    {step.icon}
                  </div>

                  <h3
                    className="
                      development-step-title
                      mt-5
                      text-[15px]
                      font-semibold
                      leading-6
                      text-brand-ink
                      md:text-[16px]
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      development-step-copy
                      mx-auto
                      mt-3
                      max-w-[220px]
                      text-[12px]
                      leading-6
                      text-brand-muted
                      md:text-[13px]
                    "
                  >
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevelopmentProcessSection;