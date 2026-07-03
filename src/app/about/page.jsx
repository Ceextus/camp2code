import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import FounderNote from "@/components/sections/about/FounderNote";
import FinalCta from "@/components/sections/FinalCta";

export const metadata = {
  title: "About",
  description:
    "Learn about Camp2Code's mission to transform young people in Abuja from tech consumers to tech creators. For ages 8-19, co-ed.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Camp2Code",
    description:
      "Our mission: transform young people in Abuja from tech consumers to tech creators. For ages 8-19, co-ed.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <FounderNote />
      <FinalCta />
    </main>
  );
}
