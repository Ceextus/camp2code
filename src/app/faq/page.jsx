import FaqSection from "@/components/sections/faq/FaqSection";
import { FAQ_GROUPS } from "@/data/faq";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Camp2Code — age requirements, cost, our hybrid Abuja model, time commitment, equipment, and curriculum.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Camp2Code FAQ",
    description:
      "Age requirements, cost, our hybrid Abuja model, time commitment, equipment, and curriculum — answered.",
    url: "/faq",
  },
};

// FAQPage rich-result structured data, built from the same content the
// accordion renders so search snippets never drift from the page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <main className="grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqSection />
    </main>
  );
}
