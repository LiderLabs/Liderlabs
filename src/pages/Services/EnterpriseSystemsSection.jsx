import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const services = [
  {
    number: "01",
    category: "Architecture",
    title: "Custom Enterprise Software",
    description:
      "Tailored ERP, mission-critical internal workflow automation engines, and distributed microservice architectures engineered for absolute fault tolerance and compliance.",
    points: [
      "Automated ledger & operational pipelines",
      "Distributed actor patterns & event logs",
      "Role-aware reporting and BI integration",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="9"
          width="12"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M9 9V7a3 3 0 0 1 6 0v2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    category: "Full-Stack Web",
    title: "Web & E-Commerce Platforms",
    description:
      "High-throughput consumer applications, multi-tenant digital commerce systems, headless architecture, and hyper-optimized customer self-service portals.",
    points: [
      "Sub-100ms dynamic page rendering",
      "Multi-currency & localized checkout",
      "Headless CMS architecture",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="5"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4 9h16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="7" cy="7" r=".7" fill="currentColor" />
        <circle cx="10" cy="7" r=".7" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "03",
    category: "Security Systems",
    title: "Infrastructure & Security",
    description:
      "Integrated physical security solutions designed to protect offices, facilities, assets, and personnel through intelligent surveillance and controlled access systems.",
    points: [
      "CCTV surveillance & remote monitoring",
      "Biometric and smart access control",
      "Security system installation & maintenance",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="M5 8h11l3 3-3 3H5V8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <circle
          cx="13"
          cy="11"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M8 14v3M6 18h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    category: "Automation",
    title: "Business Process Automation",
    description:
      "We streamline repetitive and complex business operations by connecting systems, automating workflows, and reducing manual processes across your organization.",
    points: [
      "Workflow and approval automation",
      "System integrations & data synchronization",
      "Automated reporting and notifications",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <circle
          cx="6"
          cy="6"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <circle
          cx="18"
          cy="6"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <circle
          cx="12"
          cy="18"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M8 6h8M7 8l4 8M17 8l-4 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "05",
    category: "Advisory",
    title: "Technology Consulting & Strategy",
    description:
      "High-level advisory for executive engineering leadership: comprehensive code audits, legacy decomposition roadmaps, cloud cost optimization, and governance.",
    points: [
      "Full architecture & security review",
      "Legacy monolith to microservice migration",
      "FinOps cloud billing reduction strategies",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="M12 3 19 8v8l-7 5-7-5V8l7-5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M9 12h6M12 9v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "06",
    category: "Connectivity",
    title: "Networking & Infrastructure",
    description:
      "Enterprise-grade network setups, SD-WAN interconnectivity, encrypted links, zero-trust secure access service edge, and fail-safe disaster recovery topologies.",
    points: [
      "Zero-Trust Network Access",
      "Low-latency edge caching setups",
      "Hot-standby site replication",
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="6"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <circle
          cx="6"
          cy="17"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <circle
          cx="18"
          cy="17"
          r="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="m11 8-4 7M13 8l4 7M8 17h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const mobileSignalPath = `
  M195 0
  C195 90 150 135 160 215
  C170 300 235 345 225 435
  C215 525 160 585 170 675
  C180 735 205 755 195 760
`;

const tabletSignalPath = `
  M384 0
  C384 90 315 135 325 220
  C335 305 455 350 445 440
  C435 530 325 585 340 675
  C350 735 405 755 384 760
`;

const desktopSignalPath = `
  M640 0
  C640 80 565 115 500 165
  C420 225 455 300 585 330
  C730 365 885 345 915 430
  C945 520 800 555 650 585
  C520 610 520 690 640 760
`;

function EnterpriseSignal({
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

function EnterpriseSystemsSection() {
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

          const kicker = section.querySelector(
            ".enterprise-kicker",
          );

          const heading = section.querySelector(
            ".enterprise-heading",
          );

          const introCopy = section.querySelector(
            ".enterprise-intro-copy",
          );

          const cards = gsap.utils.toArray(
            ".enterprise-service-card",
          );

          const observers = [];

          const observeOnce = (
            element,
            callback,
            options = {},
          ) => {
            if (!element) return;

            const observer =
              new IntersectionObserver(
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
                kicker,
                heading,
                introCopy,
                cards,
                ".enterprise-service-icon",
                ".enterprise-feature",
                ".enterprise-card-rail",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                scaleX: 1,
                rotate: 0,
                autoAlpha: 1,
              },
            );

            gsap.set(".enterprise-card-sheen", {
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

          gsap.set(kicker, {
            y: 14,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 34 : 30,
            autoAlpha: 0,
          });

          gsap.set(introCopy, {
            y: mobile ? 26 : 22,
            autoAlpha: 0,
          });

          observeOnce(
            kicker,
            () => {
              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(kicker, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.4,
                })
                .to(
                  heading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                  },
                  "-=0.2",
                )
                .to(
                  introCopy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.58,
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
              strokeDashoffset: desktop
                ? -150
                : -125,
              duration: desktop ? 9 : 7,
              repeat: -1,
              ease: "none",
            });

            gsap.set(signalDot, {
              autoAlpha: 1,
              scale: mobile ? 0.92 : 0.84,
              transformOrigin: "50% 50%",
            });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,

                  start: desktop
                    ? "top 74%"
                    : tablet
                      ? "top 88%"
                      : "top 92%",

                  end: desktop
                    ? "bottom 32%"
                    : tablet
                      ? "bottom 15%"
                      : "bottom 8%",

                  scrub: desktop
                    ? 0.58
                    : tablet
                      ? 0.78
                      : 0.68,

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
              const icon = card.querySelector(
                ".enterprise-service-icon",
              );

              const features = gsap.utils.toArray(
                ".enterprise-feature",
                card,
              );

              const rail = card.querySelector(
                ".enterprise-card-rail",
              );

              const sheen = card.querySelector(
                ".enterprise-card-sheen",
              );

              const number = card.querySelector(
                ".enterprise-service-number",
              );

              const direction =
                tablet && index % 2 === 1 ? 1 : -1;

              gsap.set(card, {
                x: tablet ? direction * 18 : 0,
                y: mobile ? 44 : 36,
                scale: mobile ? 0.965 : 0.975,
                autoAlpha: 0,
              });

              gsap.set(icon, {
                scale: 0.68,
                rotate: direction * -7,
                autoAlpha: 0,
              });

              gsap.set(number, {
                scale: 0.8,
                autoAlpha: 0.4,
              });

              gsap.set(features, {
                x: -12,
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
                  const timeline = gsap.timeline({
                    defaults: {
                      ease: "power3.out",
                    },
                  });

                  timeline
                    .to(card, {
                      x: 0,
                      y: 0,
                      scale: 1,
                      autoAlpha: 1,
                      duration: mobile ? 0.65 : 0.6,
                    })
                    .to(
                      number,
                      {
                        scale: 1.12,
                        autoAlpha: 1,
                        color: "#1092bf",
                        duration: 0.28,
                        ease: "back.out(1.8)",
                      },
                      "-=0.4",
                    )
                    .to(
                      number,
                      {
                        scale: 1,
                        duration: 0.15,
                      },
                      "-=0.08",
                    )
                    .to(
                      icon,
                      {
                        scale: 1.12,
                        rotate: 0,
                        autoAlpha: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)",
                      },
                      "-=0.38",
                    )
                    .to(
                      icon,
                      {
                        scale: 1,
                        duration: 0.18,
                      },
                      "-=0.08",
                    )
                    .to(
                      rail,
                      {
                        scaleX: 1,
                        duration: 0.42,
                        ease: "power2.out",
                      },
                      "-=0.38",
                    )
                    .to(
                      features,
                      {
                        x: 0,
                        autoAlpha: 1,
                        duration: 0.36,
                        stagger: 0.065,
                      },
                      "-=0.26",
                    )
                    .to(
                      sheen,
                      {
                        xPercent: 140,
                        autoAlpha: 1,
                        duration: 0.72,
                        ease: "power2.inOut",
                      },
                      "-=0.48",
                    )
                    .to(
                      sheen,
                      {
                        autoAlpha: 0,
                        duration: 0.18,
                      },
                      "-=0.16",
                    );
                },
                {
                  threshold: tablet ? 0.12 : 0.08,
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
            const column = index % 3;

            const xOffset =
              column === 0
                ? -30
                : column === 2
                  ? 30
                  : 0;

            const icon = card.querySelector(
              ".enterprise-service-icon",
            );

            const number = card.querySelector(
              ".enterprise-service-number",
            );

            const features = gsap.utils.toArray(
              ".enterprise-feature",
              card,
            );

            const rail = card.querySelector(
              ".enterprise-card-rail",
            );

            const sheen = card.querySelector(
              ".enterprise-card-sheen",
            );

            gsap.set(card, {
              x: xOffset,
              y: 42,
              scale: 0.965,
              autoAlpha: 0.25,
            });

            gsap.set(icon, {
              scale: 0.7,
              rotate: -6,
              autoAlpha: 0.2,
            });

            gsap.set(number, {
              scale: 0.9,
              color: "rgba(23,109,140,0.45)",
            });

            gsap.set(features, {
              x: -10,
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
          });

          const story = gsap.timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 78%",
              end: "bottom 38%",
              scrub: 0.62,
              invalidateOnRefresh: true,
            },
          });

          const positions = [
            0.05,
            0.17,
            0.29,
            0.5,
            0.62,
            0.74,
          ];

          cards.forEach((card, index) => {
            const position = positions[index];

            const icon = card.querySelector(
              ".enterprise-service-icon",
            );

            const number = card.querySelector(
              ".enterprise-service-number",
            );

            const features = gsap.utils.toArray(
              ".enterprise-feature",
              card,
            );

            const rail = card.querySelector(
              ".enterprise-card-rail",
            );

            const sheen = card.querySelector(
              ".enterprise-card-sheen",
            );

            story.to(
              card,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                borderColor:
                  "rgba(23,109,140,0.20)",
                boxShadow:
                  "0 16px 38px rgba(15,35,55,0.08)",
                duration: 0.14,
                ease: "power2.out",
              },
              position,
            );

            story
              .to(
                number,
                {
                  scale: 1.12,
                  color: "#1092bf",
                  duration: 0.07,
                  ease: "power2.out",
                },
                position + 0.01,
              )
              .to(
                number,
                {
                  scale: 1,
                  duration: 0.07,
                },
                position + 0.08,
              );

            story
              .to(
                icon,
                {
                  scale: 1.12,
                  rotate: 0,
                  autoAlpha: 1,
                  duration: 0.09,
                  ease: "back.out(1.7)",
                },
                position + 0.02,
              )
              .to(
                icon,
                {
                  scale: 1,
                  duration: 0.07,
                },
                position + 0.1,
              );

            story.to(
              rail,
              {
                scaleX: 1,
                duration: 0.12,
                ease: "power2.out",
              },
              position + 0.02,
            );

            story.to(
              features,
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.11,
                stagger: 0.025,
                ease: "power2.out",
              },
              position + 0.05,
            );

            story
              .to(
                sheen,
                {
                  xPercent: 140,
                  autoAlpha: 1,
                  duration: 0.16,
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
                position + 0.17,
              );

            story.to(
              card,
              {
                boxShadow:
                  "0 8px 28px rgba(15,35,55,0.06)",
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
      id="capabilities"
      className="
        relative
        scroll-mt-[90px]
        overflow-hidden
        bg-brand-surface
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
          top-24
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
          -right-28
          bottom-24
          size-80
          rounded-full
          bg-brand-primary/[0.035]
          blur-3xl
        "
      />

      <EnterpriseSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 760"
        filterId="enterprise-mobile-glow"
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

      <EnterpriseSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 760"
        filterId="enterprise-tablet-glow"
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

      <EnterpriseSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1280 760"
        filterId="enterprise-desktop-glow"
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

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div
          className="
            grid
            gap-5
            lg:grid-cols-[1fr_0.8fr]
            lg:items-end
            lg:gap-8
          "
        >
          <div>
            <p
              className="
                enterprise-kicker
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-brand-muted
              "
            >
              Specialized Disciplines
            </p>

            <h2
              className="
                enterprise-heading
                mt-3
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
              End-to-End Enterprise Systems
            </h2>
          </div>

          <p
            className="
              enterprise-intro-copy
              max-w-[540px]
              text-[13px]
              leading-6
              text-brand-muted
              md:text-[14px]
              lg:justify-self-end
            "
          >
            Modular, resilient, and built to scale under critical operational
            pressure. Explore how our technology teams help organizations build
            secure, connected, and efficient digital environments.
          </p>
        </div>

        <div
          ref={gridRef}
          className="
            mt-9
            grid
            gap-4
            sm:mt-10
            sm:gap-5
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {services.map((service) => (
            <article
              key={service.number}
              className="
                enterprise-service-card
                group
                relative
                flex
                min-h-80
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-brand-border-light
                bg-white
                p-5
                shadow-brand-card
                transition-[transform,border-color,box-shadow]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/20
                hover:shadow-[0_16px_38px_rgba(15,35,55,0.08)]
                sm:p-6
              "
            >
              <span
                aria-hidden="true"
                className="
                  enterprise-card-rail
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
                  enterprise-card-sheen
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  w-1/2
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-brand-cyan/[0.08]
                  to-transparent
                "
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="
                        enterprise-service-number
                        text-[10px]
                        font-bold
                        text-brand-primary
                      "
                    >
                      {service.number}
                    </span>

                    <span
                      className="
                        truncate
                        border-b
                        border-brand-cyan
                        pb-0.5
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-brand-muted
                      "
                    >
                      {service.category}
                    </span>
                  </div>

                  <div
                    className="
                      enterprise-service-icon
                      flex
                      size-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-brand-primary-light
                      text-brand-primary
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:scale-105
                    "
                  >
                    {service.icon}
                  </div>
                </div>

                <h3
                  className="
                    mt-5
                    text-[16px]
                    font-semibold
                    leading-6
                    tracking-[-0.02em]
                    text-brand-ink
                    sm:mt-6
                    md:text-[17px]
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-[12px]
                    leading-6
                    text-brand-muted
                    md:text-[13px]
                  "
                >
                  {service.description}
                </p>

                <ul className="mt-auto space-y-2.5 pt-6">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="
                        enterprise-feature
                        flex
                        items-start
                        gap-2.5
                        text-[11px]
                        leading-5
                        text-brand-muted
                        md:text-[12px]
                      "
                    >
                      <span
                        className="
                          mt-0.5
                          flex
                          size-[17px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-brand-primary-light
                        "
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 12 12"
                          fill="none"
                          className="size-2 text-brand-primary"
                        >
                          <path
                            d="M2.5 6.2 4.8 8.3 9.5 3.7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnterpriseSystemsSection;