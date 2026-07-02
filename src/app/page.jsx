import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Pipeline from "@/components/sections/Pipeline";
import MissionBand from "@/components/sections/MissionBand";
import FinalCta from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <WhatWeDo />
      <Pipeline />
      <MissionBand />
      <FinalCta />
    </main>
  );
}
