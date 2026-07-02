"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCta() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        gsap.set(".cta-card", { opacity: 1, scale: 1, y: 0 });
        return;
      }

      // Card focus slide/scale reveal
      gsap.fromTo(
        ".cta-card",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Blurry background glow blobs floating
      gsap.to(".cta-orb-1", {
        x: "-=40",
        y: "+=30",
        scale: 1.25,
        duration: 9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(".cta-orb-2", {
        x: "+=35",
        y: "-=40",
        scale: 0.8,
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-xxl px-margin-mobile md:px-lg max-w-container-max mx-auto text-center overflow-hidden"
    >
      <div className="cta-card bg-[#050716] rounded-3xl p-10 md:p-20 border border-white/10 flex flex-col items-center max-w-4xl mx-auto relative overflow-hidden">
        {/* Tech Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Ambient Radial Accent Light */}
        <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        {/* Dynamic Glow Orbs */}
        <div className="cta-orb-1 absolute -top-24 -right-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="cta-orb-2 absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-1.5 mb-6 border border-white/10">
            <span className="font-label-mono text-label-mono text-primary-fixed-dim font-bold uppercase tracking-wider text-[12px]">
              {"// TRANSFORMATION COHORT"}
            </span>
          </div>

          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg bg-gradient-to-r from-white via-white to-primary-fixed-dim bg-clip-text text-transparent mb-6 leading-tight max-w-2xl font-bold">
            Ready to start building?
          </h2>
          
          <p className="font-body-lg text-body-lg text-surface-variant/80 mb-10  leading-relaxed">
            Join our upcoming cohort and transform your ideas into reality. Spaces
            are limited.
          </p>

          <Link
            href="/register"
            className="font-label-mono text-label-mono bg-primary hover:bg-primary-container hover:text-on-primary-container text-white px-10 py-4 rounded-lg transition-all duration-300 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary-container/30 hover:scale-[1.03] active:scale-[0.97] inline-block border border-white/5"
          >
            Apply for Next Cohort
          </Link>
        </div>
      </div>
    </section>
  );
}

