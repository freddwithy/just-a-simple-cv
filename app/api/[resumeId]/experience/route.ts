import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        const body = await req.json()

        const { company, position, initDate, endDate } = body

        if (!params.resumeId) {
            return new NextResponse("Resume id is required", { status: 400 });
        }

        if (!position) {
            return new NextResponse("position is required", { status: 400 });
        }

        if (!company) {
            return new NextResponse("company is required", { status: 400 });
        }

        if (!initDate) {
            return new NextResponse("initDate is required", { status: 400 });
        }

        if (!endDate) {
            return new NextResponse("endDate is required", { status: 400 });
        }


        const experience = await prismadb.experience.create({
            data: {
                company,
                position,
                initDate,
                endDate,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(experience)
    } catch (err) {
        console.log('[EXPERIENCE_POST]', err)
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

        const { company, position, initDate, endDate } = body

        if (!params.resumeId) {
            return new NextResponse("Resume is required", { status: 403 });
        }

        const experience = await prismadb.experience.findMany({
            where: {
                company,
                position,
                initDate,
                endDate,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(experience)
    } catch (err) {
        console.log('[EXPERIENCE_GET]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

