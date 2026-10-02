import { useRef, useState } from "react";
import {
  useForm,
  ValidationError,
} from "@formspree/react";

import { gsap, useGSAP } from "../../lib/gsap";

const FORMSPREE_FORM_ID = "xbglwgdg";

const benefits = [
  "Talk through your project or idea",
  "Find the right product or approach",
  "Get a clear scope and next steps",
];

const initialFormData = {
  fullName: "",
  email: "",
  company: "",
  companySize: "1-9",
  requirements: "",
};

const fieldOrder = [
  "fullName",
  "email",
  "requirements",
];

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name, value) {
  const cleanValue = value.trim();

  switch (name) {
    case "fullName":
      if (!cleanValue) {
        return "Please enter your name.";
      }

      if (cleanValue.length < 2) {
        return "Please enter at least 2 characters.";
      }

      if (cleanValue.length > 80) {
        return "Please keep your name under 80 characters.";
      }

      return "";

    case "email":
      if (!cleanValue) {
        return "Please enter your work email.";
      }

      if (!emailPattern.test(cleanValue)) {
        return "Please enter a valid email address.";
      }

      return "";

    case "requirements":
      if (!cleanValue) {
        return "Tell us a little about what you need.";
      }

      if (cleanValue.length < 20) {
        return "Please provide at least 20 characters so we can understand your project.";
      }

      return "";

    default:
      return "";
  }
}

function validateForm(formData) {
  return {
    fullName: validateField(
      "fullName",
      formData.fullName,
    ),

    email: validateField(
      "email",
      formData.email,
    ),

    requirements: validateField(
      "requirements",
      formData.requirements,
    ),
  };
}

