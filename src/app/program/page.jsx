import ProgramHero from "@/components/sections/program/ProgramHero";
import ProgramTracks from "@/components/sections/program/ProgramTracks";
import FinalCta from "@/components/sections/FinalCta";

export const metadata = {
  title: "Program",
  description:
    "Explore Camp2Code's six specialized tracks — Web Engineering, Mobile, Game Dev, Product Design, and Business — designed to build the next generation of Abuja tech builders.",
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
