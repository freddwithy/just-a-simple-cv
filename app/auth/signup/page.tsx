'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
    }).max(200, {
        message: ''
    }),
    email: z.string().email({
        message: "El correo debe ser un correo válido"
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    }),
    confirmPassword: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["confirmPassword"]
})

type SignInInputs = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignInPage() {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<SignInInputs>({
        resolver: zodResolver(formSchema)
    })

    console.log(errors)

    const onSignUp: SubmitHandler<SignInInputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error('Las contraseñas no coinciden.')
        }

        try {
            const res = await fetch('/api/auth/sign-up', {
                method: 'POST',
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                toast.success('Te haz registrado correctamente')
                router.push("/auth/log-in");
            } 
        } catch(error: any) {
            toast.error('Algo salio mal.')
        }
    }

    console.log(errors)

    return (
        <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
            <form onSubmit={handleSubmit(onSignUp)} className="w-[600px] flex flex-col p-10 bg-mystic-200 rounded-md shadow-lg border border-mystic-300">
                <h1 className="font-bold text-3xl text-mystic-950 mb-4">Nuevo Usuario</h1>
                <label className="mb-2 text-mystic-700 font-medium" htmlFor="username">Nombre de Usuario</label>
                <input type="text" id="username" 
                    className="rounded-md text-black font-semibold h-10 mb-2 bg-white border border-mystic-300"
                    {...register("username")}
                />
                {
                    errors.username && (
                        <span className="text-red-700 text-sm mb-2">{errors.username.message}</span>
                    )
                }
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
                <label className="mb-2 text-mystic-700 font-medium" htmlFor="confirmPassword">Confirma tu contraseña</label>
                <input type="password" id="confirmPassword"
                    className="rounded-md text-black font-semibold h-10 mb-2 bg-white border border-mystic-300"
                    {...register("confirmPassword")}
                />
                {
                    errors.confirmPassword && (
                        <span className="text-red-700 text-sm mb-2">{errors.confirmPassword.message}</span>
                    )
                }
                {
                    errors.root?.message && (
                        <span className="text-red-700 text-sm mb-2">{errors.root.message}</span>
                    )
                }
                <button className="bg-mystic-700 rounded-md text-white font-semibold h-10 mt-2 hover:bg-mystic-600 transition">Registrarse</button>
            </form>
        </div>
    )
}