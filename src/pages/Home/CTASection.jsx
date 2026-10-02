import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

function CTASection() {
  const sectionRef = useRef(null);

  const signalDotRef = useRef(null);
  const signalFillRef = useRef(null);
  const terminalRef = useRef(null);

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

          const card =
            section.querySelector(".cta-card");

          const heading =
            section.querySelector(".cta-heading");

          const subtitle =
            section.querySelector(".cta-subtitle");

          const primary =
            section.querySelector(".cta-primary");

          const secondary =
            section.querySelector(".cta-secondary");

          const supporting =
            section.querySelector(".cta-supporting");

          /*
           * REDUCED MOTION
           */

          if (reduceMotion) {
            gsap.set(
              [
                card,
                heading,
                subtitle,
                primary,
                secondary,
                supporting,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            if (signalFillRef.current) {
              gsap.set(signalFillRef.current, {
                scaleY: 1,
              });
            }

            if (terminalRef.current) {
              gsap.set(terminalRef.current, {
                scale: 1,
                autoAlpha: 1,
              });
            }

            if (signalDotRef.current) {
              gsap.set(signalDotRef.current, {
                autoAlpha: 0,
              });
            }

            return;
          }

          /*
           * INITIAL CONTENT STATES
           */

          gsap.set(card, {
            y: mobile
              ? 42
              : tablet
                ? 38
                : 40,

            scale: mobile
              ? 0.975
              : 0.985,

            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 26 : 24,
            autoAlpha: 0,
          });

          gsap.set(subtitle, {
            y: 18,
            autoAlpha: 0,
          });

          gsap.set(
            [primary, secondary],
            {
              y: mobile ? 24 : 18,
              scale: 0.96,
              autoAlpha: 0,
            },
          );

          gsap.set(supporting, {
            y: 14,
            autoAlpha: 0,
          });

          /*
           * SIGNAL INITIAL STATES
           */

          if (signalFillRef.current) {
            gsap.set(signalFillRef.current, {
              scaleY: 0,
              transformOrigin: "top center",
            });
          }

          if (signalDotRef.current) {
            gsap.set(signalDotRef.current, {
              y: 0,
              scale: 0.8,
              autoAlpha: 0,
              transformOrigin: "50% 50%",
            });
          }

          if (terminalRef.current) {
            gsap.set(terminalRef.current, {
              scale: 0.5,
              autoAlpha: 0,
              transformOrigin: "50% 50%",
            });
          }

          /*
           * CTA REVEAL
           */

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,

                start: mobile
                  ? "top 92%"
                  : tablet
                    ? "top 86%"
                    : "top 74%",

                once: true,

                invalidateOnRefresh: true,
              },

              defaults: {
                ease: "power3.out",
              },
            })

            .to(card, {
              y: 0,
              scale: 1,
              autoAlpha: 1,

              duration: mobile
                ? 0.7
                : 0.75,
            })

            .to(
              heading,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.52,
              },
              "-=0.4",
            )

            .to(
              subtitle,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.44,
              },
              "-=0.32",
            )

            .to(
              [primary, secondary],
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,

                duration: 0.44,

                stagger: 0.08,
              },
              "-=0.25",
            )

            .to(
              supporting,
              {
                y: 0,
                autoAlpha: 1,

                duration: 0.4,
              },
              "-=0.18",
            );

          /*
           * CLOSING SIGNAL
           */

          const signalDistance = desktop
            ? 74
            : tablet
              ? 58
              : 50;

          if (
            signalDotRef.current &&
            signalFillRef.current &&
            terminalRef.current
          ) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,

                  start: mobile
                    ? "top 94%"
                    : tablet
                      ? "top 88%"
                      : "top 80%",

                  end: mobile
                    ? "top 66%"
                    : tablet
                      ? "top 60%"
                      : "top 42%",

                  scrub: mobile
                    ? 0.65
                    : tablet
                      ? 0.58
                      : 0.5,

                  invalidateOnRefresh: true,
                },
              })

              .set(
                signalDotRef.current,
                {
                  autoAlpha: 1,
                },
                0,
              )

              .to(
                signalDotRef.current,
                {
                  y: signalDistance,

                  duration: 0.72,

                  ease: "none",
                },
                0,
              )

              .to(
                signalFillRef.current,
                {
                  scaleY: 1,

                  duration: 0.72,

                  ease: "none",
                },
                0,
              )

              .to(
                signalDotRef.current,
                {
                  scale: 1.45,

                  duration: 0.08,

                  ease: "power2.out",
                },
                0.73,
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
                  scale: 1.4,

                  duration: 0.09,

                  ease: "power2.out",
                },
                0.86,
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
                  scale: 1,
                  autoAlpha: 0,

                  duration: 0.08,
                },
                0.92,
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
        overflow-hidden
        bg-white
        px-4
        py-14
        sm:px-6
        sm:py-16
        md:px-8
        lg:px-10
        lg:py-20
      "
    >
      {/* CLOSING SIGNAL */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-[1]
          h-14
          -translate-x-1/2
          sm:h-16
          lg:h-20
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
            border-brand-cyan/25
          "
        />

        <div
          ref={signalFillRef}
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
            size-3
            -translate-x-1/2
            rounded-full
            bg-brand-cyan
            shadow-[0_0_0_6px_rgba(16,146,191,0.10),0_0_22px_rgba(16,146,191,0.45)]
            will-change-transform
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
        {/* SIGNAL TERMINAL */}

        <div
          ref={terminalRef}
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-0
            z-20
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
            shadow-[0_0_0_7px_rgba(16,146,191,0.10),0_0_25px_rgba(16,146,191,0.28)]
            will-change-transform
          "
        >
          <span
            className="
              size-2
              rounded-full
              bg-brand-cyan
            "
          />
        </div>

        {/* CTA CARD */}

        <div
          className="
            cta-card
            relative
            overflow-hidden
            rounded-[22px]
            bg-gradient-to-r
            from-brand-primary
            to-brand-navy
            px-5
            py-12
            text-center
            shadow-[0_18px_45px_rgba(0,45,51,0.18)]
            sm:px-6
            sm:py-14
            md:px-10
            lg:py-16
          "
        >
          {/* BACKGROUND GLOWS */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-20
              -top-20
              size-64
              rounded-full
              bg-brand-cyan/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-24
              -right-10
              size-64
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-56
              w-[420px]
              max-w-full
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-brand-cyan/10
              blur-[80px]
            "
          />

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-[760px]
            "
          >
            <h2
              className="
                cta-heading
                text-[34px]
                font-bold
                leading-tight
                tracking-[-0.04em]
                text-white
                sm:text-[38px]
                md:text-[44px]
                lg:text-[48px]
              "
            >
              Work with us
            </h2>

            <p
              className="
                cta-subtitle
                mt-4
                text-[13px]
                font-medium
                leading-6
                text-white/75
                sm:text-[14px]
                md:text-[15px]
              "
            >
              Let&apos;s build something amazing!
            </p>

            {/* BUTTONS */}

            <div
              className="
                mt-7
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
              "
            >
              <Link
                to="/contact/sales"
                className="
                  cta-primary
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
                  shadow-sm
                  transition-[transform,box-shadow]
                  duration-200
                  ease-out
                  motion-reduce:transition-none
                  hover:-translate-y-0.5
                  hover:shadow-md
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-navy
                  sm:w-auto
                "
              >
                Fill out the contact form

                <span aria-hidden="true">
                  →
                </span>
              </Link>

              <Link
                to="/contact"
                className="
                  cta-secondary
                  inline-flex
                  min-h-11
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  px-6
                  py-3
                  text-[12px]
                  font-semibold
                  text-brand-ink
                  shadow-sm
                  transition-[transform,box-shadow]
                  duration-200
                  ease-out
                  motion-reduce:transition-none
                  hover:-translate-y-0.5
                  hover:shadow-md
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-navy
                  sm:w-auto
                "
              >
                Reach out to us now...
              </Link>
            </div>

            <p
              className="
                cta-supporting
                mx-auto
                mt-9
                max-w-[560px]
                text-[10px]
                font-semibold
                uppercase
                leading-5
                tracking-[0.16em]
                text-white/50
                sm:mt-10
                sm:tracking-[0.18em]
              "
            >
              Join the list of our satisfied clients. You&apos;ll be in good
              company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;