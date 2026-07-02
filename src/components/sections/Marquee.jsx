"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Product Development",
  "Business Development",
  "People Development",
];

function Group({ ariaHidden = false }) {
  return (
    <div
      className="flex items-center space-x-12 px-6"
      aria-hidden={ariaHidden || undefined}
    >
      {SKILLS.map((skill) => (
        <span key={skill} className="flex items-center space-x-12">
          <span className="font-headline-md text-headline-md text-indigo-dark/20 hover:text-coral-primary hover:scale-[1.05] uppercase tracking-tight transition-all duration-300 cursor-default inline-block select-none">
            {skill}
          </span>
          <span className="font-headline-md text-headline-md text-coral-primary/40 select-none">
            •
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // 1. Infinite sliding tween
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      // 2. Pause/play on mouse hover
      const pause = () => tween.pause();
      const play = () => tween.play();
      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", play);

      // 3. ScrollTrigger to react to scroll velocity
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = self.getVelocity(); // Scroll speed in px/sec
          
          // Speed scale multiplier based on velocity
          // Scrolling down speeds up; scrolling up reverses direction and speeds up
          let targetScale = 1;
          if (velocity > 0) {
            targetScale = 1 + velocity / 120;
          } else if (velocity < 0) {
            targetScale = -1 - Math.abs(velocity) / 120;
          }

          // Snappily animate the timeScale to the target speed
          gsap.to(tween, {
            timeScale: targetScale,
            duration: 0.15,
            overwrite: "auto",
          });

          // Smoothly decay back to normal flow (timeScale = 1) after scroll stops
          gsap.to(tween, {
            timeScale: 1,
            delay: 0.15,
            duration: 0.7,
            ease: "power1.out",
            overwrite: "auto",
          });
        },
      });

      // Cleanup event listeners
      return () => {
        track.removeEventListener("mouseenter", pause);
        track.removeEventListener("mouseleave", play);
      };
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-lg bg-surface-container-low border-y border-outline-variant/30 overflow-hidden flex items-center">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <Group />
        <Group ariaHidden />
      </div>
    </section>
  );
}
