import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { experienceId: string } }
) {
    try {

        if (!params.experienceId) {
            return new NextResponse("Experience is required", { status: 403 });
        }

        const experience = await prismadb.experience.findUnique({
            where: {
                id: params.experienceId
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

export async function DELETE(
    req: Request,
    { params }: { params: { experienceId: string, resumeId: string } }
  ) {
    try {
  
      if (!params.experienceId) {
        return new NextResponse("Experience id is required", { status: 400 });
      }
  
      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const experience = await prismadb.experience.delete({
        where: {
          id: params.experienceId
        },
      });
    
      return NextResponse.json(experience);
    } catch (error) {
      console.log('[EXPERIENCE_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  export async function PATCH(
    req: Request,
    { params }: { params: { experienceId: string, resumeId: string } }
  ) {
    try {

      const body = await req.json();
  
      const { company, position, initDate, endDate } = body;
  
      if (!params.experienceId) {
        return new NextResponse("Experience id is required", { status: 400 });
      }

      if (!company) {
        return new NextResponse("Company is required", { status: 400 });
      }

      if (!position) {
        return new NextResponse("Position is required", { status: 400 });
      }

      if (!initDate) {
        return new NextResponse("initDate is required", { status: 400 });
      }

      if (!endDate) {
        return new NextResponse("endDate is required", { status: 400 });
      }
  

      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const experience = await prismadb.experience.update({
        where: {
            id: params.experienceId
          },
          data: {
            company,
            position,
            initDate,
            endDate
          },
      })
    
      return NextResponse.json(experience);
    } catch (error) {
      console.log('[EXPERIENCE_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
