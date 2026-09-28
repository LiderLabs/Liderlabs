import { useRef, useState } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const faqs = [
  {
    question:
      "What is the typical kickoff timeline once an agreement is executed?",
    answer: "COMING SOON...",
  },
  {
    question: "Do you offer 24/7 support?",
    answer: "COMING SOON...",
  },
  {
    question:
      "Can we schedule an on-site consultation at our company offices?",
    answer: "COMING SOON...",
  },
];

function FAQSection() {
  const sectionRef = useRef(null);
  const answerRefs = useRef([]);

  const [openIndex, setOpenIndex] = useState(null);

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

          const eyebrow = section.querySelector(
            ".faq-eyebrow",
          );

          const heading = section.querySelector(
            ".faq-heading",
          );

          const items = gsap.utils.toArray(
            ".faq-item",
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
                eyebrow,
                heading,
                items,
                ".faq-number",
                ".faq-question",
                ".faq-icon",
                ".faq-item-rail",
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                scaleX: 1,
                autoAlpha: 1,
              },
            );

            return;
          }

          gsap.set(eyebrow, {
            y: mobile ? 22 : 18,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 46 : 38,
            autoAlpha: 0,
          });

          observeOnce(
            eyebrow,
            () => {
              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(eyebrow, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.42,
                })
                .to(
                  heading,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: mobile ? 0.76 : 0.7,
                    ease: "power4.out",
                  },
                  "-=0.2",
                );
            },
            {
              threshold: mobile ? 0.08 : 0.18,
              rootMargin: mobile
                ? "0px 0px -3% 0px"
                : "0px 0px -7% 0px",
            },
          );

          items.forEach((item, index) => {
            const number = item.querySelector(
              ".faq-number",
            );

            const question = item.querySelector(
              ".faq-question",
            );

            const icon = item.querySelector(
              ".faq-icon",
            );

            const rail = item.querySelector(
              ".faq-item-rail",
            );

            const direction =
              tablet || desktop
                ? index % 2 === 0
                  ? -1
                  : 1
                : 0;

            gsap.set(item, {
              x:
                direction === 0
                  ? 0
                  : direction * (desktop ? 24 : 18),

              y: mobile ? 48 : 36,
              scale: mobile ? 0.965 : 0.98,
              autoAlpha: 0,
            });

            gsap.set(number, {
              scale: 0.75,
              autoAlpha: 0,
            });

            gsap.set(question, {
              x: mobile ? 0 : -10,
              y: mobile ? 12 : 0,
              autoAlpha: 0,
            });

            gsap.set(icon, {
              scale: 0.72,
              autoAlpha: 0,
            });

            gsap.set(rail, {
              scaleX: 0,
              transformOrigin: "left center",
            });

            observeOnce(
              item,
              () => {
                const delay =
                  tablet || desktop
                    ? index * 0.06
                    : 0;

                gsap
                  .timeline({
                    delay,
                    defaults: {
                      ease: "power3.out",
                    },
                  })
                  .to(item, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: mobile ? 0.66 : 0.6,
                    ease: "power4.out",
                  })
                  .to(
                    rail,
                    {
                      scaleX: 1,
                      duration: 0.36,
                      ease: "power2.out",
                    },
                    "-=0.4",
                  )
                  .to(
                    number,
                    {
                      scale: 1,
                      autoAlpha: 1,
                      duration: 0.36,
                      ease: "back.out(1.6)",
                    },
                    "-=0.32",
                  )
                  .to(
                    question,
                    {
                      x: 0,
                      y: 0,
                      autoAlpha: 1,
                      duration: 0.44,
                    },
                    "-=0.28",
                  )
                  .to(
                    icon,
                    {
                      scale: 1,
                      autoAlpha: 1,
                      duration: 0.34,
                      ease: "back.out(1.5)",
                    },
                    "-=0.28",
                  );
              },
              {
                threshold: mobile ? 0.08 : 0.14,
                rootMargin: mobile
                  ? "0px 0px -3% 0px"
                  : "0px 0px -7% 0px",
              },
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

  const toggleFAQ = (index) => {
    const currentIndex = openIndex;

    const nextIndex =
      currentIndex === index
        ? null
        : index;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (currentIndex !== null) {
      const currentPanel =
        answerRefs.current[currentIndex];

      if (currentPanel) {
        gsap.killTweensOf(currentPanel);

        if (prefersReducedMotion) {
          gsap.set(currentPanel, {
            height: 0,
            autoAlpha: 0,
          });
        } else {
          gsap.to(currentPanel, {
            height: 0,
            autoAlpha: 0,
            duration: 0.32,
            ease: "power3.inOut",
          });
        }
      }
    }

    if (nextIndex !== null) {
      const nextPanel =
        answerRefs.current[nextIndex];

      if (nextPanel) {
        gsap.killTweensOf(nextPanel);

        if (prefersReducedMotion) {
          gsap.set(nextPanel, {
            height: "auto",
            autoAlpha: 1,
          });
        } else {
          gsap.to(nextPanel, {
            height: "auto",
            autoAlpha: 1,
            duration: 0.46,
            ease: "power3.out",
          });
        }
      }
    }

    setOpenIndex(nextIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
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
          -left-40
          top-1/5
          size-85
          rounded-full
          bg-brand-cyan/[0.025]
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          size-90
          rounded-full
          bg-brand-primary/[0.03]
          blur-[110px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[900px]
        "
      >
        <div className="text-center">
          <p
            className="
              faq-eyebrow
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-brand-primary
              md:text-[11px]
            "
          >
            Answers for Procurement &amp; Tech Leads
          </p>

          <h2
            className="
              faq-heading
              mt-4
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
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-9 space-y-3 sm:mt-12 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen =
              openIndex === index;

            const panelId =
              `faq-panel-${index}`;

            const buttonId =
              `faq-button-${index}`;

            return (
              <article
                key={faq.question}
                className={[
                  `
                    faq-item
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    bg-white
                    shadow-[0_3px_14px_rgba(15,35,55,0.025)]
                    transition-[border-color,box-shadow]
                    duration-300
                    hover:shadow-[0_10px_30px_rgba(15,35,55,0.055)]
                  `,
                  isOpen
                    ? "border-brand-primary/20"
                    : "border-brand-border-light hover:border-brand-primary/15",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="
                    faq-item-rail
                    absolute
                    left-0
                    top-0
                    h-0.5
                    w-full
                    origin-left
                    bg-brand-cyan
                  "
                />

                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="
                    group
                    flex
                    min-h-18
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-4
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-brand-surface-blue/40
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-brand-primary
                    sm:gap-4
                    sm:px-5
                    sm:py-5
                    md:gap-5
                    md:px-7
                    md:py-6
                  "
                >
                  <span
                    className="
                      faq-number
                      flex
                      size-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-brand-primary-light
                      text-[10px]
                      font-bold
                      text-brand-primary
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span
                    className="
                      faq-question
                      flex-1
                      text-[13px]
                      font-semibold
                      leading-5
                      text-brand-ink
                      sm:text-[14px]
                      sm:leading-6
                      md:text-[15px]
                    "
                  >
                    {faq.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className={[
                      `
                        faq-icon
                        flex
                        size-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-brand-border-light
                        bg-brand-surface-blue
                        text-brand-primary
                        transition-[transform,background-color]
                        duration-300
                        group-hover:bg-brand-primary-light
                      `,
                      isOpen
                        ? "rotate-180 bg-brand-primary-light"
                        : "",
                    ].join(" ")}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="size-3.5"
                    >
                      <path
                        d="m6 8 4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  ref={(element) => {
                    answerRefs.current[index] =
                      element;
                  }}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className="
                    h-0
                    overflow-hidden
                    opacity-0
                  "
                >
                  <div
                    className="
                      border-t
                      border-brand-border-light
                      px-4
                      pb-5
                      pt-4
                      sm:px-5
                      sm:pb-6
                      sm:pt-5
                      md:px-7
                    "
                  >
                    <div
                      className="
                        rounded-lg
                        bg-brand-surface-blue
                        px-4
                        py-4
                        sm:px-5
                      "
                    >
                      <p
                        className="
                          max-w-[760px]
                          text-[13px]
                          leading-6
                          text-brand-muted
                          md:text-[14px]
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;