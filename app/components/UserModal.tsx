'use client'
import { X } from 'lucide-react'
import React, { ReactNode, useEffect, useState } from 'react'

interface ModalProps {
    open: boolean
    onClose: () => void
    children: ReactNode
    className?: string
}


const UserModal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    className
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null
    return (
        <div onClick={(e) => e.stopPropagation()} className={`absolute bg-white shadow-md p-6 rounded-lg transition-all top-16 right-2 justify-center flex flex-col ${open ? "translate-y-0 opacity-100 visible" : "-translate-y-2 opacity-0 invisible"} ${className}`}>
            {children}
            <div className='flex items-center justify-center mt-4'>
                <button onClick={onClose} className='flex items-center justify-center bg-gray-200 rounded-full p-2 hover:opacity-80'>
                    <X className='size-5 text-gray-600'/>
                </button>
            </div>
        </div>
    )
}

export default UserModal