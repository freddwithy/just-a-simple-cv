'use client'

import Button from "@/app/components/ui/Button"
import InputField from "./ui/InputField"
import TextAreaField from "./ui/TextAreaField"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Education, Resume } from "@prisma/client"
import EducationForm from "./EducationForm"
import ExperienceForm from "./ExperienceForm"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }).max(150, { message: "Name must be less than 150 characters" }),
    lastName: z.string().min(2, { message: "Last name is required" }).max(150, { message: "Last name must be less than 150 characters" }),
    city: z.string().min(3, { message: "City is required" }).max(150, { message: "City must be less than 150 characters" }),
    shortResume: z.string().min(3, { message: "Short resume is required" }).max(500, { message: "Short resume must be less than 500 characters" }),
    aboutMe: z.string().min(10, { message: "About me is required" }).max(500, { message: "About me must be less than 500 characters" }),
})

type ResumeInputs = {
    name: string,
    lastName: string,
    city: string,
    shortResume: string,
    aboutMe: string,
}

interface ResumeProps {
    initialData: Resume
    educationData: Education[]
}


export const CVFormComponent: React.FC<ResumeProps> = ({
    initialData,
    educationData
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<ResumeInputs>({
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const onSubmit: SubmitHandler<ResumeInputs> = async (data) => {
        try {
            setIsLoading(true)
            if (initialData) {
                const res = await fetch('/api/resumes', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: data.name,
                        lastName: data.lastName,
                        city: data.city,
                        shortResume: data.shortResume,
                        aboutMe: data.aboutMe
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (res.ok) {
                    setIsLoading(false);
                    toast.success('You have updated the resume');
                    router.refresh()
                } else {
                    // Manejar errores de la API aquí
                    const errorData = await res.json();
                    toast.error(errorData.message);
                }
            } else {
                const res = await fetch('/api/resumes', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: data.name,
                        lastName: data.lastName,
                        city: data.city,
                        shortResume: data.shortResume,
                        aboutMe: data.aboutMe
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (res.ok) {
                    setIsLoading(false);
                    toast.success('You have created the resume');
                } else {
                    // Manejar errores de la API aquí
                    const errorData = await res.json();
                    toast.error(errorData.message);
                }
            }
            
        } catch(err) {
            setIsLoading(false)
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <aside className="min-w-40 max-w-md flex-grow max-h-screen overflow-y-scroll">
            <div className="flex flex-col w-full p-4 gap-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-950">Main</h3>
                        <InputField
                            formHook={{...register("name")}}
                            typeInput="text"
                            nameInput="name"
                            placeholder="Fredd"
                            label="First Name"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        <InputField
                            formHook={{...register("lastName")}}
                            typeInput="text"
                            nameInput="lastName"
                            placeholder="Sanabria"
                            label="Last Name"
                        />
                        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                        <TextAreaField 
                            formHook={{...register("shortResume")}}
                            nameInput="resume"
                            placeholder="Frontend web developer and Graphic Designer..."
                            label="About you"
                        />
                        {errors.shortResume && <p className="text-red-500">{errors.shortResume.message}</p>}
                        <InputField 
                            formHook={{...register("city")}}
                            typeInput="text"
                            nameInput="city"
                            placeholder="Ciudad del Este"
                            label="City"
                        />
                        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-950">About me</h3>
                        <TextAreaField 
                            formHook={{...register("aboutMe")}}
                            nameInput="aboutme"
                            placeholder="Frontend web developer and Graphic Designer..."
                            label="Talk about you"
                            maxLength={500}
                        />
                        {errors.aboutMe && <p className="text-red-500">{errors.aboutMe.message}</p>}
                    </div>            
                    <Button className={`flex items-center justify-center gap-x-2 ${isLoading && "opacity-80 cursor-wait"}`}>
                        {
                            isLoading && <LoaderCircle 
                                className="animate-spin animate-infinite"
                            />
                        }
                        Save    
                    </Button>   
                </form>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-950">Education</h3>
                        <EducationForm 
                            educationData={educationData}
                        />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-950">Experience</h3>
                        <ExperienceForm />
                </div> 
            </div>
        </aside>
    )
}