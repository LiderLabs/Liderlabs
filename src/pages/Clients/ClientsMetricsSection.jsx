import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap";

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

function ClientsMetricsSection() {
  const sectionRef = useRef(null);
  const valueRefs = useRef([]);
  const animationFramesRef = useRef(new Set());

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const cards = gsap.utils.toArray(
        ".clients-metric-card",
      );

      const labels = gsap.utils.toArray(
        ".clients-metric-label",
      );

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const setFinalValues = () => {
        valueRefs.current.forEach((element, index) => {
          const metric = metrics[index];

          if (!element || !metric) return;

          element.textContent =
            `${metric.value}${metric.suffix}`;
        });
      };

      if (prefersReducedMotion) {
        setFinalValues();

        gsap.set([cards, labels], {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
        });

        return;
      }

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

      const countNumber = (
        element,
        finalValue,
        suffix,
        delay = 0,
      ) => {
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

          const currentValue = Math.round(
            finalValue * easedProgress,
          );

          element.textContent =
            `${currentValue}${suffix}`;

          if (progress < 1) {
            requestFrame(tick);
            return;
          }

          element.textContent =
            `${finalValue}${suffix}`;
        };

        requestFrame(tick);
      };

      let hasAnimated = false;

      const startMetricsAnimation = () => {
        if (hasAnimated) return;

        hasAnimated = true;

        valueRefs.current.forEach(
          (element, index) => {
            const metric = metrics[index];

            if (!element || !metric) return;

            element.textContent =
              `0${metric.suffix}`;
          },
        );

        gsap.fromTo(
          cards,
          {
            y: 24,
            scale: 0.975,
          },
          {
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform",
          },
        );

        gsap.fromTo(
          labels,
          {
            y: 10,
          },
          {
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform",
          },
        );

        metrics.forEach((metric, index) => {
          const element =
            valueRefs.current[index];

          if (!element) return;

          countNumber(
            element,
            metric.value,
            metric.suffix,
            index * 100,
          );

          gsap.fromTo(
            element,
            {
              scale: 0.88,
            },
            {
              scale: 1,
              duration: 0.58,
              delay: index * 0.1,
              ease: "back.out(1.6)",
              clearProps: "transform",
            },
          );
        });
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;

          startMetricsAnimation();
          observer.disconnect();
        },
        {
          rootMargin: "0px 0px -20% 0px",
          threshold: 0.05,
        },
      );

      observer.observe(section);

      return () => {
        observer.disconnect();

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
        border-y
        border-brand-border-light
        bg-brand-surface
        px-4
        py-9
        sm:px-6
        sm:py-10
        md:px-8
        lg:px-10
        lg:py-12
      "
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {metrics.map((metric, index) => {
            const isLeftColumn =
              index % 2 === 0;

            const isTopRow =
              index < 2;

            const isLastMetric =
              index === metrics.length - 1;

            return (
              <div
                key={metric.label}
                className={[
                  `
                    clients-metric-card
                    flex
                    min-h-30
                    flex-col
                    items-center
                    justify-center
                    px-3
                    py-5
                    text-center
                    sm:px-4
                  `,

                  isLeftColumn
                    ? "border-r border-brand-border-light"
                    : "",

                  isTopRow
                    ? "border-b border-brand-border-light md:border-b-0"
                    : "",

                  !isLastMetric
                    ? "md:border-r md:border-brand-border-light"
                    : "md:border-r-0",
                ].join(" ")}
              >
                <p
                  ref={(element) => {
                    valueRefs.current[index] =
                      element;
                  }}
                  className="
                    clients-metric-value
                    text-[38px]
                    font-bold
                    leading-none
                    tracking-[-0.045em]
                    text-brand-primary
                    sm:text-[40px]
                    md:text-[44px]
                    lg:text-[46px]
                  "
                >
                  {metric.value}
                  {metric.suffix}
                </p>

                <p
                  className="
                    clients-metric-label
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
    </section>
  );
}

export default ClientsMetricsSection;