import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

import unicreditLogo from "../../assets/logos/clients/client-logo-1.png";
import gcbLogo from "../../assets/logos/clients/client-logo-2.png";
import umbLogo from "../../assets/logos/clients/client-logo-3.png";
import enterpriseLogo from "../../assets/logos/clients/client-logo-5.png";
import transitionsLogo from "../../assets/logos/clients/client-logo-6.png";
import visualSoftwareLogo from "../../assets/logos/clients/client-logo-7.png";
import endsightLogo from "../../assets/logos/clients/client-logo-8.png";

const clients = [
  {
    name: "UniCredit",
    logo: unicreditLogo,
  },
  {
    name: "GCB Bank",
    logo: gcbLogo,
  },
  {
    name: "Universal Merchant Bank",
    logo: umbLogo,
  },
  {
    name: "UniCredit",
    logo: unicreditLogo,
  },
  {
    name: "Enterprise Life",
    logo: enterpriseLogo,
  },
  {
    name: "Transitions",
    logo: transitionsLogo,
  },
  {
    name: "Visual Software",
    logo: visualSoftwareLogo,
  },
  {
    name: "Endsight Consulting",
    logo: endsightLogo,
  },
];

const mobileSignalPath = `
  M195 0
  C195 85 150 125 160 200
  C170 275 230 315 220 390
  C210 465 165 515 175 590
  C185 645 210 680 195 710
`;

const tabletSignalPath = `
  M384 0
  C384 85 315 130 325 205
  C335 280 455 320 445 395
  C435 470 330 520 340 595
  C350 650 415 685 384 710
`;

const desktopSignalPath = `
  M610 0
  C610 90 535 130 500 205
  C465 285 525 345 610 375
  C700 410 760 475 720 545
  C680 615 630 670 610 710
`;

function TrustedBusinessesSignal({
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

function TrustedBusinessesSection() {
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
            ".trusted-businesses-heading",
          );

          const cards = gsap.utils.toArray(
            ".trusted-business-card",
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
                cards,
                ".trusted-business-image",
                ".trusted-business-rail",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                scaleX: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(".trusted-business-sheen", {
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
            y: mobile ? 40 : 32,
            autoAlpha: 0,
          });

          observeOnce(
            heading,
            () => {
              gsap.to(heading, {
                y: 0,
                autoAlpha: 1,
                duration: 0.75,
                ease: "power3.out",
              });
            },
            {
              threshold: 0.12,
              rootMargin: mobile
                ? "0px 0px -4% 0px"
                : "0px 0px -7% 0px",
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
              strokeDashoffset: desktop ? -145 : -120,
              duration: desktop ? 9 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              scale: mobile ? 0.92 : 0.84,
              autoAlpha: 1,
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
                    ? "bottom 32%"
                    : tablet
                      ? "bottom 16%"
                      : "bottom 8%",

                  scrub: desktop
                    ? 0.58
                    : tablet
                      ? 0.74
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
              const logo = card.querySelector(
                ".trusted-business-image",
              );

              const rail = card.querySelector(
                ".trusted-business-rail",
              );

              const sheen = card.querySelector(
                ".trusted-business-sheen",
              );

              const direction =
                tablet && index % 2 === 1 ? 1 : -1;

              gsap.set(card, {
                x: tablet ? direction * 18 : 0,
                y: mobile ? 44 : 34,
                scale: mobile ? 0.96 : 0.975,
                autoAlpha: 0,
              });

              gsap.set(logo, {
                y: 10,
                scale: mobile ? 0.8 : 0.86,
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
                  const delay = tablet
                    ? (index % 4) * 0.04
                    : (index % 2) * 0.04;

                  gsap
                    .timeline({
                      delay,
                      defaults: {
                        ease: "power3.out",
                      },
                    })
                    .to(card, {
                      x: 0,
                      y: 0,
                      scale: 1,
                      autoAlpha: 1,
                      duration: mobile ? 0.62 : 0.56,
                    })
                    .to(
                      rail,
                      {
                        scaleX: 1,
                        duration: 0.38,
                        ease: "power2.out",
                      },
                      "-=0.4",
                    )
                    .to(
                      logo,
                      {
                        y: 0,
                        scale: 1.08,
                        autoAlpha: 1,
                        duration: 0.36,
                        ease: "back.out(1.7)",
                      },
                      "-=0.34",
                    )
                    .to(
                      logo,
                      {
                        scale: 1,
                        duration: 0.16,
                      },
                      "-=0.08",
                    )
                    .to(
                      sheen,
                      {
                        xPercent: 140,
                        autoAlpha: 1,
                        duration: 0.65,
                        ease: "power2.inOut",
                      },
                      "-=0.38",
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
            const logo = card.querySelector(
              ".trusted-business-image",
            );

            const rail = card.querySelector(
              ".trusted-business-rail",
            );

            const sheen = card.querySelector(
              ".trusted-business-sheen",
            );

            const column = index % 4;

            const xOffset =
              column === 0
                ? -28
                : column === 1
                  ? -12
                  : column === 2
                    ? 12
                    : 28;

            gsap.set(card, {
              x: xOffset,
              y: 32,
              scale: 0.965,
              autoAlpha: 0.2,
            });

            gsap.set(logo, {
              y: 8,
              scale: 0.86,
              autoAlpha: 0.2,
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

          const logoStory = gsap.timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              end: "top 30%",
              scrub: 0.58,
              invalidateOnRefresh: true,
            },
          });

          const positions = [
            0.04,
            0.13,
            0.22,
            0.31,
            0.48,
            0.57,
            0.66,
            0.75,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const logo = card.querySelector(
              ".trusted-business-image",
            );

            const rail = card.querySelector(
              ".trusted-business-rail",
            );

            const sheen = card.querySelector(
              ".trusted-business-sheen",
            );

            logoStory.to(
              card,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                borderColor:
                  "rgba(23,109,140,0.18)",
                boxShadow:
                  "0 14px 32px rgba(15,35,55,0.07)",
                duration: 0.14,
                ease: "power2.out",
              },
              position,
            );

            logoStory.to(
              rail,
              {
                scaleX: 1,
                duration: 0.1,
                ease: "power2.out",
              },
              position + 0.01,
            );

            logoStory
              .to(
                logo,
                {
                  y: 0,
                  scale: 1.08,
                  autoAlpha: 1,
                  duration: 0.09,
                  ease: "back.out(1.6)",
                },
                position + 0.02,
              )
              .to(
                logo,
                {
                  scale: 1,
                  duration: 0.07,
                },
                position + 0.1,
              );

            logoStory
              .to(
                sheen,
                {
                  xPercent: 140,
                  autoAlpha: 1,
                  duration: 0.15,
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
                position + 0.16,
              );

            logoStory.to(
              card,
              {
                boxShadow:
                  "0 4px 16px rgba(15,35,55,0.025)",
                duration: 0.12,
              },
              position + 0.17,
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
          -left-40
          top-1/4
          size-80
          rounded-full
          bg-brand-cyan/[0.035]
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-[5%]
          size-80
          rounded-full
          bg-brand-primary/[0.035]
          blur-[100px]
        "
      />

      <TrustedBusinessesSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 710"
        filterId="trusted-businesses-mobile-glow"
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

      <TrustedBusinessesSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 710"
        filterId="trusted-businesses-tablet-glow"
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

      <TrustedBusinessesSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1220 710"
        filterId="trusted-businesses-desktop-glow"
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
              trusted-businesses-heading
              mx-auto
              max-w-[760px]
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
            <span className="md:block">
              Trusted by Leading Businesses in
            </span>{" "}
            <span className="md:block">
              Ghana &amp; Beyond
            </span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="
            mt-9
            grid
            grid-cols-2
            gap-3
            sm:mt-12
            sm:gap-4
            md:grid-cols-4
          "
        >
          {clients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="
                trusted-business-card
                group
                relative
                flex
                min-h-26
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-brand-border-light
                bg-brand-surface-blue
                px-4
                py-5
                shadow-[0_4px_16px_rgba(15,35,55,0.025)]
                transition-[transform,border-color,box-shadow,background-color]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/20
                hover:bg-white
                hover:shadow-[0_12px_30px_rgba(15,35,55,0.07)]
                sm:px-6
              "
            >
              <span
                aria-hidden="true"
                className="
                  trusted-business-rail
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
                  trusted-business-sheen
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  w-1/2
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-brand-cyan/[0.09]
                  to-transparent
                "
              />

              <img
                src={client.logo}
                alt={`${client.name} logo`}
                loading="lazy"
                decoding="async"
                className="
                  trusted-business-image
                  relative
                  z-10
                  max-h-13
                  max-w-[130px]
                  object-contain
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:scale-[1.04]
                  sm:max-w-[145px]
                  lg:max-w-[155px]
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBusinessesSection;