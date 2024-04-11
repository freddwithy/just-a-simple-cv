import BentoGrid from "./components/BentoGrid";
import Features from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import SecondHero from "./components/SecondHero";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between animate-fade-up">
        <Hero />
        <BentoGrid />
        <Features />
        <SecondHero />
      </main>
      <Footer className="max-w-3xl" />
    </>
  );
}
