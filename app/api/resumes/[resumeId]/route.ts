import { authConfig } from "@/libs/auth"
import prismadb from "@/libs/prismadb"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        const session = await getServerSession(authConfig)
        const userId = session?.user?.id
        const body = await req.json()

        const { name, lastName, shortResume, aboutMe } = body
        
        const resume = await prismadb.resume.updateMany({
            where: {
                id: params.resumeId,
                userId
            },
            data: {
                name,
                lastName,
                shortResume,
                aboutMe
            }
        })
        
        return NextResponse.json(resume)
    } catch (err) {
        console.log('[RESUME_PATCH]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        
        const resume = await prismadb.resume.deleteMany({
            where: {
                id: params.resumeId
            }
        })
        
        return NextResponse.json(resume)
    } catch (err) {
        console.log('[RESUME_DELETE]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        const session = await getServerSession(authConfig)
        const userId = session?.user?.id
        
        const body = await req.json()

        const { name, lastName, shortResume, aboutMe, education, experience, skill, createdAt } = body

        if (!params.resumeId) {
            return new NextResponse("Resume is required", { status: 403 });
        }

        const resumeByUserId = await prismadb.resume.findFirst({
            where: {
                id: params.resumeId,
                userId
            }
        })

        if (!resumeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const resume = await prismadb.resume.findMany({
            where: {
                id: params.resumeId,
                name,
                lastName,
                shortResume,
                aboutMe,
                education,
                experience,
                skill,
                createdAt,
            },
            include: {
                education: true,
                experience: true,
                skill: true
            }
        })

        return NextResponse.json(resume)
    } catch (err) {
        console.log('[EDUCATION_POST]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}