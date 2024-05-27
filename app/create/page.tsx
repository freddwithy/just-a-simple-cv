import React from 'react'
import ActionButton from '../components/ui/ActionButton'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '@/libs/auth'
import prismadb from '@/libs/prismadb'
import { LoaderCircle } from 'lucide-react'

const CreatePage = async () => {

    const session = await getServerSession(authConfig)
    const userId = session?.user?.id

    const resume = await prismadb.resume.findFirst({
      where: {
        userId
      }
    })

    if (resume) {
      redirect(`/create/${resume.id}`)
    }


    return (
      <div className='flex flex-col items-center justify-center h-screen gap-2'>
          <LoaderCircle className='animate-spin size-10'/>
          <p className='text-xl text-center font-medium text-pretty'>
            Please wait, we&apos;re loading your cv...
          </p>
      </div>
    )
}

export default CreatePage