import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { imageId: string } }
) {
    try {

        if (!params.imageId) {
            return new NextResponse("image is required", { status: 403 });
        }

        const image = await prismadb.image.findUnique({
            where: {
                id: params.imageId
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

export async function DELETE(
    req: Request,
    { params }: { params: { imageId: string, resumeId: string } }
  ) {
    try {
  
      if (!params.imageId) {
        return new NextResponse("image id is required", { status: 400 });
      }
  
      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const image = await prismadb.image.delete({
        where: {
          id: params.imageId
        },
      });
    
      return NextResponse.json(image);
    } catch (error) {
      console.log('[IMAGE_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  export async function PATCH(
    req: Request,
    { params }: { params: { imageId: string, resumeId: string } }
  ) {
    try {

      const body = await req.json();
  
      const { imageUrl } = body;
  
      if (!params.imageId) {
        return new NextResponse("image id is required", { status: 400 });
      }

      if (!imageUrl) {
        return new NextResponse("image url is required", { status: 400 });
      }

      const resumeByUserId = await prismadb.resume.findFirst({
        where: {
          id: params.resumeId,
        }
      });
  
      if (!resumeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
  
      const image = await prismadb.image.update({
        where: {
            id: params.imageId
          },
          data: {
            url: imageUrl
        },
      })
    
      return NextResponse.json(image);
    } catch (error) {
      console.log('[IMAGE_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
