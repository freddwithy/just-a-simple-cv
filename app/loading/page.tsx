import { getServerSession } from "next-auth"
import Loader from "./components/Loader"
import { authConfig } from "@/libs/auth"
import prismadb from "@/libs/prismadb"
import { redirect } from "next/navigation"
import defaultData from "@/default/cv-default.json"
import { NextResponse } from "next/server"

const LoadingPage = async () => {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id
    const name = session?.user?.name

    const resume = await prismadb.resume.findFirst({
        where: {
            userId: userId
        }
    })

    const education = await prismadb.education.findMany({
        where: {
            resumeId: resume?.id
        }
    })

    const experience = await prismadb.experience.findMany({
        where: {
            resumeId: resume?.id
        }
    })

    const skills = await prismadb.skills.findMany({
        where: {
            resumeId: resume?.id
        }
    })

    const isData = education.length > 0 || experience.length > 0 || skills.length > 0

    const resumeId = resume?.id

    if(!userId) {
        redirect('/auth/login')
    }

    if(resumeId) {
        redirect(`/create/${resumeId}`)
    }

    return (
        <main className="flex items-center justify-center w-full h-screen">
            <Loader 
                name={name} 
                resumeId={resumeId}
                isData={isData}
            />
        </main>
    )
}

export default LoadingPage
