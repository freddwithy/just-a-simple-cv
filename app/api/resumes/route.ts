import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const body = await req.json()

        const { name, lastName, userId, shortResume, aboutMe, education, experience, skill } = body

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!lastName) {
            return new NextResponse("Last Name is required", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("User Id is required", { status: 400 });
        }

        if (!shortResume) {
            return new NextResponse("Short resume is required", { status: 400 });
        }

        if (!aboutMe) {
            return new NextResponse("About me is required", { status: 400 });
        }

        if (!education) {
            return new NextResponse("Education is required", { status: 400 });
        }

        if (!experience) {
            return new NextResponse("Experience is required", { status: 400 });
        }

        if (!skill) {
            return new NextResponse("Skill is required", { status: 400 });
        }

        const resume = await prismadb.resume.create({
            data: {
                name,
                lastName,
                userId,
                shortResume,
                aboutMe,
                education,
                experience,
                skill
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