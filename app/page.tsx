import { getSession } from "next-auth/react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { NextApiRequest, NextApiResponse } from "next";

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

export default async function Home(req: NextApiRequest, res: NextApiResponse) {
  const currentSesion = await getSession({req})
  console.log(currentSesion)
  return (
    <>
    <Header navLinks={navLinks} session={currentSesion} />
      <main className="flex flex-col items-center justify-between pt-24">
        <Hero />
      </main>
    </>
  );
}
