import Unauthorized from '@/app/components/ui/Unauthorized'
import { authConfig } from '@/libs/auth'
import prismadb from '@/libs/prismadb'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateLayout = async ({
    children,
    params
} : {
    children: React.ReactNode
    params: { resumeId: string }
}) => {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id

    const resumeId = await prismadb.resume.findFirst({
        where: {
            id: params.resumeId,
        }
    })

    if(userId !== resumeId?.userId) {
        return (
            <Unauthorized />
        )
    }

    return (
        <>
        {children}
        </>
    )
}

export default CreateLayout