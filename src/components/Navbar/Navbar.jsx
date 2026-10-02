import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router";

import logo from "../../assets/logos/LIDER-NAVBAR.png";

const navLinks = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Clients",
    path: "/clients",
  },
];

const desktopNavClass = ({ isActive }) =>
  [
    "inline-flex min-h-10 items-center justify-center",
    "rounded-full px-4 py-2",
    "text-[14px] font-medium",
    "transition-colors duration-200",
    "motion-reduce:transition-none",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-brand-primary",
    "focus-visible:ring-offset-2",
    isActive
      ? "bg-brand-primary-light text-brand-primary"
      : [
          "text-brand-text",
          "hover:bg-brand-surface",
          "hover:text-brand-primary",
        ].join(" "),
  ].join(" ");

const mobileNavClass = ({ isActive }) =>
  [
    "flex min-h-11 items-center",
    "rounded-xl px-4 py-3",
    "text-[14px] font-medium",
    "transition-colors duration-200",
    "motion-reduce:transition-none",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-brand-primary",
    "focus-visible:ring-inset",
    isActive
      ? "bg-brand-primary-light text-brand-primary"
      : [
          "text-brand-text",
          "hover:bg-brand-surface",
          "hover:text-brand-primary",
        ].join(" "),
  ].join(" ");

function Navbar() {
  const menuButtonRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const { pathname } = useLocation();

  /*
   * Glass navbar state.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /*
   * Close mobile navigation after routing.
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /*
   * Escape closes the mobile menu and
   * returns focus to its trigger.
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setIsMenuOpen(false);

      requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isMenuOpen]);

  /*
   * Prevent a mobile-open state from surviving
   * when the layout moves into desktop mode.
   */
  useEffect(() => {
    const desktopQuery = window.matchMedia(
      "(min-width: 768px)",
    );

    const handleBreakpointChange = (event) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopQuery.addEventListener(
      "change",
      handleBreakpointChange,
    );

    return () => {
      desktopQuery.removeEventListener(
        "change",
        handleBreakpointChange,
      );
    };
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        [
          "transition-[background-color,border-color,box-shadow,backdrop-filter]",
          "duration-300",
          "ease-out",
          "motion-reduce:transition-none",
        ].join(" "),
        isScrolled
          ? [
              "border-b",
              "border-brand-border-light/80",
              "bg-white/80",
              "shadow-[0_8px_30px_rgba(15,35,55,0.08)]",
              "backdrop-blur-xl",
            ].join(" ")
          : [
              "border-b",
              "border-transparent",
              "bg-white",
            ].join(" "),
      ].join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className="
          relative
          mx-auto
          flex
          h-[78px]
          max-w-[1360px]
          items-center
          justify-between
          px-4
          sm:px-6
          md:px-8
          lg:px-10
        "
      >
        {/* Logo */}

        <Link
          to="/"
          aria-label="Lider Technologies home"
          className="
            relative
            z-10
            flex
            shrink-0
            items-center
            rounded-sm
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-primary
            focus-visible:ring-offset-2
          "
        >
          <img
            src={logo}
            alt="Lider Technologies"
            draggable="false"
            className="
              h-auto
              w-[150px]
              select-none
              object-contain
              sm:w-[165px]
              md:w-[175px]
              lg:w-[185px]
            "
          />
        </Link>

        {/* Desktop navigation */}

        <div
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            items-center
            gap-2
            md:flex
          "
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={desktopNavClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Work With Us */}

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="
              group
              inline-flex
              min-h-10
              items-center
              justify-center
              rounded-full
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand-primary
              focus-visible:ring-offset-2
            "
          >
            <span
              className="
                inline-flex
                min-h-10
                items-center
                justify-center
                rounded-full
                bg-brand-primary
                px-6
                py-2.5
                text-[13px]
                font-semibold
                text-white
                shadow-brand-button
                transition-[transform,background-color,box-shadow]
                duration-200
                ease-out
                group-hover:-translate-y-0.5
                group-hover:bg-brand-primary-dark
                group-hover:shadow-[0_8px_20px_rgba(23,109,140,0.24)]
                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              Work with us
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => {
            setIsMenuOpen(
              (current) => !current,
            );
          }}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          className="
            flex
            size-11
            items-center
            justify-center
            rounded-lg
            border
            border-brand-border-light
            bg-white
            text-brand-ink
            transition-[background-color,border-color,color]
            duration-200
            motion-reduce:transition-none
            hover:border-brand-primary/15
            hover:bg-brand-surface
            hover:text-brand-primary
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-brand-primary
            focus-visible:ring-offset-2
            md:hidden
          "
        >
          {isMenuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
              aria-hidden="true"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5"
              aria-hidden="true"
            >
              <path
                d="M5 7h14M5 12h14M5 17h14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile navigation */}

      <div
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
        className={[
          "overflow-hidden md:hidden",
          [
            "transition-[max-height,opacity,border-color]",
            "duration-300",
            "ease-out",
            "motion-reduce:transition-none",
          ].join(" "),
          isMenuOpen
            ? [
                "max-h-105",
                "border-t",
                "border-brand-border-light",
                "opacity-100",
              ].join(" ")
            : [
                "pointer-events-none",
                "max-h-0",
                "border-t",
                "border-transparent",
                "opacity-0",
              ].join(" "),
        ].join(" ")}
      >
        <div
          className={[
            "px-4 pb-6 pt-4 sm:px-6",
            isScrolled
              ? "bg-white/90 backdrop-blur-xl"
              : "bg-white",
          ].join(" ")}
        >
          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              end
              tabIndex={
                isMenuOpen ? undefined : -1
              }
              className={mobileNavClass}
            >
              Home
            </NavLink>

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                tabIndex={
                  isMenuOpen ? undefined : -1
                }
                className={mobileNavClass}
              >
                {link.name}
              </NavLink>
            ))}

           <Link
  to="/contact"
  tabIndex={isMenuOpen ? undefined : -1}
  className="
    group
    mt-3
    inline-flex
    min-h-11
    items-center
    justify-center
    rounded-full
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-brand-primary
    focus-visible:ring-offset-2
  "
>
  <span
    className="
      inline-flex
      min-h-11
      w-full
      items-center
      justify-center
      rounded-full
      bg-brand-primary
      px-5
      py-3
      text-[13px]
      font-semibold
      text-white
      shadow-brand-button
      transition-[transform,background-color,box-shadow]
      duration-200
      ease-out
      group-hover:-translate-y-0.5
      group-hover:bg-brand-primary-dark
      group-hover:shadow-[0_8px_20px_rgba(23,109,140,0.24)]
      motion-reduce:transform-none
      motion-reduce:transition-none
    "
  >
    Work with us
  </span>
          </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;