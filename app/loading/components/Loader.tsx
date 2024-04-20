'use client'

import ActionButton from "@/app/components/ui/ActionButton"
import Button from "@/app/components/ui/Button"
import { Resume } from "@prisma/client"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

interface LoaderProps {
    resume: Resume | null
    name: string | undefined | null
}


const Loader: React.FC<LoaderProps> = ({
    resume,
    name
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [createdResume, setCreatedResume] = useState(false)

    const router = useRouter();

    useEffect(() => {
        if(resume) {
            setCreatedResume(true)
        } else {
            setCreatedResume(false)
        }
    }, [createdResume, resume, router])


    const createResume = async () => {
        setIsLoading(true);
        const res = await fetch('/api/resumes', {
            method: 'POST',
            body: JSON.stringify({
                name: 'Your',
                lastName: "Name",
                city: "Your city here",
                shortResume: "Write a short resume about you",
                aboutMe: "Tell us more about your experience, education and in general about you, try to be confident"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (res.ok) {
            setIsLoading(false);
            toast.success('Your resume is ready!');
            router.refresh()
        } else {
            setIsLoading(false);
            toast.error('Something went wrong');
        }
    };

    return (
        <>
            {
                isLoading && (
                    <div className="p-10 border border-gray-200 shadow-lg flex gap-x-8 items-center rounded-lg">
                        <LoaderCircle className="animate-spin animate-infinite size-10 text-mystic-600"/>
                        <p className="text-2xl text-center font-medium text-pretty">Please wait, we&apos;re creating your cv...</p>
                    </div>
                ) 
            }
            {
                createdResume && (
                    <div className="p-10 border border-gray-200 shadow-lg flex gap-x-8 items-center rounded-lg">
                        <p className="text-2xl text-center font-medium text-pretty">Your resume is ready!</p>
                        <ActionButton 
                            link={`/${resume?.id}`}
                            title="Go to the creator"
                        />
                    </div>
                )
            }
            {
                !createdResume && !isLoading && (
                    <div className="p-10 border border-gray-200 shadow-lg flex gap-y-8 items-center rounded-lg flex-col max-w-lg">
                            <p className="text-2xl text-center font-medium text-pretty">Hi! <span className="text-mystic-700 font-bold">{name}</span>, you don&apos;t have any resume yet. Do do you want to create one?</p>
                            <Button 
                                text="Create"
                                onSumbit={createResume}
                                className="w-80"
                            />                  
                    </div>
                )
            }
        </>
    )
}

export default Loader