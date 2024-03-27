import Link from "next/link"
import Container from "./ui/Container"
import Image from "next/image"

export const Hero = () => {
    return (
        <Container>
            <div className="flex justify-center items-center flex-col gap-y-4 max-w-lg text-center">
                <div className="flex justify-center flex-col gap-y-4 items-center">
                    <h1 className="text-6xl font-bold text-balance text-mystic-950">Create your CV faster than ever</h1>
                    <p className="text-pretty text-xl text-mystic-700">Stop wasting time with complitaced templates, make your CV the faster and easies way possible for free.</p>
                    <Link href="/create" className="bg-mystic-800 px-6 py-4 rounded-lg w-auto hover:bg-mystic-600 transition-colors">
                        <p className="font-semibold text-white">CREATE CV</p>
                    </Link>
                </div>
                <div className="flex justify-center pt-10 w-full h-auto flex-col gap-y-4">
                    <Image src="/cv-screen.webp" width={768} height={994} alt="cv-example" className="shadow-lg rounded-lg"/>
                    <div className="flex flex-col gap-y-4 items-center py-10">
                        <h2 className="text-4xl font-bold text-mystic-950 text-balance">One template is all what you need</h2>
                        <p className="text-mystic-700 text-2xl text-pretty">Minimalist a ease to edit. Export your CV in JSON and PDF formats.</p>
                        <Link href="/create" className="bg-mystic-800 px-6 py-4 rounded-lg w-auto hover:bg-mystic-600 transition-colors">
                            <p className="font-semibold text-white">TAKE ME TO THE CREATOR</p>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}