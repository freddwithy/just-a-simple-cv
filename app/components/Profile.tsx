'use client'
import { User } from 'lucide-react'
import React from 'react'
import UserModal from './UserModal'
import useModal from '@/hooks/useModal'

const Profile = () => {
    const { closeModal, open, openModal } = useModal()
    return (
        <div className='relative'>
            <button onClick={open ? closeModal : openModal} className='flex items-center justify-center bg-gray-200 p-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors'>
                <User />
            </button>
            <UserModal 
                open={open}
                onClose={closeModal}
            >
                Hola
            </UserModal>
        </div>
    )
}

export default Profile