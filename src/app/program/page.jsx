import ProgramHero from "@/components/sections/program/ProgramHero";
import ProgramTracks from "@/components/sections/program/ProgramTracks";
import FinalCta from "@/components/sections/FinalCta";

export const metadata = {
  title: "Program",
  description:
    "Explore Camp2Code's six specialized tracks — Web Engineering, Mobile, Game Dev, Product Design, and Business — designed to build the next generation of Abuja tech builders.",
  alternates: { canonical: "/program" },
  openGraph: {
    title: "The Camp2Code Program",
    description:
      "Six specialized tracks — Web Engineering, Mobile, Game Dev, Product Design, and Business — building the next generation of Abuja tech builders.",
    url: "/program",
  },
};

export default function ProgramPage() {
  return (
    <main>
      <ProgramHero />
      <ProgramTracks />
      <FinalCta />
    </main>
  );
}
