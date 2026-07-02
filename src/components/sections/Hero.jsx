"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero() {
  const rootRef = useRef(null);
  const visualColRef = useRef(null);
  const visualCardRef = useRef(null);
  const decorFrameRef = useRef(null);
  const floatTweenRef = useRef(null);
  const decorFloatTweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set("[data-animate]", { opacity: 1, y: 0 });
        gsap.set(".hero-title-line", { yPercent: 0 });
        gsap.set(".hero-visual-card", { opacity: 1, scale: 1 });
        return;
      }

      // Initial states
      gsap.set("[data-animate]", { opacity: 0, y: 20 });
      gsap.set(".hero-title-line", { yPercent: 105 });
      gsap.set(visualCardRef.current, { opacity: 0, scale: 0.95 });
      gsap.set(decorFrameRef.current, { opacity: 0, scale: 0.9 });

      // Entrance Timeline
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
        delay: 0.2,
      });

      tl.to(".hero-badge", { opacity: 1, y: 0 })
        .to(
          ".hero-title-line",
          { yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
          "-=0.6"
        )
        .to(".hero-copy", { opacity: 1, y: 0 }, "-=0.6")
        .to(".hero-actions", { opacity: 1, y: 0 }, "-=0.6")
        .to(
          visualCardRef.current,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=1"
        )
        .to(
          decorFrameRef.current,
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=1"
        );

      // Start idle float loops
      floatTweenRef.current = gsap.to(visualCardRef.current, {
        y: "+=12",
        rotation: "+=1",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      decorFloatTweenRef.current = gsap.to(decorFrameRef.current, {
        y: "-=8",
        rotation: "-=1",
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    // Mouse movement parallax and 3D tilt
    const root = rootRef.current;
    
    const handleMouseMove = (e) => {
      if (!visualCardRef.current || !decorFrameRef.current || !root) return;
      
      // Pause idle floating during interaction
      if (floatTweenRef.current) floatTweenRef.current.pause();
      if (decorFloatTweenRef.current) decorFloatTweenRef.current.pause();

      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // 3D tilt for the visual card
      gsap.to(visualCardRef.current, {
        rotateY: x * 25,
        rotateX: -y * 25,
        x: x * 15,
        y: y * 15,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Opposite movement for the decor frame (depth effect)
      gsap.to(decorFrameRef.current, {
        rotateY: x * -12,
        rotateX: -y * -12,
        x: x * -20,
        y: y * -20,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      if (!visualCardRef.current || !decorFrameRef.current) return;

      // Reset to neutral and resume idle float
      gsap.to(visualCardRef.current, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          if (floatTweenRef.current) floatTweenRef.current.resume();
        },
      });

      gsap.to(decorFrameRef.current, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          if (decorFloatTweenRef.current) decorFloatTweenRef.current.resume();
        },
      });
    };

    if (root) {
      root.addEventListener("mousemove", handleMouseMove);
      root.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (root) {
        root.removeEventListener("mousemove", handleMouseMove);
        root.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative pt-xxl pb-xxl md:pt-[40px] md:pb-[60px] px-margin-mobile md:px-lg max-w-container-max mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter items-center relative z-10">
        {/* Copy column */}
        <div className="col-span-4 md:col-span-7 lg:col-span-8 flex flex-col items-start pr-0 md:pr-xl">
          <div
            data-animate
            className="hero-badge inline-flex items-center space-x-2 bg-coral-primary/10 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="font-label-mono text-label-mono text-coral-primary font-bold">
               learn. build. lead.
            </span>
          </div>

          <h1
            className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-indigo-dark mb-6 leading-[1.1] md:leading-[1.1]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block">We Don&apos;t Just Teach Coding.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block">We Build Future Creators,</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-title-line block">Founders, and Leaders.</span>
            </span>
          </h1>

          <p
            data-animate
            className="hero-copy font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10"
          >
            From web development and mobile apps to product creation, business
            building, and people skills, Camp2Code transforms young people into
            the innovators who will shape tomorrow&apos;s world.
          </p>

          <div
            data-animate
            className="hero-actions flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto text-center font-label-mono text-label-mono bg-coral-primary hover:bg-coral-primary-dark text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold hover:scale-[1.03] active:scale-[0.97]"
            >
              Start Your Journey
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center font-label-mono text-label-mono bg-transparent border-2 border-indigo-dark text-indigo-dark hover:bg-indigo-dark hover:text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold hover:scale-[1.03] active:scale-[0.97]"
            >
              Become a Partner
            </Link>
          </div>
        </div>

        {/* Visual column */}
        <div
          ref={visualColRef}
          className="hero-visual col-span-4 md:col-span-5 lg:col-span-4 mt-xl md:mt-0 relative"
          style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        >
          {/* Main Visual Card */}
          <div
            ref={visualCardRef}
            className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/30 flex items-center justify-center shadow-lg"
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center w-full h-full opacity-90"
              role="img"
              aria-label="Abstract coral and indigo 3D forms representing digital creation"
              style={{ backgroundImage: "url('/hero-vision.png')" }}
            />
            <div className="absolute top-4 left-4 font-label-mono text-[10px] text-indigo-dark/50 tracking-widest">
               C2C_VISION_01
            </div>
            <div className="absolute bottom-4 right-4 font-label-mono text-[10px] text-coral-primary tracking-widest">
              [ SYSTEM ACTIVE ]
            </div>
          </div>
          
          {/* Offset decorative frame */}
          <div
            ref={decorFrameRef}
            className="absolute -z-10 -bottom-8 -right-8 w-full aspect-square border border-coral-primary/20 rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
