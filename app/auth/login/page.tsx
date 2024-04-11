'use client'

import { getSession, signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import toast from "react-hot-toast"
import { Header } from "@/app/components/Header"
import { cache, useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import Image from "next/image"

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

const navLinks = [
    {
        linkTo: "/auth/login",
        name: "Log in",
    },
    {
        linkTo: "/auth/signup",
        name: "Sign Up",
    },
]

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingG, setIsLoadingG] = useState<boolean>(false)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<LogInInputs>({
        resolver: zodResolver(formSchema)
    })

    console.log(errors)

    const onLogIn: SubmitHandler<LogInInputs> = async (data) => {
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
                router.push('/create')
                toast.success('Haz iniciado sesion')
            }
        } catch(err) {
            toast.error("Something wrong happened.")
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }          
    }

    const loginWithGoogle = async () => {
        try {
            setIsLoadingG(true)
            await signIn("google", {callbackUrl: "/create"})
        } catch(err) {
            toast.error("Something wrong happened.")
            setIsLoadingG(false)
        } finally {
            setIsLoadingG(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession()
            if (session) {
                return { redirect: { destination: "/" } }
            }
        } 

        fetchData()
    })

    return (
        <>
            <Header navLinks={navLinks} />
            <div className="flex items-center justify-center h-[calc(100vh-7rem)] animate-fade-up">
                <form onSubmit={handleSubmit(onLogIn)} className="w-[600px] flex flex-col p-10 bg-white rounded-lg shadow-lg border border-gray-300">
                    <h1 className="font-bold text-3xl text-black mb-4">Log in with your account</h1>
                    <label className="mb-2 text-gray-600 font-medium" htmlFor="email">Email</label>
                    <input type="email" id="email"
                        className="rounded-md text-black font-semibold h-10 mb-2 bg-white border border-gray-300"
                        {...register("email")}
                    />
                    {
                        errors.email && (
                            <span className="text-red-700 text-sm mb-2">{errors.email.message}</span>
                        )
                    }
                    <label className="mb-2 text-gray-600 font-medium" htmlFor="password">Password</label>
                    <input type="password" id="password"
                        className="rounded-md text-black font-semibold h-10 mb-2 bg-white border border-gray-300" 
                        {...register("password")}
                    />
                    {
                        errors.password && (
                            <span className="text-red-700 text-sm mb-2">{errors.password.message}</span>
                        )
                    }
                    <button disabled={isLoading} className={`bg-mystic-700 rounded-md text-white font-semibold h-10 mt-2 hover:bg-mystic-600 transition flex items-center justify-center gap-x-2 ${
                        isLoading ? "opacity-50 cursor-wait hover:bg-mystic-700" :""
                    }`}>
                        {isLoading && (
                            <LoaderCircle className="animate-spin size-4"/>
                        )}
                        Sign In
                    </button>
                    <div className="border-t border-gray-300  flex flex-col justify-center items-center">
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-64 h-px my-8 bg-gray-400 border-0"/>
                            <span className="absolute px-3 font-semibold text-gray-600 -translate-x-1/2 bg-white left-1/2">or</span>
                        </div>
                        <a onClick={loginWithGoogle} className={`bg-white rounded-md text-orange-600 font-semibold h-10 hover:bg-orange-600 hover:text-white transition border border-orange-600 flex items-center justify-center cursor-pointer w-full gap-x-2 ${isLoadingG ? "opacity-50 hover:bg-white hover:text-orange-600 cursor-wait" : ""}`}>
                            {isLoadingG && (
                                <LoaderCircle className="animate-spin size-4"/>
                            )}
                            Sign In With Google
                            <Image src="/google.svg" width={15} height={30} alt="google logo" />
                        </a>
                    </div>                 
                </form>
            </div>
        </> 
    )
}

