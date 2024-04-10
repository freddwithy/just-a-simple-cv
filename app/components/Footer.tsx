import { Github, Linkedin } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="h-16 w-full max-w-4xl mx-auto border-t border-mystic-200 p-4 flex justify-between items-center">
            <div>
                <span className="font-semibold text-mystic-700">Created by <a className="hover:underline text-mystic-950" href="https://freddsana.art/en" target="_blank">Freddy Sanabria</a></span>  
            </div>
            <div className="flex gap-x-4">
                <a href="https://github.com/freddwithy/" target="_blank" className="hover:scale-105 transition">
                    <Github />
                </a>
                <a href="https://linkedin.com/in/freddwithy" target="_blank" className="hover:scale-105 transition">
                    <Linkedin />
                </a>
            </div>
        </footer>
    )
}