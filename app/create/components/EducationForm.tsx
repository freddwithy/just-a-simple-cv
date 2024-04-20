'use client'

import Button from "@/app/components/ui/Button"
import Modal from "@/app/components/ui/Modal"
import useModal from "@/hooks/useModal"
import { Plus } from "lucide-react"
import InputField from "./ui/InputField"
import { Education } from "@prisma/client"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
})

interface EducationFormProps {
    educationData: Education[]
}

type ResumeInputs = {
    entity: string
    initDate: string
    endDate: string
}

const EducationForm: React.FC<EducationFormProps> = ({
    educationData
}) => {
    const { open, openModal, closeModal } = useModal()
    const [isMounted, setIsMounted] = useState(false)

    const { register, handleSubmit } = useForm<ResumeInputs>({
        resolver: zodResolver(formSchema)
    })

    const isData = educationData.length > 0

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const onSubmit: SubmitHandler<ResumeInputs> = async (data) => {
        try {
            
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="flex gap-2 items-center w-full">
            {
                isData ? educationData.map((edu) => (
                    <div key={edu.id} className="space-y-2 bg-gray-200 rounded-lg p-2 w-full">
                        <p className="font-semibold text-base">{edu.entity}</p>
                        <span className="text-sm">{edu.initDate} - {edu.endDate}</span>
                    </div>
                )) : (
                    <p className="w-full text-sm text-gray-500">No data available</p>
                )
            }
            <Button 
                className="flex items-center justify-center bg-gray-500 px-4 h-10"
                onSumbit={openModal}
            >
                <Plus />
                Add
            </Button>
            <Modal
                open={open}
                onCLose={closeModal}
            >
                <div className="px-2 py-2 flex-col flex min-w-96">
                    <p className="text-xl font-semibold mb-2">Add New Education</p>
                    <form action="" className="space-y-4">
                        <InputField 
                            label="School"
                            nameInput="school"
                            typeInput="text"
                        />
                        <InputField 
                            label="Career"
                            nameInput="career"
                            typeInput="text"
                        />
                        <InputField 
                            label="From"
                            nameInput="initDate"
                            typeInput="date"
                        />
                        <InputField 
                            label="To"
                            nameInput="endDate"
                            typeInput="date"
                        />
                        <Button 
                            text="Add new"
                            className="w-full"
                        />
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default EducationForm