import { useRef } from "react";
import { Link } from "react-router";

import { gsap, useGSAP } from "../../lib/gsap";

import unicreditLogo from "../../assets/logos/clients/client-logo-1.png";
import gcbLogo from "../../assets/logos/clients/client-logo-2.png";
import umbLogo from "../../assets/logos/clients/client-logo-3.png";
import transitionsLogo from "../../assets/logos/clients/client-logo-6.png";
import visualSoftwareLogo from "../../assets/logos/clients/client-logo-7.png";

const partners = [
  { name: "UniCredit", logo: unicreditLogo },
  { name: "GCB Bank", logo: gcbLogo },
  { name: "UMB", logo: umbLogo },
  { name: "Transitions", logo: transitionsLogo },
  { name: "Visual Software", logo: visualSoftwareLogo },
];

function ServicesCTASection() {
  const sectionRef = useRef(null);

  const signalLineRef = useRef(null);
  const signalDotRef = useRef(null);
  const terminalRef = useRef(null);

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

          const card = section.querySelector(
            ".services-cta-card",
          );

          const heading = section.querySelector(
            ".services-cta-heading",
          );

          const statement = section.querySelector(
            ".services-cta-statement",
          );

          const copy = section.querySelector(
            ".services-cta-copy",
          );

          const button = section.querySelector(
            ".services-cta-button",
          );

          const partnerLabel = section.querySelector(
            ".services-cta-partner-label",
          );

          const partnerLogos = gsap.utils.toArray(
            ".services-cta-partner",
          );

          const glowLeft = section.querySelector(
            ".services-cta-glow-left",
          );

          const glowRight = section.querySelector(
            ".services-cta-glow-right",
          );

          if (reduceMotion) {
            gsap.set(
              [
                card,
                heading,
                statement,
                copy,
                button,
                partnerLabel,
                partnerLogos,
                glowLeft,
                glowRight,
              ],
              {
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
                autoAlpha: 1,
              },
            );

            gsap.set(signalLineRef.current, {
              scaleY: 1,
            });

            gsap.set(signalDotRef.current, {
              autoAlpha: 0,
            });

            gsap.set(terminalRef.current, {
              scale: 1,
              autoAlpha: 1,
            });

            return;
          }

          gsap.set(card, {
            y: mobile ? 46 : tablet ? 40 : 36,
            scale: mobile ? 0.965 : 0.98,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });

          gsap.set(heading, {
            y: mobile ? 36 : 28,
            autoAlpha: 0,
          });

          gsap.set(statement, {
            y: mobile ? 24 : 18,
            autoAlpha: 0,
          });

          gsap.set(copy, {
            y: mobile ? 22 : 18,
            autoAlpha: 0,
          });

          gsap.set(button, {
            y: mobile ? 26 : 16,
            scale: mobile ? 0.95 : 0.97,
            autoAlpha: 0,
          });

          gsap.set(partnerLabel, {
            y: 12,
            autoAlpha: 0,
          });

          gsap.set(partnerLogos, {
            y: mobile ? 16 : 10,
            scale: mobile ? 0.82 : 0.9,
            autoAlpha: 0,
          });

          gsap.set(glowLeft, {
            x: mobile ? -24 : -18,
            scale: 0.85,
            autoAlpha: 0,
          });

          gsap.set(glowRight, {
            x: mobile ? 24 : 18,
            scale: 0.85,
            autoAlpha: 0,
          });

          gsap.set(signalLineRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });

          gsap.set(signalDotRef.current, {
            y: 0,
            scale: mobile ? 0.95 : 0.85,
            autoAlpha: 1,
            transformOrigin: "50% 50%",
          });

          gsap.set(terminalRef.current, {
            scale: 0.45,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });

          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: section,

              start: mobile
                ? "top 84%"
                : tablet
                  ? "top 76%"
                  : "top 66%",

              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },

            defaults: {
              ease: "power3.out",
            },
          });

          reveal
            .to(
              glowLeft,
              {
                x: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1,
              },
              0,
            )
            .to(
              glowRight,
              {
                x: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1.1,
              },
              0.04,
            )
            .to(
              card,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: mobile ? 0.7 : 0.72,
              },
              0.05,
            )
            .to(
              heading,
              {
                y: 0,
                autoAlpha: 1,
                duration: mobile ? 0.7 : 0.65,
              },
              0.22,
            )
            .to(
              statement,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.46,
              },
              0.35,
            )
            .to(
              copy,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.5,
              },
              0.43,
            )
            .to(
              button,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.48,
              },
              0.52,
            )
            .to(
              partnerLabel,
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.36,
              },
              0.61,
            )
            .to(
              partnerLogos,
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.4,
                stagger: mobile ? 0.065 : 0.055,
                ease: "back.out(1.4)",
              },
              0.67,
            );

          const signalDistance = desktop
            ? 88
            : tablet
              ? 76
              : 64;

          const signal = gsap.timeline({
            scrollTrigger: {
              trigger: section,

              start: mobile
                ? "top 92%"
                : tablet
                  ? "top 86%"
                  : "top 78%",

              end: mobile
                ? "top 66%"
                : tablet
                  ? "top 58%"
                  : "top 40%",

              scrub: mobile
                ? 0.65
                : tablet
                  ? 0.58
                  : 0.5,

              invalidateOnRefresh: true,
            },
          });

          signal
            .to(
              signalLineRef.current,
              {
                scaleY: 1,
                duration: 0.72,
                ease: "none",
              },
              0,
            )
            .to(
              signalDotRef.current,
              {
                y: signalDistance,
                duration: 0.72,
                ease: "none",
              },
              0,
            )
            .to(
              signalDotRef.current,
              {
                scale: mobile ? 1.7 : 1.45,
                duration: 0.08,
                ease: "power2.out",
              },
              0.74,
            )
            .to(
              terminalRef.current,
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.12,
                ease: "back.out(2)",
              },
              0.76,
            )
            .to(
              terminalRef.current,
              {
                scale: mobile ? 1.6 : 1.4,
                duration: 0.08,
                ease: "power2.out",
              },
              0.88,
            )
            .to(
              terminalRef.current,
              {
                scale: 1,
                duration: 0.12,
                ease: "power2.inOut",
              },
              0.95,
            )
            .to(
              signalDotRef.current,
              {
                scale: 0.6,
                autoAlpha: 0,
                duration: 0.08,
              },
              0.92,
            );

          gsap.to(glowLeft, {
            x: mobile ? 10 : 18,
            y: mobile ? 6 : 10,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(glowRight, {
            x: mobile ? -10 : -16,
            y: mobile ? -6 : -8,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
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
        pb-14
        pt-16
        sm:px-6
        sm:pb-16
        sm:pt-20
        md:px-8
        md:py-20
        lg:px-10
        lg:py-20
      "
    >
      {/* Final Services signal */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-[1]
          h-16
          -translate-x-1/2
          sm:h-20
          lg:h-22
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            -translate-x-1/2
            border-l-2
            border-dashed
            border-brand-cyan/30
          "
        />

        <div
          ref={signalLineRef}
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-0.5
            -translate-x-1/2
            origin-top
            bg-brand-cyan
          "
        />

        <div
          ref={signalDotRef}
          className="
            absolute
            left-1/2
            top-0
            size-3.5
            -translate-x-1/2
            rounded-full
            bg-brand-cyan
            shadow-[0_0_0_7px_rgba(16,146,191,0.12),0_0_24px_rgba(16,146,191,0.46)]
          "
        >
          <span
            className="
              absolute
              left-1/2
              top-1/2
              size-1
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white
            "
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* Final terminal */}
        <div
          ref={terminalRef}
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-0
            z-30
            flex
            size-5
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-brand-cyan/50
            bg-white
            shadow-[0_0_0_7px_rgba(16,146,191,0.10),0_0_26px_rgba(16,146,191,0.30)]
          "
        >
          <span className="size-2 rounded-full bg-brand-cyan" />
        </div>

        <div
          className="
            services-cta-card
            relative
            overflow-hidden
            rounded-[22px]
            bg-gradient-to-r
            from-brand-primary
            to-brand-navy
            px-5
            py-11
            text-center
            shadow-[0_14px_35px_rgba(0,45,51,0.18)]
            sm:px-6
            sm:py-12
            md:px-10
            lg:px-14
            lg:py-14
          "
        >
          <div
            aria-hidden="true"
            className="
              services-cta-glow-left
              pointer-events-none
              absolute
              -left-24
              -top-24
              size-65
              rounded-full
              bg-brand-cyan/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              services-cta-glow-right
              pointer-events-none
              absolute
              -bottom-24
              -right-16
              size-65
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-55
              w-[420px]
              max-w-full
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-brand-cyan/10
              blur-[80px]
            "
          />

          <div className="relative z-10 mx-auto max-w-[760px]">
            <h2
              className="
                services-cta-heading
                text-[32px]
                font-bold
                leading-[1.02]
                tracking-[-0.04em]
                text-white
                min-[390px]:text-[34px]
                sm:text-[38px]
                md:text-[42px]
                lg:text-[44px]
              "
            >
              Work with{" "}
              <span
                className="
                  underline
                  decoration-brand-cyan
                  underline-offset-[7px]
                "
              >
                us
              </span>
            </h2>

            <p
              className="
                services-cta-statement
                mt-4
                text-[13px]
                font-semibold
                leading-6
                text-white
                md:text-[14px]
              "
            >
              Let&apos;s build reliable, future-proof software together!
            </p>

            <p
              className="
                services-cta-copy
                mx-auto
                mt-3
                max-w-[620px]
                text-[12px]
                leading-6
                text-white/70
                md:text-[13px]
              "
            >
              Whether you need to overhaul a high-volume payment processor or
              launch an enterprise platform, our seasoned architects are ready.
            </p>

            <div className="services-cta-button mt-6">
              <Link
                to="/contact/sales"
                className="
                  inline-flex
                  min-h-11
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-brand-ink
                  px-6
                  py-3
                  text-[12px]
                  font-semibold
                  text-white
                  transition-[transform,box-shadow]
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-navy
                  min-[420px]:w-auto
                "
              >
                Fill out the contact form
                {/* <span aria-hidden="true">→</span> */}
              </Link>
            </div>

            <div
              className="
                mt-9
                flex
                flex-col
                items-center
                justify-center
                gap-4
                sm:flex-row
                sm:flex-wrap
                sm:gap-x-5
                sm:gap-y-4
              "
            >
              <span
                className="
                  services-cta-partner-label
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white/45
                  md:text-[10px]
                "
              >
                Join our satisfied partners
              </span>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-4
                  gap-y-3
                  sm:gap-x-5
                "
              >
                {partners.map((partner) => (
                  <img
                    key={partner.name}
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="
                      services-cta-partner
                      max-h-4.5
                      max-w-14.5
                      object-contain
                      opacity-75
                    "
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesCTASection;