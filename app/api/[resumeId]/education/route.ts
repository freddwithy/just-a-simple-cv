import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        const body = await req.json()

        const { entity, certificate, initDate, endDate } = body

        if (!params.resumeId) {
            return new NextResponse("Resume id is required", { status: 400 });
        }

        if (!entity) {
            return new NextResponse("Entity is required", { status: 400 });
        }

        if (!certificate) {
            return new NextResponse("certificate is required", { status: 400 });
        }

        if (!initDate) {
            return new NextResponse("initDate is required", { status: 400 });
        }

        if (!endDate) {
            return new NextResponse("endDate is required", { status: 400 });
        }


        const education = await prismadb.education.create({
            data: {
                entity,
                certificate,
                initDate,
                endDate,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(education)
    } catch (err) {
        console.log('[EDUCATION_POST]', err)
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

        const { entity, certificate, initDate, endDate } = body

        if (!params.resumeId) {
            return new NextResponse("Resume is required", { status: 403 });
        }

        const education = await prismadb.education.findMany({
            where: {
                entity,
                certificate,
                initDate,
                endDate,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(education)
    } catch (err) {
        console.log('[EDUCATION_GET]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

