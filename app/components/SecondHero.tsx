import Link from "next/link"
import Container from "./ui/Container"

const SecondHero = () => {
    return (
        <Container>
            <div className="flex flex-col gap-y-4 items-center justify-center text-center">
                <h2 className="text-4xl font-bold text-mystic-700 text-balance">Simplify Your CV Creation</h2>
                <p className="text-gray-800 text-xl text-pretty">Our minimalist template is easy to edit. Export your CV in JSON and PDF formats effortlessly.</p>
                <Link href="/create" className="border-orange-600 border px-6 py-4 rounded-lg w-auto hover:bg-orange-500 transition-colors text-orange-600 hover:text-white">
                <p className="font-semibold">TAKE ME TO THE CREATOR</p>
                </Link>
            </div>
        </Container>      
    )
}

export default SecondHero