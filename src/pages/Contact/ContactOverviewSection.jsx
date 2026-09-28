import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

const contactDetails = [
  {
    label: "Offices",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <circle
          cx="12"
          cy="10"
          r="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
    content: (
      <span>
        UQ122 University Farm Road Adjiringanor School Junction
      </span>
    ),
  },
  {
    label: "Phone",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 4h3l1.5 4-2 1.5a14 14 0 0 0 5 5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 7c0-1.1.9-2 2-2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
    content: (
      <a
        href="tel:+233552887039"
        className="
          transition-colors
          duration-200
          hover:text-brand-primary
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-brand-primary
          focus-visible:ring-offset-2
        "
      >
        +233 55 288 7039
      </a>
    ),
  },
  {
    label: "Email",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="6"
          width="16"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="m5 8 7 5 7-5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    content: (
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        <a
          href="mailto:hello@liderlabs.com"
          className="
            transition-colors
            duration-200
            hover:text-brand-primary
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-primary
            focus-visible:ring-offset-2
          "
        >
          hello@liderlabs.com
        </a>

        <span className="text-brand-border">·</span>

        <a
          href="mailto:support@liderlabs.com"
          className="
            transition-colors
            duration-200
            hover:text-brand-primary
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-primary
            focus-visible:ring-offset-2
          "
        >
          support@liderlabs.com
        </a>
      </div>
    ),
  },
  {
    label: "Hours",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M12 8v4l3 2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    content: <span>Mon – Fri: 8:30 AM – 5:30 PM GMT</span>,
  },
];

const contactStats = [
  {
    value: 99.9,
    decimals: 1,
    suffix: "%",
    label: "SLA Guarantee",
  },
  {
    value: 2,
    decimals: 0,
    suffix: " hrs",
    label: "Median First Response",
  },
  {
    value: 20,
    decimals: 0,
    suffix: "+",
    label: "Senior Engineers",
  },
];

