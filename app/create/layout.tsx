import { authConfig } from "@/libs/auth";
import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { Header } from "../components/Header";
import Loading from "../components/ui/Loading";

export default async function ResumeLayout({
    children
} : {
    children: React.ReactNode
}) {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id

    if(!userId) {
        redirect('/auth/login')
    }

    const resume = await prismadb.resume.findFirst({
        where: {
            userId
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

    const skill = await prismadb.skills.findMany({
        where: {
            resumeId: resume?.id
        }
    })

    const image = await prismadb.image.findFirst({
        where: {
            resumeId: resume?.id
        }
    })

    if (!resume || !education || !experience || !skill) {
        redirect('/loading')
    }  

    return (
        <>
            <Header 
                resume={resume} 
                experience={experience} 
                education={education} 
                skill={skill} 
                image={image?.url}
            />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </>   
    )
}