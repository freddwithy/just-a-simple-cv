import { getServerSession } from "next-auth"
import { authConfig } from "@/libs/auth"
import { redirect } from "next/navigation"
import prismadb from "@/libs/prismadb"
import { CVFormComponent } from "../components/Form"
import { CVComponent } from "../components/CV"

export default async function ResumePage ({
    params 
}: { 
    params: { resumeId: string }
}) {
    const session = await getServerSession(authConfig)

    if (!session?.user?.id) {
        redirect('/loading')
    }

    const resume = await prismadb.resume.findFirst({
        where: {
            id: params.resumeId,
            userId: session.user.id
        }
    })

    if (!resume) {
        redirect('/loading')
    }

    const education = await prismadb.education.findMany({
        where: {
            resumeId: params.resumeId
        }
    })

    const experience = await prismadb.experience.findMany({
        where: {
            resumeId: params.resumeId
        }
    })

    const skills = await prismadb.skills.findMany({
        where: {
            resumeId: params.resumeId
        }
    })

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <CVFormComponent 
                    initialData={resume} 
                    educationData={education}
                    experienceData={experience}
                    skillData={skills}
                />
                <main className="border-l py-10 border-gray-200 flex items-center bg-gray-200 flex-col gap-y-8 flex-grow max-h-screen overflow-y-scroll">
                    <CVComponent
                        skill={skills}
                        experience={experience}
                        education={education}
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
