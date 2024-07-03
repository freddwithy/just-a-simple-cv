import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        const body = await req.json()

        const { name, level } = body

        if (!params.resumeId) {
            return new NextResponse("Resume id is required", { status: 400 });
        }

        if (!name) {
            return new NextResponse("name is required", { status: 400 });
        }

        if (!level) {
            return new NextResponse("level is required", { status: 400 });
        }

        const languageSkill = await prismadb.language.create({
            data: {
                name,
                level,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(languageSkill)
    } catch (err) {
        console.log('[SKILL_POST]', err)
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
        const body = await req.json()

        const { name, level } = body

        if (!params.resumeId) {
            return new NextResponse("Resume is required", { status: 403 });
        }

        const languageSkill = await prismadb.language.findMany({
            where: {
                name,
                level,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(languageSkill)
    } catch (err) {
        console.log('[SKILL_GET]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

