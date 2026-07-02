"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const NAVIGATION = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Program", href: "/program" },
    { label: "Members", href: "/members" },
  ],
  resources: [
    { label: "Books", href: "/books" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ]
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050716] text-white border-t border-white/5 overflow-hidden">
      {/* Accent gradient line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-coral-primary to-transparent opacity-50" />

      {/* Modern ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start gap-6">
            <Link href="/" className="transition-transform duration-300 hover:scale-[1.02] inline-block">
              <Image
                src="/logo.png"
                alt="Camp2Code"
                width={160}
                height={42}
                className="h-10 w-auto invert"
              />
            </Link>
            <p className="font-body-md text-body-md text-surface-variant/70 leading-relaxed ">
              Empowering the next generation of Abuja developers to build global solutions. 
              Join our community and jumpstart your career in tech.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-surface-variant/80 hover:text-white hover:bg-coral-primary hover:border-coral-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-surface-variant/80 hover:text-white hover:bg-coral-primary hover:border-coral-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter/X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-surface-variant/80 hover:text-white hover:bg-coral-primary hover:border-coral-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <h4 className="font-label-mono text-label-mono font-bold tracking-wider text-surface-variant/40 uppercase">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {NAVIGATION.explore.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body-md text-body-md text-surface-variant/80 hover:text-white transition-colors duration-200 relative group inline-block"
                  >
                    {label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-coral-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <h4 className="font-label-mono text-label-mono font-bold tracking-wider text-surface-variant/40 uppercase">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {NAVIGATION.resources.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body-md text-body-md text-surface-variant/80 hover:text-white transition-colors duration-200 relative group inline-block"
                  >
                    {label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-coral-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <h4 className="font-label-mono text-label-mono font-bold tracking-wider text-surface-variant/40 uppercase">
              Stay Updated
            </h4>
            <p className="font-body-md text-body-md text-surface-variant/70 mb-2">
              Subscribe to get updates on upcoming cohorts, events, and coding books.
            </p>
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="flex flex-col sm:flex-row gap-2 w-full"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-surface-variant/40 font-body-md focus:outline-none focus:border-coral-primary focus:ring-1 focus:ring-coral-primary transition-all"
              />
              <button
                type="submit"
                className="bg-coral-primary hover:bg-coral-primary-dark text-white font-semibold px-6 py-3 rounded-lg font-body-md transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="font-body-md text-[14px] text-surface-variant/50 text-center md:text-left">
              © {year} Camp2Code. All rights reserved.
            </p>
            <div className="flex gap-4">
              {NAVIGATION.legal.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body-md text-[14px] text-surface-variant/40 hover:text-surface-variant/70 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
