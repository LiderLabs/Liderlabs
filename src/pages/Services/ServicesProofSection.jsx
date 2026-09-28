import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

import unicreditLogo from "../../assets/logos/clients/client-logo-1.png";
import gcbLogo from "../../assets/logos/clients/client-logo-2.png";
import umbLogo from "../../assets/logos/clients/client-logo-3.png";
import unicreditSecondLogo from "../../assets/logos/clients/client-logo-4.png";
import enterpriseLogo from "../../assets/logos/clients/client-logo-5.png";
import transitionsLogo from "../../assets/logos/clients/client-logo-6.png";
import visualSoftwareLogo from "../../assets/logos/clients/client-logo-7.png";
import endsightLogo from "../../assets/logos/clients/client-logo-8.png";

const metrics = [
  {
    value: 10,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    value: 45,
    suffix: "+",
    label: "Projects Hours",
  },
];

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
  C195 85 150 125 160 200
  C170 275 230 315 220 395
  C210 475 165 525 175 605
  C185 680 210 730 195 760
`;

const tabletSignalPath = `
  M384 0
  C384 85 315 130 325 205
  C335 280 450 320 440 400
  C430 480 325 530 340 610
  C350 685 410 730 384 760
`;

const desktopSignalPath = `
  M640 0
  C640 90 565 130 520 205
  C470 290 550 355 650 390
  C760 430 805 505 745 575
  C700 625 660 675 640 760
