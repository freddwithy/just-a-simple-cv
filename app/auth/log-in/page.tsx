'use client'

import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import toast from "react-hot-toast"
import { useState } from "react"

const formSchema = z.object({
    email: z.string().email({
        message: "El correo debe ser un correo válido"
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    })
})

type LogInInputs = {
    email: string,
    password: string,
}

export default function LoginPage() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<LogInInputs>({
        resolver: zodResolver(formSchema)
    })

    console.log(errors)

    const onLogIn: SubmitHandler<LogInInputs> = async (data) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if(res?.error) {
            return toast.error(res.error)
        } else {
            router.push('/create')
            toast.success('Haz iniciado sesion')
        }

        console.log(res?.error)
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
            <form onSubmit={handleSubmit(onLogIn)} className="w-[600px] flex flex-col p-10 bg-mystic-200 rounded-md shadow-lg border border-mystic-300">
                <h1 className="font-bold text-3xl text-mystic-950 mb-4">Inicia Sesión</h1>
                <label className="mb-2 text-mystic-700 font-medium" htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email"
                    className="rounded-md text-black font-semibold h-10 mb-2 bg-white border border-mystic-300"
                    {...register("email")}
                />
                {
                    errors.email && (
                        <span className="text-red-700 text-sm mb-2">{errors.email.message}</span>
                    )
                }
                <label className="mb-2 text-mystic-700 font-medium" htmlFor="password">Contraseña</label>
                <input type="password" id="password"
                    className="rounded-md text-black font-semibold h-10 mb-2 bg-white border border-mystic-300" 
                    {...register("password")}
                />
                {
                    errors.password && (
                        <span className="text-red-700 text-sm mb-2">{errors.password.message}</span>
                    )
                }
                <button className="bg-mystic-700 rounded-md text-white font-semibold h-10 mt-2 hover:bg-mystic-600 transition">Entrar</button>
            </form>
        </div>
    )
}