function ContactOverviewSection() {
  const sectionRef = useRef(null);
  const animationFramesRef = useRef(new Set());

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
            ".contact-overview-label",
          );

          const heading = section.querySelector(
            ".contact-overview-heading",
          );

          const introCopy = section.querySelector(
            ".contact-overview-copy",
          );

          const subheading = section.querySelector(
            ".contact-overview-subheading",
          );

          const detailRows = gsap.utils.toArray(
            ".contact-detail-row",
          );

          const responseBadges = gsap.utils.toArray(
            ".contact-response-badge",
          );

          const actionCards = gsap.utils.toArray(
            ".contact-action-card",
          );

          const dispatch = section.querySelector(
            ".contact-dispatch",
          );

          const statCards = gsap.utils.toArray(
            ".contact-stat",
          );

          const statValues = gsap.utils.toArray(
            ".contact-stat-value",
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

          const requestFrame = (callback) => {
            const frameId = requestAnimationFrame(
              (timestamp) => {
                animationFramesRef.current.delete(frameId);
                callback(timestamp);
              },
            );

            animationFramesRef.current.add(frameId);

            return frameId;
          };

          const setFinalStatValues = () => {
            statValues.forEach((element, index) => {
              const stat = contactStats[index];

              if (!element || !stat) return;

              element.textContent =
                `${stat.value.toFixed(stat.decimals)}${stat.suffix}`;
            });
          };

          const countNumber = ({
            element,
            finalValue,
            decimals = 0,
            suffix = "",
            delay = 0,
          }) => {
            if (!element) return;

            const duration =
              finalValue >= 90 ? 1600 : 1350;

            const startTime =
              performance.now() + delay;

            const tick = (currentTime) => {
              if (currentTime < startTime) {
                requestFrame(tick);
                return;
              }

              const elapsed =
                currentTime - startTime;

              const progress = Math.min(
                elapsed / duration,
                1,
              );

              const easedProgress =
                1 - Math.pow(1 - progress, 3);

              const currentValue =
                finalValue * easedProgress;

              element.textContent =
                `${currentValue.toFixed(decimals)}${suffix}`;

              if (progress < 1) {
                requestFrame(tick);
                return;
              }

              element.textContent =
                `${finalValue.toFixed(decimals)}${suffix}`;
            };

            requestFrame(tick);
          };

          if (reduceMotion) {
            gsap.set(
              [
                label,
                heading,
                introCopy,
                subheading,
                detailRows,
                responseBadges,
                actionCards,
                dispatch,
                statCards,
                statValues,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            setFinalStatValues();
            return;
          }

          gsap.set(label, {
            y: mobile ? 20 : 18,
            scale: 0.96,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 52 : 44,
            autoAlpha: 0,
          });

          gsap.set(introCopy, {
            y: mobile ? 30 : 26,
            autoAlpha: 0,
          });

          gsap.set(subheading, {
            y: 22,
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
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.42,
                })
                .to(
                  heading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: mobile ? 0.78 : 0.72,
                    ease: "power4.out",
                  },
                  "-=0.18",
                )
                .to(
                  introCopy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.56,
                  },
                  "-=0.36",
                )
                .to(
                  subheading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.46,
                  },
                  "-=0.22",
                );
            },
            {
              threshold: mobile ? 0.08 : 0.18,
              rootMargin: mobile
                ? "0px 0px -3% 0px"
                : "0px 0px -7% 0px",
            },
          );

          detailRows.forEach((row, index) => {
            gsap.set(row, {
              x: mobile
                ? 0
                : tablet
                  ? -18
                  : -26,

              y: mobile ? 34 : 20,
              scale: mobile ? 0.975 : 0.985,
              autoAlpha: 0,
            });

            observeOnce(
              row,
              () => {
                gsap.to(row, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: mobile ? 0.6 : 0.58,
                  delay:
                    tablet || desktop
                      ? index * 0.05
                      : 0,
                  ease: "power3.out",
                });
              },
              {
                threshold: mobile ? 0.08 : 0.14,
                rootMargin: mobile
                  ? "0px 0px -3% 0px"
                  : "0px 0px -7% 0px",
              },
            );
          });

          responseBadges.forEach((badge, index) => {
            gsap.set(badge, {
              y: mobile ? 24 : 18,
              scale: 0.95,
              autoAlpha: 0,
            });

            observeOnce(
              badge,
              () => {
                gsap.to(badge, {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.48,
                  delay: index * 0.07,
                  ease: "power3.out",
                });
              },
              {
                threshold: 0.12,
                rootMargin: "0px 0px -5% 0px",
              },
            );
          });

          actionCards.forEach((card, index) => {
            const startX = desktop || tablet
              ? index === 0
                ? -30
                : 30
              : 0;

            gsap.set(card, {
              x: startX,
              y: mobile ? 46 : 38,
              scale: mobile ? 0.955 : 0.97,
              autoAlpha: 0,
            });

            observeOnce(
              card,
              () => {
                gsap.to(card, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: mobile ? 0.68 : 0.64,
                  delay:
                    tablet || desktop
                      ? index * 0.08
                      : 0,
                  ease: "power4.out",
                });
              },
              {
                threshold: mobile ? 0.08 : 0.16,
                rootMargin: mobile
                  ? "0px 0px -3% 0px"
                  : "0px 0px -8% 0px",
              },
            );
          });

          gsap.set(dispatch, {
            y: mobile ? 48 : 40,
            scale: mobile ? 0.96 : 0.975,
            autoAlpha: 0,
          });

          gsap.set(statCards, {
            y: mobile ? 32 : 26,
            scale: 0.94,
            autoAlpha: 0,
          });

          observeOnce(
            dispatch,
            () => {
              statValues.forEach((element, index) => {
                const stat = contactStats[index];

                if (!element || !stat) return;

                element.textContent =
                  `${(0).toFixed(stat.decimals)}${stat.suffix}`;
              });

              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(dispatch, {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.7,
                  ease: "power4.out",
                })
                .to(
                  statCards,
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.52,
                    stagger: mobile ? 0.08 : 0.1,
                  },
                  "-=0.32",
                );

              statValues.forEach((element, index) => {
                const stat = contactStats[index];

                if (!element || !stat) return;

                countNumber({
                  element,
                  finalValue: stat.value,
                  decimals: stat.decimals,
                  suffix: stat.suffix,
                  delay: index * 120,
                });

                gsap.fromTo(
                  element,
                  {
                    scale: 0.86,
                  },
                  {
                    scale: 1,
                    duration: 0.56,
                    delay: index * 0.12,
                    ease: "back.out(1.55)",
                    clearProps: "transform",
                  },
                );
              });
            },
            {
              threshold: mobile ? 0.08 : 0.18,
              rootMargin: mobile
                ? "0px 0px -3% 0px"
                : "0px 0px -8% 0px",
            },
          );

          return () => {
            observers.forEach((observer) => {
              observer.disconnect();
            });

            animationFramesRef.current.forEach(
              (frameId) => {
                cancelAnimationFrame(frameId);
              },
            );

            animationFramesRef.current.clear();
          };
        },
      );

      return () => {
        mm.revert();

        animationFramesRef.current.forEach(
          (frameId) => {
            cancelAnimationFrame(frameId);
          },
        );

        animationFramesRef.current.clear();
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
        lg:py-20
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-[10%]
          size-85
          rounded-full
          bg-brand-cyan/[0.03]
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-[5%]
          size-90
          rounded-full
          bg-brand-primary/[0.035]
          blur-[110px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1220px]
          gap-10
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-16
        "
      >
        <div>
          <div
            className="
              contact-overview-label
              inline-flex
              rounded
              bg-brand-primary-light
              px-3
              py-1.5
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-brand-primary
              "
            >
              Contact
            </span>
          </div>

          <h1
            className="
              contact-overview-heading
              mt-4
              text-[38px]
              font-bold
              leading-[0.98]
              tracking-[-0.045em]
              text-brand-ink
              min-[390px]:text-[42px]
              sm:text-[44px]
              md:text-[48px]
              lg:text-[52px]
            "
          >
            How can we help?
          </h1>

          <p
            className="
              contact-overview-copy
              mt-4
              max-w-[560px]
              text-[13px]
              leading-6
              text-brand-muted
              sm:text-[14px]
              sm:leading-7
              md:text-[15px]
            "
          >
            Get in touch with our team for projects, product enquiries,
            onboarding or support from our offices in Accra and Kumasi.
          </p>

          <h2
            className="
              contact-overview-subheading
              mt-9
              text-[15px]
              font-semibold
              text-brand-ink
              sm:mt-10
              md:text-[16px]
            "
          >
            Get in touch
          </h2>

          <div className="mt-5 space-y-3">
            {contactDetails.map((item) => (
              <div
                key={item.label}
                className="
                  contact-detail-row
                  grid
                  min-h-15.5
                  grid-cols-[70px_24px_1fr]
                  items-center
                  rounded-xl
                  border
                  border-brand-border-light
                  bg-white
                  px-3
                  py-3.5
                  shadow-[0_3px_12px_rgba(15,35,55,0.025)]
                  transition-[border-color,box-shadow]
                  duration-300
                  hover:border-brand-primary/15
                  hover:shadow-[0_8px_22px_rgba(15,35,55,0.05)]
                  sm:grid-cols-[78px_26px_1fr]
                  sm:px-4
                  md:grid-cols-[90px_28px_1fr]
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-brand-muted
                    sm:text-[10px]
                  "
                >
                  {item.label}
                </span>

                <span className="text-brand-primary">
                  {item.icon}
                </span>

                <div
                  className="
                    min-w-0
                    break-words
                    text-[12px]
                    leading-5
                    text-brand-text
                    md:text-[13px]
                  "
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div
              className="
                contact-response-badge
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-full
                border
                border-brand-border-light
                bg-white
                px-4
                py-2.5
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-4 shrink-0 text-brand-primary"
                aria-hidden="true"
              >
                <path
                  d="m13 3-7 10h5l-1 8 8-11h-5V3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                className="
                  text-[11px]
                  font-medium
                  text-brand-text
                  md:text-[12px]
                "
              >
                Average response time &lt; 4 hours
              </span>
            </div>

            <div
              className="
                contact-response-badge
                inline-flex
                min-h-11
                items-center
                gap-2
                rounded-full
                border
                border-brand-border-light
                bg-white
                px-4
                py-2.5
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-4 shrink-0 text-brand-primary"
                aria-hidden="true"
              >
                <path
                  d="M12 3 19 6v5c0 4.6-2.8 8.1-7 10-4.2-1.9-7-5.4-7-10V6l7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />

                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                className="
                  text-[11px]
                  font-medium
                  text-brand-text
                  md:text-[12px]
                "
              >
                Strict enterprise NDA guaranteed
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/contact/sales"
              className="
                contact-action-card
                group
                rounded-xl
                border
                border-brand-border-light
                bg-white
                p-5
                transition-[transform,border-color,box-shadow]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/20
                hover:shadow-brand-card
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-primary
                focus-visible:ring-offset-2
                sm:p-6
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-brand-primary-light
                    text-brand-primary
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <rect
                      x="5"
                      y="7"
                      width="14"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />

                    <path
                      d="M9 7V5h6v2M9 12h6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    text-[16px]
                    text-brand-primary
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                >
                  ↗
                </span>
              </div>

              <h3
                className="
                  mt-5
                  text-[16px]
                  font-semibold
                  text-brand-ink
                "
              >
                Sales
              </h3>

              <p
                className="
                  mt-4
                  text-[13px]
                  leading-6
                  text-brand-muted
                "
              >
                Talk to us about a project, pricing, or a product for your
                organisation.
              </p>

              <span
                className="
                  mt-6
                  inline-block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-brand-primary
                "
              >
                Contact
              </span>
            </Link>

            <a
              href="mailto:support@liderlabs.com"
              className="
                contact-action-card
                group
                rounded-xl
                border
                border-brand-border-light
                bg-white
                p-5
                transition-[transform,border-color,box-shadow]
                duration-300
                ease-out
                hover:-translate-y-1
                hover:border-brand-primary/20
                hover:shadow-brand-card
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-primary
                focus-visible:ring-offset-2
                sm:p-6
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-brand-primary-light
                    text-brand-primary
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />

                    <path
                      d="M8.5 12h7M12 8.5v7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    text-[16px]
                    text-brand-primary
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                >
                  ↗
                </span>
              </div>

              <h3
                className="
                  mt-5
                  text-[16px]
                  font-semibold
                  text-brand-ink
                "
              >
                Support
              </h3>

              <p
                className="
                  mt-4
                  text-[13px]
                  leading-6
                  text-brand-muted
                "
              >
                Already using our products? Ask questions, report problems, or
                leave feedback.
              </p>

              <span
                className="
                  mt-6
                  inline-block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-brand-primary
                "
              >
                Contact
              </span>
            </a>
          </div>

          <div
            className="
              contact-dispatch
              mt-5
              rounded-xl
              border
              border-brand-primary/15
              bg-brand-primary-light
              p-5
              sm:p-6
            "
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  text-[10px]
                  font-bold
                  text-brand-primary
                "
              >
                01
              </span>

              <span className="text-[10px] text-brand-primary/45">
                //
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-brand-primary
                  md:text-[11px]
                "
              >
                Rapid Deployment Dispatch
              </span>
            </div>

            <div
              className="
                mt-6
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >
              {contactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="
                    contact-stat
                    flex
                    min-h-30
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-brand-border-light
                    bg-white
                    px-4
                    py-5
                    text-center
                  "
                >
                  <p
                    className="
                      contact-stat-value
                      text-[28px]
                      font-bold
                      leading-none
                      tracking-[-0.04em]
                      text-brand-primary
                      md:text-[30px]
                    "
                  >
                    {stat.value.toFixed(stat.decimals)}
                    {stat.suffix}
                  </p>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-[110px]
                      text-[10px]
                      leading-4
                      text-brand-muted
                      md:text-[11px]
                    "
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactOverviewSection;