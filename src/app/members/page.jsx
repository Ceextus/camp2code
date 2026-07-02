import MembersHero from "@/components/sections/members/MembersHero";
import MembersGrid from "@/components/sections/members/MembersGrid";
import MembersContribute from "@/components/sections/members/MembersContribute";
import FinalCta from "@/components/sections/FinalCta";

export const metadata = {
  title: "Members",
  description:
    "Meet the Camp2Code leadership team — designers, engineers, and educators committed to empowering the next generation of Abuja developers.",
};

export default function MembersPage() {
  return (
    <main>
      <MembersHero />
      <MembersGrid />
      <MembersContribute />
      <FinalCta />
    </main>
  );
}
