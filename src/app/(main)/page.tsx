import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import ServiceList from "@/components/home/service-list";
import WhyChooseUs from "@/components/home/why-choose-us";
import Pricing from "@/components/home/pricing";
import Faq from "@/components/home/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ServiceList />
      <WhyChooseUs />
      <Pricing />
      <Faq />
    </>
  );
}
