import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

import heroImage from "../../assets/images/home-hero.jpg";

import gcbLogo from "../../assets/logos/clients/client-logo-2.png";
import umbLogo from "../../assets/logos/clients/client-logo-5.png";
import transitionsLogo from "../../assets/logos/clients/client-logo-6.png";

const trustedLogos = [
  {
    name: "GCB Bank",
    logo: gcbLogo,
  },
  {
    name: "Universal Merchant Bank",
    logo: umbLogo,
  },
  {
    name: "Transitions",
    logo: transitionsLogo,
  },
];

const desktopSignalPath = `
  M710 0
  C650 70 565 80 510 145
  C440 230 455 290 520 360
  C600 445 730 470 735 720
`;

const compactSignalPath = `
  M195 0
  C190 60 155 105 160 165
  C165 225 230 255 225 320
  C220 385 160 420 165 485
  C170 545 230 570 220 625
  C215 665 200 695 195 720
`;

function HeroSection() {
  const sectionRef = useRef(null);

  const desktopPathRef = useRef(null);
  const desktopDotRef = useRef(null);

  const compactPathRef = useRef(null);
  const compactDotRef = useRef(null);

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
            ".hero-heading",
          );

          const description = section.querySelector(
            ".hero-description",
          );

          const actions = gsap.utils.toArray(
            ".hero-action",
          );

          const trusted = gsap.utils.toArray(
            ".hero-trusted",
          );

          const background = section.querySelector(
            ".hero-background",
          );

          if (reduceMotion) {
            gsap.set(
              [
                heading,
                description,
                actions,
                trusted,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(background, {
              scale: 1,
            });

            gsap.set(
              [
                desktopDotRef.current,
                compactDotRef.current,
              ],
              {
                autoAlpha: 0,
              },
            );

            return;
          }

          const headingY = mobile
            ? 45
            : tablet
              ? 50
              : 58;

          const descriptionY = mobile
            ? 28
            : 32;

          const actionY = mobile
            ? 22
            : 28;

          const trustedY = mobile
            ? 18
            : 24;

          const backgroundScale = mobile
            ? 1.055
            : tablet
              ? 1.07
              : 1.08;

          gsap.set(background, {
            scale: backgroundScale,
          });

          gsap.set(heading, {
            y: headingY,
            autoAlpha: 0,
          });

          gsap.set(description, {
            y: descriptionY,
            autoAlpha: 0,
          });

          gsap.set(actions, {
            y: actionY,
            autoAlpha: 0,
          });

          gsap.set(trusted, {
            y: trustedY,
            autoAlpha: 0,
          });

          gsap
            .timeline({
              defaults: {
                ease: "power3.out",
              },
            })
            .to(
              background,
              {
                scale: 1,
                duration: mobile
                  ? 1.2
                  : tablet
                    ? 1.45
                    : 1.8,
                ease: "power2.out",
              },
              0,
            )
            .to(
              heading,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile
                  ? 0.82
                  : 1,
              },
              0.08,
            )
            .to(
              description,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile
                  ? 0.62
                  : 0.8,
              },
              mobile
                ? 0.3
                : 0.42,
            )
            .to(
              actions,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile
                  ? 0.55
                  : 0.7,
                stagger: mobile
                  ? 0.09
                  : 0.12,
              },
              mobile
                ? 0.48
                : 0.62,
            )
            .to(
              trusted,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile
                  ? 0.5
                  : 0.65,
                stagger: mobile
                  ? 0.065
                  : 0.08,
              },
              mobile
                ? 0.7
                : 0.88,
            );

          if (
            !desktop &&
            compactPathRef.current &&
            compactDotRef.current
          ) {
            gsap.to(
              compactPathRef.current,
              {
                strokeDashoffset: -100,
                duration: 7,
                repeat: -1,
                ease: "none",
              },
            );

            gsap.set(
              compactDotRef.current,
              {
                autoAlpha: 0,
                scale: 0.55,
                transformOrigin: "50% 50%",
              },
            );

            gsap
              .timeline({
                repeat: -1,
                repeatDelay: 0.8,
                delay: 0.55,
              })
              .set(
                compactDotRef.current,
                {
                  autoAlpha: 1,
                  scale: 0.7,
                },
              )
              .to(
                compactDotRef.current,
                {
                  scale: 1.15,
                  duration: 0.22,
                  ease: "power2.out",
                },
              )
              .to(
                compactDotRef.current,
                {
                  motionPath: {
                    path:
                      compactPathRef.current,
                    align:
                      compactPathRef.current,
                    alignOrigin: [0.5, 0.5],
                    start: 0,
                    end: 1,
                  },
                  duration: mobile
                    ? 3.6
                    : 4,
                  ease: "power1.inOut",
                },
                0,
              )
              .to(
                compactDotRef.current,
                {
                  autoAlpha: 0,
                  scale: 0.55,
                  duration: 0.28,
                },
                "-=0.12",
              );
          }

          if (
            desktop &&
            desktopPathRef.current &&
            desktopDotRef.current
          ) {
            gsap.to(
              desktopPathRef.current,
              {
                strokeDashoffset: -120,
                duration: 6,
                repeat: -1,
                ease: "none",
              },
            );

            gsap.set(
              desktopDotRef.current,
              {
                autoAlpha: 0,
                scale: 0.6,
                transformOrigin: "50% 50%",
              },
            );

            gsap
              .timeline({
                repeat: -1,
                repeatDelay: 0.7,
                delay: 0.8,
              })
              .set(
                desktopDotRef.current,
                {
                  autoAlpha: 1,
                  scale: 0.7,
                },
              )
              .to(
                desktopDotRef.current,
                {
                  scale: 1.25,
                  duration: 0.25,
                  ease: "power2.out",
                },
              )
              .to(
                desktopDotRef.current,
                {
                  motionPath: {
                    path:
                      desktopPathRef.current,
                    align:
                      desktopPathRef.current,
                    alignOrigin: [0.5, 0.5],
                    start: 0,
                    end: 1,
                  },
                  duration: 3.2,
                  ease: "power1.inOut",
                },
                0,
              )
              .to(
                desktopDotRef.current,
                {
                  autoAlpha: 0,
                  scale: 0.6,
                  duration: 0.3,
                },
                "-=0.15",
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
        min-h-[560px]
        overflow-hidden
        bg-brand-navy
        sm:min-h-[600px]
        lg:min-h-[620px]
      "
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="
          hero-background
          pointer-events-none
          absolute
          inset-0
          size-full
          object-cover
          object-[68%_center]
          min-[430px]:object-[66%_center]
          sm:object-[65%_center]
          lg:object-center
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(90deg,rgba(0,42,54,0.98)_0%,rgba(0,42,54,0.95)_58%,rgba(0,35,46,0.72)_100%)]
          sm:bg-[linear-gradient(90deg,rgba(0,42,54,0.99)_0%,rgba(0,42,54,0.96)_30%,rgba(0,45,58,0.82)_48%,rgba(0,45,58,0.46)_72%,rgba(0,30,40,0.12)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-brand-navy/45
          via-transparent
          to-transparent
        "
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 390 720"
        preserveAspectRatio="none"
        fill="none"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          block
          size-full
          overflow-visible
          text-brand-cyan
          lg:hidden
        "
      >
        <defs>
          <filter
            id="hero-compact-signal-glow"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
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
          d={compactSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="6 10"
          opacity="0.1"
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={compactPathRef}
          d={compactSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 10"
          strokeLinecap="round"
          opacity="0.68"
          vectorEffect="non-scaling-stroke"
        />

        <circle
          ref={compactDotRef}
          cx="0"
          cy="0"
          r="5"
          fill="currentColor"
          filter="url(#hero-compact-signal-glow)"
        />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        fill="none"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          hidden
          size-full
          overflow-visible
          text-brand-cyan
          lg:block
        "
      >
        <defs>
          <filter
            id="hero-desktop-signal-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
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
          d={desktopSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="7 12"
          opacity="0.12"
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={desktopPathRef}
          d={desktopSignalPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeDasharray="7 12"
          strokeLinecap="round"
          opacity="0.95"
          vectorEffect="non-scaling-stroke"
        />

        <circle
          ref={desktopDotRef}
          cx="0"
          cy="0"
          r="6"
          fill="currentColor"
          filter="url(#hero-desktop-signal-glow)"
        />
      </svg>

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[560px]
          max-w-[1360px]
          items-center
          px-5
          py-14
          min-[390px]:px-6
          sm:min-h-[600px]
          sm:py-16
          md:px-8
          lg:min-h-[620px]
          lg:px-10
        "
      >
        <div className="w-full max-w-[620px]">
          <h1
            className="
              hero-heading
              max-w-[600px]
              text-[40px]
              font-bold
              leading-[1]
              tracking-[-0.04em]
              text-white
              min-[390px]:text-[44px]
              sm:text-[52px]
              sm:leading-[0.98]
              md:text-[56px]
              lg:text-[60px]
            "
          >
            Building the{" "}
            <span className="text-brand-cyan">
              Future
            </span>{" "}
            of Software
          </h1>

          <p
            className="
              hero-description
              mt-5
              max-w-[570px]
              text-[13px]
              leading-6
              text-white/80
              min-[390px]:text-[14px]
              sm:mt-6
              md:text-[15px]
              md:leading-7
            "
          >
            We architect, design, and build sophisticated custom software, web
            platforms, and network infrastructure for forward-thinking
            enterprises across the continent and beyond.
          </p>

          <div
            className="
              mt-7
              flex
              w-full
              flex-col
              gap-3
              min-[420px]:w-auto
              min-[420px]:flex-row
              min-[420px]:flex-wrap
              min-[420px]:items-center
              sm:mt-8
            "
          >
            <Link
              to="/services"
              className="
                hero-action
                inline-flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-md
                bg-brand-cyan
                px-5
                py-3
                text-[13px]
                font-semibold
                text-white
                shadow-[0_8px_22px_rgba(0,0,0,0.18)]
                transition-[transform,background-color,box-shadow]
                duration-200
                ease-out
                motion-reduce:transition-none
                hover:-translate-y-0.5
                hover:bg-brand-primary
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-brand-navy
                min-[420px]:w-auto
              "
            >
              Explore Services
            </Link>

            <Link
              to="/contact"
              className="
                hero-action
                inline-flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-md
                border
                border-white/30
                bg-brand-navy/35
                px-5
                py-3
                text-[13px]
                font-semibold
                text-white
                backdrop-blur-sm
                transition-[transform,background-color,border-color]
                duration-200
                ease-out
                motion-reduce:transition-none
                hover:-translate-y-0.5
                hover:bg-white/10
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-brand-navy
                min-[420px]:w-auto
              "
            >
              Work with us
            </Link>
          </div>

          <div
            className="
              mt-10
              flex
              flex-col
              items-start
              gap-4
              sm:mt-12
              sm:flex-row
              sm:flex-wrap
              sm:items-center
              sm:gap-x-5
              sm:gap-y-3
            "
          >
            <p
              className="
                hero-trusted
                text-[11px]
                font-medium
                text-white/60
              "
            >
              Trusted by market leaders
            </p>

            <div
              className="
                flex
                max-w-full
                flex-wrap
                items-center
                gap-x-5
                gap-y-3
              "
            >
              {trustedLogos.map((company) => (
                <div
                  key={company.name}
                  className="
                    hero-trusted
                    flex
                    h-8
                    w-16
                    items-center
                    justify-center
                  "
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="
                      max-h-6
                      max-w-16
                      object-contain
                      opacity-90
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;