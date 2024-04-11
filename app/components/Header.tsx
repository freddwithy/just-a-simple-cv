"use client"

import Link from "next/link"
import { getSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { Session } from "next-auth"
import { usePathname } from "next/navigation"
import LogoLink from "./ui/LogoLink"

interface NavLinksProps {
    linkTo: string
    name?: string
    signOutButton?: boolean
}

interface HeaderProps {
    navLinks: NavLinksProps[]
}

export const Header = ({ navLinks }: HeaderProps) => {
    const [session, setSession] = useState<Session | null>(null);
    const pathname = usePathname()

    useEffect(() => {
        const fetchData = async () => {
            // Esperar 1000 ms (1 segundo) antes de llamar a getSession

            const fetchedSession = await getSession();
            if (fetchedSession) {
                setSession(fetchedSession);
            } else {
                // Manejar el caso de sesión nula si es necesario
            }
        };
    
        fetchData();
    }, []);
    
    

    return (
        <header className="flex justify-between p-4 items-center border-b border-gray-200">
            <div>
                <LogoLink />
            </div>
            <div className="flex gap-x-2">

                {
                    session === null && navLinks.map((link) => (
                        <Link key={link.name} href={link.linkTo}>
                            <p className="text-base text-white p-2 bg-mystic-500 borde rounded-lg font-semibold">{link.name}</p>
                        </Link>
                    ))
                }

                { 
                    session !== null && 
                    <button onClick={() => signOut()}>
                        <p className="text-base text-red-600 p-2 bg-white border border-red-600 rounded-lg font-semibold">Sign Out</p>
                    </button> 
                    
                }
                { 
                    session !== null && pathname === "/create" &&
                    <button onClick={() => signOut()}>
                        <p className="text-base text-white p-2 bg-mystic-700 borde rounded-lg font-semibold">Save</p>
                    </button>  
                }                
            </div>
        </header>
    )
}