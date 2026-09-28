import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

import unicreditLogo from "../../assets/logos/clients/client-logo-1.png";
import gcbLogo from "../../assets/logos/clients/client-logo-2.png";
import umbLogo from "../../assets/logos/clients/client-logo-3.png";
import enterpriseLogo from "../../assets/logos/clients/client-logo-5.png";
import transitionsLogo from "../../assets/logos/clients/client-logo-6.png";
import visualSoftwareLogo from "../../assets/logos/clients/client-logo-7.png";

const logos = [
  { name: "UniCredit", logo: unicreditLogo },
  { name: "GCB Bank", logo: gcbLogo },
  { name: "Universal Merchant Bank", logo: umbLogo },
  { name: "Transitions", logo: transitionsLogo },
  { name: "Visual Software", logo: visualSoftwareLogo },
  { name: "Enterprise Life", logo: enterpriseLogo },
];

const mobileSignalPath = `
  M195 0
  C195 70 155 110 165 175
  C175 245 230 280 225 350
  C220 420 165 470 175 530
  C180 560 195 580 195 590
`;

const tabletSignalPath = `
  M384 0
  C384 75 325 115 335 180
  C345 250 440 285 430 355
  C420 425 330 475 340 535
  C350 565 370 580 384 590
`;

const desktopSignalPath = `
  M640 0
  C640 85 710 120 735 195
  C765 280 700 345 630 405
  C575 455 595 525 640 590
`;

