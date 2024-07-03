import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { languageSkillId: string } }
) {
    try {

        if (!params.languageSkillId) {
            return new NextResponse("Language id is required", { status: 403 });
        }

        const languageSkill = await prismadb.language.findUnique({
            where: {
                id: params.languageSkillId
            }
        })

        return NextResponse.json(languageSkill)
    } catch (err) {
        console.log('[LANGUAGE_GET]', err)
        return new NextResponse('Internal error', {
            status: 500
        })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { languageSkillId: string, resumeId: string } }
  ) {
    try {
  
      if (!params.languageSkillId) {
        return new NextResponse("Language id is required", { status: 400 });
      }
  
      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const languageSkill = await prismadb.language.delete({
        where: {
          id: params.languageSkillId,
        },
      });
    
      return NextResponse.json(languageSkill);
    } catch (error) {
      console.log('[LANGUAGE_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  export async function PATCH(
    req: Request,
    { params }: { params: { languageSkillId: string, resumeId: string } }
  ) {
    try {

      const body = await req.json();
  
      const { name, level } = body;
  
      if (!params.languageSkillId) {
        return new NextResponse("Language id is required", { status: 400 });
      }

      if (!name) {
        return new NextResponse("name is required", { status: 400 });
      }

      if (!level) {
        return new NextResponse("level is required", { status: 400 });
      }

      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const languageSkill = await prismadb.language.update({
        where: {
            id: params.languageSkillId
          },
          data: {
            name
          },
      })
    
      return NextResponse.json(languageSkill);
    } catch (error) {
      console.log('[LANGUAGE_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
