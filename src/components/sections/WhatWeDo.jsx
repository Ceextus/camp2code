"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FILLED = { fontVariationSettings: "'FILL' 1" };

function CardShell({ children, className = "" }) {
  return (
    <div
      className={`reveal-card bg-surface-container-lowest rounded-[20px] p-8 border border-outline-variant/10 flex flex-col h-full group transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(26,27,32,0.06)] hover:border-coral-primary/20 ${className}`}
    >
      {children}
    </div>
  );
}

function IconBadge({ icon }) {
  return (
    <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-xl mb-6 group-hover:bg-coral-primary/10 group-hover:scale-110 transition-all duration-300 relative z-10">
      <span
        className="material-symbols-outlined text-indigo-dark group-hover:text-coral-primary transition-colors duration-300"
        style={FILLED}
      >
        {icon}
      </span>
    </div>
  );
}

export default function WhatWeDo() {
  const rootRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        gsap.set(".reveal-head", { opacity: 1, y: 0 });
        gsap.set(".reveal-card", { opacity: 1, y: 0 });
        if (progressBarRef.current) gsap.set(progressBarRef.current, { width: "75%" });
        return;
      }

      // Head text slide down/up reveal
      gsap.from(".reveal-head", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-head",
          start: "top 85%",
          toggleActions: "play none none none"
        },
      });

      // Cards staggered tilt reveal
      gsap.fromTo(
        ".reveal-card",
        {
          opacity: 0,
          y: 50,
          rotateX: 8,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reveal-grid",
            start: "top 82%",
            toggleActions: "play none none none"
          },
        }
      );

      // Progress bar fill animation
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: "0%" },
          {
            width: "75%",
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: progressBarRef.current,
              start: "top 92%",
              toggleActions: "play none none none"
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-xxl px-margin-mobile md:px-lg max-w-container-max mx-auto overflow-hidden"
      style={{ perspective: 1200 }}
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter mb-xl">
        <div className="reveal-head col-span-4 md:col-span-8">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-indigo-dark mb-4">
            Master the Stack. <br />
            Build the Future.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[36rem]">
            Our curriculum goes beyond syntax. We teach the holistic process of
            creating digital products from ideation to launch.
          </p>
        </div>
      </div>

      <div className="reveal-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 — Web */}
        <CardShell>
          <IconBadge icon="code" />
          <div className="font-label-mono text-[12px] text-coral-primary mb-2 font-bold tracking-wider">
            ENGINEERING
          </div>
          <h3 className="font-stat-lg text-stat-lg text-indigo-dark mb-3 group-hover:text-coral-primary transition-colors duration-300">
            Web Development
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
            Build responsive, performant web applications using modern
            frameworks and robust backend architectures.
          </p>
        </CardShell>

        {/* Card 2 — Mobile */}
        <CardShell>
          <IconBadge icon="smartphone" />
          <div className="font-label-mono text-[12px] text-coral-primary mb-2 font-bold tracking-wider">
            ENGINEERING
          </div>
          <h3 className="font-stat-lg text-stat-lg text-indigo-dark mb-3 group-hover:text-coral-primary transition-colors duration-300">
            Mobile Development
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
            Create native and cross-platform mobile experiences that users love
            on iOS and Android devices.
          </p>
        </CardShell>

        {/* Card 3 — Game (tall, with progress meter) */}
        <CardShell className="lg:row-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-coral-primary/5 rounded-bl-full -mr-8 -mt-8" />
          <IconBadge icon="sports_esports" />
          <div className="font-label-mono text-[12px] text-coral-primary mb-2 font-bold tracking-wider relative z-10">
            INTERACTIVE
          </div>
          <h3 className="font-stat-lg text-stat-lg text-indigo-dark mb-3 relative z-10 group-hover:text-coral-primary transition-colors duration-300">
            Game Development
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 relative z-10">
            Design and program immersive interactive experiences, learning
            physics, rendering, and game logic.
          </p>
          <div className="mt-auto relative z-10 pt-8 border-t border-outline-variant/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-mono text-[12px] text-indigo-dark font-bold">
                UNITY / C#
              </span>
              <span className="font-label-mono text-[12px] text-on-surface-variant">
                Progress
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#E7E6E0] rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-tertiary rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </CardShell>

        {/* Card 4 — Product */}
        <CardShell>
          <IconBadge icon="view_quilt" />
          <div className="font-label-mono text-[12px] text-coral-primary mb-2 font-bold tracking-wider">
            DESIGN
          </div>
          <h3 className="font-stat-lg text-stat-lg text-indigo-dark mb-3 group-hover:text-coral-primary transition-colors duration-300">
            Product Development
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
            Learn user research, UI/UX design principles, and how to define
            features that solve real problems.
          </p>
        </CardShell>

        {/* Card 5 — Business */}
        <CardShell>
          <IconBadge icon="trending_up" />
          <div className="font-label-mono text-[12px] text-coral-primary mb-2 font-bold tracking-wider">
            STRATEGY
          </div>
          <h3 className="font-stat-lg text-stat-lg text-indigo-dark mb-3 group-hover:text-coral-primary transition-colors duration-300">
            Business Development
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
            Understand market dynamics, monetization strategies, and how to turn
            code into a sustainable venture.
          </p>
        </CardShell>

        {/* Card 6 — People */}
        <CardShell className="md:col-span-2 lg:col-span-1">
          <IconBadge icon="groups" />
          <div className="font-label-mono text-[12px] text-coral-primary mb-2 font-bold tracking-wider">
            LEADERSHIP
          </div>
          <h3 className="font-stat-lg text-stat-lg text-indigo-dark mb-3 group-hover:text-coral-primary transition-colors duration-300">
            People Development
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-auto">
            Cultivate communication, teamwork, and leadership skills essential
            for thriving in the modern tech industry.
          </p>
        </CardShell>
      </div>
    </section>
  );
}
