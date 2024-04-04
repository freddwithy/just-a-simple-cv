'use client'
import prismadb from "@/libs/prismadb"
import { Resume } from "@prisma/client"
import axios from "axios"
import { FileText, Plus, Type } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface CvFormProps {
    initialData: Resume | null
}

const formSchema = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    shortResume: z.string().min(1),
    city: z.string().min(1),
    aboutYou: z.string().min(1)
})

type ResumeFormValues = z.infer<typeof formSchema>


export const CVFormComponent: React.FC<CvFormProps> = async ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()

    const [ loaging, setLoading ] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post(`/api/resumes`, values)
            window.location.assign(`/${response.data.id}`)
        } catch (err) {
            toast.error('Ups! Algo salio mal.')
        } finally {
            setLoading(false)
        }
    }


    return (
        <aside className="min-w-40 max-w-lg flex-grow max-h-screen overflow-y-scroll">
            <nav className="flex flex-col w-full p-4 gap-y-4">
                <h2 className="text-3xl font-bold text-mystic-950 flex gap-x-2 items-center">
                    <FileText size={25} />
                    Crea tu curriculum
                </h2>
                <form className="flex flex-col gap-y-6" onChange={handleValues}>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-mystic-950">Principal</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Nombre</label>
                            <input  type="text" name="name" placeholder="Freddy" className="p-2 bg-mystic-100 rounded-lg"/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Apellido</label>
                            <input  type="text" name="lastName" placeholder="Sanabria" className="p-2 bg-mystic-100 rounded-lg"/>
                        </div> 
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Resumen</label>
                            <textarea name="resume" placeholder='Desarrollador web Frontend y Diseñador Gráfico...' className="p-2 bg-mystic-100 rounded-lg resize-none h-32"/>
                        </div> 
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Ubicación</label>
                            <input  type="text" name="location" placeholder="Ciudad Del Este" className="p-2 bg-mystic-100 rounded-lg"/>
                        </div> 
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-mystic-950">Sobre mi</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Habla acerca de ti</label>
                            <textarea onChange={handleText} maxLength={300} placeholder="Experimentado diseñador gráfico con más de 4 años de experiencia..." className="p-2 bg-mystic-100 rounded-lg h-36 resize-none" name="aboutYou"/>
                            <span className="text-sm text-mystic-600">{text.length}/300</span>
                        </div>
                    </div>
                    <button className="bg-mystic-600 text-white font-semibold px-1 py-2 rounded-md">Enviar</button>               
                </form>
            </nav>
        </aside>
    )
}