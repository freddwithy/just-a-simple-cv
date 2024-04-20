import React from 'react'
import ActionButton from '../components/ui/ActionButton'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '@/libs/auth'

const CreatePage = async () => {
  const session = await getServerSession(authConfig)
  const userId = session?.user?.id

  if(userId) {
    redirect('/loading')
  }
  
  return (
    <div>
        <ActionButton 
            link="/loading"
            title='Go to the editor'
        />
    </div>
  )
}

export default CreatePage