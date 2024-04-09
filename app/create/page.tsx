import Container from "@/app/components/ui/Container"
import { CVFormComponent } from "./components/CVForm"
import { Header } from "../components/Header"
import { NextApiRequest, NextApiResponse } from "next"
import { authConfig } from "@/libs/auth"
import { getSession } from "next-auth/react"

const navLinks = [
    {
        linkTo: "/Save",
        name: "Save",
    },
]


export default async function CreatePage (req: NextApiRequest) {
    const currentSesion = await getSession({req})

    console.log(currentSesion)
    return (
        <>
            <Header navLinks={navLinks} session={currentSesion} />
            <Container>
                <div className="flex flex-col md:flex-row">
                    <CVFormComponent  />
                    <main className="border-l py-10 border-mystic-200 flex items-center bg-mystic-200 flex-col gap-y-8 flex-grow max-h-screen overflow-y-scroll">
                    </main>
                </div> 
            </Container>
        </>
        
    )
}