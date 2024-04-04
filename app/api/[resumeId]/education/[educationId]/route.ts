import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { educationId: string } }
) {
    try {

        if (!params.educationId) {
            return new NextResponse("Resume is required", { status: 403 });
        }

        const education = await prismadb.education.findUnique({
            where: {
                id: params.educationId
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

export async function DELETE(
    req: Request,
    { params }: { params: { educationId: string, resumeId: string } }
  ) {
    try {
  
      if (!params.educationId) {
        return new NextResponse("Education id is required", { status: 400 });
      }
  
      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const education = await prismadb.education.delete({
        where: {
          id: params.educationId
        },
      });
    
      return NextResponse.json(education);
    } catch (error) {
      console.log('[EDUCATION_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  export async function PATCH(
    req: Request,
    { params }: { params: { educationId: string, resumeId: string } }
  ) {
    try {

      const body = await req.json();
  
      const { entity, certificate, initDate, endDate } = body;
  
      if (!params.educationId) {
        return new NextResponse("Education id is required", { status: 400 });
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
  

      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const resume = await prismadb.education.update({
        where: {
            id: params.educationId
          },
          data: {
            entity,
            certificate,
            initDate,
            endDate
          },
      })
    
      return NextResponse.json(resume);
    } catch (error) {
      console.log('[EDUCATION_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
