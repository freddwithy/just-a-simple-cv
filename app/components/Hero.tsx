import Link from "next/link"
import Container from "./ui/Container"

export const Hero = () => {
    return (
        <Container>
            <div className="flex justify-center items-center flex-col gap-y-4 max-w-lg text-center">
                <h1 className="text-6xl font-bold text-balance text-mystic-950">Create your CV faster than ever</h1>
                <p className="text-pretty text-xl text-mystic-700">Stop wasting time with complitaced templates, make your CV the faster and easies way possible for free.</p>
                <Link href="/create" className="bg-mystic-800 px-6 py-4 rounded-lg">
                    <p className="font-semibold text-white">CREATE CV</p>
                </Link>
            </div>
        </Container>
    )
}