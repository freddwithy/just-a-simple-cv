import { getServerSession } from "next-auth"
import { authConfig } from "@/libs/auth"
import { redirect } from "next/navigation"
import prismadb from "@/libs/prismadb"
import { CVFormComponent } from "../components/Form"
import { CVComponent } from "../components/CV"
import PreviewButton from "../components/PreviewButton"
import { Suspense } from "react"
import Unauthorized from "@/app/components/ui/Unauthorized"

export default async function ResumePage ({
    params 
}: { 
    params: { resumeId: string }
}) {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id

    if (!session?.user?.id) {
        redirect('/auth/login')
    }

    const resume = await prismadb.resume.findFirst({
        where: {
            id: params.resumeId,
            userId: userId
        },
        include: {
            education: true,
            experience: true,
            skill: true,
            image: true,
            languageSkill: true, 
        }
    })

    if (!resume) {
        redirect('/loading')
    }

    // Find all education, experience, skills and image associated with the resume
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

    const image = await prismadb.image.findFirst({
        where: {
            resumeId: params.resumeId
        }
    })

    const languageSkill = await prismadb.language.findMany({
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
                        imageData={image}
                        languageData={languageSkill}
                    />
                    <main className="border-l py-10 border-gray-200 flex items-center bg-gray-200 flex-col gap-y-8 flex-grow h-screen md:overflow-y-scroll">
                            <CVComponent
                                skill={skills}
                                experience={experience}
                                education={education}
                                name={resume.name}
                                lastName={resume.lastName}
                                city={resume.city}
                                shortResume={resume.shortResume}
                                aboutMe={resume.aboutMe}
                                image={image?.url}
                                email={resume.email}
                                phone={resume.phone}
                                languageSkill={languageSkill}
                            />        
                        <PreviewButton />
                    </main>        
            </div>
        </>
    )
}
