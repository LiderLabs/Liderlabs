import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const testimonials = [
  {
    quote:
      "Lider Technologies modernized our logistics dispatch architecture from the ground up. Their team spent time in our cold storage plants to understand our exact network latency challenges before drafting a single line of code.",
    initials: "NO",
    name: "Nana Osei",
    role: "Managing Director, Washlab",
  },
  {
    quote:
      "Data integrity and speed in laboratory diagnostic services are non-negotiable. Lider built us an electronic record sync platform that has maintained 99.99% uptime through power cuts and regional network fluctuations.",
    initials: "LM",
    name: "Dr. Linda Mensah",
    role: "Head of Diagnostics, Porta",
  },
  {
    quote:
      "Their grasp of real-time financial reconciliation switches and strict ISO formatting is exceptional. Working with Lider feels like having an elite, dedicated software engineering unit inside our own headquarters.",
    initials: "ED",
    name: "Elorm Doe",
    role: "Operations Director, Trainerzy",
  },
];

const mobileSignalPath = `
  M195 0
  C195 85 150 125 160 200
  C170 280 230 320 220 400
  C210 480 165 530 175 605
  C185 660 210 700 195 730
`;

const tabletSignalPath = `
  M384 0
  C384 85 315 130 325 205
  C335 285 455 325 445 405
  C435 485 330 535 340 610
  C350 665 415 705 384 730
`;

const desktopSignalPath = `
  M610 0
  C610 90 530 130 495 205
  C460 285 520 345 610 375
  C705 410 760 475 720 545
  C680 615 630 675 610 730
`;

function TestimonialsSignal({
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

function TestimonialsSection() {
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
            ".testimonials-heading",
          );

          const copy = section.querySelector(
            ".testimonials-copy",
          );

          const cards = gsap.utils.toArray(
            ".testimonial-card",
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
                ".testimonial-quote-mark",
                ".testimonial-quote",
                ".testimonial-author",
                ".testimonial-card-rail",
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

            gsap.set(".testimonial-card-sheen", {
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
            y: mobile ? 38 : 30,
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
                  duration: 0.72,
                })
                .to(
                  copy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.55,
                  },
                  "-=0.4",
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
              strokeDashoffset: desktop ? -140 : -120,
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
                    ? "bottom 34%"
                    : tablet
                      ? "bottom 18%"
                      : "bottom 10%",

                  scrub: desktop
                    ? 0.58
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
              const quoteMark = card.querySelector(
                ".testimonial-quote-mark",
              );

              const quote = card.querySelector(
                ".testimonial-quote",
              );

              const author = card.querySelector(
                ".testimonial-author",
              );

              const rail = card.querySelector(
                ".testimonial-card-rail",
              );

              const sheen = card.querySelector(
                ".testimonial-card-sheen",
              );

              const direction =
                tablet && index % 2 === 1 ? 1 : -1;

              gsap.set(card, {
                x: tablet ? direction * 20 : 0,
                y: mobile ? 52 : 40,
                scale: mobile ? 0.955 : 0.975,
                autoAlpha: 0,
              });

              gsap.set(quoteMark, {
                y: 20,
                scale: 0.55,
                rotate: direction * -7,
                autoAlpha: 0,
              });

              gsap.set(quote, {
                y: 22,
                autoAlpha: 0,
              });

              gsap.set(author, {
                y: 18,
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
                      duration: mobile ? 0.7 : 0.62,
                    })
                    .to(
                      rail,
                      {
                        scaleX: 1,
                        duration: 0.4,
                        ease: "power2.out",
                      },
                      "-=0.44",
                    )
                    .to(
                      quoteMark,
                      {
                        y: 0,
                        scale: 1.1,
                        rotate: 0,
                        autoAlpha: 1,
                        duration: 0.42,
                        ease: "back.out(1.8)",
                      },
                      "-=0.38",
                    )
                    .to(
                      quoteMark,
                      {
                        scale: 1,
                        duration: 0.16,
                      },
                      "-=0.08",
                    )
                    .to(
                      quote,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.48,
                      },
                      "-=0.3",
                    )
                    .to(
                      author,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.42,
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
                      "-=0.42",
                    )
                    .to(
                      sheen,
                      {
                        autoAlpha: 0,
                        duration: 0.16,
                      },
                      "-=0.14",
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
            const quoteMark = card.querySelector(
              ".testimonial-quote-mark",
            );

            const quote = card.querySelector(
              ".testimonial-quote",
            );

            const author = card.querySelector(
              ".testimonial-author",
            );

            const rail = card.querySelector(
              ".testimonial-card-rail",
            );

            const sheen = card.querySelector(
              ".testimonial-card-sheen",
            );

            const xOffset =
              index === 0
                ? -30
                : index === 2
                  ? 30
                  : 0;

            gsap.set(card, {
              x: xOffset,
              y: 44,
              scale: 0.965,
              autoAlpha: 0.22,
            });

            gsap.set(quoteMark, {
              y: 16,
              scale: 0.65,
              rotate: -6,
              autoAlpha: 0.15,
            });

            gsap.set(quote, {
              y: 16,
              autoAlpha: 0,
            });

            gsap.set(author, {
              y: 12,
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
              end: "top 30%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          const positions = [
            0.08,
            0.37,
            0.66,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const quoteMark = card.querySelector(
              ".testimonial-quote-mark",
            );

            const quote = card.querySelector(
              ".testimonial-quote",
            );

            const author = card.querySelector(
              ".testimonial-author",
            );

            const rail = card.querySelector(
              ".testimonial-card-rail",
            );

            const sheen = card.querySelector(
              ".testimonial-card-sheen",
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
                quoteMark,
                {
                  y: 0,
                  scale: 1.12,
                  rotate: 0,
                  autoAlpha: 1,
                  duration: 0.09,
                  ease: "back.out(1.8)",
                },
                position + 0.02,
              )
              .to(
                quoteMark,
                {
                  scale: 1,
                  duration: 0.07,
                },
                position + 0.1,
              );

            story.to(
              quote,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.11,
                ease: "power2.out",
              },
              position + 0.04,
            );

            story.to(
              author,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.11,
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
                  "0 4px 18px rgba(15,35,55,0.035)",
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
          -left-32
          top-1/3
          size-70
          rounded-full
          bg-brand-cyan/[0.035]
          blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          size-75
          rounded-full
          bg-brand-primary/[0.035]
          blur-[100px]
        "
      />

      <TestimonialsSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 730"
        filterId="testimonials-mobile-glow"
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

      <TestimonialsSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 730"
        filterId="testimonials-tablet-glow"
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

      <TestimonialsSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1220 730"
        filterId="testimonials-desktop-glow"
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

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1220px]
        "
      >
        <div className="text-center">
          <h2
            className="
              testimonials-heading
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
            What Our Partners Say
          </h2>

          <p
            className="
              testimonials-copy
              mx-auto
              mt-4
              max-w-[680px]
              text-[13px]
              leading-6
              text-brand-muted
              md:text-[14px]
            "
          >
            Engineering rigor, dedicated communication, and software that
            scales with real African enterprise demands.
          </p>
        </div>

        <div
          ref={gridRef}
          className="
            mt-9
            grid
            gap-4
            sm:mt-10
            sm:gap-5
            lg:grid-cols-3
          "
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="
                testimonial-card
                group
                relative
                flex
                min-h-80
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-brand-border-light
                bg-white
                p-6
                shadow-[0_4px_18px_rgba(15,35,55,0.035)]
                transition-[transform,border-color,box-shadow]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/20
                hover:shadow-[0_16px_38px_rgba(15,35,55,0.08)]
                sm:p-7
              "
            >
              <span
                aria-hidden="true"
                className="
                  testimonial-card-rail
                  absolute
                  left-0
                  top-0
                  h-0.5
                  w-full
                  origin-left
                  bg-brand-cyan
                "
              />

              <div
                aria-hidden="true"
                className="
                  testimonial-card-sheen
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  w-1/2
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-brand-cyan/[0.07]
                  to-transparent
                "
              />

              <div className="relative z-10 flex h-full flex-col">
                <div
                  aria-hidden="true"
                  className="
                    testimonial-quote-mark
                    font-serif
                    text-[52px]
                    font-bold
                    leading-none
                    text-brand-primary
                  "
                >
                  “
                </div>

                <blockquote
                  className="
                    testimonial-quote
                    mt-2
                    text-[13px]
                    italic
                    leading-6
                    text-brand-text
                    md:text-[14px]
                  "
                >
                  {testimonial.quote}
                </blockquote>

                <div
                  className="
                    testimonial-author
                    mt-auto
                    border-t
                    border-brand-border-light
                    pt-5
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-brand-border-light
                        bg-brand-primary-light
                        text-[10px]
                        font-semibold
                        text-brand-primary
                      "
                    >
                      {testimonial.initials}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[12px]
                          font-semibold
                          text-brand-ink
                          md:text-[13px]
                        "
                      >
                        {testimonial.name}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[11px]
                          leading-4
                          text-brand-muted
                          md:text-[12px]
                        "
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;