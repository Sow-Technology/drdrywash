'use client';

import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import ServiceList from "@/components/home/service-list";
import WhyChooseUs from "@/components/home/why-choose-us";
import WeAlsoServe from "@/components/home/we-also-serve";
import Faq from "@/components/home/faq";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <ServiceList />
      <WhyChooseUs />
      <WeAlsoServe />
      <Faq />
    </div>
  );
}
