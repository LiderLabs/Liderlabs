import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

const mobileSignalPath = `
  M195 0
  C195 70 160 105 165 165
  C170 225 230 255 225 320
  C220 390 165 430 170 495
  C175 540 205 565 195 580
`;

const tabletSignalPath = `
  M384 0
  C384 70 330 110 335 170
  C340 235 430 265 425 330
  C420 395 335 440 340 500
  C345 545 395 565 384 580
`;

const desktopSignalPath = `
  M820 0
  C790 85 720 115 675 175
  C625 245 645 320 700 380
  C750 435 720 505 640 580
`;

function AboutSignal({
  path,
  pathRef,
  dotRef,
  viewBox,
  filterId,
  className,
  opacity,
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

      <g ref={dotRef} filter={`url(#${filterId})`}>
        <circle
          cx="0"
          cy="0"
          r="10"
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

function AboutHeroSection() {
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

      const label = section.querySelector(".about-hero-label");
      const heading = section.querySelector(".about-hero-heading");
      const copy = section.querySelector(".about-hero-copy");

      const glowLeft = section.querySelector(
        ".about-hero-glow-left",
      );

      const glowRight = section.querySelector(
        ".about-hero-glow-right",
      );

      const width = window.innerWidth;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [
            label,
            heading,
            copy,
            glowLeft,
            glowRight,
          ],
          {
            x: 0,
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

      gsap.set(label, {
        y: 14,
        scale: 0.96,
        autoAlpha: 0,
      });

      gsap.set(heading, {
        y: isMobile ? 32 : isTablet ? 36 : 42,
        autoAlpha: 0,
      });

      gsap.set(copy, {
        y: isMobile ? 20 : 24,
        autoAlpha: 0,
      });

      gsap.set(glowLeft, {
        x: isMobile ? -18 : -35,
        y: -15,
        scale: 0.82,
        autoAlpha: 0,
      });

      gsap.set(glowRight, {
        x: isMobile ? 18 : 35,
        y: 20,
        scale: 0.84,
        autoAlpha: 0,
      });

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(
          glowLeft,
          {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: isMobile ? 1 : 1.4,
          },
          0,
        )
        .to(
          glowRight,
          {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: isMobile ? 1.05 : 1.5,
          },
          0.05,
        )
        .to(
          label,
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.45,
          },
          0.1,
        )
        .to(
          heading,
          {
            y: 0,
            autoAlpha: 1,
            duration: isMobile ? 0.75 : 0.9,
          },
          0.2,
        )
        .to(
          copy,
          {
            y: 0,
            autoAlpha: 1,
            duration: isMobile ? 0.6 : 0.7,
          },
          0.42,
        );

      let signalPath = null;
      let signalDot = null;

      if (isMobile) {
        signalPath = mobilePathRef.current;
        signalDot = mobileDotRef.current;
      }

      if (isTablet) {
        signalPath = tabletPathRef.current;
        signalDot = tabletDotRef.current;
      }

      if (isDesktop) {
        signalPath = desktopPathRef.current;
        signalDot = desktopDotRef.current;
      }

      if (signalPath && signalDot) {
        gsap.to(signalPath, {
          strokeDashoffset: isDesktop ? -130 : -110,
          duration: isDesktop ? 8 : 7,
          repeat: -1,
          ease: "none",
        });

        gsap.set(signalDot, {
          scale: 0.8,
          autoAlpha: 0,
          transformOrigin: "50% 50%",
        });

        gsap
          .timeline({
            delay: isMobile ? 0.3 : 0.45,
          })
          .to(signalDot, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.22,
            ease: "power2.out",
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

              duration: isMobile
                ? 2.2
                : isTablet
                  ? 2.4
                  : 2.6,

              ease: "power1.inOut",
            },
            0,
          )
          .to(
            signalDot,
            {
              scale: 1.3,
              duration: 0.12,
              ease: "power2.out",
            },
            isMobile ? 1.95 : 2.3,
          )
          .to(
            signalDot,
            {
              scale: 1,
              duration: 0.15,
              ease: "power2.inOut",
            },
            isMobile ? 2.07 : 2.42,
          );
      }

      gsap.to(glowLeft, {
        x: isMobile ? 8 : 18,
        y: isMobile ? 6 : 10,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(glowRight, {
        x: isMobile ? -8 : -16,
        y: isMobile ? -6 : -10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
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
        bg-[linear-gradient(180deg,#eef8fb_0%,#f7fbfc_45%,#ffffff_100%)]
        px-4
        py-16
        sm:px-6
        sm:py-18
        md:px-8
        md:py-20
        lg:px-10
        lg:py-24
      "
    >
      <div
        aria-hidden="true"
        className="
          about-hero-glow-left
          pointer-events-none
          absolute
          -left-30
          top-10
          size-90
          rounded-full
          bg-brand-cyan/[0.07]
          blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          about-hero-glow-right
          pointer-events-none
          absolute
          -right-25
          top-20
          size-105
          rounded-full
          bg-brand-primary/[0.06]
          blur-[110px]
        "
      />

      <AboutSignal
        path={mobileSignalPath}
        pathRef={mobilePathRef}
        dotRef={mobileDotRef}
        viewBox="0 0 390 580"
        filterId="about-mobile-signal-glow"
        opacity={0.2}
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

      <AboutSignal
        path={tabletSignalPath}
        pathRef={tabletPathRef}
        dotRef={tabletDotRef}
        viewBox="0 0 768 580"
        filterId="about-tablet-signal-glow"
        opacity={0.21}
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

      <AboutSignal
        path={desktopSignalPath}
        pathRef={desktopPathRef}
        dotRef={desktopDotRef}
        viewBox="0 0 1280 580"
        filterId="about-desktop-signal-glow"
        opacity={0.22}
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

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[980px]
          text-center
        "
      >
        <div
          className="
            about-hero-label
            inline-flex
            rounded-full
            bg-brand-primary-light
            px-3
            py-1.5
          "
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
            About
          </span>
        </div>

        <h1
          className="
            about-hero-heading
            mx-auto
            mt-5
            max-w-[900px]
            text-[38px]
            font-bold
            leading-[1]
            tracking-[-0.045em]
            text-brand-ink
            min-[390px]:text-[42px]
            sm:text-[46px]
            md:text-[52px]
            lg:text-[58px]
          "
        >
          We build the technology that African systems run on.
        </h1>

        <p
          className="
            about-hero-copy
            mx-auto
            mt-5
            max-w-[700px]
            text-[13px]
            leading-6
            text-brand-muted
            sm:mt-6
            sm:text-[14px]
            sm:leading-7
            md:text-[15px]
          "
        >
          From education to health and many more... we build software that
          companies thrive on... we build software that empowers businesses.
        </p>
      </div>
    </section>
  );
}

export default AboutHeroSection;