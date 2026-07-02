"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const rootRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(".story-animate", { opacity: 1, y: 0 });
        gsap.set(".audience-card", { opacity: 1, x: 0 });
        if (progressBarRef.current) gsap.set(progressBarRef.current, { width: "75%" });
        return;
      }

      // Audience card — slide in from left
      gsap.fromTo(
        ".audience-card",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".audience-card",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Audience progress bar fill
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: "0%" },
          {
            width: "75%",
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".audience-card",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Story heading reveal
      gsap.fromTo(
        ".story-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-heading",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Story paragraph reveals — stagger
      gsap.fromTo(
        ".story-paragraph",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-heading",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Inline image reveal
      gsap.fromTo(
        ".story-inline-image",
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-inline-image",
            start: "top 80%",
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Audience Card — sticky on desktop */}
        <div className="md:col-span-5 space-y-xl md:sticky md:top-32">
          <div className="audience-card bg-surface-container-lowest p-8 rounded-2xl paper-shadow">
            <h3 className="font-label-mono text-label-mono text-on-surface-variant mb-sm tracking-wider uppercase">
              Audience
            </h3>
            <div className="font-headline-md text-headline-md text-on-surface mb-sm">
              Ages 8-19
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Designed for ambitious minds across all genders, ready to dive
              into the world of tech.
            </p>
            <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden mt-md">
              <div
                ref={progressBarRef}
                className="h-full bg-tertiary-container rounded-full"
                style={{ width: 0 }}
              />
            </div>
          </div>
        </div>

        {/* Story Narrative */}
        <div className="md:col-span-7 space-y-lg">
          <h2 className="story-heading font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            The Story of Camp2Code
          </h2>
          <div className="prose max-w-none font-body-lg text-body-lg text-on-surface-variant space-y-6">
            <p className="story-paragraph">
              It started with a simple observation: there is a vast amount of
              untapped potential in our youth. They are digital natives,
              effortlessly navigating complex interfaces, yet often lacking the
              underlying knowledge of how these systems are built.
            </p>
            <p className="story-paragraph">
              Camp2Code was born from the desire to bridge that gap. We
              didn&apos;t just want to teach syntax; we wanted to foster
              computational thinking, problem-solving, and a builder&apos;s
              mindset. We designed a curriculum that treats code as a high-value
              asset, not just a series of commands.
            </p>

            {/* Inline editorial image */}
            <div className="story-inline-image relative w-full h-64 rounded-2xl overflow-hidden paper-shadow my-8">
              <Image
                src="/about-code.jpg"
                alt="Abstract colorful code blocks on screen with shallow depth of field"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>

            <p className="story-paragraph">
              Today, we provide an intellectually stimulating environment where
              students transition from being consumers of digital products to
              architects of tomorrow&apos;s solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
