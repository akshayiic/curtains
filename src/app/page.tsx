import Navbar from "@/components/Navbar";
import CurtainHero from "@/components/CurtainHero";
import Stats from "@/components/Stats";
import LightStudio from "@/components/LightStudio";
import Collections from "@/components/Collections";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CurtainFinale from "@/components/CurtainFinale";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <CurtainHero />
        <Stats />
        <LightStudio />
        <Collections />
        <WhyUs />
        <Process />
        <Reviews />
        <Faq />
        <CurtainFinale />
      </main>
      <Footer />
    </>
  );
}
