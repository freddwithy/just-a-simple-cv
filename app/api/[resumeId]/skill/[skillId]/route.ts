import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { skillId: string } }
) {
    try {

        if (!params.skillId) {
            return new NextResponse("Skill is required", { status: 403 });
        }

        const experience = await prismadb.skills.findUnique({
            where: {
                id: params.skillId
            }
        })

        return NextResponse.json(experience)
    } catch (err) {
        console.log('[SKILL_GET]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { skillId: string, resumeId: string } }
  ) {
    try {
  
      if (!params.skillId) {
        return new NextResponse("Skill id is required", { status: 400 });
      }
  
      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const skill = await prismadb.skills.delete({
        where: {
          id: params.skillId
        },
      });
    
      return NextResponse.json(skill);
    } catch (error) {
      console.log('[SKILL_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  export async function PATCH(
    req: Request,
    { params }: { params: { skillId: string, resumeId: string } }
  ) {
    try {

      const body = await req.json();
  
      const { name } = body;
  
      if (!params.skillId) {
        return new NextResponse("Skilll id is required", { status: 400 });
      }

      if (!name) {
        return new NextResponse("name is required", { status: 400 });
      }

      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const skill = await prismadb.skills.update({
        where: {
            id: params.skillId
          },
          data: {
            name
          },
      })
    
      return NextResponse.json(skill);
    } catch (error) {
      console.log('[SKILL_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
