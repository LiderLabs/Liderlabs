import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router";

import logo from "../../assets/logos/LIDER-FOOTER.png";

const companyLinks = [
  { name: "About", path: "/about" },
  { name: "Principles", path: "/about#principles" },
  { name: "Careers", path: "/about#careers" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "Custom Software",
  "Web & E-Commerce Solutions",
  "Technology Consulting",
  "Business Process Automation",
  "Networking & Infrastructure",
];

function ScrollToTopButton({ footerRef }) {
  const [isFooterVisible, setIsFooterVisible] =
    useState(false);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(
          entry.isIntersecting,
        );
      },
      {
        threshold: 0.05,
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, [footerRef]);

  const handleScrollToTop = () => {
    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth",
    });
  };

  if (!isFooterVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll back to top"
      className="
        fixed
        bottom-5
        right-5
        z-50
        flex
        size-11
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-brand-primary
        text-white
        shadow-[0_10px_30px_rgba(0,0,0,0.22)]
        transition-[transform,background-color,box-shadow]
        duration-200
        ease-out
        hover:-translate-y-1
        hover:bg-brand-cyan
        hover:shadow-[0_14px_35px_rgba(0,0,0,0.28)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-cyan
        focus-visible:ring-offset-2
        motion-reduce:transition-none
        sm:bottom-6
        sm:right-6
        sm:size-12
        lg:bottom-8
        lg:right-8
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="size-5"
      >
        <path
          d="m7 14 5-5 5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function Footer() {
  const footerRef = useRef(null);

  const currentYear =
    new Date().getFullYear();

  const mapsUrl =
    "https://maps.app.goo.gl/cBDwh58qmGsgFzWQ8";

  return (
    <>
      <footer
        ref={footerRef}
        className="bg-brand-navy text-white"
      >
        <div
          className="
            mx-auto
            max-w-[1360px]
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
            className="
              grid
              gap-10
              sm:gap-12
              md:grid-cols-2
              lg:grid-cols-[1.45fr_0.7fr_1.05fr_0.8fr]
              lg:gap-14
            "
          >
            {/* Brand */}

            <div>
              <Link
                to="/"
                aria-label="Lider Technologies home"
                className="
                  inline-block
                  rounded-sm
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-cyan
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-navy
                "
              >
                <img
                  src={logo}
                  alt="Lider Technologies"
                  draggable="false"
                  className="
                    h-auto
                    w-[180px]
                    select-none
                    object-contain
                    sm:w-[190px]
                    md:w-[200px]
                    lg:w-[210px]
                  "
                />
              </Link>

              <p
                className="
                  mt-5
                  max-w-[350px]
                  text-[13px]
                  leading-6
                  text-white/75
                  md:mt-6
                  md:text-[14px]
                "
              >
                Building custom software and systems for forward-thinking
                enterprises across the globe.
              </p>
            </div>

            {/* Company */}

            <div>
              <h3
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white
                "
              >
                Company
              </h3>

              <ul className="mt-5 space-y-3 md:mt-6">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="
                        inline-flex
                        min-h-7
                        items-center
                        text-[13px]
                        text-white/75
                        transition-colors
                        duration-200
                        hover:text-white
                        focus-visible:outline-none
                        focus-visible:text-white
                        focus-visible:ring-2
                        focus-visible:ring-brand-cyan
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-brand-navy
                        md:text-[14px]
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}

            <div>
              <h3
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white
                "
              >
                Services
              </h3>

              <ul className="mt-5 space-y-3 md:mt-6">
                {services.map(
                  (service) => (
                    <li key={service}>
                      <Link
                        to="/services"
                        className="
                          inline-flex
                          min-h-7
                          items-center
                          text-[13px]
                          leading-5
                          text-white/75
                          transition-colors
                          duration-200
                          hover:text-white
                          focus-visible:outline-none
                          focus-visible:text-white
                          focus-visible:ring-2
                          focus-visible:ring-brand-cyan
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-brand-navy
                          md:text-[14px]
                        "
                      >
                        {service}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Contact */}

            <div>
              <h3
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white
                "
              >
                Contact
              </h3>

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  items-start
                  gap-3
                  text-[13px]
                  text-white/75
                  md:mt-6
                  md:text-[14px]
                "
              >
                <a
                  href="mailto:info@liderlabs.com"
                  className="
                    transition-colors
                    duration-200
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:text-white
                    focus-visible:ring-2
                    focus-visible:ring-brand-cyan
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-brand-navy
                  "
                >
                  info@liderlabs.com
                </a>

                <a
                  href="tel:+233552887039"
                  className="
                    transition-colors
                    duration-200
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:text-white
                    focus-visible:ring-2
                    focus-visible:ring-brand-cyan
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-brand-navy
                  "
                >
                  +233 55 288 7039
                </a>

                <p>Accra, Ghana</p>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    mt-1
                    inline-flex
                    min-h-7
                    items-center
                    gap-2
                    font-medium
                    text-brand-cyan
                    transition-colors
                    duration-200
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:text-white
                    focus-visible:ring-2
                    focus-visible:ring-brand-cyan
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-brand-navy
                  "
                >
                  Find us

                  <span
                    aria-hidden="true"
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                    "
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom footer */}

          <div
            className="
              mt-14
              flex
              flex-col
              gap-5
              border-t
              border-white/5
              pt-7
              text-[11px]
              text-white/60
              sm:mt-16
              md:flex-row
              md:items-center
              md:justify-between
              md:gap-6
              md:pt-8
              md:text-[12px]
              lg:mt-20
            "
          >
            <p>
              © {currentYear} Lider Technologies. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="#"
                className="
                  transition-colors
                  duration-200
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:text-white
                  focus-visible:ring-2
                  focus-visible:ring-brand-cyan
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-navy
                "
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="
                  transition-colors
                  duration-200
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:text-white
                  focus-visible:ring-2
                  focus-visible:ring-brand-cyan
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-brand-navy
                "
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTopButton
        footerRef={footerRef}
      />
    </>
  );
}

export default Footer;