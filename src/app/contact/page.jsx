import ContactSection from "@/components/sections/contact/ContactSection";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Camp2Code — WhatsApp, call, or send a message to our coordinator Ifeanyi Okolo in Kubwa, Abuja.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Camp2Code",
    description:
      "WhatsApp, call, or send a message to our coordinator Ifeanyi Okolo in Kubwa, Abuja.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
