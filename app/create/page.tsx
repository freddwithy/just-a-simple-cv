import { CVFormComponent } from "./components/CVForm"
import { Header } from "../components/Header"
import { getServerSession } from "next-auth"
import { authConfig } from "@/libs/auth"

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

    if (session) {
        console.log('User is:', session.user?.name)
        if(session?.user?.id) {
            console.log('User ID is:', session.user.id)
        }
    }
    return (
        <>
            <Header navLinks={navLinks} />

                <div className="flex flex-col md:flex-row">
                    <CVFormComponent  />
                    <main className="border-l py-10 border-gray-200 flex items-center bg-gray-200 flex-col gap-y-8 flex-grow max-h-screen overflow-y-scroll">
                    </main>
                </div> 
        </>
        
    )
}