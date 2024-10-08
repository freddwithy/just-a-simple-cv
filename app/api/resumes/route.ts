import { authConfig } from "@/libs/auth";
import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const session = await getServerSession(authConfig)
        const userId = session?.user?.id

        const body = await req.json()

        const { name, city, lastName, shortResume, aboutMe,  email, phone, language } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!lastName) {
            return new NextResponse("Last Name is required", { status: 400 });
        }

        if (!shortResume) {
            return new NextResponse("Short resume is required", { status: 400 });
        }

        if (!aboutMe) {
            return new NextResponse("About me is required", { status: 400 });
        }

        const resume = await prismadb.resume.create({
            data: {
                language,
                name,
                shortResume,
                lastName,
                userId,
                aboutMe,
                city,
                email,
                phone,
            }
        })

        return NextResponse.json(resume)
    } catch (err) {
        console.log('[RESUME_POST]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

export async function PATCH (
    req: Request,
) {
    try {
        const session = await getServerSession(authConfig)
        const userId = session?.user?.id
        const body = await req.json()

        const { name, lastName, shortResume, aboutMe, city, email, phone, language } = body
        
        const resume = await prismadb.resume.updateMany({
            where: {
                userId: userId
            },
            data: {
                name,
                lastName,
                shortResume,
                city,
                aboutMe,
                email,
                phone,
                language
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