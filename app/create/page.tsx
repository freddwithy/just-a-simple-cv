import { CVFormComponent } from "./components/CVForm"
import { Header } from "../components/Header"
import { getServerSession } from "next-auth"
import { authConfig } from "@/libs/auth"
import { redirect } from "next/navigation"
import prismadb from "@/libs/prismadb"
import { CVComponent } from "./components/CV"

const navLinks = [
    {
        linkTo: "/Save",
        name: "Save",
    },
]


export default async function CreatePage ({
    params
} : {
    params: { resumeId: string }
}) {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id

    const resume = await prismadb.resume.findFirst({
        where: {
            userId: userId
        }
    })

    if(!session) {
        redirect('/auth/login')
    }

    if(!resume) {
        redirect('/create/loading')
    }

    return (
        <>
            <Header navLinks={navLinks} />

                <div className="flex flex-col md:flex-row">
                    <CVFormComponent 
                        initialData={resume}
                    />
                    <main className="border-l py-10 border-gray-200 flex items-center bg-gray-200 flex-col gap-y-8 flex-grow max-h-screen overflow-y-scroll">
                    <CVComponent 
                        name={resume.name}
                        lastName={resume.lastName}
                        city={resume.city}
                        shortResume={resume.shortResume}
                        aboutMe={resume.aboutMe}
                    />
                    </main>
                </div> 
        </>
        
    )
}