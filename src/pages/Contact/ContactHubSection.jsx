import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

const mapsPageUrl =
  "https://maps.app.goo.gl/cBDwh58qmGsgFzWQ8";

const mapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.233652621955!2d-0.1298765265014246!3d5.679328432400307!2m3!1f0!2f0!3f0!3m2!1i1024!1i768!4f13.1!3m3!1m2!1s0xfdf83796d6ce381%3A0xa77fb8cc81425319!2sLider%20Technologies%20Ltd!5e0!3m2!1sen!2sgh!4v1789737946513!5m2!1sen!2sgh";

function ContactHubSection() {
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
            ".contact-hub-label",
          );

          const heading = section.querySelector(
            ".contact-hub-heading",
          );

          const copy = section.querySelector(
            ".contact-hub-copy",
          );

          const locationCard = section.querySelector(
            ".contact-location-card",
          );

          const mapFrame = section.querySelector(
            ".contact-map-frame",
          );

          const mapButton = section.querySelector(
            ".contact-map-button",
          );

          const information = section.querySelector(
            ".contact-hub-information",
          );

          const title = section.querySelector(
            ".contact-hub-location-title",
          );

          const locationBadge = section.querySelector(
            ".contact-hub-location-badge",
          );

          const address = section.querySelector(
            ".contact-hub-address",
          );

          const contactRows = gsap.utils.toArray(
            ".contact-hub-contact-row",
          );

          const meetingButton = section.querySelector(
            ".contact-hub-meeting-button",
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
                label,
                heading,
                copy,
                locationCard,
                mapFrame,
                mapButton,
                information,
                title,
                locationBadge,
                address,
                contactRows,
                meetingButton,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
              },
            );

            return;
          }

          gsap.set(label, {
            y: mobile ? 20 : 18,
            scale: 0.96,
            autoAlpha: 0,
          });

          gsap.set(heading, {
            y: mobile ? 44 : 38,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: mobile ? 28 : 24,
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
                    duration: mobile ? 0.74 : 0.7,
                    ease: "power4.out",
                  },
                  "-=0.2",
                )
                .to(
                  copy,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.56,
                  },
                  "-=0.34",
                );
            },
            {
              threshold: mobile ? 0.08 : 0.18,
              rootMargin: mobile
                ? "0px 0px -3% 0px"
                : "0px 0px -7% 0px",
            },
          );

          const mapX = desktop
            ? -42
            : tablet
              ? -22
              : 0;

          const infoX = desktop
            ? 42
            : tablet
              ? 22
              : 0;

          gsap.set(locationCard, {
            y: mobile ? 52 : 44,
            scale: mobile ? 0.965 : 0.98,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });

          gsap.set(mapFrame, {
            x: mapX,
            y: mobile ? 32 : tablet ? 18 : 0,
            scale: mobile ? 1.025 : 0.985,
            autoAlpha: 0,
          });

          gsap.set(information, {
            x: infoX,
            y: mobile ? 34 : tablet ? 18 : 0,
            autoAlpha: 0,
          });

          gsap.set(mapButton, {
            y: -16,
            scale: 0.92,
            autoAlpha: 0,
          });

          gsap.set(title, {
            y: 22,
            autoAlpha: 0,
          });

          gsap.set(locationBadge, {
            y: -10,
            scale: 0.9,
            autoAlpha: 0,
          });

          gsap.set(address, {
            y: 18,
            autoAlpha: 0,
          });

          gsap.set(contactRows, {
            y: mobile ? 22 : 18,
            autoAlpha: 0,
          });

          gsap.set(meetingButton, {
            y: mobile ? 28 : 22,
            scale: 0.95,
            autoAlpha: 0,
          });

          observeOnce(
            locationCard,
            () => {
              gsap
                .timeline({
                  defaults: {
                    ease: "power3.out",
                  },
                })
                .to(locationCard, {
                  y: 0,
                  scale: 1,
                  autoAlpha: 1,
                  duration: mobile ? 0.72 : 0.78,
                  ease: "power4.out",
                })
                .to(
                  mapFrame,
                  {
                    x: 0,
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: mobile ? 0.72 : 0.82,
                  },
                  0.12,
                )
                .to(
                  information,
                  {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    duration: mobile ? 0.68 : 0.72,
                  },
                  mobile ? 0.24 : 0.18,
                )
                .to(
                  mapButton,
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.44,
                    ease: "back.out(1.45)",
                  },
                  mobile ? 0.3 : 0.34,
                )
                .to(
                  title,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.48,
                  },
                  mobile ? 0.38 : 0.32,
                )
                .to(
                  locationBadge,
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: "back.out(1.45)",
                  },
                  mobile ? 0.44 : 0.38,
                )
                .to(
                  address,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.46,
                  },
                  mobile ? 0.5 : 0.43,
                )
                .to(
                  contactRows,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.44,
                    stagger: 0.09,
                  },
                  mobile ? 0.58 : 0.5,
                )
                .to(
                  meetingButton,
                  {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.52,
                  },
                  mobile ? 0.72 : 0.64,
                )
                .to(
                  meetingButton,
                  {
                    scale: 1.025,
                    duration: 0.16,
                    ease: "power2.out",
                  },
                  1.08,
                )
                .to(
                  meetingButton,
                  {
                    scale: 1,
                    duration: 0.18,
                    ease: "power2.inOut",
                  },
                  1.24,
                );
            },
            {
              threshold: mobile ? 0.06 : 0.14,
              rootMargin: mobile
                ? "0px 0px -3% 0px"
                : "0px 0px -8% 0px",
            },
          );

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
          max-w-[1220px]
        "
      >
        <div
          className="
            grid
            gap-5
            lg:grid-cols-[1fr_0.75fr]
            lg:items-end
            lg:gap-8
          "
        >
          <div>
            <div
              className="
                contact-hub-label
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
                Physical Presence
              </span>
            </div>

            <h2
              className="
                contact-hub-heading
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
              Our Hub in Ghana
            </h2>
          </div>

          <p
            className="
              contact-hub-copy
              max-w-[480px]
              text-[13px]
              leading-6
              text-brand-muted
              md:text-[14px]
              lg:justify-self-end
            "
          >
            Headquartered in Accra, serving enterprise organizations and
            scaling institutions across West Africa and overseas.
          </p>
        </div>

        <div
          className="
            contact-location-card
            mt-9
            overflow-hidden
            rounded-[18px]
            border
            border-brand-border-light
            bg-white
            shadow-[0_6px_24px_rgba(15,35,55,0.04)]
            sm:mt-10
          "
        >
          <div
            className="
              grid
              lg:grid-cols-[1.25fr_0.85fr]
            "
          >
            <div
              className="
                contact-map-frame
                relative
                min-h-80
                overflow-hidden
                bg-brand-surface-blue
                sm:min-h-95
                lg:min-h-[390px]
              "
            >
              <iframe
                title="Lider Technologies Ltd on Google Maps"
                src={mapsEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="
                  absolute
                  inset-0
                  size-full
                  border-0
                "
              />

              <a
                href={mapsPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  contact-map-button
                  absolute
                  left-3
                  top-3
                  z-10
                  inline-flex
                  min-h-11
                  items-center
                  gap-2
                  rounded-md
                  border
                  border-brand-border-light
                  bg-white
                  px-3.5
                  py-2.5
                  text-[11px]
                  font-semibold
                  text-brand-primary
                  shadow-sm
                  transition-[transform,box-shadow]
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-primary
                  focus-visible:ring-offset-2
                  sm:left-4
                  sm:top-4
                "
              >
                Open in Maps

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M8 16 16 8M10 8h6v6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div
              className="
                contact-hub-information
                flex
                flex-col
                p-5
                sm:p-6
                md:p-8
                lg:p-9
              "
            >
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="
                    contact-hub-location-title
                    text-[20px]
                    font-bold
                    tracking-[-0.03em]
                    text-brand-ink
                    md:text-[22px]
                  "
                >
                  Lider Labs Center
                </h3>

                <span
                  className="
                    contact-hub-location-badge
                    shrink-0
                    rounded
                    bg-brand-primary-light
                    px-2.5
                    py-1.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-brand-primary
                    md:text-[10px]
                  "
                >
                  ACC · GH
                </span>
              </div>

              <p
                className="
                  contact-hub-address
                  mt-5
                  max-w-[360px]
                  text-[12px]
                  leading-6
                  text-brand-muted
                  md:text-[13px]
                "
              >
                UQ122 University Farm Road Adjiringanor School Junction
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href="tel:+233552887039"
                  className="
                    contact-hub-contact-row
                    group
                    flex
                    min-h-11
                    items-center
                    gap-3
                    rounded-lg
                    text-[12px]
                    text-brand-text
                    transition-colors
                    duration-200
                    hover:text-brand-primary
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-primary
                    focus-visible:ring-offset-2
                    md:text-[13px]
                  "
                >
                  <span
                    className="
                      flex
                      size-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      bg-brand-primary-light
                      text-brand-primary
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 4h3l1.5 4-2 1.5a14 14 0 0 0 5 5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.3 19 5 13.7 5 7c0-1.1.9-2 2-2Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  +233 55 288 7039
                </a>

                <a
                  href="mailto:accra@lider.com"
                  className="
                    contact-hub-contact-row
                    group
                    flex
                    min-h-11
                    items-center
                    gap-3
                    rounded-lg
                    text-[12px]
                    text-brand-text
                    transition-colors
                    duration-200
                    hover:text-brand-primary
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-primary
                    focus-visible:ring-offset-2
                    md:text-[13px]
                  "
                >
                  <span
                    className="
                      flex
                      size-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      bg-brand-primary-light
                      text-brand-primary
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-4"
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
                  </span>

                  accra@lider.com
                </a>
              </div>

              <div className="mt-auto pt-8 sm:pt-10">
                <Link
                  to="/contact/sales"
                  className="
                    contact-hub-meeting-button
                    inline-flex
                    min-h-11
                    w-full
                    items-center
                    justify-center
                    gap-2.5
                    rounded-lg
                    bg-brand-primary
                    px-5
                    py-3.5
                    text-[12px]
                    font-semibold
                    text-white
                    transition-[transform,background-color,box-shadow]
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-brand-primary-dark
                    hover:shadow-brand-button
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-primary
                    focus-visible:ring-offset-2
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <rect
                      x="4"
                      y="6"
                      width="16"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />

                    <path
                      d="M8 4v4M16 4v4M4 10h16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>

                  Book an In-Person Meeting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHubSection;