import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

function ClientsCTASection() {
  const sectionRef = useRef(null);

  const signalLineRef = useRef(null);
  const signalDotRef = useRef(null);
  const terminalRef = useRef(null);

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

          const container = section.querySelector(
            ".clients-cta-container",
          );

          const badge = section.querySelector(
            ".clients-cta-badge",
          );

          const heading = section.querySelector(
            ".clients-cta-heading",
          );

          const copy = section.querySelector(
            ".clients-cta-copy",
          );

          const button = section.querySelector(
            ".clients-cta-button",
          );

          const leftGlow = section.querySelector(
            ".clients-cta-glow-left",
          );

          const rightGlow = section.querySelector(
            ".clients-cta-glow-right",
          );

          if (reduceMotion) {
            gsap.set(
              [
                container,
                badge,
                heading,
                copy,
                button,
                leftGlow,
                rightGlow,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(signalLineRef.current, {
              scaleY: 1,
            });

            gsap.set(signalDotRef.current, {
              autoAlpha: 0,
            });

            gsap.set(terminalRef.current, {
              scale: 1,
              autoAlpha: 1,
            });

            return;
          }

          gsap.set(container, {
            y: mobile ? 50 : tablet ? 42 : 38,
            scale: mobile ? 0.96 : 0.98,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });

          gsap.set(badge, {
            y: 18,
            scale: 0.9,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 38 : 30,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: mobile ? 26 : 20,
            autoAlpha: 0,
          });

          gsap.set(button, {
            x: desktop ? 36 : 0,
            y: desktop ? 0 : 24,
            scale: 0.94,
            autoAlpha: 0,
          });

          gsap.set(leftGlow, {
            x: -20,
            scale: 0.7,
            autoAlpha: 0,
          });

          gsap.set(rightGlow, {
            x: 20,
            scale: 0.7,
            autoAlpha: 0,
          });

          gsap.set(signalLineRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });

          gsap.set(signalDotRef.current, {
            y: 0,
            scale: mobile ? 0.95 : 0.85,
            autoAlpha: 1,
            transformOrigin: "50% 50%",
          });

          gsap.set(terminalRef.current, {
            scale: 0.45,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });

          const signalDistance = desktop
            ? 96
            : tablet
              ? 80
              : 64;

          const signal = gsap.timeline({
            scrollTrigger: {
              trigger: section,

              start: mobile
                ? "top 92%"
                : tablet
                  ? "top 88%"
                  : "top 80%",

              end: mobile
                ? "top 68%"
                : tablet
                  ? "top 60%"
                  : "top 46%",

              scrub: mobile
                ? 0.65
                : tablet
                  ? 0.58
                  : 0.5,

              invalidateOnRefresh: true,
            },
          });

          signal
            .to(
              signalLineRef.current,
              {
                scaleY: 1,
                duration: 0.7,
                ease: "none",
              },
              0,
            )
            .to(
              signalDotRef.current,
              {
                y: signalDistance,
                duration: 0.7,
                ease: "none",
              },
              0,
            )
            .to(
              signalDotRef.current,
              {
                scale: mobile ? 1.7 : 1.45,
                duration: 0.08,
                ease: "power2.out",
              },
              0.72,
            )
            .to(
              terminalRef.current,
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.12,
                ease: "back.out(2)",
              },
              0.75,
            )
            .to(
              terminalRef.current,
              {
                scale: mobile ? 1.6 : 1.4,
                duration: 0.08,
                ease: "power2.out",
              },
              0.87,
            )
            .to(
              terminalRef.current,
              {
                scale: 1,
                duration: 0.12,
                ease: "power2.inOut",
              },
              0.94,
            )
            .to(
              signalDotRef.current,
              {
                scale: 0.6,
                autoAlpha: 0,
                duration: 0.08,
              },
              0.9,
            );

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) return;

              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(container, {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: mobile ? 0.72 : 0.78,
                })
                .to(
                  leftGlow,
                  {
                    x: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 1,
                  },
                  0.12,
                )
                .to(
                  rightGlow,
                  {
                    x: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 1.05,
                  },
                  0.16,
                )
                .to(
                  badge,
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.45,
                    ease: "back.out(1.5)",
                  },
                  0.2,
                )
                .to(
                  heading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.68,
                  },
                  0.3,
                )
                .to(
                  copy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                  },
                  0.42,
                )
                .to(
                  button,
                  {
                    x: 0,
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.52,
                  },
                  0.5,
                )
                .to(
                  button,
                  {
                    scale: 1.035,
                    duration: 0.16,
                    ease: "power2.out",
                  },
                  0.96,
                )
                .to(
                  button,
                  {
                    scale: 1,
                    duration: 0.18,
                    ease: "power2.inOut",
                  },
                  1.12,
                );

              observer.disconnect();
            },
            {
              threshold: mobile ? 0.08 : 0.14,
              rootMargin: mobile
                ? "0px 0px -4% 0px"
                : "0px 0px -8% 0px",
            },
          );

          observer.observe(container);

          gsap.to(leftGlow, {
            x: mobile ? 10 : 16,
            y: mobile ? 6 : 10,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(rightGlow, {
            x: mobile ? -10 : -16,
            y: mobile ? -6 : -8,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          return () => {
            observer.disconnect();
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
        pb-14
        pt-16
        sm:px-6
        sm:pb-16
        sm:pt-20
        md:px-8
        lg:px-10
        lg:pb-24
        lg:pt-24
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-[1]
          h-16
          -translate-x-1/2
          sm:h-20
          lg:h-24
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            -translate-x-1/2
            border-l-2
            border-dashed
            border-brand-cyan/30
          "
        />

        <div
          ref={signalLineRef}
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-0.5
            -translate-x-1/2
            origin-top
            bg-brand-cyan
          "
        />

        <div
          ref={signalDotRef}
          className="
            absolute
            left-1/2
            top-0
            size-3.5
            -translate-x-1/2
            rounded-full
            bg-brand-cyan
            shadow-[0_0_0_7px_rgba(16,146,191,0.12),0_0_24px_rgba(16,146,191,0.46)]
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
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1220px]
        "
      >
        <div
          ref={terminalRef}
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-0
            z-30
            flex
            size-5
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-brand-cyan/50
            bg-white
            shadow-[0_0_0_7px_rgba(16,146,191,0.10),0_0_26px_rgba(16,146,191,0.30)]
          "
        >
          <span className="size-2 rounded-full bg-brand-cyan" />
        </div>

        <div
          className="
            clients-cta-container
            relative
            overflow-hidden
            rounded-[22px]
            bg-gradient-to-r
            from-brand-primary
            to-brand-navy
            px-5
            py-10
            shadow-[0_14px_35px_rgba(0,45,51,0.18)]
            sm:px-7
            sm:py-11
            md:px-10
            lg:px-14
            lg:py-12
          "
        >
          <div
            aria-hidden="true"
            className="
              clients-cta-glow-left
              pointer-events-none
              absolute
              -left-20
              -top-24
              size-65
              rounded-full
              bg-brand-cyan/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              clients-cta-glow-right
              pointer-events-none
              absolute
              -bottom-24
              -right-16
              size-65
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              grid
              gap-8
              lg:grid-cols-[1fr_auto]
              lg:items-center
            "
          >
            <div className="max-w-[680px]">
              {/* NOW BOOKING LABEL */}

              <div
                className="
                  clients-cta-badge
                  inline-flex
                  flex-col
                  items-start
                "
              >
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white/80
                    sm:text-[11px]
                  "
                >
                  Now Booking Engagements
                </span>

                <span
                  aria-hidden="true"
                  className="
                    mt-2
                    h-0.5
                    w-28
                    rounded-full
                    bg-brand-cyan
                    sm:w-60
                  "
                />
              </div>

              <h2
                className="
                  clients-cta-heading
                  mt-5
                  max-w-[650px]
                  text-[30px]
                  font-bold
                  leading-[0.98]
                  tracking-[-0.04em]
                  text-white
                  min-[390px]:text-[32px]
                  sm:text-[36px]
                  md:text-[40px]
                  lg:text-[44px]
                "
              >
                Work with us — Let&apos;s build reliable, future-proof software
                together!
              </h2>

              <p
                className="
                  clients-cta-copy
                  mt-5
                  max-w-[600px]
                  text-[13px]
                  leading-6
                  text-white/70
                  md:text-[14px]
                "
              >
                Whether architecting a distributed transaction system or
                overhauling an existing tech stack, our senior engineers are
                ready to build with you.
              </p>
            </div>

            <div className="lg:pr-2">
              <Link
                to="/contact/sales"
                className="
                  clients-cta-button
                  group
                  inline-flex
                  min-h-11
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-6
                  py-3
                  text-[12px]
                  font-semibold
                  text-brand-ink
                  transition-[transform,box-shadow]
                  duration-200
                  ease-out
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-navy
                  sm:w-auto
                "
              >
                Fill out the contact form

                <span
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsCTASection;