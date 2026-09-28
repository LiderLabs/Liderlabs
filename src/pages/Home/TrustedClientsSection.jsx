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
  { name: "UniCredit", logo: unicreditLogo },
  { name: "GCB Bank", logo: gcbLogo },
  { name: "Universal Merchant Bank", logo: umbLogo },
  { name: "UniCredit", logo: unicreditLogo },
  { name: "Enterprise Life", logo: enterpriseLogo },
  { name: "Transitions", logo: transitionsLogo },
  { name: "Visual Software", logo: visualSoftwareLogo },
  { name: "Endsight Consulting", logo: endsightLogo },
];

const mobileSignalPath = `
  M195 0
  C195 85 160 130 165 200
  C170 275 225 315 220 390
  C215 470 165 520 170 600
  C175 660 205 700 195 720
`;

const tabletSignalPath = `
  M384 0
  C384 85 330 135 335 210
  C340 290 430 330 425 410
  C420 495 335 540 340 620
  C345 675 395 705 384 720
`;

const desktopSignalPath = `
  M610 0
  C610 95 535 145 530 230
  C525 325 690 350 700 455
  C710 560 640 625 610 720
`;

function TrustedSignal({
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
        opacity="0.05"
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
          r="1.75"
          fill="white"
        />
      </g>
    </svg>
  );
}

function TrustedClientsSection() {
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

          const heading =
            section.querySelector(
              ".trusted-heading",
            );

          const cards =
            gsap.utils.toArray(
              ".trusted-client-card",
            );

          /*
           * REDUCED MOTION
           */

          if (reduceMotion) {
            gsap.set(heading, {
              y: 0,
              autoAlpha: 1,
            });

            gsap.set(cards, {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
            });

            gsap.set(
              ".trusted-client-logo",
              {
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

          /*
           * HEADING
           */

          gsap.fromTo(
            heading,
            {
              y: desktop ? 30 : 26,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: desktop
                ? 0.75
                : 0.65,
              ease: "power3.out",

              scrollTrigger: {
                trigger: heading,

                start: mobile
                  ? "top 94%"
                  : tablet
                    ? "top 90%"
                    : "top 84%",

                once: true,
                invalidateOnRefresh: true,
              },
            },
          );

          /*
           * MOBILE / TABLET CLIENT CARDS
           */

          if (!desktop) {
            cards.forEach((card, index) => {
              const logo =
                card.querySelector(
                  ".trusted-client-logo",
                );

              const direction =
                tablet
                  ? index % 2 === 0
                    ? -18
                    : 18
                  : 0;

              const cardTimeline =
                gsap.timeline({
                  scrollTrigger: {
                    trigger: card,

                    start: mobile
                      ? "top 94%"
                      : "top 91%",

                    once: true,

                    invalidateOnRefresh: true,
                  },
                });

              cardTimeline.fromTo(
                card,
                {
                  x: direction,
                  y: mobile ? 46 : 38,
                  scale: mobile
                    ? 0.96
                    : 0.975,
                  autoAlpha: 0,
                },
                {
                  x: 0,
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,

                  duration: mobile
                    ? 0.68
                    : 0.64,

                  ease: "power3.out",
                },
              );

              if (logo) {
                cardTimeline.fromTo(
                  logo,
                  {
                    y: 8,
                    scale: 0.88,
                    autoAlpha: 0,
                  },
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,

                    duration: 0.46,

                    ease: "back.out(1.55)",
                  },
                  "-=0.38",
                );
              }
            });
          }

          /*
           * DESKTOP CLIENT WAVE
           */

          if (desktop) {
            gsap.set(cards, {
              y: 34,
              scale: 0.97,
              autoAlpha: 0,
              transformOrigin: "50% 50%",
            });

            gsap.set(
              ".trusted-client-logo",
              {
                y: 8,
                scale: 0.9,
                autoAlpha: 0,
              },
            );

            const reveal =
              gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top 72%",
                  end: "top 30%",
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              });

            reveal.to(
              cards,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,

                duration: 0.5,

                stagger: {
                  each: 0.075,
                  from: "start",
                },

                ease: "power2.out",
              },
              0.1,
            );

            reveal.to(
              ".trusted-client-logo",
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,

                duration: 0.35,

                stagger: {
                  each: 0.075,
                  from: "start",
                },

                ease: "back.out(1.4)",
              },
              0.18,
            );
          }

          /*
           * RESPONSIVE SIGNAL
           */

          let signalPath = null;
          let signalDot = null;

          if (mobile) {
            signalPath =
              mobilePathRef.current;

            signalDot =
              mobileDotRef.current;
          }

          if (tablet) {
            signalPath =
              tabletPathRef.current;

            signalDot =
              tabletDotRef.current;
          }

          if (desktop) {
            signalPath =
              desktopPathRef.current;

            signalDot =
              desktopDotRef.current;
          }

          if (!signalPath || !signalDot) {
            return;
          }

          gsap.to(signalPath, {
            strokeDashoffset: desktop
              ? -140
              : -120,

            duration: desktop
              ? 8
              : 7,

            repeat: -1,

            ease: "none",
          });

          gsap.set(signalDot, {
            autoAlpha: 1,

            scale: desktop
              ? 0.85
              : 0.78,

            transformOrigin: "50% 50%",
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,

                start: mobile
                  ? "top 90%"
                  : tablet
                    ? "top 84%"
                    : "top 68%",

                end: mobile
                  ? "bottom 14%"
                  : tablet
                    ? "bottom 22%"
                    : "bottom 35%",

                scrub: mobile
                  ? 0.65
                  : tablet
                    ? 0.7
                    : 0.5,

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
                scale: desktop
                  ? 1.25
                  : 1.12,

                duration: 0.07,
              },
              0.9,
            )
            .to(
              signalDot,
              {
                scale: desktop
                  ? 0.9
                  : 0.82,

                duration: 0.08,
              },
              0.97,
            );
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
        lg:px-10
        lg:py-24
      "
    >
      <TrustedSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 720"
        filterId="trusted-mobile-signal-glow"
        opacity={0.28}
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

      <TrustedSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 720"
        filterId="trusted-tablet-signal-glow"
        opacity={0.3}
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

      <TrustedSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1220 720"
        filterId="trusted-desktop-signal-glow"
        opacity={0.3}
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
              trusted-heading
              mx-auto
              max-w-2xl
              text-[28px]
              font-bold
              leading-tight
              tracking-[-0.035em]
              text-brand-ink
              md:text-[32px]
              lg:text-[34px]
            "
          >
            Trusted by Leading Businesses in Ghana
          </h2>
        </div>

        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-3
            sm:mt-10
            sm:gap-4
            md:grid-cols-4
          "
        >
          {clients.map(
            (client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="
                  trusted-client-card
                  group
                  flex
                  min-h-24
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-brand-border-light
                  bg-white
                  px-4
                  py-4
                  shadow-[0_4px_16px_rgba(15,35,55,0.025)]
                  transition-[transform,border-color,box-shadow]
                  duration-300
                  motion-reduce:transition-none
                  hover:-translate-y-1
                  hover:border-brand-primary/15
                  hover:shadow-[0_12px_30px_rgba(15,35,55,0.07)]
                  sm:min-h-28
                  sm:px-5
                  md:px-4
                  lg:px-6
                "
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="
                    trusted-client-logo
                    max-h-12
                    max-w-28
                    object-contain
                    transition-transform
                    duration-300
                    motion-reduce:transition-none
                    group-hover:scale-[1.03]
                    sm:max-h-13
                    sm:max-w-36
                    lg:max-w-40
                  "
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default TrustedClientsSection;