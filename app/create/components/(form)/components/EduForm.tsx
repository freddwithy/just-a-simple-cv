'use client'
import React, { useEffect, useState } from 'react'
import InputField from '../../ui/InputField'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/Button'
import { LoaderCircle } from 'lucide-react'
import { Education } from '@prisma/client'
import { EducationForm } from '@/types/resume'

const formSchema = z.object({
    initDate: z.string().min(3, {
        message: "Start date is required"
    }),
    endDate: z.string().min(3, {
        message: "End date is required"
    }),
    entity: z.string().min(3, {
        message: "College is required"
    }).max(40, {
        message: "College must be less than 40 characters"
    }),
    certificate: z.string().min(3, {
        message: "Certificate is required"
    }).max(100, {
        message: "Certificate must be less than 100 characters"
    })
})

interface EducationFormProps {
    resumeId: string
    close: () => void
    initialData: Education
}

const EduForm : React.FC<EducationFormProps> = ({
    resumeId,
    close,
    initialData
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const onSubmit: SubmitHandler<EducationForm> = async (data) => {
        try {
            setIsLoading(true)
            if(initialData.id && initialData.id !== '') {
                const res = await fetch(`/api/${resumeId}/education/${initialData.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if(res.ok) {
                    setIsLoading(false)
                    toast.success('Education updated successfully')
                    router.refresh()
                    close()
                } else {
                    toast.error('Something went wrong')
                }
            } else {
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
                    close()
                } else {
                    toast.error('Something went wrong')
                }
            }
        } catch(err) {
            console.log(err)
        }
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<EducationForm>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        if(initialData) {
            setValue('entity', initialData.entity)
            setValue('certificate', initialData.certificate)
            setValue('initDate', initialData.initDate)
            setValue('endDate', initialData.endDate)
        }
    }, [initialData, setValue])

    const titleData = initialData.id && initialData.id !== '' ? 'Edit Education' : 'Add New Education'

    return (
        <div className="px-2 py-2 flex-col flex min-w-96">
            <p className="text-xl font-semibold mb-2">{titleData}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField 
                    formHook={{...register("initDate")}}
                    label="From"
                    nameInput="initDate"
                    typeInput="date"
                />
                {errors.initDate && <p className="text-red-500">{errors.initDate.message}</p>}
                <InputField 
                    formHook={{...register("endDate")}}
                    label="To"
                    nameInput="endDate"
                    typeInput="date"
                />
                {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                <InputField 
                    formHook={{...register("entity")}}
                    label="School/University"
                    nameInput="school"
                    typeInput="text"
                />
                {errors.entity && <p className="text-red-500">{errors.entity.message}</p>}
                <InputField 
                    formHook={{...register("certificate")}}
                    label="Career"
                    nameInput="career"
                    typeInput="text"
                />
                {errors.certificate && <p className="text-red-500">{errors.certificate.message}</p>}
                <Button className={`w-full flex justify-center items-center gap-x-2 ${isLoading && "opacity-80 cursor-wait"}`}>
                    {
                        isLoading && <LoaderCircle className="animate-spin"/>
                    }
                    Add
                </Button>
            </form>
        </div>
  )
}

export default EduForm
