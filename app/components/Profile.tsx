'use client'
import { User } from 'lucide-react'
import React from 'react'
import UserModal from './UserModal'
import useModal from '@/hooks/useModal'
import { signOut, useSession } from 'next-auth/react'
import Button from './ui/Button'

const Profile = () => {
    const { closeModal, open, openModal } = useModal()

    const session = useSession()
    const userId = session?.data?.user?.id
    const username = session?.data?.user?.name

    if(!userId) return null


    return (
        <div className='relative'>
            <button onClick={open ? closeModal : openModal} className='flex items-center gap-x-1 justify-center bg-gray-200 p-2 rounded-lg border text-sm font-medium hover:border-gray-400 transition-colors'>
                <User className='size-4'/>
                {username}
            </button>
            <UserModal 
                open={open}
                onClose={closeModal}
            >
                <div className='flex w-full flex-col min-w-52'>
                    <div className='flex w-full'>
                        <p className='text-lg font-semibold text-balance text-gray-700'>Hi! <span className='text-mystic-500 font-bold text-xl'>{username}</span></p>
                    </div>
                    <div className='border-t border-gray-200 pt-2'>
                        <Button 
                            onSumbit={signOut}
                            className='bg-red-500 border-red-500 hover:bg-red-600 w-full text-white '>    
                            Sign Out
                        </Button>
                    </div>
                </div>
            </UserModal>
        </div>
    )
}

export default Profile