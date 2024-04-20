import { authConfig } from "@/libs/auth";
import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { Header } from "../components/Header";

export default async function ResumeLayout({
    children
} : {
    children: React.ReactNode
}) {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id

    if(!userId) {
        redirect('/auth/login')
    }

    return (
        <>
            <Header />
            {children}
        </>   
    )
}