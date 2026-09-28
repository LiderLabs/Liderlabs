import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const benefits = [
  "Talk through your project or idea",
  "Find the right product or approach",
  "Get a clear scope and next steps",
];

function ContactSales() {
  const sectionRef = useRef(null);

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
            ".sales-label",
          );

          const heading = section.querySelector(
            ".sales-heading",
          );

          const benefitsItems = gsap.utils.toArray(
            ".sales-benefit",
          );

          const support = section.querySelector(
            ".sales-support",
          );

          const divider = section.querySelector(
            ".sales-divider",
          );

          const standard = section.querySelector(
            ".sales-standard",
          );

          const formPanel = section.querySelector(
            ".sales-form",
          );

          const formTitle = section.querySelector(
            ".sales-form-title",
          );

          const formFields = gsap.utils.toArray(
            ".sales-form-field",
          );

          const formBottom = section.querySelector(
            ".sales-form-bottom",
          );

          const submitButton = section.querySelector(
            ".sales-submit",
          );

          if (reduceMotion) {
            gsap.set(
              [
                label,
                heading,
                benefitsItems,
                support,
                divider,
                standard,
                formPanel,
                formTitle,
                formFields,
                formBottom,
                submitButton,
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

          gsap.set(label, {
            x: desktop ? -18 : 0,
            y: desktop ? 0 : 18,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            x: desktop ? -46 : 0,
            y: desktop
              ? 0
              : mobile
                ? 50
                : 42,
            autoAlpha: 0,
          });

          gsap.set(benefitsItems, {
            x: desktop ? -28 : 0,
            y: desktop ? 0 : 24,
            autoAlpha: 0,
          });

          gsap.set(support, {
            y: 20,
            autoAlpha: 0,
          });

          gsap.set(divider, {
            scaleX: 0,
            transformOrigin: "left center",
            autoAlpha: 0,
          });

          gsap.set(standard, {
            y: mobile ? 36 : 30,
            scale: mobile ? 0.96 : 0.98,
            autoAlpha: 0,
          });

          gsap.set(formPanel, {
            x: desktop
              ? 52
              : tablet
                ? 18
                : 0,

            y: desktop
              ? 0
              : mobile
                ? 52
                : 42,

            scale: mobile ? 0.965 : 0.98,
            autoAlpha: 0,
          });

          gsap.set(formTitle, {
            y: 24,
            autoAlpha: 0,
          });

          gsap.set(formFields, {
            y: mobile ? 28 : 22,
            autoAlpha: 0,
          });

          gsap.set(formBottom, {
            y: 22,
            autoAlpha: 0,
          });

          gsap.set(submitButton, {
            scale: 0.94,
          });

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) return;

              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(label, {
                  x: 0,
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.42,
                })
                .to(
                  heading,
                  {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.78,
                    ease: "power4.out",
                  },
                  "-=0.18",
                )
                .to(
                  benefitsItems,
                  {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.48,
                    stagger: 0.09,
                  },
                  "-=0.34",
                )
                .to(
                  support,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.46,
                  },
                  "-=0.14",
                )
                .to(
                  divider,
                  {
                    scaleX: 1,
                    autoAlpha: 1,
                    duration: 0.5,
                  },
                  "-=0.22",
                )
                .to(
                  standard,
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: "power4.out",
                  },
                  "-=0.22",
                )
                .to(
                  formPanel,
                  {
                    x: 0,
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: mobile ? 0.72 : 0.82,
                    ease: "power4.out",
                  },
                  0.18,
                )
                .to(
                  formTitle,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.48,
                  },
                  0.4,
                )
                .to(
                  formFields,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.48,
                    stagger: mobile ? 0.07 : 0.08,
                  },
                  0.48,
                )
                .to(
                  formBottom,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.48,
                  },
                  0.8,
                )
                .to(
                  submitButton,
                  {
                    scale: 1.035,
                    duration: 0.16,
                    ease: "power2.out",
                  },
                  1.04,
                )
                .to(submitButton, {
                  scale: 1,
                  duration: 0.18,
                  ease: "power2.inOut",
                });

              observer.disconnect();
            },
            {
              threshold: mobile ? 0.05 : 0.1,
              rootMargin: mobile
                ? "0px 0px -2% 0px"
                : "0px 0px -6% 0px",
            },
          );

          observer.observe(section);

          return () => {
            observer.disconnect();
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend integration will be added before deployment.
  };

  return (
    <main className="bg-white">
      <section
        ref={sectionRef}
        className="
          relative
          overflow-hidden
          px-4
          py-14
          sm:px-6
          sm:py-16
          md:px-8
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
            top-[15%]
            size-90
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
            bottom-[10%]
            size-95
            rounded-full
            bg-brand-primary/[0.03]
            blur-[115px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-[1220px]
            gap-12
            lg:grid-cols-[0.78fr_1.12fr]
            lg:gap-16
          "
        >
          <div className="lg:pt-2">
            <div
              className="
                sales-label
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
                sales-heading
                mt-5
                text-[40px]
                font-bold
                leading-[0.95]
                tracking-[-0.05em]
                text-brand-ink
                min-[390px]:text-[44px]
                sm:text-[48px]
                md:text-[54px]
                lg:text-[58px]
              "
            >
              Contact sales
            </h1>

            <div className="mt-9 space-y-5">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="
                    sales-benefit
                    flex
                    items-center
                    gap-4
                    text-[14px]
                    font-medium
                    text-brand-text
                    md:text-[15px]
                  "
                >
                  <span
                    className="
                      flex
                      size-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-brand-primary-light
                      text-brand-primary
                    "
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="size-3.5"
                      aria-hidden="true"
                    >
                      <path
                        d="m3.2 8.3 2.8 2.8 6-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <p
              className="
                sales-support
                mt-10
                text-[13px]
                leading-6
                text-brand-muted
                md:text-[14px]
              "
            >
              Already using our products?{" "}
              <a
                href="mailto:support@liderlabs.com"
                className="
                  font-medium
                  text-brand-ink
                  underline
                  underline-offset-2
                  transition-colors
                  duration-200
                  hover:text-brand-primary
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2
                "
              >
                Contact support
              </a>
            </p>

            <div
              className="
                sales-divider
                my-10
                h-px
                bg-brand-border-light
              "
            />

            <div
              className="
                sales-standard
                rounded-xl
                border
                border-brand-border-light
                bg-brand-surface
                px-5
                py-5
                shadow-[0_4px_18px_rgba(15,35,55,0.025)]
                md:px-6
              "
            >
              <div className="flex items-start gap-4">
                <span
                  className="
                    mt-0.5
                    flex
                    size-9
                    shrink-0
                    items-center
                    justify-center
                    text-brand-primary
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3 19 6v5c0 4.5-2.7 8-7 10-4.3-2-7-5.5-7-10V6l7-3Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />

                    <path
                      d="m9 12 2 2 4-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-brand-muted
                      md:text-[11px]
                    "
                  >
                    Enterprise Standard
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-[400px]
                      text-[12px]
                      leading-6
                      text-brand-text
                      md:text-[13px]
                    "
                  >
                    Trusted by banking, telecom, and government institutions
                    across Ghana and West Africa for mission-critical
                    engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
              sales-form
              rounded-[18px]
              border
              border-brand-border-light
              bg-white
              p-5
              shadow-[0_12px_38px_rgba(15,35,55,0.045)]
              sm:p-6
              md:p-8
              lg:p-10
            "
          >
            <h2
              className="
                sales-form-title
                text-[24px]
                font-bold
                tracking-[-0.035em]
                text-brand-ink
                md:text-[28px]
              "
            >
              Tell us how we can help
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <div className="sales-form-field">
                <label
                  htmlFor="fullName"
                  className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    text-brand-text
                    md:text-[13px]
                  "
                >
                  Full name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Kwame Mensah"
                  required
                  maxLength={120}
                  className="
                    h-13
                    w-full
                    rounded-xl
                    border
                    border-brand-border
                    bg-white
                    px-4
                    text-[13px]
                    text-brand-ink
                    outline-none
                    transition-[border-color,box-shadow]
                    duration-200
                    placeholder:text-slate-400
                    focus:border-brand-primary
                    focus:ring-2
                    focus:ring-brand-primary/10
                    md:text-[14px]
                  "
                />
              </div>

              <div className="sales-form-field mt-6">
                <label
                  htmlFor="email"
                  className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    text-brand-text
                    md:text-[13px]
                  "
                >
                  Work email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="kwame@company.com"
                  required
                  maxLength={254}
                  className="
                    h-13
                    w-full
                    rounded-xl
                    border
                    border-brand-border
                    bg-white
                    px-4
                    text-[13px]
                    text-brand-ink
                    outline-none
                    transition-[border-color,box-shadow]
                    duration-200
                    placeholder:text-slate-400
                    focus:border-brand-primary
                    focus:ring-2
                    focus:ring-brand-primary/10
                    md:text-[14px]
                  "
                />
              </div>

              <div
                className="
                  sales-form-field
                  mt-6
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >
                <div>
                  <label
                    htmlFor="company"
                    className="
                      mb-2.5
                      block
                      text-[12px]
                      font-semibold
                      text-brand-text
                      md:text-[13px]
                    "
                  >
                    Company{" "}
                    <span className="font-normal text-brand-muted">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company or organisation"
                    maxLength={160}
                    className="
                      h-13
                      w-full
                      rounded-xl
                      border
                      border-brand-border
                      bg-white
                      px-4
                      text-[13px]
                      text-brand-ink
                      outline-none
                      transition-[border-color,box-shadow]
                      duration-200
                      placeholder:text-slate-400
                      focus:border-brand-primary
                      focus:ring-2
                      focus:ring-brand-primary/10
                      md:text-[14px]
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="companySize"
                    className="
                      mb-2.5
                      block
                      text-[12px]
                      font-semibold
                      text-brand-text
                      md:text-[13px]
                    "
                  >
                    Company size
                  </label>

                  <div className="relative">
                    <select
                      id="companySize"
                      name="companySize"
                      defaultValue="1-9"
                      className="
                        h-13
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-brand-border
                        bg-white
                        px-4
                        pr-10
                        text-[13px]
                        text-brand-text
                        outline-none
                        transition-[border-color,box-shadow]
                        duration-200
                        focus:border-brand-primary
                        focus:ring-2
                        focus:ring-brand-primary/10
                        md:text-[14px]
                      "
                    >
                      <option value="1-9">
                        1–9 people
                      </option>

                      <option value="10-49">
                        10–49 people
                      </option>

                      <option value="50-99">
                        50–99 people
                      </option>

                      <option value="100-249">
                        100–249 people
                      </option>

                      <option value="250+">
                        250+ people
                      </option>
                    </select>

                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        size-4
                        -translate-y-1/2
                        text-brand-muted
                      "
                    >
                      <path
                        d="m6 8 4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="sales-form-field mt-6">
                <label
                  htmlFor="requirements"
                  className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    text-brand-text
                    md:text-[13px]
                  "
                >
                  Tell us about your requirements
                </label>

                <textarea
                  id="requirements"
                  name="requirements"
                  rows={5}
                  placeholder="I'm interested in..."
                  required
                  maxLength={5000}
                  className="
                    min-h-35
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-brand-border
                    bg-white
                    px-4
                    py-4
                    text-[13px]
                    leading-6
                    text-brand-ink
                    outline-none
                    transition-[border-color,box-shadow]
                    duration-200
                    placeholder:text-slate-400
                    focus:border-brand-primary
                    focus:ring-2
                    focus:ring-brand-primary/10
                    md:text-[14px]
                  "
                />
              </div>

              <div
                className="
                  sales-form-bottom
                  mt-10
                  flex
                  flex-col
                  gap-6
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <p
                  className="
                    text-[12px]
                    leading-5
                    text-brand-muted
                    md:text-[13px]
                  "
                >
                  You can also email us at{" "}
                  <a
                    href="mailto:sales@liderlabs.com"
                    className="
                      font-medium
                      text-brand-ink
                      underline
                      underline-offset-2
                      transition-colors
                      duration-200
                      hover:text-brand-primary
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-brand-primary
                      focus-visible:ring-offset-2
                    "
                  >
                    sales@liderlabs.com
                  </a>
                </p>

                <button
                  type="submit"
                  className="
                    sales-submit
                    inline-flex
                    min-h-11
                    min-w-[155px]
                    items-center
                    justify-center
                    rounded-full
                    bg-brand-primary
                    px-7
                    py-3.5
                    text-[12px]
                    font-semibold
                    text-white
                    shadow-brand-button
                    transition-[transform,background-color,box-shadow]
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-brand-primary-dark
                    hover:shadow-[0_8px_24px_rgba(23,109,140,0.26)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-primary
                    focus-visible:ring-offset-2
                  "
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactSales;