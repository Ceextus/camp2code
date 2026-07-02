"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MembersContribute() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(".contribute-content", { opacity: 1, y: 0 });
        gsap.set(".contribute-image", { opacity: 1, scale: 1 });
        return;
      }

      gsap.fromTo(
        ".contribute-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".contribute-image",
        { opacity: 0, scale: 1.06 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="pb-xxl px-margin-mobile md:px-lg max-w-container-max mx-auto"
    >
      <div className="pt-xxl border-t-2 border-outline-variant/30 grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        {/* Copy */}
        <div className="contribute-content col-span-1 md:col-span-5 md:col-start-2">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-md">
            Looking to contribute?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
            We are always seeking experienced mentors to guide the next wave of
            developers.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-surface-container-lowest text-on-surface font-label-mono text-label-mono px-lg py-3 rounded-lg border-2 border-on-surface hover:bg-surface-variant transition-colors duration-300 font-semibold hover:scale-[1.02] active:scale-[0.98]"
          >
            View Opportunities
          </Link>
        </div>

        {/* Image */}
        <div className="contribute-image col-span-1 md:col-span-4 md:col-start-8 h-64 rounded-xl overflow-hidden relative bg-surface-variant">
          <Image
            src="/members-contribute.jpg"
            alt="Abstract visual representing collaboration and mentorship"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
