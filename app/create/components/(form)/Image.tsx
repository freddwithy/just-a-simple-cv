'use client'

import { Image as ImageDB } from "@prisma/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import UploadImage from "../ui/UploadImage"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import Button from "@/app/components/ui/Button"

const formSchema = z.object({
    url: z.string().min(3, {
        message: "Url is required"
    })
})

type ImageFormInputs = z.infer<typeof formSchema>

interface ImageFormProps {
    imageData: ImageDB | null
    resumeId: string
}

const ImageForm: React.FC<ImageFormProps> = ({
    imageData,
    resumeId
}) => {
    const [ loading, setLoading ] = useState(false)

    const router = useRouter()

    const form = useForm<ImageFormInputs>({
        defaultValues: {
            url: ''
        },
        resolver: zodResolver(formSchema)
    })
    
    const onSubmit = async (data: ImageFormInputs) => {
        try {
            setLoading(true)
            if(imageData?.id && imageData?.id !== '' && data.url !== '') {
                const res = await fetch(`/api/${resumeId}/image/${imageData?.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        imageUrl: data.url
                    })
                })
                if(res.ok) {
                    toast.success('Image updated successfully')
                    setLoading(false)
                    router.refresh()
                }
            } else {
                const res = await fetch(`/api/${resumeId}/image`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        imageUrl: data.url
                    })
                })
                if(res.ok) {
                    toast.success('Image added successfully')
                    setLoading(false)
                    router.refresh()
                }
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            if(imageData?.id && imageData?.id !== '') {
                const res = await fetch(`/api/${resumeId}/image/${imageData?.id}`, {
                    method: 'DELETE'
                })
                if(res.ok) {
                    toast.success('Image deleted successfully')
                    setLoading(false)
                    router.refresh()
                }
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    return (

        <div className="flex gap-2 w-full">
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
                <UploadImage
                    disabled={loading}
                    onChange={(value) => {
                        form.setValue('url', value)
                    }}
                    onRemove={() => {
                        onDelete()
                    }}
                    value={form.watch('url', imageData?.url ? imageData?.url : '')}

                />
                {form.formState.errors.url && <p className="text-red-500">{form.formState.errors.url.message}</p>}
                <Button
                    className="w-full"
                >
                    {imageData?.id && imageData?.id !== '' ? 'Update image' : 'Add image'}
                </Button>
            </form>
        </div>
    )
}

export default ImageForm