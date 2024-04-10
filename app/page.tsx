import BentoGrid from "./components/BentoGrid";
import Features from "./components/Features";
import { Hero } from "./components/Hero";
import SecondHero from "./components/SecondHero";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between">
        <Hero />
        <BentoGrid />
        <Features />
        <SecondHero />
      </main>
    </>
  );
}
