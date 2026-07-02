"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

const whatsappUrl = buildWhatsAppUrl(
  siteConfig.whatsappNumber,
  siteConfig.whatsappMessage
);
const telUrl = `tel:+${siteConfig.whatsappNumber}`;

export default function ContactPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set("[data-animate]", { opacity: 1, y: 0 });
        gsap.set(".contact-title-line", { yPercent: 0 });
        gsap.set(".contact-card", { opacity: 1, y: 0 });
        return;
      }

      gsap.set("[data-animate]", { opacity: 0, y: 20 });
      gsap.set(".contact-title-line", { yPercent: 105 });
      gsap.set(".contact-card", { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(".contact-title-line", {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
      })
        .to(".contact-copy", { opacity: 1, y: 0 }, "-=0.6")
        .to(
          ".contact-card",
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 },
          "-=0.4"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="py-xxl px-margin-mobile md:px-lg max-w-container-max mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* ── Left Column: Context & Identity ── */}
        <div className="col-span-1 md:col-span-7 flex flex-col gap-xl">
          {/* Heading */}
          <div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2 leading-tight">
              <span className="block overflow-hidden pb-1">
                <span className="contact-title-line block">
                  Let&apos;s build
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="contact-title-line block">
                  something great.
                </span>
              </span>
            </h1>
            <p
              data-animate
              className="contact-copy font-body-lg text-body-lg text-on-surface-variant max-w-prose"
            >
              Whether you have questions about our curriculum, want to enroll, or
              are looking to partner with Camp2Code in Abuja, we are ready to
              connect. Reach out directly to our coordinator.
            </p>
          </div>

          {/* Coordinator Card */}
          <div className="contact-card bg-surface-container-lowest rounded-xl p-xl paper-shadow border border-outline-variant/30 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Background watermark */}
            <span
              className="material-symbols-outlined absolute top-6 right-6 opacity-[0.06] pointer-events-none"
              style={{ fontSize: 120 }}
            >
              terminal
            </span>

            <div className="flex flex-col md:flex-row gap-lg items-center md:items-start relative z-10">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-sm flex-shrink-0 bg-surface-variant">
                <Image
                  src="/contact-coordinator.jpg"
                  alt="Ifeanyi Okolo, Camp2Code coordinator"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col text-center md:text-left">
                <span className="font-label-mono text-label-mono text-coral-primary bg-coral-primary/10 px-4 py-1 rounded-full inline-block self-center md:self-start mb-2">
                  {"// COORDINATOR"}
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-0.5">
                  Ifeanyi Okolo
                </h2>
                <p className="font-label-mono text-label-mono text-indigo-dark mb-lg">
                  Founder &amp; Lead Instructor
                </p>

                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:ifeanyichieduokolo@gmail.com"
                    className="flex items-center gap-2 group"
                  >
                    <span className="material-symbols-outlined text-indigo-dark group-hover:text-coral-primary transition-colors">
                      mail
                    </span>
                    <span className="font-body-md text-body-md text-on-surface group-hover:text-coral-primary transition-colors">
                      ifeanyichieduokolo@gmail.com
                    </span>
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-dark">
                      location_on
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      Kubwa, Abuja, FCT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Direct Actions ── */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-lg md:mt-xxl">
          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card w-full flex items-center justify-between bg-indigo-dark text-white p-lg rounded-xl hover:bg-indigo-dark/90 transition-colors paper-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-coral-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-coral-primary">
                  chat
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-stat-lg text-stat-lg">WhatsApp Us</span>
                <span className="font-label-mono text-label-mono opacity-80">
                  {siteConfig.phoneDisplay}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>

          {/* Call CTA */}
          <a
            href={telUrl}
            className="contact-card w-full flex items-center justify-between bg-surface-container-lowest border-2 border-on-surface text-on-surface p-lg rounded-xl hover:bg-surface-variant transition-colors paper-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center group-hover:bg-indigo-dark/10 transition-colors">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div className="flex flex-col">
                <span className="font-stat-lg text-stat-lg">
                  Call Directly
                </span>
                <span className="font-label-mono text-label-mono opacity-80">
                  {siteConfig.phoneDisplay}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>

          {/* Contact Form */}
          <div className="contact-card bg-surface-container-lowest rounded-xl p-xl paper-shadow border border-outline-variant/30 mt-2">
            <h3 className="font-stat-lg text-stat-lg mb-lg">
              Send a Message
            </h3>
            <form className="flex flex-col gap-lg">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-label-mono text-indigo-dark">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="bg-transparent border-0 border-b-2 border-outline-variant/50 focus:border-coral-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-label-mono text-indigo-dark">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-transparent border-0 border-b-2 border-outline-variant/50 focus:border-coral-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-label-mono text-indigo-dark">
                  Message
                </label>
                <textarea
                  placeholder="How can we help?"
                  rows={3}
                  className="bg-transparent border-0 border-b-2 border-outline-variant/50 focus:border-coral-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full bg-coral-primary text-white font-label-mono text-label-mono font-bold px-lg py-3.5 rounded-lg hover:bg-coral-primary-dark transition-all mt-1 shadow-lg shadow-coral-primary/20 hover:scale-[1.01] active:scale-[0.98]"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
