'use client'

import LogoLink from "@/app/components/ui/LogoLink"
import prismadb from "@/libs/prismadb"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(3, {
        message: 'The username must have at least 3 characters'
    }).max(200, {
        message: ''
    }),
    email: z.string().email({
        message: "The email must be a valid email address"
    }),
    password: z.string().min(6, {
        message: "The password must have at least 6 characters"
    }),
    confirmPassword: z.string().min(6, {
        message: "The password must have at least 6 characters"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "The passwords must match",
    path: ["confirmPassword"]
})

type SignUpInputs = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpInputs>({
        resolver: zodResolver(formSchema)
    })


    const onSignUp: SubmitHandler<SignUpInputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error('The passwords do not match')
        }

        try {
            setIsLoading(true)
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
                setIsLoading(false);
                toast.success('You have registered successfully');

                try {
                    setIsLoading(true)
                    const res = await signIn('credentials', {
                        email: data.email,
                        password: data.password,
                        redirect: false
                    })

                    if(res?.error) {
                        return toast.error(res.error)
                    } else {
                        router.push('/create/loading')
                    }
                } catch(err) {
                    toast.error("Something wrong happened.")
                    setIsLoading(false)
                } finally {
                    setIsLoading(false)
                } 
            } else {
                // Manejar errores de la API aquí
                const errorData = await res.json();
                toast.error(errorData.message);
            }
        } catch(err) {
            setIsLoading(false)
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)] animate-fade-up">
                <LogoLink className="mb-10"/>
                <form onSubmit={handleSubmit(onSignUp)} className="w-[600px] flex flex-col p-10 bg-white rounded-lg shadow-lg border border-gray-300 ">
                    <h1 className="font-bold text-3xl text-black mb-4">Create your account</h1>
                    <label className="mb-2 text-gray-600 font-medium" htmlFor="username">Username</label>
                    <input type="text" id="username" 
                        className="rounded-lg text-black font-semibold h-10 mb-2 bg-white border border-gray-300"
                        {...register("username")}
                    />
                    {
                        errors.username && (
                            <span className="text-red-700 text-sm mb-2">{errors.username.message}</span>
                        )
                    }
                    <label className="mb-2 text-gray-600 font-medium" htmlFor="email">Email</label>
                    <input type="email" id="email"
                        className="rounded-lg text-black font-semibold h-10 mb-2 bg-white border border-gray-300"
                        {...register("email")}
                    />
                    {
                        errors.email && (
                            <span className="text-red-700 text-sm mb-2">{errors.email.message}</span>
                        )
                    }
                    <label className="mb-2 text-gray-600 font-medium" htmlFor="password">Contraseña</label>
                    <input type="password" id="password"
                        className="rounded-lg text-black font-semibold h-10 mb-2 bg-white border border-gray-300" 
                        {...register("password")}
                    />
                    {
                        errors.password && (
                            <span className="text-red-700 text-sm mb-2">{errors.password.message}</span>
                        )
                    }
                    <label className="mb-2 text-gray-600 font-medium" htmlFor="confirmPassword">Confirma tu contraseña</label>
                    <input type="password" id="confirmPassword"
                        className="rounded-lg text-black font-semibold h-10 mb-2 bg-white border border-gray-300"
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
                    <button disabled={isLoading} className={`bg-mystic-700 rounded-lg text-white font-semibold h-10 mt-2 hover:opacity-90 transition flex items-center justify-center gap-x-2 ${
                        isLoading ? "opacity-50 cursor-wait hover:bg-mystic-700" :""
                    }`}>
                        {isLoading && (
                            <LoaderCircle className="animate-spin size-4"/>
                        )}
                        Sign Up
                    </button>
                    <div className="flex justify-center items-center">
                        <p className="mt-4" >If you already have an account, please <a href="/auth/login" className="text-blue-600 font-medium hover:underline">Log In</a></p>
                    </div>                 
                </form>
            </div>
        </>
    )
}