"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function BooksSoon() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(".books-card", { opacity: 1, y: 0 });
        gsap.set("[data-books-animate]", { opacity: 1, y: 0 });
        return;
      }

      gsap.set(".books-card", { opacity: 0, y: 40, scale: 0.98 });
      gsap.set("[data-books-animate]", { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { duration: 0.7, ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(".books-card", { opacity: 1, y: 0, scale: 1, duration: 0.8 }).to(
        "[data-books-animate]",
        { opacity: 1, y: 0, stagger: 0.08 },
        "-=0.45"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="grow flex items-center justify-center py-xxl px-margin-mobile md:px-lg"
    >
      <div className="w-full max-w-container-max mx-auto grid grid-cols-4 md:grid-cols-12 gap-gutter">
        {/* Asymmetric composition — offset card */}
        <div className="col-span-4 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6">
          <div className="books-card relative overflow-hidden bg-surface-container-lowest rounded-xl paper-shadow p-xl">
            {/* Decorative glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-coral-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div data-books-animate className="inline-block bg-coral-primary/10 text-coral-primary font-label-mono text-label-mono font-bold px-3 py-1 rounded-full mb-md">
              {"// CURRICULUM"}
            </div>

            <h1
              data-books-animate
              className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-lg"
            >
              Books
            </h1>

            <div data-books-animate className="h-1 w-16 bg-coral-primary mb-lg" />

            <h2
              data-books-animate
              className="font-headline-md text-headline-md text-on-surface-variant mb-md"
            >
              Coming Soon.
            </h2>

            <p
              data-books-animate
              className="font-body-lg text-body-lg text-on-surface-variant mb-xl "
            >
              We are currently curating a specialized library of development
              resources, coding workbooks, and tech guides tailored for the Abuja
              tech ecosystem. Our digital shelves are being stocked.
            </p>

            <div data-books-animate className="flex flex-col sm:flex-row gap-md">
              <Link
                href="/register"
                className="bg-coral-primary hover:bg-coral-primary-dark text-white rounded-lg px-6 py-4 font-label-mono text-label-mono transition-all text-center shadow-lg shadow-coral-primary/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Register for Updates
              </Link>
              <Link
                href="/"
                className="bg-transparent border-[1.5px] border-on-background text-on-background hover:bg-on-background hover:text-surface rounded-lg px-6 py-4 font-label-mono text-label-mono transition-colors text-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
