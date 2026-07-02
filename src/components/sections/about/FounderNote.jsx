"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FounderNote() {
  const rootRef = useRef(null);
  const dotGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(".founder-portrait", { opacity: 1, x: 0 });
        gsap.set(".founder-quote-icon", { scale: 1, rotate: 0, opacity: 1 });
        gsap.set(".founder-quote", { opacity: 1, y: 0 });
        gsap.set(".founder-name", { opacity: 1, y: 0 });
        return;
      }

      // Dot grid parallax
      if (dotGridRef.current) {
        gsap.fromTo(
          dotGridRef.current,
          { y: -30 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Portrait slide-in
      gsap.fromTo(
        ".founder-portrait",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Quote icon bounce
      gsap.fromTo(
        ".founder-quote-icon",
        { scale: 0, rotate: -20, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Quote text fade-in
      gsap.fromTo(
        ".founder-quote",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 68%",
            toggleActions: "play none none none",
          },
        }
      );

      // Founder name & title fade-in
      gsap.fromTo(
        ".founder-name",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
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
      className="px-margin-mobile md:px-lg max-w-container-max mx-auto mb-xxl"
    >
      <div className="bg-gradient-to-br from-[#0c0e29] to-[#040514] border border-white/10 text-white rounded-3xl p-xl md:p-xxl grid grid-cols-1 md:grid-cols-12 gap-gutter relative overflow-hidden shadow-2xl">
        {/* Decorative inner border */}
        <div className="absolute inset-4 border border-white/5 rounded-2xl pointer-events-none" />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Parallax dot grid */}
        <div
          ref={dotGridRef}
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Founder Portrait */}
        <div className="md:col-span-4 relative z-10">
          <div className="founder-portrait relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-md">
            <Image
              src="/founder.jpg"
              alt="Ifeanyi Okolo, Founder of Camp2Code — a cinematic portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="founder-name">
            <div className="font-headline-md text-headline-md mb-2">
              Ifeanyi Okolo
            </div>
            <span className="inline-flex items-center gap-1.5 font-label-mono text-label-mono text-primary-container bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              Founder, Camp2Code
            </span>
          </div>
        </div>

        {/* Quote */}
        <div className="md:col-span-8 flex flex-col justify-center relative z-10 md:pl-xl">
          <span
            className="founder-quote-icon material-symbols-outlined text-6xl text-white/20 mb-md inline-block"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>

          <blockquote className="founder-quote font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg leading-tight mb-lg text-white/95">
            &ldquo;Our goal isn&apos;t just to teach coding. It&apos;s to fundamentally shift how young minds interact with the world around them—giving them the tools to not just participate in the digital age, but to define it.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
