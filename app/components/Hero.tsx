import Link from "next/link"
import Container from "./ui/Container"
import LogoLink from "./ui/LogoLink"

export const Hero = () => {
    return (
        <Container>
            <LogoLink />
            <div className="flex justify-center items-center flex-col gap-y-4 text-center animate-fade-up mt-10">
                <div className="flex justify-center flex-col gap-y-4 items-center">
                    <h1 className="text-6xl font-bold text-balance text-black">Create your CV faster than ever</h1>
                    <p className="text-pretty text-xl text-mystic-700"><span className="text-orange-500 font-medium">Stop wasting time</span> with complitaced templates, make your CV the <span className="text-orange-700 font-medium">faster and easies</span> way possible for free.</p>
                    <Link href="/create" className="bg-mystic-700 px-6 py-4 rounded-lg w-auto hover:bg-mystic-600 transition-colors">
                        <p className="font-semibold text-white">Create your Resume - It's Free!</p>
                    </Link>
                </div>
            </div>
        </Container>
    )
}