import Link from "next/link"
import Container from "./ui/Container"

export const Header = () => {
    return (
        <Container>
            <header className="flex justify-between p-4 items-center border-b border-mystic-200">
                <div>
                    <Link href="/"> 
                        <p className="text-xl font-bold text-mystic-950">JustASimpleCV</p>
                    </Link>
                </div>
                <div>
                    <Link href="/create">
                        <p className="text-base text-white p-2 bg-mystic-500 borde rounded-lg font-semibold">Create</p>
                    </Link>
                </div>
            </header>
        </Container>
    )
}