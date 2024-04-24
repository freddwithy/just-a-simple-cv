import { authConfig } from "@/libs/auth";
import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
    children
} : {
    children: React.ReactNode
}) {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id

    const resume = await prismadb.resume.findFirst({
        where: {
            userId: userId
        }
    })

    if(userId) {
        redirect('/create')
    }

    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    )
}