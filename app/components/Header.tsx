"use client"

import Link from "next/link"
import Container from "./ui/Container"
import { signOut } from "next-auth/react"
import { Session } from "next-auth"

interface NavLinksProps {
    linkTo: string
    name: string
    signOutButton?: boolean
}

interface HeaderProps {
    navLinks: NavLinksProps[]
}

export const Header = ({ navLinks }: HeaderProps) => {
    return (
        <Container>
            <header className="flex justify-between p-4 items-center border-b border-mystic-200">
                <div>
                    <Link href="/"> 
                        <p className="text-xl font-bold text-mystic-950">JustASimpleCV</p>
                    </Link>
                </div>
                <div className="flex gap-x-4">
                {
                    navLinks.map((link) => (
                        <Link key={link.name} href={link.linkTo}>
                            <p className="text-base text-white p-2 bg-mystic-500 borde rounded-lg font-semibold">{link.name}</p>
                        </Link>                        
                    )) 
                }
                <button onClick={() => signOut()}>
                    <p className="text-base text-white p-2 bg-mystic-500 borde rounded-lg font-semibold">Sign Out</p>
                </button>  
                </div>
            </header>
        </Container>
    )
}