import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const userFound = await prismadb.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const usernameFound = await prismadb.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prismadb.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
} catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        });
    } else {
        // Manejar casos donde 'error' no es una instancia de Error
        return NextResponse.json({
            message: 'Ocurrió un error inesperado'
        }, {
            status: 500
        });
    }
}
}