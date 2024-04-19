'use client'

import { useState } from "react"

const useModal = () => {
    const [open, setOpen] = useState(false)

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return {
        openModal,
        closeModal,
        open
    }
}
  

export default useModal