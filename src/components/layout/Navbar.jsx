"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Program", href: "/program" },
  { label: "Books", href: "/books" },
  { label: "Members", href: "/members" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const innerRef = useRef(null);
  const desktopLinksRef = useRef(null);
  const underlineRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Helper to sync the underline position to the active link
  const syncUnderlineToActive = (immediate = false) => {
    if (!desktopLinksRef.current || !underlineRef.current) return;
    
    const activeEl = desktopLinksRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = desktopLinksRef.current.getBoundingClientRect();
      const left = rect.left - parentRect.left;
      const width = rect.width;

      gsap.to(underlineRef.current, {
        left: left,
        width: width,
        opacity: 1,
        duration: immediate ? 0 : 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    } else {
      gsap.to(underlineRef.current, {
        opacity: 0,
        width: 0,
        duration: immediate ? 0 : 0.3,
        overwrite: "auto"
      });
    }
  };

  // Entrance load animation and scroll animation
  useEffect(() => {
    // 1. Entrance animation using GSAP context for safe React cleanup
    const ctx = gsap.context(() => {
      // Intro fade and slide down of the header
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      // Stagger desktop link slide-in
      gsap.fromTo(
        ".nav-link-desktop",
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      // Scale up the CTA button slightly
      gsap.fromTo(
        ".nav-cta-desktop",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          delay: 0.6,
        }
      );
    });

    // 2. Scroll event handling
    let lastScrollY = window.scrollY;
    let isHidden = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Shrink & background styling on scroll
      if (currentScrollY > 20) {
        gsap.to(navRef.current, {
          height: "64px",
          backgroundColor: "rgba(250, 248, 255, 0.95)",
          boxShadow: "0 4px 20px -5px rgba(26, 27, 32, 0.1)",
          borderBottom: "1px solid rgba(193, 202, 175, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(innerRef.current, {
          height: "64px",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(navRef.current, {
          height: "80px",
          backgroundColor: "rgba(250, 248, 255, 0.9)",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid rgba(193, 202, 175, 0)",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(innerRef.current, {
          height: "80px",
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Smart hide/show scroll trigger
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && !isHidden) {
          // Hide
          gsap.to(navRef.current, { y: "-100%", duration: 0.35, ease: "power2.inOut" });
          isHidden = true;
        } else if (currentScrollY < lastScrollY && isHidden) {
          // Show
          gsap.to(navRef.current, { y: "0%", duration: 0.3, ease: "power2.out" });
          isHidden = false;
        }
      } else {
        if (isHidden) {
          gsap.to(navRef.current, { y: "0%", duration: 0.3, ease: "power2.out" });
          isHidden = false;
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sync underline when pathname changes or window resizes
  useEffect(() => {
    const timer = setTimeout(() => {
      syncUnderlineToActive(true);
    }, 100);

    const handleResize = () => {
      syncUnderlineToActive(true);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  // Mobile menu open/close animations
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (open) {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.killTweensOf(".nav-link-mobile");
      gsap.killTweensOf(".nav-cta-mobile");

      gsap.set(mobileMenuRef.current, { display: "block" });
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
      });

      gsap.fromTo(
        ".nav-link-mobile",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.05,
        }
      );
      gsap.fromTo(
        ".nav-cta-mobile",
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.25,
        }
      );
    } else {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
        }
      });
    }
  }, [open]);

  const handleMouseEnterLink = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = desktopLinksRef.current.getBoundingClientRect();
    const left = rect.left - parentRect.left;
    const width = rect.width;

    gsap.to(underlineRef.current, {
      left: left,
      width: width,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeaveContainer = () => {
    syncUnderlineToActive();
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-surface/90 shadow-sm h-[80px]"
    >
      <div
        ref={innerRef}
        className="flex justify-between items-center w-full px-margin-mobile md:px-lg max-w-container-max mx-auto h-[80px]"
      >
        <Link
          href="/"
          className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 flex-shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Camp2Code — Learn. Build. Launch."
            width={180}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div
          ref={desktopLinksRef}
          className="hidden md:flex items-center space-x-8 relative py-2"
          onMouseLeave={handleMouseLeaveContainer}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              data-active={isActive(href)}
              onMouseEnter={handleMouseEnterLink}
              className={`nav-link-desktop relative font-label-mono text-label-mono pb-2 pt-2 px-1 transition-colors duration-300 ${
                isActive(href)
                  ? "text-primary font-bold"
                  : "text-on-surface-variant font-medium hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
          {/* Sliding Underline */}
          <div
            ref={underlineRef}
            className="absolute bottom-0 h-[2px] bg-primary rounded-full pointer-events-none opacity-0"
            style={{ left: 0, width: 0 }}
          />
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center nav-cta-desktop">
          <Link
            href="/register"
            className="font-label-mono text-label-mono bg-coral-primary hover:bg-coral-primary-dark text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold inline-block hover:scale-[1.03] active:scale-[0.97] shadow-sm hover:shadow-md"
          >
            Start Your Journey
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-on-surface p-2 focus:outline-none"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between items-center">
            <span
              className={`w-6 h-[2px] bg-on-surface rounded-full transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-on-surface rounded-full transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-on-surface rounded-full transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden border-t border-outline-variant/30 bg-surface/95 backdrop-blur-md px-margin-mobile overflow-hidden"
        style={{ height: 0, opacity: 0, display: "none" }}
      >
        <div className="flex flex-col space-y-1 py-md">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              data-active={isActive(href)}
              className={`nav-link-mobile font-label-mono text-label-mono py-3 transition-colors duration-200 border-b border-outline-variant/10 last:border-b-0 ${
                isActive(href)
                  ? "text-primary font-bold"
                  : "text-on-surface-variant font-medium hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={closeMenu}
            className="nav-cta-mobile font-label-mono text-label-mono bg-coral-primary hover:bg-coral-primary-dark text-white text-center px-6 py-3 rounded-lg transition-colors font-semibold mt-4 block"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </nav>
  );
}
