'use client'
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
        <div className={`absolute bg-white shadow-md p-6 rounded-lg transition-all top-16 right-2 ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"} ${className}`}>
            {children}
        </div>
    )
}

export default UserModal