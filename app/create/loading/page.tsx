
import { getServerSession } from "next-auth"
import Loader from "./components/Loader"
import { authConfig } from "@/libs/auth"
import prismadb from "@/libs/prismadb"
import { redirect } from "next/navigation"

const LoadingPage = async () => {
    const session = await getServerSession(authConfig)
    const userId = session?.user?.id
    const name = session?.user?.name

    const resume = await prismadb.resume.findFirst({
        where: {
            userId: userId
        }
    })

    if(!userId) {
        redirect('/auth/login')
    }

    if(resume) {
        redirect('/create')
    }

    return (
        <main className="flex items-center justify-center w-full h-screen">
            <Loader name={name} resume={resume} />
        </main>
    )
}

export default LoadingPage
