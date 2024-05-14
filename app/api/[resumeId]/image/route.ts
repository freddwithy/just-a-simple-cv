import prismadb from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { resumeId: string } }
) {
    try {
        const body = await req.json()

        const { imageUrl } = body

        if (!params.resumeId) {
            return new NextResponse("Resume id is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image url is required", { status: 400 });
        }


        const image = await prismadb.image.create({
            data: {
                url: imageUrl,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(image)
    } catch (err) {
        console.log('[IMAGE_POST]', err)
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

        const { imageUrl } = body

        if (!params.resumeId) {
            return new NextResponse("Resume is required", { status: 403 });
        }

        const image = await prismadb.image.findMany({
            where: {
                url: imageUrl,
                resumeId: params.resumeId
            }
        })

        return NextResponse.json(image)
    } catch (err) {
        console.log('[IMAGE_GET]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

