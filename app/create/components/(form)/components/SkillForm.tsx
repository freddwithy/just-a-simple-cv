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
import {  Skills } from '@prisma/client'
import { SkillFormInputs } from '@/types/resume'

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name is required"
    }).max(40, {
        message: "Name must be less than 40 characters"
    }),
})

interface EducationFormProps {
    resumeId: string
    close: () => void
    initialData: Skills
}

const SkillForm : React.FC<EducationFormProps> = ({
    resumeId,
    close,
    initialData
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const onSubmit: SubmitHandler<SkillFormInputs> = async (data) => {
        try {
            setIsLoading(true)
            if(initialData.id && initialData.id !== '') {
                const res = await fetch(`/api/${resumeId}/skill/${initialData.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if(res.ok) {
                    setIsLoading(false)
                    toast.success('Skill updated successfully')
                    router.refresh()
                    close()
                } else {
                    toast.error('Something went wrong')
                }
            } else {
                const res = await fetch(`/api/${resumeId}/skill`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if(res.ok) {
                    setIsLoading(false)
                    toast.success('Skill added successfully')
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

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SkillFormInputs>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        if(initialData) {
            setValue('name', initialData.name)
        }
    }, [initialData, setValue])

    const titleData = initialData.id && initialData.id !== '' ? 'Edit Skill' : 'Add New Skill'

    return (
        <div className="px-2 py-2 flex-col flex min-w-96">
            <p className="text-xl font-semibold mb-2">{titleData}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField 
                    formHook={{...register("name")}}
                    label="Skill"
                    nameInput="name"
                    typeInput="text"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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

export default SkillForm
