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
import { Experience } from '@prisma/client'
import { ExperienceForm } from '@/types/resume'

const formSchema = z.object({
    initDate: z.string().min(3, {
        message: "Start date is required"
    }),
    endDate: z.string().min(3, {
        message: "End date is required"
    }),
    company: z.string().min(3, {
        message: "Company is required"
    }).max(40, {
        message: "Company must be less than 40 characters"
    }),
    position: z.string().min(3, {
        message: "Position is required"
    }).max(40, {
        message: "Position must be less than 40 characters"
    })
})

interface ExperienceFormProps {
    resumeId: string
    close: () => void
    initialData: Experience
}

const ExpeForm : React.FC<ExperienceFormProps> = ({
    resumeId,
    close,
    initialData
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const onSubmit: SubmitHandler<ExperienceForm> = async (data) => {
        try {
            setIsLoading(true)
            if(initialData.id && initialData.id !== '') {
                const res = await fetch(`/api/${resumeId}/experience/${initialData.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if(res.ok) {
                    setIsLoading(false)
                    toast.success('Experience updated successfully')
                    router.refresh()
                    close()
                } else {
                    toast.error('Something went wrong')
                }
            } else {
                const res = await fetch(`/api/${resumeId}/experience`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if(res.ok) {
                    setIsLoading(false)
                    toast.success('Experience added successfully')
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

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ExperienceForm>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        if(initialData) {
            setValue('company', initialData.company)
            setValue('position', initialData.position)
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
                    formHook={{...register("company")}}
                    label="Company"
                    nameInput="company"
                    typeInput="text"
                />
                {errors.company && <p className="text-red-500">{errors.company.message}</p>}
                <InputField 
                    formHook={{...register("position")}}
                    label="Position"
                    nameInput="position"
                    typeInput="text"
                />
                {errors.position && <p className="text-red-500">{errors.position.message}</p>}
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

export default ExpeForm