`;

function ProofSignal({
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
          r="11"
          fill="currentColor"
          opacity="0.13"
        />

        <circle cx="0" cy="0" r="5" fill="currentColor" />

        <circle cx="0" cy="0" r="1.8" fill="white" />
      </g>
    </svg>
  );
}

function ServicesProofSection() {
  const sectionRef = useRef(null);
  const metricsRef = useRef(null);
  const clientsRef = useRef(null);
  const logoGridRef = useRef(null);

  const mobilePathRef = useRef(null);
  const mobileDotRef = useRef(null);

  const tabletPathRef = useRef(null);
  const tabletDotRef = useRef(null);

  const desktopPathRef = useRef(null);
  const desktopDotRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const metricsSection = metricsRef.current;

      if (!section || !metricsSection) return;

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

          const metricCards = gsap.utils.toArray(
            ".services-proof-metric",
          );

          const metricValues = gsap.utils.toArray(
            ".services-proof-value",
          );

          const metricLabels = gsap.utils.toArray(
            ".services-proof-metric-label",
          );

          const heading = section.querySelector(
            ".services-proof-heading",
          );

          const copy = section.querySelector(
            ".services-proof-copy",
          );

          const caseStudyLink = section.querySelector(
            ".services-proof-link",
          );

          const logoCards = gsap.utils.toArray(
            ".services-proof-logo-card",
          );

          const rafIds = new Set();
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

          const setFinalMetricValues = () => {
            metricValues.forEach((element, index) => {
              const metric = metrics[index];

              if (!element || !metric) return;

              element.textContent = `${metric.value}${metric.suffix}`;
            });
          };

          if (reduceMotion) {
            gsap.set(
              [
                metricCards,
                metricValues,
                metricLabels,
                heading,
                copy,
                caseStudyLink,
                logoCards,
                ".services-proof-logo",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            gsap.set(".services-proof-logo-sheen", {
              autoAlpha: 0,
            });

            setFinalMetricValues();

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

          metricCards.forEach((card, index) => {
            gsap.set(card, {
              y: mobile ? 30 : 24,
              scale: mobile ? 0.97 : 1,
              autoAlpha: 0,
            });

            gsap.set(metricValues[index], {
              scale: 0.82,
              autoAlpha: 0,
            });

            gsap.set(metricLabels[index], {
              y: 10,
              autoAlpha: 0,
            });

            if (metricValues[index]) {
              metricValues[index].textContent =
                `0${metrics[index].suffix}`;
            }
          });

          observeOnce(
            metricsSection,
            () => {
              const metricTimeline = gsap.timeline({
                defaults: {
                  ease: "power3.out",
                },
              });

              metricTimeline
                .to(metricCards, {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: mobile ? 0.58 : 0.52,
                  stagger: mobile ? 0.1 : 0.08,
                })
                .to(
                  metricValues,
                  {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.42,
                    stagger: 0.08,
                    ease: "back.out(1.55)",
                  },
                  0.08,
                )
                .to(
                  metricLabels,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.38,
                    stagger: 0.08,
                    ease: "power2.out",
                  },
                  0.14,
                );

              metrics.forEach((metric, index) => {
                const element = metricValues[index];

                if (!element) return;

                const delay = index * 90;

                const timeoutId = window.setTimeout(() => {
                  const start = performance.now();

                  const duration =
                    metric.value >= 90
                      ? 1500
                      : 1250;

                  const update = (now) => {
                    const progress = Math.min(
                      (now - start) / duration,
                      1,
                    );

                    const eased =
                      1 - Math.pow(1 - progress, 3);

                    const current = Math.round(
                      metric.value * eased,
                    );

                    element.textContent =
                      `${current}${metric.suffix}`;

                    if (progress < 1) {
                      const rafId =
                        requestAnimationFrame(update);

                      rafIds.add(rafId);
                    } else {
                      element.textContent =
                        `${metric.value}${metric.suffix}`;
                    }
                  };

                  const rafId =
                    requestAnimationFrame(update);

                  rafIds.add(rafId);
                }, delay);

                rafIds.add(timeoutId);
              });
            },
            {
              threshold: mobile ? 0.14 : 0.2,
              rootMargin: mobile
                ? "0px 0px -4% 0px"
                : "0px 0px -8% 0px",
            },
          );

          gsap.set(heading, {
            y: mobile ? 36 : 30,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: mobile ? 24 : 20,
            autoAlpha: 0,
          });

          gsap.set(caseStudyLink, {
            y: 14,
            autoAlpha: 0,
          });

          observeOnce(
            clientsRef.current,
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
                  duration: 0.68,
                })
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
                  trigger: clientsRef.current,

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
            logoCards.forEach((card, index) => {
              const logo = card.querySelector(
                ".services-proof-logo",
              );

              const sheen = card.querySelector(
                ".services-proof-logo-sheen",
              );

              gsap.set(card, {
                y: mobile ? 36 : 28,
                scale: mobile ? 0.965 : 0.975,
                autoAlpha: 0,
              });

              gsap.set(logo, {
                scale: 0.84,
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
                    : (index % 2) * 0.05;

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
                      duration: mobile ? 0.6 : 0.55,
                    })
                    .to(
                      logo,
                      {
                        scale: 1.1,
                        autoAlpha: 1,
                        duration: 0.34,
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
                        duration: 0.68,
                        ease: "power2.inOut",
                      },
                      "-=0.34",
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
                    : "0px 0px -3% 0px",
                },
              );
            });

            observeOnce(
              caseStudyLink,
              () => {
                gsap.to(caseStudyLink, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.45,
                  ease: "power3.out",
                });
              },
              {
                threshold: 0.4,
              },
            );

            return () => {
              observers.forEach((observer) => {
                observer.disconnect();
              });

              rafIds.forEach((id) => {
                cancelAnimationFrame(id);
                clearTimeout(id);
              });
            };
          }

          logoCards.forEach((card, index) => {
            const logo = card.querySelector(
              ".services-proof-logo",
            );

            const sheen = card.querySelector(
              ".services-proof-logo-sheen",
            );

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
              autoAlpha: 0.22,
            });

            gsap.set(logo, {
              scale: 0.9,
              autoAlpha: 0.24,
            });

            gsap.set(sheen, {
              xPercent: -140,
              autoAlpha: 0,
            });
          });

          const logoStory = gsap.timeline({
            scrollTrigger: {
              trigger: logoGridRef.current,
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

          logoCards.forEach((card, index) => {
            const position = positions[index];

            const logo = card.querySelector(
              ".services-proof-logo",
            );

            const sheen = card.querySelector(
              ".services-proof-logo-sheen",
            );

            logoStory.to(
              card,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                borderColor:
                  "rgba(23,109,140,0.16)",
                boxShadow:
                  "0 14px 34px rgba(15,35,55,0.07)",
                duration: 0.13,
                ease: "power2.out",
              },
              position,
            );

            logoStory
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
                },
                position + 0.09,
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

            logoStory.to(
              card,
              {
                boxShadow:
                  "0 0 0 rgba(15,35,55,0)",
                duration: 0.12,
              },
              position + 0.14,
            );
          });

          logoStory.to(
            caseStudyLink,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.15,
              ease: "power2.out",
            },
            0.82,
          );

          return () => {
            observers.forEach((observer) => {
              observer.disconnect();
            });

            rafIds.forEach((id) => {
              cancelAnimationFrame(id);
              clearTimeout(id);
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
      className="relative overflow-hidden bg-white"
    >
      <div
        ref={metricsRef}
        className="
          border-y
          border-brand-border-light
          bg-white
          px-4
          py-9
          sm:px-6
          sm:py-10
          md:px-8
          lg:px-10
          lg:py-12
        "
      >
        <div className="mx-auto max-w-[1220px]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {metrics.map((metric, index) => {
              const isLeftColumn = index % 2 === 0;
              const isFirstRow = index < 2;
              const isLastDesktop =
                index === metrics.length - 1;

              return (
                <div
                  key={metric.label}
                  className={[
                    `
                      services-proof-metric
                      flex
                      min-h-32
                      flex-col
                      items-center
                      justify-center
                      px-3
                      py-6
                      text-center
                      sm:px-4
                    `,
                    isLeftColumn
                      ? "border-r border-brand-border-light"
                      : "",
                    isFirstRow
                      ? "border-b border-brand-border-light md:border-b-0"
                      : "",
                    !isLastDesktop
                      ? "md:border-r md:border-brand-border-light"
                      : "md:border-r-0",
                  ].join(" ")}
                >
                  <p
                    className="
                      services-proof-value
                      text-[38px]
                      font-bold
                      leading-none
                      tracking-[-0.045em]
                      text-brand-ink
                      sm:text-[40px]
                      md:text-[46px]
                      lg:text-[48px]
                    "
                  >
                    {metric.value}
                    {metric.suffix}
                  </p>

                  <p
                    className="
                      services-proof-metric-label
                      mt-3
                      max-w-32
                      text-[10px]
                      font-semibold
                      uppercase
                      leading-4
                      tracking-[0.14em]
                      text-brand-muted
                      md:text-[11px]
                    "
                  >
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={clientsRef}
        className="
          relative
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
            bg-brand-cyan/[0.035]
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-24
            bottom-12
            size-72
            rounded-full
            bg-brand-primary/[0.035]
            blur-3xl
          "
        />

        <ProofSignal
          path={mobileSignalPath}
          pathRef={mobilePathRef}
          dotRef={mobileDotRef}
          viewBox="0 0 390 760"
          filterId="services-proof-mobile-glow"
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

        <ProofSignal
          path={tabletSignalPath}
          pathRef={tabletPathRef}
          dotRef={tabletDotRef}
          viewBox="0 0 768 760"
          filterId="services-proof-tablet-glow"
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

        <ProofSignal
          path={desktopSignalPath}
          pathRef={desktopPathRef}
          dotRef={desktopDotRef}
          viewBox="0 0 1280 760"
          filterId="services-proof-desktop-glow"
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
            lg:block
          "
        />

        <div className="relative z-10 mx-auto max-w-[1220px]">
          <div className="text-center">
            <h2
              className="
                services-proof-heading
                mx-auto
                max-w-[780px]
                text-[30px]
                font-bold
                leading-[1.05]
                tracking-[-0.04em]
                text-brand-ink
                sm:text-[32px]
                md:text-[36px]
                lg:text-[38px]
              "
            >
              <span className="md:block">
                Trusted by Leading Businesses in Ghana &amp;
              </span>{" "}
              <span className="md:block">
                Beyond
              </span>
            </h2>

            <p
              className="
                services-proof-copy
                mx-auto
                mt-4
                max-w-[640px]
                text-[13px]
                leading-6
                text-brand-muted
                md:text-[14px]
              "
            >
              Powering transactional reliability for banks, telcos, and more
              businesses.
            </p>
          </div>

          <div
            ref={logoGridRef}
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
                  services-proof-logo-card
                  group
                  relative
                  flex
                  min-h-25
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-brand-border-light
                  bg-brand-surface-blue
                  px-4
                  py-5
                  transition-[transform,border-color,box-shadow,background-color]
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:border-brand-primary/15
                  hover:bg-white
                  hover:shadow-[0_12px_30px_rgba(15,35,55,0.06)]
                  sm:px-5
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    services-proof-logo-sheen
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
                    services-proof-logo
                    relative
                    z-10
                    max-h-13
                    max-w-[130px]
                    object-contain
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-[1.03]
                    sm:max-w-[145px]
                    lg:max-w-[155px]
                  "
                />
              </div>
            ))}
          </div>

          <div
            className="
              services-proof-link
              mt-8
              flex
              justify-center
            "
          >
            <Link
              to="/clients"
              className="
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-full
                px-3
                text-[12px]
                font-semibold
                text-brand-primary
                transition-colors
                duration-200
                hover:text-brand-primary-dark
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-primary
                focus-visible:ring-offset-4
              "
            >
              Explore client case studies
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesProofSection;