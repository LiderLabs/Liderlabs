import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

function CareersCTASection() {
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

          const card = section.querySelector(".careers-card");
          const label = section.querySelector(".careers-label");
          const heading = section.querySelector(".careers-heading");
          const copy = section.querySelector(".careers-copy");
          const actions = section.querySelector(".careers-actions");
          const glowLeft = section.querySelector(".careers-glow-left");
          const glowRight = section.querySelector(".careers-glow-right");

          if (reduceMotion) {
            gsap.set(
              [
                card,
                label,
                heading,
                copy,
                actions,
                glowLeft,
                glowRight,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(signalFillRef.current, {
              scaleY: 1,
            });

            gsap.set(terminalRef.current, {
              scale: 1,
              autoAlpha: 1,
            });

            gsap.set(signalDotRef.current, {
              autoAlpha: 0,
            });

            return;
          }

          gsap.set(card, {
            y: mobile ? 42 : 36,
            scale: mobile ? 0.965 : 0.98,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });

          gsap.set(label, {
            y: 14,
            scale: 0.95,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 34 : 28,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: 22,
            autoAlpha: 0,
          });

          gsap.set(actions, {
            y: 22,
            scale: 0.97,
            autoAlpha: 0,
          });

          gsap.set(glowLeft, {
            x: -20,
            scale: 0.8,
            autoAlpha: 0,
          });

          gsap.set(glowRight, {
            x: 20,
            scale: 0.82,
            autoAlpha: 0,
          });

          gsap.set(signalDotRef.current, {
            y: 0,
            scale: mobile ? 0.95 : 0.86,
            autoAlpha: 1,
            transformOrigin: "50% 50%",
          });

          gsap.set(signalFillRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });

          gsap.set(terminalRef.current, {
            scale: 0.45,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });

          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: section,

              start: mobile
                ? "top 82%"
                : tablet
                  ? "top 74%"
                  : "top 66%",

              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },

            defaults: {
              ease: "power3.out",
            },
          });

          reveal
            .to(
              glowLeft,
              {
                x: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.9,
              },
              0,
            )
            .to(
              glowRight,
              {
                x: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1,
              },
              0,
            )
            .to(
              card,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: mobile ? 0.68 : 0.72,
              },
              0.05,
            )
            .to(
              label,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.42,
              },
              0.22,
            )
            .to(
              heading,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile ? 0.64 : 0.68,
              },
              0.3,
            )
            .to(
              copy,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.54,
              },
              0.42,
            )
            .to(
              actions,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.48,
              },
              0.5,
            );

          const signalDistance = desktop
            ? 96
            : tablet
              ? 80
              : 64;

          const signal = gsap.timeline({
            scrollTrigger: {
              trigger: section,

              start: mobile
                ? "top 91%"
                : tablet
                  ? "top 84%"
                  : "top 76%",

              end: mobile
                ? "top 64%"
                : tablet
                  ? "top 56%"
                  : "top 40%",

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
              signalDotRef.current,
              {
                y: signalDistance,
                duration: 0.7,
                ease: "none",
              },
              0,
            )
            .to(
              signalFillRef.current,
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
                scale: mobile ? 1.65 : 1.45,
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
              0.74,
            )
            .to(
              terminalRef.current,
              {
                scale: mobile ? 1.55 : 1.38,
                duration: 0.08,
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
                scale: 0.6,
                autoAlpha: 0,
                duration: 0.08,
              },
              0.91,
            );

          gsap.to(glowLeft, {
            x: mobile ? 8 : 14,
            y: mobile ? 5 : 8,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(glowRight, {
            x: mobile ? -8 : -14,
            y: mobile ? -5 : -8,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
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
      id="careers"
      className="
        relative
        scroll-mt-[90px]
        overflow-hidden
        bg-white
        px-4
        pb-14
        pt-16
        sm:px-6
        sm:pb-16
        sm:pt-20
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
            size-3.5
            -translate-x-1/2
            rounded-full
            bg-brand-cyan
            shadow-[0_0_0_7px_rgba(16,146,191,0.12),0_0_24px_rgba(16,146,191,0.48)]
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

      <div className="relative z-10 mx-auto max-w-[1180px]">
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
            shadow-[0_0_0_7px_rgba(16,146,191,0.10),0_0_26px_rgba(16,146,191,0.30)]
          "
        >
          <span className="size-2 rounded-full bg-brand-cyan" />
        </div>

        <div
          className="
            careers-card
            relative
            overflow-hidden
            rounded-[24px]
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
            lg:px-14
            lg:py-16
          "
        >
          <div
            aria-hidden="true"
            className="
              careers-glow-left
              pointer-events-none
              absolute
              -left-20
              -top-20
              size-64
              rounded-full
              bg-brand-cyan/12
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              careers-glow-right
              pointer-events-none
              absolute
              -bottom-24
              -right-16
              size-72
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

          <div className="relative z-10 mx-auto max-w-[780px]">
           <div
  className="
    careers-label
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
      text-white/75
    "
  >
    Careers at Lider
  </span>

  <span
    aria-hidden="true"
    className="
      mt-2
      h-0.5
      w-24
      rounded-full
      bg-brand-cyan
      sm:w-40
    "
  />
          </div>

            <h2
              className="
                careers-heading
                mx-auto
                mt-5
                max-w-[700px]
                text-[32px]
                font-bold
                leading-[1.02]
                tracking-[-0.04em]
                text-white
                min-[390px]:text-[34px]
                sm:text-[38px]
                md:text-[42px]
                lg:text-[44px]
              "
            >
              Join Our Team: Build the Future With Us
            </h2>

            <p
              className="
                careers-copy
                mx-auto
                mt-5
                max-w-[660px]
                text-[13px]
                leading-6
                text-white/75
                md:text-[14px]
              "
            >
              We are always looking for visionary engineers, system architects,
              and designers to build transformative digital infrastructure
              across the continent.
            </p>

            <div
              className="
                careers-actions
                mt-8
                flex
                flex-col
                items-stretch
                justify-center
                gap-3
                min-[420px]:flex-row
                min-[420px]:flex-wrap
                min-[420px]:items-center
              "
            >
              <Link
                to="/contact"
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-brand-navy
                  px-6
                  py-3
                  text-[12px]
                  font-semibold
                  text-white
                  transition-[transform,box-shadow]
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-primary
                "
              >
                View Open Positions
                {/* <span aria-hidden="true">→</span> */}
              </Link>

              <Link
                to="/contact"
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/25
                  bg-white/10
                  px-6
                  py-3
                  text-[12px]
                  font-semibold
                  text-white
                  transition-[transform,background-color]
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-white/15
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-primary
                "
              >
                Send Open Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersCTASection;