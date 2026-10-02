import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

import unicreditLogo from "../../assets/logos/clients/client-logo-1.png";
import gcbLogo from "../../assets/logos/clients/client-logo-2.png";
import umbLogo from "../../assets/logos/clients/client-logo-3.png";
import unicreditSecondLogo from "../../assets/logos/clients/client-logo-4.png";
import enterpriseLogo from "../../assets/logos/clients/client-logo-5.png";
import transitionsLogo from "../../assets/logos/clients/client-logo-6.png";
import visualSoftwareLogo from "../../assets/logos/clients/client-logo-7.png";
import endsightLogo from "../../assets/logos/clients/client-logo-8.png";

const clients = [
  { name: "UniCredit", logo: unicreditLogo },
  { name: "GCB Bank", logo: gcbLogo },
  { name: "Universal Merchant Bank", logo: umbLogo },
  { name: "UniCredit", logo: unicreditSecondLogo },
  { name: "Enterprise Life", logo: enterpriseLogo },
  { name: "Transitions", logo: transitionsLogo },
  { name: "Visual Software", logo: visualSoftwareLogo },
  { name: "Endsight Consulting", logo: endsightLogo },
];

const mobileSignalPath = `
  M195 0
  C195 80 155 120 165 190
  C175 260 230 300 220 375
  C210 450 165 500 175 575
  C185 630 210 665 195 690
`;

const tabletSignalPath = `
  M384 0
  C384 80 325 120 335 195
  C345 270 445 305 435 380
  C425 455 330 505 340 575
  C350 635 410 665 384 690
`;

const desktopSignalPath = `
  M610 0
  C610 95 535 145 500 220
  C465 295 515 350 610 380
  C705 410 740 475 690 545
  C660 590 625 625 610 690
`;

function EcosystemSignal({
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

      <g ref={dotRef} filter={`url(#${filterId})`}>
        <circle
          cx="0"
          cy="0"
          r="10"
          fill="currentColor"
          opacity="0.12"
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

function TrustedEcosystemSection() {
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

          const label = section.querySelector(".ecosystem-label");
          const heading = section.querySelector(".ecosystem-heading");
          const copy = section.querySelector(".ecosystem-copy");

          const cards = gsap.utils.toArray(".ecosystem-card");

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
                label,
                heading,
                copy,
                cards,
                ".ecosystem-logo",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
                autoAlpha: 1,
              },
            );

            gsap.set(".ecosystem-sheen", {
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

          gsap.set(label, {
            y: 12,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: desktop ? 30 : 26,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: 20,
            autoAlpha: 0,
          });

          observeOnce(
            label,
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
                  duration: 0.4,
                })
                .to(
                  heading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.68,
                  },
                  "-=0.2",
                )
                .to(
                  copy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.55,
                  },
                  "-=0.38",
                );
            },
            {
              threshold: mobile ? 0.08 : 0.12,
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
              strokeDashoffset: desktop ? -140 : -115,
              duration: desktop ? 9 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 1,
              scale: desktop ? 0.84 : 0.8,
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
                    ? "bottom 28%"
                    : tablet
                      ? "bottom 16%"
                      : "bottom 10%",

                  scrub: desktop
                    ? 0.58
                    : tablet
                      ? 0.8
                      : 0.7,

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
                  scale: desktop ? 1.3 : 1.14,
                  duration: 0.06,
                  ease: "power2.out",
                },
                0.91,
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
              const logo = card.querySelector(".ecosystem-logo");
              const sheen = card.querySelector(".ecosystem-sheen");

              gsap.set(card, {
                y: 26,
                scale: 0.97,
                autoAlpha: 0,
              });

              gsap.set(logo, {
                scale: 0.88,
                autoAlpha: 0,
              });

              gsap.set(sheen, {
                xPercent: -140,
                autoAlpha: 0,
              });

              observeOnce(
                card,
                () => {
                  const delay = tablet
                    ? (index % 4) * 0.045
                    : (index % 2) * 0.045;

                  gsap
                    .timeline({
                      delay,
                      defaults: {
                        ease: "power3.out",
                      },
                    })
                    .to(card, {
                      y: 0,
                      scale: 1,
                      autoAlpha: 1,
                      duration: 0.55,
                    })
                    .to(
                      logo,
                      {
                        scale: 1.06,
                        autoAlpha: 1,
                        duration: 0.35,
                        ease: "back.out(1.6)",
                      },
                      "-=0.34",
                    )
                    .to(
                      logo,
                      {
                        scale: 1,
                        duration: 0.18,
                      },
                      "-=0.08",
                    )
                    .to(
                      sheen,
                      {
                        xPercent: 140,
                        autoAlpha: 1,
                        duration: 0.68,
                        ease: "power2.inOut",
                      },
                      "-=0.36",
                    )
                    .to(
                      sheen,
                      {
                        autoAlpha: 0,
                        duration: 0.18,
                      },
                      "-=0.15",
                    );
                },
                {
                  threshold: tablet ? 0.14 : 0.08,
                  rootMargin: tablet
                    ? "0px 0px -6% 0px"
                    : "0px 0px -4% 0px",
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
            const logo = card.querySelector(".ecosystem-logo");
            const sheen = card.querySelector(".ecosystem-sheen");

            const column = index % 4;

            const xOffset =
              column === 0
                ? -24
                : column === 1
                  ? -10
                  : column === 2
                    ? 10
                    : 24;

            gsap.set(card, {
              x: xOffset,
              y: 30,
              scale: 0.97,
              autoAlpha: 0.24,
            });

            gsap.set(logo, {
              scale: 0.9,
              autoAlpha: 0.25,
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
              end: "top 32%",
              scrub: 0.52,
              invalidateOnRefresh: true,
            },
          });

          const positions = [
            0.04,
            0.13,
            0.22,
            0.31,
            0.46,
            0.55,
            0.64,
            0.73,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const logo = card.querySelector(".ecosystem-logo");
            const sheen = card.querySelector(".ecosystem-sheen");

            story.to(
              card,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                borderColor: "rgba(23,109,140,0.16)",
                boxShadow:
                  "0 14px 34px rgba(15,35,55,0.07)",
                duration: 0.13,
                ease: "power2.out",
              },
              position,
            );

            story
              .to(
                logo,
                {
                  scale: 1.08,
                  autoAlpha: 1,
                  duration: 0.08,
                  ease: "power2.out",
                },
                position + 0.01,
              )
              .to(
                logo,
                {
                  scale: 1,
                  duration: 0.07,
                  ease: "power2.inOut",
                },
                position + 0.09,
              );

            story
              .to(
                sheen,
                {
                  xPercent: 140,
                  autoAlpha: 1,
                  duration: 0.15,
                  ease: "power1.inOut",
                },
                position + 0.02,
              )
              .to(
                sheen,
                {
                  autoAlpha: 0,
                  duration: 0.06,
                },
                position + 0.15,
              );

            story.to(
              card,
              {
                boxShadow:
                  "0 0 0 rgba(15,35,55,0)",
                duration: 0.12,
              },
              position + 0.14,
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
          -left-24
          top-20
          size-72
          rounded-full
          bg-brand-cyan/[0.04]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-10
          size-72
          rounded-full
          bg-brand-primary/[0.04]
          blur-3xl
        "
      />

      <EcosystemSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 690"
        filterId="ecosystem-mobile-glow"
        opacity={0.16}
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

      <EcosystemSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 690"
        filterId="ecosystem-tablet-glow"
        opacity={0.17}
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

      <EcosystemSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1220 690"
        filterId="ecosystem-desktop-glow"
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

      <div className="relative z-10 mx-auto max-w-[1220px]">
        <div className="text-center">
         <div
  className="
    ecosystem-label
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
      text-brand-primary
    "
  >
    Trusted Ecosystem
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
              ecosystem-heading
              mx-auto
              mt-4
              max-w-[800px]
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
            Trusted by Leading Businesses in Ghana &amp; Beyond
          </h2>

          <p
            className="
              ecosystem-copy
              mx-auto
              mt-4
              max-w-[680px]
              text-[13px]
              leading-6
              text-brand-muted
              md:text-[14px]
            "
          >
            Powering the mission-critical backbones of industry titans and
            institutions.
          </p>
        </div>

        <div
          ref={gridRef}
          className="
            mt-9
            grid
            grid-cols-2
            gap-3
            sm:mt-10
            sm:gap-4
            md:grid-cols-4
          "
        >
          {clients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="
                ecosystem-card
                group
                relative
                flex
                min-h-[105px]
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-brand-border-light
                bg-brand-surface
                px-4
                py-5
                transition-[transform,border-color,box-shadow,background-color]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/15
                hover:bg-white
                hover:shadow-[0_12px_30px_rgba(15,35,55,0.06)]
                sm:px-6
              "
            >
              <div
                aria-hidden="true"
                className="
                  ecosystem-sheen
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
                  ecosystem-logo
                  relative
                  z-10
                  max-h-13.5
                  max-w-[135px]
                  object-contain
                  transition-transform
                  duration-300
                  ease-out
                  group-hover:scale-[1.03]
                  sm:max-w-[150px]
                  lg:max-w-[165px]
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedEcosystemSection;