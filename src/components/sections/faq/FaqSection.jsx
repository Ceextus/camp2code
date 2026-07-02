"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: "general", label: "General Info", icon: "info" },
  { id: "logistics", label: "Logistics & Equipment", icon: "laptop_mac" },
  { id: "curriculum", label: "Curriculum", icon: "menu_book" },
];

const GROUPS = [
  {
    id: "general",
    icon: "info",
    label: "General Info",
    items: [
      {
        q: "What are the age requirements for Camp2Code?",
        a: "Camp2Code is a co-ed program built for young people between the ages of 8 and 19. We meet each learner at their level, so both first-timers and budding builders have a track that fits.",
      },
      {
        q: "How much does the program cost?",
        a: "We believe in accessible education. The core Camp2Code foundational program is heavily subsidized for selected candidates, and specific financial details are shared with you during the application phase.",
      },
    ],
  },
  {
    id: "logistics",
    icon: "laptop_mac",
    label: "Logistics & Equipment",
    items: [
      {
        q: "Is the program online or in-person in Abuja?",
        a: "We run a hybrid model. Most intensive coding sessions and mentorship happen online, with regular in-person meetups and hackathons here in Abuja to build community and ship projects together.",
      },
      {
        q: "What is the expected time commitment?",
        a: "To get the most out of the program, plan to dedicate around 10–15 hours per week. This covers live sessions, self-paced learning, and weekly project assignments.",
      },
      {
        q: "What equipment do I need to get started?",
        a: "A laptop and a stable internet connection are all you need to begin. If access to equipment is a barrier, reach out — we work with families case by case to keep the program within reach.",
      },
    ],
  },
  {
    id: "curriculum",
    icon: "menu_book",
    label: "Curriculum",
    items: [
      {
        q: "Do I need prior coding experience to join?",
        a: "No prior experience is required. Our foundational track starts from first principles, while more experienced learners can move into specialized tracks faster.",
      },
      {
        q: "Which tracks can I choose from?",
        a: "You can grow across six focus areas — Web Engineering, Mobile, Game Dev, Product Design, Business, and People Development — designed to take you from tech consumer to tech creator.",
      },
      {
        q: "How do you stay in touch with learners and parents?",
        a: "Day-to-day coordination, updates, and mentor support all happen through dedicated Camp2Code WhatsApp groups, so learners and parents are always in the loop.",
      },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className={`paper-shadow bg-surface-container-lowest rounded-xl overflow-hidden border transition-colors ${
        isOpen ? "border-coral-primary/50" : "border-outline-variant/30"
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-md p-lg text-left hover:bg-surface-bright transition-colors"
      >
        <span
          className={`font-stat-lg text-stat-lg text-lg transition-colors ${
            isOpen ? "text-coral-primary" : "text-on-background"
          }`}
        >
          {q}
        </span>
        <span
          className={`material-symbols-outlined flex-shrink-0 text-on-surface-variant transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="p-lg pt-0">
            <div className="border-t border-surface-dim/50 pt-md">
              <p className="font-body-md text-body-md text-on-surface-variant">
                {a}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const rootRef = useRef(null);
  // Open the first question by default so the pattern is discoverable.
  const [openKey, setOpenKey] = useState("general-0");

  const supportUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    "Hi Camp2Code! I have a question that isn't covered in your FAQ."
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set("[data-faq-animate]", { opacity: 1, y: 0 });
        return;
      }

      gsap.set("[data-faq-animate]", { opacity: 0, y: 24 });

      gsap.to("[data-faq-animate]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="w-full max-w-container-max mx-auto px-margin-mobile md:px-lg py-xxl"
    >
      {/* ── Header ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-xxl items-end">
        <div data-faq-animate className="col-span-1 md:col-span-7">
          <span className="inline-block px-3 py-1 bg-coral-primary/10 text-coral-primary font-label-mono text-label-mono rounded-full mb-md uppercase tracking-wider">
            {"// SUPPORT"}
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-md">
            Frequently Asked{" "}
            <span className="text-coral-primary italic">Questions.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Everything you need to know about joining Camp2Code, our curriculum,
            and how we operate in Abuja. Can&apos;t find your answer? Reach out
            via WhatsApp.
          </p>
        </div>

        {/* Decorative panel */}
        <div
          data-faq-animate
          className="col-span-1 md:col-span-4 md:col-start-9 hidden md:block"
        >
          <div className="relative w-full h-48 rounded-xl border-2 border-coral-primary/10 overflow-hidden bg-gradient-to-br from-secondary/15 via-coral-primary/10 to-primary-container/20">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #406900 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <span
              className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-coral-primary/70"
              style={{ fontSize: 72 }}
            >
              contact_support
            </span>
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Sidebar */}
        <aside
          data-faq-animate
          className="col-span-1 md:col-span-4 mb-xl md:mb-0"
        >
          <div className="sticky top-32">
            <h3 className="font-label-mono text-label-mono text-on-surface-variant mb-lg uppercase tracking-wider pb-sm border-b-2 border-surface-dim">
              Categories
            </h3>
            <ul className="space-y-md">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="flex items-center justify-between text-on-background font-body-md hover:text-coral-primary transition-colors group"
                  >
                    {cat.label}
                    <span className="material-symbols-outlined text-surface-dim group-hover:text-coral-primary transition-colors text-sm">
                      arrow_forward
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-xl p-lg bg-surface-container-low rounded-xl border border-surface-variant/50">
              <h4 className="font-headline-md text-xl text-on-background mb-sm">
                Still stuck?
              </h4>
              <p className="font-body-md text-sm text-on-surface-variant mb-lg">
                Our mentors are available to help answer specific questions.
              </p>
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-md py-sm bg-indigo-dark text-white font-label-mono text-label-mono rounded-lg hover:bg-coral-primary transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </aside>

        {/* Accordion list */}
        <div className="col-span-1 md:col-span-7 md:col-start-6">
          {GROUPS.map((group) => (
            <div key={group.id} className="mb-xxl last:mb-0">
              <h2
                id={group.id}
                data-faq-animate
                className="font-headline-md text-headline-md mb-lg flex items-center gap-sm scroll-mt-32"
              >
                <span className="material-symbols-outlined text-coral-primary">
                  {group.icon}
                </span>
                {group.label}
              </h2>
              <div className="space-y-md">
                {group.items.map((item, i) => {
                  const key = `${group.id}-${i}`;
                  return (
                    <div key={key} data-faq-animate>
                      <AccordionItem
                        q={item.q}
                        a={item.a}
                        isOpen={openKey === key}
                        onToggle={() =>
                          setOpenKey((prev) => (prev === key ? null : key))
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