function ClientsSignal({
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
        opacity="0.03"
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

function ClientsHeroSection() {
  const sectionRef = useRef(null);

  const carouselViewportRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const carouselTweenRef = useRef(null);

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
            ".clients-hero-label",
          );

          const heading = section.querySelector(
            ".clients-hero-heading",
          );

          const copy = section.querySelector(
            ".clients-hero-copy",
          );

          const logoShell = section.querySelector(
            ".clients-hero-logo-shell",
          );

          const logoItems = gsap.utils.toArray(
            ".clients-hero-logo-item",
          );

          const glowLeft = section.querySelector(
            ".clients-hero-glow-left",
          );

          const glowRight = section.querySelector(
            ".clients-hero-glow-right",
          );

          if (reduceMotion) {
            gsap.set(
              [
                label,
                heading,
                copy,
                logoShell,
                logoItems,
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

            if (carouselTrackRef.current) {
              gsap.set(carouselTrackRef.current, {
                x: 0,
              });
            }

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
            y: mobile ? 48 : tablet ? 42 : 38,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: mobile ? 28 : 22,
            autoAlpha: 0,
          });

          gsap.set(logoShell, {
            y: mobile ? 38 : 30,
            scale: mobile ? 0.97 : 0.985,
            autoAlpha: 0,
          });

          gsap.set(logoItems, {
            y: mobile ? 18 : 14,
            scale: mobile ? 0.84 : 0.9,
            autoAlpha: 0,
          });

          gsap.set(glowLeft, {
            x: mobile ? -24 : -30,
            scale: 0.82,
            autoAlpha: 0,
          });

          gsap.set(glowRight, {
            x: mobile ? 24 : 30,
            scale: 0.82,
            autoAlpha: 0,
          });

          if (
            carouselViewportRef.current &&
            carouselTrackRef.current
          ) {
            carouselTweenRef.current = gsap.to(
              carouselTrackRef.current,
              {
                x: () => {
                  const viewport =
                    carouselViewportRef.current;

                  const track =
                    carouselTrackRef.current;

                  if (!viewport || !track) {
                    return 0;
                  }

                  const distance =
                    track.scrollWidth -
                    viewport.clientWidth;

                  return -Math.max(distance, 0);
                },

                duration: desktop ? 4.8 : 4.2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                repeatDelay: 0.3,
                repeatRefresh: true,
                paused: true,
              },
            );
          }

          const intro = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },

            onComplete: () => {
              carouselTweenRef.current?.play();
            },
          });

          intro
            .to(
              glowLeft,
              {
                x: 0,
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
                duration: 0.44,
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
                duration: mobile ? 0.6 : 0.62,
              },
              0.43,
            )
            .to(
              logoShell,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: mobile ? 0.66 : 0.62,
              },
              0.58,
            )
            .to(
              logoItems,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.42,
                stagger: mobile ? 0.06 : 0.07,
                ease: "back.out(1.35)",
              },
              0.7,
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
              strokeDashoffset: desktop ? -140 : -115,
              duration: desktop ? 8 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 0,
              scale: mobile ? 0.92 : 0.82,
              transformOrigin: "50% 50%",
            });

            const duration = mobile
              ? 2.25
              : tablet
                ? 2.45
                : 2.8;

            const signal = gsap.timeline({
              delay: mobile ? 0.3 : 0.45,
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

                  duration,
                  ease: "power1.inOut",
                },
                0,
              )
              .to(
                signalDot,
                {
                  scale: mobile ? 1.5 : 1.3,
                  duration: 0.1,
                  ease: "power2.out",
                },
                duration - 0.25,
              )
              .to(
                signalDot,
                {
                  scale: 1,
                  duration: 0.14,
                  ease: "power2.inOut",
                },
                duration - 0.15,
              );
          }

          gsap.to(glowLeft, {
            x: mobile ? 9 : 15,
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
        carouselTweenRef.current = null;
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  const pauseCarousel = () => {
    carouselTweenRef.current?.pause();
  };

  const resumeCarousel = () => {
    carouselTweenRef.current?.resume();
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[linear-gradient(180deg,#eef8fb_0%,#f8fbfc_55%,#ffffff_100%)]
        px-4
        pb-10
        pt-16
        sm:px-6
        sm:pt-20
        md:px-8
        lg:px-10
        lg:pb-12
        lg:pt-24
      "
    >
      <div
        aria-hidden="true"
        className="
          clients-hero-glow-left
          pointer-events-none
          absolute
          -left-[140px]
          top-5
          size-[390px]
          rounded-full
          bg-brand-cyan/[0.06]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          clients-hero-glow-right
          pointer-events-none
          absolute
          -right-[130px]
          top-20
          size-[420px]
          rounded-full
          bg-brand-primary/[0.05]
          blur-[110px]
        "
      />

      <ClientsSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 590"
        filterId="clients-hero-mobile-glow"
        opacity={0.21}
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

      <ClientsSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 590"
        filterId="clients-hero-tablet-glow"
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

      <ClientsSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1280 590"
        filterId="clients-hero-desktop-glow"
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
          lg:block
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1100px]
          text-center
        "
      >
        <div
          className="
            clients-hero-label
            inline-flex
            rounded-full
            border
            border-brand-border-light
            bg-white/85
            px-3
            py-1.5
          "
        >
          <span
            className="
              text-[10px]
              font-semibold
              text-brand-primary
            "
          >
            Clients
          </span>
        </div>

        <h1
          className="
            clients-hero-heading
            mx-auto
            mt-5
            max-w-[950px]
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
          <span className="md:hidden">
            The work, and the people who{" "}
            <span className="text-brand-primary">
              trusted us with it.
            </span>
          </span>

          <span className="hidden md:block">
            <span className="whitespace-nowrap">
              The work, and the people who
            </span>

            <span className="block text-brand-primary">
              trusted us with it.
            </span>
          </span>
        </h1>

        <p
          className="
            clients-hero-copy
            mx-auto
            mt-5
            max-w-[650px]
            text-[13px]
            leading-6
            text-brand-muted
            sm:mt-6
            sm:text-[14px]
            sm:leading-7
            md:text-[15px]
          "
        >
          From labs and law firms to catering and education, take a look at what
          we&apos;ve built for businesses and institutions across Ghana.
        </p>

        <div
          className="
            clients-hero-logo-shell
            mx-auto
            mt-8
            max-w-[920px]
            overflow-hidden
            rounded-xl
            border
            border-brand-border-light
            bg-white
            px-4
            py-6
            shadow-[0_4px_20px_rgba(15,35,55,0.025)]
            sm:mt-10
            sm:px-5
            sm:py-7
            md:px-7
          "
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                left-0
                top-0
                z-20
                w-10
                bg-gradient-to-r
                from-white
                to-transparent
                sm:w-14
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                right-0
                top-0
                z-20
                w-10
                bg-gradient-to-l
                from-white
                to-transparent
                sm:w-14
              "
            />

            <div
              ref={carouselViewportRef}
              className="overflow-hidden"
              onMouseEnter={pauseCarousel}
              onMouseLeave={resumeCarousel}
              onTouchStart={pauseCarousel}
              onTouchEnd={resumeCarousel}
              onFocusCapture={pauseCarousel}
              onBlurCapture={resumeCarousel}
            >
              <div
                ref={carouselTrackRef}
                className="
                  flex
                  w-max
                  items-center
                  gap-5
                  will-change-transform
                  sm:gap-6
                  md:gap-7
                "
              >
                {logos.map((client) => (
                  <div
                    key={client.name}
                    className="
                      clients-hero-logo-item
                      flex
                      min-h-14
                      min-w-35
                      shrink-0
                      items-center
                      justify-center
                      px-3
                      sm:min-w-40
                      lg:min-w-[175px]
                    "
                  >
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      decoding="async"
                      className="
                        max-h-10
                        max-w-[115px]
                        object-contain
                        transition-transform
                        duration-300
                        ease-out
                        hover:scale-[1.04]
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsHeroSection;