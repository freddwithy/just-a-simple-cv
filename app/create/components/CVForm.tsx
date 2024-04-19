'use client'

import Button from "@/app/components/ui/Button"
import InputField from "./ui/InputField"
import TextAreaField from "./ui/TextAreaField"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import toast from "react-hot-toast"
import { Resume } from "@prisma/client"
import EducationForm from "./EducationForm"
import ExperienceForm from "./ExperienceForm"

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'The name must have at least 3 characters'
    }).max(200, {
        message: ''
    }),
    lastName: z.string().min(3).max(150),
    city: z.string().min(3).max(150),
    shortResume: z.string().min(6, {
        message: "Short resume must be at least 6 characters"
    }).max(200),
    aboutMe: z.string().min(6)
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
}


export const CVFormComponent: React.FC<ResumeProps> = ({
    initialData,
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<ResumeInputs>({
        resolver: zodResolver(formSchema)
    })

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
                        <InputField
                            formHook={{...register("lastName")}}
                            typeInput="text"
                            nameInput="lastName"
                            placeholder="Sanabria"
                            label="Last Name"
                        />
                        <TextAreaField 
                            formHook={{...register("shortResume")}}
                            nameInput="resume"
                            placeholder="Frontend web developer and Graphic Designer..."
                            label="About you"
                        />
                        <InputField 
                            formHook={{...register("city")}}
                            typeInput="text"
                            nameInput="city"
                            placeholder="Ciudad del Este"
                            label="City"
                        />
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
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-950">Education</h3>
                        <EducationForm />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-950">Experience</h3>
                        <ExperienceForm />
                    </div> 
                    <Button 
                        text="Save"
                    />     
                </form>
            </div>
        </aside>
    )
}