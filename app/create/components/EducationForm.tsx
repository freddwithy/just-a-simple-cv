'use client'

import Button from "@/app/components/ui/Button"
import Modal from "@/app/components/ui/Modal"
import useModal from "@/hooks/useModal"
import { LoaderCircle, Plus } from "lucide-react"
import InputField from "./ui/InputField"
import { Education } from "@prisma/client"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    entity: z.string().min(3, {
        message: "College is required"
    }),
    initDate: z.string().min(3, {
        message: "Start date is required"
    }),
    endDate: z.string().min(3, {
        message: "End date is required"
    }),
    certificate: z.string().min(3, {
        message: "Certificate is required"
    })
})

interface EducationFormProps {
    educationData: Education[]
    resumeId: string
}

type ResumeInputs = {
    certificate: string
    entity: string
    initDate: string
    endDate: string
}

const EducationForm: React.FC<EducationFormProps> = ({
    educationData,
    resumeId
}) => {
    const { open, openModal, closeModal } = useModal()
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<ResumeInputs>({
        resolver: zodResolver(formSchema)
    })

    const isData = educationData.length > 0

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const onSubmit: SubmitHandler<ResumeInputs> = async (data) => {
        try {
            setIsLoading(true)
            const res = await fetch(`/api/${resumeId}/education`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if(res.ok) {
                setIsLoading(false)
                toast.success('Education added successfully')
                router.refresh()
                closeModal()
            } else {
                toast.error('Something went wrong')
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="flex gap-2 items-center w-full flex-col">
            {
                isData ? educationData.map((edu) => (
                    <div key={edu.id} className="space-y-2 bg-gray-200 rounded-lg p-2 w-full flex flex-col border border-gray-300">
                        <p className="font-semibold text-base">{edu.entity}</p>
                        <span className="text-sm">{edu.initDate.slice(0, 4)} - {edu.endDate.slice(0, 4)}</span>
                    </div>
                )) : (
                    <div className="space-y-2 bg-gray-200 rounded-lg p-2 w-full flex flex-col border border-gray-300">
                        <p className="font-normal text-gray-600 text-base">No education added yet</p>
                    </div>
                )
            }
            <Button 
                className="flex items-center justify-center bg-mystic-300 px-4 h-10 w-full text-gray-900"
                onSumbit={openModal}
            >
                <Plus className="size-5"/>
                Add
            </Button>
            <Modal
                open={open}
                onCLose={closeModal}
            >
                <div className="px-2 py-2 flex-col flex min-w-96">
                    <p className="text-xl font-semibold mb-2">Add New Education</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputField 
                            formHook={register("entity")}
                            label="School"
                            nameInput="school"
                            typeInput="text"
                        />
                        {errors.entity && <p className="text-red-500">{errors.entity.message}</p>}
                        <InputField 
                            formHook={register("certificate")}
                            label="Career"
                            nameInput="career"
                            typeInput="text"
                        />
                        {errors.certificate && <p className="text-red-500">{errors.certificate.message}</p>}
                        <InputField
                            formHook={register("initDate")}
                            label="From"
                            nameInput="initDate"
                            typeInput="date"
                        />
                        {errors.initDate && <p className="text-red-500">{errors.initDate.message}</p>}
                        <InputField 
                            formHook={register("endDate")}
                            label="To"
                            nameInput="endDate"
                            typeInput="date"
                        />
                        {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                        <Button className={`w-full flex justify-center items-center gap-x-2 ${isLoading && "opacity-80 cursor-wait"}`}>
                            {
                                isLoading && <LoaderCircle className="animate-spin"/>
                            }
                            Add
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default EducationForm