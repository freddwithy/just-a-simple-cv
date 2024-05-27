import { authConfig } from "@/libs/auth";
import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { Header } from "../components/Header";

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

    if (!resume || !education || !experience || !skill || !image) {
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
            {children}
        </>   
    )
}