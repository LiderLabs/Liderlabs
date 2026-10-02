import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

const mobileSignalPath = `
  M195 0
  C195 75 155 110 165 175
  C175 240 230 275 225 345
  C220 415 165 465 175 525
  C180 555 195 575 195 590
`;

const tabletSignalPath = `
  M384 0
  C384 75 325 115 335 180
  C345 245 435 280 425 350
  C415 420 330 470 340 530
  C345 560 370 580 384 590
`;

const desktopSignalPath = `
  M640 0
  C640 95 700 135 730 205
  C765 285 720 350 650 405
  C585 455 590 520 640 590
`;

function ServicesSignal({
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

function ServicesHeroSection() {
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

          const label = section.querySelector(
            ".services-hero-label",
          );

          const heading = section.querySelector(
            ".services-hero-heading",
          );

          const copy = section.querySelector(
            ".services-hero-copy",
          );

          const actions = section.querySelector(
            ".services-hero-actions",
          );

          const glowLeft = section.querySelector(
            ".services-hero-glow-left",
          );

          const glowRight = section.querySelector(
            ".services-hero-glow-right",
          );

          if (reduceMotion) {
            gsap.set(
              [
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
            y: mobile ? 18 : 14,
            scale: 0.95,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile
              ? 46
              : tablet
                ? 42
                : 38,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: mobile ? 28 : 24,
            autoAlpha: 0,
          });

          gsap.set(actions, {
            y: mobile ? 30 : 20,
            scale: mobile ? 0.96 : 0.98,
            autoAlpha: 0,
          });

          gsap.set(glowLeft, {
            x: mobile ? -24 : -35,
            y: mobile ? -8 : 0,
            scale: 0.8,
            autoAlpha: 0,
          });

          gsap.set(glowRight, {
            x: mobile ? 24 : 35,
            y: mobile ? 10 : 0,
            scale: 0.82,
            autoAlpha: 0,
          });

          const intro = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

          intro
            .to(
              glowLeft,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: mobile ? 1 : 1.3,
              },
              0,
            )
            .to(
              glowRight,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: mobile ? 1.05 : 1.4,
              },
              0.04,
            )
            .to(
              label,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.45,
              },
              0.1,
            )
            .to(
              heading,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile ? 0.78 : 0.85,
              },
              0.2,
            )
            .to(
              copy,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile ? 0.62 : 0.65,
              },
              0.42,
            )
            .to(
              actions,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: mobile ? 0.6 : 0.55,
              },
              0.55,
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
              strokeDashoffset: desktop
                ? -135
                : -110,
              duration: desktop ? 8 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 0,
              scale: mobile ? 0.9 : 0.82,
              transformOrigin: "50% 50%",
            });

            const signalDuration = mobile
              ? 2.25
              : tablet
                ? 2.45
                : 2.7;

            const signal = gsap.timeline({
              delay: mobile ? 0.28 : 0.45,
            });

            signal
              .to(signalDot, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.24,
                ease: "power2.out",
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

                  duration: signalDuration,
                  ease: "power1.inOut",
                },
                0,
              )
              .to(
                signalDot,
                {
                  scale: mobile ? 1.5 : 1.35,
                  duration: 0.1,
                  ease: "power2.out",
                },
                signalDuration - 0.25,
              )
              .to(
                signalDot,
                {
                  scale: 1,
                  duration: 0.14,
                  ease: "power2.inOut",
                },
                signalDuration - 0.15,
              );
          }

          gsap.to(glowLeft, {
            x: mobile ? 9 : 16,
            y: mobile ? 6 : 8,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(glowRight, {
            x: mobile ? -9 : -16,
            y: mobile ? -6 : -8,
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
      className="
        relative
        overflow-hidden
        bg-[linear-gradient(180deg,#eef8fb_0%,#f7fbfc_48%,#ffffff_100%)]
        px-4
        py-16
        sm:px-6
        sm:py-18
        md:px-8
        md:py-20
        lg:px-10
        lg:py-24
      "
    >
      <div
        aria-hidden="true"
        className="
          services-hero-glow-left
          pointer-events-none
          absolute
          -left-32
          top-8
          size-95
          rounded-full
          bg-brand-cyan/[0.065]
          blur-[95px]
        "
      />

      <div
        aria-hidden="true"
        className="
          services-hero-glow-right
          pointer-events-none
          absolute
          -right-30
          top-20
          size-105
          rounded-full
          bg-brand-primary/[0.055]
          blur-[110px]
        "
      />

      <ServicesSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 590"
        filterId="services-hero-mobile-glow"
        opacity={0.22}
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

      <ServicesSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 590"
        filterId="services-hero-tablet-glow"
        opacity={0.21}
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

      <ServicesSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1280 590"
        filterId="services-hero-desktop-glow"
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

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1000px]
          text-center
        "
      >
        {/* SERVICES LABEL */}

        <div
          className="
            services-hero-label
            inline-flex
            flex-col
            items-center
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
            Services &amp; Capabilities
          </span>

          <span
            aria-hidden="true"
            className="
              mt-2
              h-0.5
              w-24
              rounded-full
              bg-brand-cyan
              sm:w-28
            "
          />
        </div>

        <h1
          className="
            services-hero-heading
            mx-auto
            mt-5
            max-w-[900px]
            text-[38px]
            font-bold
            leading-[0.98]
            tracking-[-0.045em]
            text-brand-ink
            min-[390px]:text-[42px]
            sm:text-[46px]
            md:text-[52px]
            lg:text-[58px]
          "
        >
          Engineering Scalable Software
          <span className="block">
            &amp; Critical Digital Infrastructure.
          </span>
        </h1>

        <p
          className="
            services-hero-copy
            mx-auto
            mt-5
            max-w-[740px]
            text-[13px]
            leading-6
            text-brand-muted
            sm:mt-6
            sm:text-[14px]
            sm:leading-7
            md:text-[15px]
          "
        >
          We design, architect, and deploy resilient enterprise solutions—from
          high-throughput cloud platforms and national payment switch
          integrations to bespoke web systems tailored for Africa&apos;s most
          ambitious institutions.
        </p>

        <div
          className="
            services-hero-actions
            mt-7
            flex
            flex-col
            items-stretch
            justify-center
            gap-3
            min-[420px]:flex-row
            min-[420px]:flex-wrap
            min-[420px]:items-center
            sm:mt-8
          "
        >
          <Link
            to="/contact/sales"
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-full
              bg-brand-primary
              px-6
              py-3
              text-[12px]
              font-semibold
              text-white
              shadow-brand-button
              transition-[transform,background-color,box-shadow]
              duration-200
              hover:-translate-y-0.5
              hover:bg-brand-primary-dark
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-primary
              focus-visible:ring-offset-2
            "
          >
            Schedule a consultation
          </Link>

          <a
            href="#capabilities"
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              rounded-full
              bg-brand-primary
              px-6
              py-3
              text-[12px]
              font-semibold
              text-white
              shadow-brand-button
              transition-[transform,background-color,box-shadow]
              duration-200
              hover:-translate-y-0.5
              hover:bg-brand-primary-dark
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-primary
              focus-visible:ring-offset-2
            "
          >
            Explore Capabilities
          </a>
        </div>
      </div>
    </section>
  );
}

export default ServicesHeroSection;