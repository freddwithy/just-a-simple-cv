'use client'

import Button from "@/app/components/ui/Button"
import InputField from "./ui/InputField"
import TextAreaField from "./ui/TextAreaField"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { Education, Experience, Image, Resume, Skills } from "@prisma/client"
import EducationForm from "./(form)/Education"
import ExperienceForm from "./(form)/Experience"
import { LoaderCircle, Printer } from "lucide-react"
import { useRouter } from "next/navigation"
import SkillForm from "./(form)/Skill"
import { ResumeForm } from "@/types/resume"
import ImageForm from "./(form)/Image"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }).max(150, { message: "Name must be less than 150 characters" }),
    lastName: z.string().min(2, { message: "Last name is required" }).max(150, { message: "Last name must be less than 150 characters" }),
    city: z.string().min(3, { message: "City is required" }).max(150, { message: "City must be less than 150 characters" }),
    shortResume: z.string().min(3, { message: "Short resume is required" }).max(500, { message: "Short resume must be less than 500 characters" }),
    aboutMe: z.string().min(10, { message: "About me is required" }).max(500, { message: "About me must be less than 500 characters" }),
})


interface ResumeProps {
    initialData: Resume
    educationData: Education[]
    experienceData: Experience[]
    skillData: Skills[]
    imageData: Image | null
}


export const CVFormComponent: React.FC<ResumeProps> = ({
    initialData,
    educationData,
    experienceData,
    skillData,
    imageData
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const router = useRouter()

    const componentRef = useRef(null)

    const { register, handleSubmit, formState: { errors } } = useForm<ResumeForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name,
            lastName: initialData?.lastName,
            city: initialData?.city,
            shortResume: initialData?.shortResume,
            aboutMe: initialData?.aboutMe
        },
    })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const onSubmit: SubmitHandler<ResumeForm> = async (data) => {
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
                        <h3 className="text-lg font-medium text-gray-950">Main</h3>
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
                        <h3 className="text-lg font-medium text-gray-950">About me</h3>
                        <TextAreaField 
                            formHook={{...register("aboutMe")}}
                            nameInput="aboutme"
                            placeholder="Frontend web developer and Graphic Designer..."
                            label="Talk about you"
                            maxLength={500}
                        />
                        {errors.aboutMe && <p className="text-red-500">{errors.aboutMe.message}</p>}
                    </div>            
                    <Button className={`flex items-center justify-center px-4 h-10 w-full  ${isLoading && "opacity-80 cursor-wait"}`}>
                        {
                            isLoading && <LoaderCircle 
                                className="animate-spin animate-infinite"
                            />
                        }
                        {initialData ? "Update" : "Send"}  
                    </Button>   
                </form>
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-950">Image</h3>
                    
                        <ImageForm 
                            imageData={imageData}
                            resumeId={initialData.id}
                        />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-950">Education</h3>
                    
                        <EducationForm 
                            educationData={educationData}
                            resumeId={initialData.id}
                        />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-950">Experience</h3>
                    
                        <ExperienceForm 
                            experienceData={experienceData}
                            resumeId={initialData.id}
                        />
                </div> 
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-950">Skills</h3>
                    
                        <SkillForm 
                            skillData={skillData}
                            resumeId={initialData.id}
                        />
                </div>
            </div>
        </aside>
    )
}