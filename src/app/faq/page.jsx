import FaqSection from "@/components/sections/faq/FaqSection";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Camp2Code — age requirements, cost, our hybrid Abuja model, time commitment, equipment, and curriculum.",
};

export default function FaqPage() {
  return (
    <main className="grow">
      <FaqSection />
    </main>
  );
}