function ContactSales() {
  const sectionRef = useRef(null);

  const [formData, setFormData] =
    useState(initialFormData);

  const [fieldErrors, setFieldErrors] =
    useState({});

  const [
    formspreeState,
    handleFormspreeSubmit,
    resetFormspree,
  ] = useForm(FORMSPREE_FORM_ID);

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

          const label =
            section.querySelector(
              ".sales-label",
            );

          const heading =
            section.querySelector(
              ".sales-heading",
            );

          const benefitsItems = Array.from(
            section.querySelectorAll(
              ".sales-benefit",
            ),
          );

          const support =
            section.querySelector(
              ".sales-support",
            );

          const divider =
            section.querySelector(
              ".sales-divider",
            );

          const standard =
            section.querySelector(
              ".sales-standard",
            );

          const formPanel =
            section.querySelector(
              ".sales-form",
            );

          const formTitle =
            section.querySelector(
              ".sales-form-title",
            );

          const formFields = Array.from(
            section.querySelectorAll(
              ".sales-form-field",
            ),
          );

          const formBottom =
            section.querySelector(
              ".sales-form-bottom",
            );

          const submitButton =
            section.querySelector(
              ".sales-submit",
            );

          if (reduceMotion) {
            gsap.set(
              [
                label,
                heading,
                ...benefitsItems,
                support,
                divider,
                standard,
                formPanel,
                formTitle,
                ...formFields,
                formBottom,
                submitButton,
              ].filter(Boolean),

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

            transformOrigin:
              "left center",

            autoAlpha: 0,
          });

          gsap.set(standard, {
            y: mobile ? 36 : 30,

            scale: mobile
              ? 0.96
              : 0.98,

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

            scale: mobile
              ? 0.965
              : 0.98,

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

          if (submitButton) {
            gsap.set(submitButton, {
              scale: 0.94,
            });
          }

          const observer =
            new IntersectionObserver(
              ([entry]) => {
                if (
                  !entry?.isIntersecting
                ) {
                  return;
                }

                const timeline =
                  gsap.timeline({
                    defaults: {
                      ease: "power3.out",
                    },
                  });

                timeline
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

                      duration: mobile
                        ? 0.72
                        : 0.82,

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

                      stagger: mobile
                        ? 0.07
                        : 0.08,
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
                  );

                if (submitButton) {
                  timeline
                    .to(
                      submitButton,

                      {
                        scale: 1.035,

                        duration: 0.16,

                        ease: "power2.out",
                      },

                      1.04,
                    )

                    .to(
                      submitButton,

                      {
                        scale: 1,

                        duration: 0.18,

                        ease:
                          "power2.inOut",
                      },
                    );
                }

                observer.disconnect();
              },

              {
                threshold: mobile
                  ? 0.05
                  : 0.1,

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

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      return {
        ...current,

        [name]: validateField(
          name,
          value,
        ),
      };
    });
  };

  const handleSubmit = (event) => {
    const form =
      event.currentTarget;

    const errors =
      validateForm(formData);

    const hasErrors =
      Object.values(errors).some(
        Boolean,
      );

    if (hasErrors) {
      event.preventDefault();

      setFieldErrors(errors);

      const firstInvalidField =
        fieldOrder.find(
          (field) => errors[field],
        );

      if (firstInvalidField) {
        requestAnimationFrame(() => {
          const control =
            form.elements.namedItem(
              firstInvalidField,
            );

          control?.focus();
        });
      }

      return;
    }

    setFieldErrors({});

    handleFormspreeSubmit(event);
  };

  const handleReset = () => {
    setFormData(initialFormData);

    setFieldErrors({});

    resetFormspree();
  };

  const hasSubmissionError =
    Boolean(formspreeState.errors) &&
    !formspreeState.submitting &&
    !formspreeState.succeeded;

  const firstName =
    formData.fullName
      .trim()
      .split(/\s+/)[0] || "there";

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
          {/* LEFT CONTENT */}

          <div className="lg:pt-2">
            <div
  className="
    sales-label
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
    Contact
  </span>

  <span
    aria-hidden="true"
    className="
      mt-2
      h-0.5
      w-16
      rounded-full
      bg-brand-cyan
      sm:w-20
    "
  />
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
              {benefits.map(
                (benefit) => (
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

                    <span>
                      {benefit}
                    </span>
                  </div>
                ),
              )}
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
                href="mailto:info@liderlabs.com"
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
                  motion-reduce:transition-none
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
                    Trusted by banking, telecom,
                    and government institutions
                    across Ghana and West Africa
                    for mission-critical
                    engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM CARD */}

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
            {formspreeState.succeeded ? (
              /* SUCCESS */

              <div
                className="
                  flex
                  min-h-[430px]
                  flex-col
                  justify-center
                "
              >
                <div
                  className="
                    flex
                    size-12
                    items-center
                    justify-center
                    rounded-full
                    bg-brand-primary-light
                    text-brand-primary
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-6"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 12.5 4 4L18 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p
                  className="
                    mt-6
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-brand-primary
                  "
                >
                  Message received
                </p>

                <h2
                  className="
                    mt-3
                    text-[28px]
                    font-bold
                    tracking-[-0.035em]
                    text-brand-ink
                    md:text-[32px]
                  "
                >
                  Thanks, {firstName}.
                </h2>

                <p
                  className="
                    mt-4
                    max-w-[470px]
                    text-[13px]
                    leading-6
                    text-brand-muted
                    md:text-[14px]
                    md:leading-7
                  "
                >
                  We've received your message.
                  Our team will review your
                  requirements and get back to
                  you as soon as possible.
                </p>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="
                      inline-flex
                      min-h-11
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
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-brand-primary
                      focus-visible:ring-offset-2
                      motion-reduce:transition-none
                    "
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                  noValidate
                  className="mt-8"
                >
                  {/* Honeypot */}

                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="
                      absolute
                      left-[-9999px]
                      size-px
                      overflow-hidden
                      opacity-0
                    "
                  />

                  {/* STATUS FOR SCREEN READERS */}

                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                  >
                    {formspreeState.submitting
                      ? "Sending message."
                      : ""}
                  </div>

                  {/* FULL NAME */}

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
                      value={
                        formData.fullName
                      }
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="Kwame Mensah"
                      required
                      maxLength={80}
                      aria-invalid={
                        fieldErrors.fullName
                          ? true
                          : undefined
                      }
                      aria-describedby={
                        fieldErrors.fullName
                          ? "fullName-error"
                          : undefined
                      }
                      className={`
                        h-13
                        w-full
                        rounded-xl
                        border
                        bg-white
                        px-4
                        text-[13px]
                        text-brand-ink
                        outline-none
                        transition-[border-color,box-shadow]
                        duration-200
                        placeholder:text-slate-400
                        focus:ring-2
                        md:text-[14px]
                        motion-reduce:transition-none
                        ${
                          fieldErrors.fullName
                            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                            : "border-brand-border focus:border-brand-primary focus:ring-brand-primary/10"
                        }
                      `}
                    />

                    {fieldErrors.fullName && (
                      <p
                        id="fullName-error"
                        role="alert"
                        className="
                          mt-2
                          text-[11px]
                          leading-5
                          text-red-600
                          md:text-[12px]
                        "
                      >
                        {
                          fieldErrors.fullName
                        }
                      </p>
                    )}

                    <ValidationError
                      field="fullName"
                      prefix="Full name"
                      errors={
                        formspreeState.errors
                      }
                      className="
                        mt-2
                        text-[11px]
                        leading-5
                        text-red-600
                        md:text-[12px]
                      "
                    />
                  </div>

                  {/* EMAIL */}

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
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="kwame@company.com"
                      required
                      maxLength={254}
                      aria-invalid={
                        fieldErrors.email
                          ? true
                          : undefined
                      }
                      aria-describedby={
                        fieldErrors.email
                          ? "email-error"
                          : undefined
                      }
                      className={`
                        h-13
                        w-full
                        rounded-xl
                        border
                        bg-white
                        px-4
                        text-[13px]
                        text-brand-ink
                        outline-none
                        transition-[border-color,box-shadow]
                        duration-200
                        placeholder:text-slate-400
                        focus:ring-2
                        md:text-[14px]
                        motion-reduce:transition-none
                        ${
                          fieldErrors.email
                            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                            : "border-brand-border focus:border-brand-primary focus:ring-brand-primary/10"
                        }
                      `}
                    />

                    {fieldErrors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="
                          mt-2
                          text-[11px]
                          leading-5
                          text-red-600
                          md:text-[12px]
                        "
                      >
                        {fieldErrors.email}
                      </p>
                    )}

                    <ValidationError
                      field="email"
                      prefix="Email"
                      errors={
                        formspreeState.errors
                      }
                      className="
                        mt-2
                        text-[11px]
                        leading-5
                        text-red-600
                        md:text-[12px]
                      "
                    />
                  </div>

                  {/* COMPANY */}

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
                        <span
                          className="
                            font-normal
                            text-brand-muted
                          "
                        >
                          (optional)
                        </span>
                      </label>

                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={
                          formData.company
                        }
                        onChange={
                          handleChange
                        }
                        autoComplete="organization"
                        placeholder="Company or organisation"
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
                          motion-reduce:transition-none
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
                          value={
                            formData.companySize
                          }
                          onChange={
                            handleChange
                          }
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
                            motion-reduce:transition-none
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

                  {/* REQUIREMENTS */}

                  <div className="sales-form-field mt-6">
                    <div
                      className="
                        mb-2.5
                        flex
                        items-end
                        justify-between
                        gap-4
                      "
                    >
                      <label
                        htmlFor="requirements"
                        className="
                          block
                          text-[12px]
                          font-semibold
                          text-brand-text
                          md:text-[13px]
                        "
                      >
                        Tell us about your
                        requirements
                      </label>

                      {formData.requirements
                        .length > 0 && (
                        <span
                          className="
                            shrink-0
                            text-[10px]
                            text-brand-muted
                            md:text-[11px]
                          "
                        >
                          {
                            formData
                              .requirements
                              .length
                          }
                          /2000
                        </span>
                      )}
                    </div>

                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={5}
                      value={
                        formData.requirements
                      }
                      onChange={handleChange}
                      placeholder="I'm interested in..."
                      required
                      maxLength={2000}
                      aria-invalid={
                        fieldErrors.requirements
                          ? true
                          : undefined
                      }
                      aria-describedby={
                        fieldErrors.requirements
                          ? "requirements-error"
                          : undefined
                      }
                      className={`
                        min-h-35
                        w-full
                        resize-y
                        rounded-xl
                        border
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
                        focus:ring-2
                        md:text-[14px]
                        motion-reduce:transition-none
                        ${
                          fieldErrors.requirements
                            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                            : "border-brand-border focus:border-brand-primary focus:ring-brand-primary/10"
                        }
                      `}
                    />

                    {fieldErrors.requirements && (
                      <p
                        id="requirements-error"
                        role="alert"
                        className="
                          mt-2
                          text-[11px]
                          leading-5
                          text-red-600
                          md:text-[12px]
                        "
                      >
                        {
                          fieldErrors.requirements
                        }
                      </p>
                    )}

                    <ValidationError
                      field="requirements"
                      prefix="Requirements"
                      errors={
                        formspreeState.errors
                      }
                      className="
                        mt-2
                        text-[11px]
                        leading-5
                        text-red-600
                        md:text-[12px]
                      "
                    />
                  </div>

                  {/* FORMSPREE ERROR */}

                  {hasSubmissionError && (
                    <div
                      role="alert"
                      className="
                        mt-6
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3.5
                      "
                    >
                      <p
                        className="
                          text-[12px]
                          font-semibold
                          text-red-700
                          md:text-[13px]
                        "
                      >
                        We couldn't send your
                        message right now.
                      </p>

                      <p
                        className="
                          mt-1
                          text-[11px]
                          leading-5
                          text-red-600
                          md:text-[12px]
                        "
                      >
                        Your information is still
                        here. Please try again.
                      </p>

                      <ValidationError
                        errors={
                          formspreeState.errors
                        }
                        className="sr-only"
                      />
                    </div>
                  )}

                  {/* BOTTOM */}

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
                        href="mailto:info@liderlabs.com"
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
                          motion-reduce:transition-none
                        "
                      >
                        info@liderlabs.com
                      </a>
                    </p>

                    <button
                      type="submit"
                      disabled={
                        formspreeState.submitting
                      }
                      className="
                        sales-submit
                        inline-flex
                        min-h-11
                        min-w-[155px]
                        items-center
                        justify-center
                        gap-2.5
                        rounded-full
                        bg-brand-primary
                        px-7
                        py-3.5
                        text-[12px]
                        font-semibold
                        text-white
                        shadow-brand-button
                        transition-[transform,background-color,box-shadow,opacity]
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-brand-primary-dark
                        hover:shadow-[0_8px_24px_rgba(23,109,140,0.26)]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-brand-primary
                        focus-visible:ring-offset-2
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                        disabled:hover:translate-y-0
                        motion-reduce:transition-none
                      "
                    >
                      {formspreeState.submitting ? (
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className="
                              size-4
                              animate-spin
                              motion-reduce:animate-none
                            "
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="2"
                              opacity="0.25"
                            />

                            <path
                              d="M21 12a9 9 0 0 0-9-9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>

                          Sending...
                        </>
                      ) : (
                        "Send message"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactSales;