'use client'

import { ArrowDown, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

const PreviewButton = () => {
    const [isBottom, setIsBottom] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)

    const handleClick = ( ) => {
        if(isBottom) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        } else {    
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            })
        }
    }

    const handleScroll = () => {
        if (window.scrollY > 800) {
            setIsBottom(true)
        } else {
            setIsBottom(false)
        }
        if (window.scrollY > 10) {
            setIsScrolling(true)
        } else {
            setIsScrolling(false)
        }
    }
    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
        window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="fixed right-5 bottom-5 z-10 md:hidden items-center justify-center flex">
            <button onClick={handleClick} className={`flex items-center gap-x-1 justify-center bg-orange-200 p-2 rounded-lg border border-orange-500 text-sm font-semibold hover:border-orange-400 transition-all ${isScrolling ? '' : 'translate-x-32'}`}>
                <p className="text-orange-950 flex gap-x-1 items-center">
                    {
                        isBottom ? <ArrowUp className="size-4"/> : <ArrowDown className="size-4"/>
                    }
                </p>
            </button>
        </div>
    )
}

export default PreviewButton