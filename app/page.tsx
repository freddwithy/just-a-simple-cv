import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

const navLinks = [
  {
      linkTo: "/auth/login",
      name: "Log in",
  },
  {
      linkTo: "/auth/signup",
      name: "Sign Up",
  },
]

export default async function Home() {
  return (
    <>
    <Header navLinks={navLinks} />
      <main className="flex flex-col items-center justify-between pt-24">
        <Hero />
      </main>
    </>
  );
}
