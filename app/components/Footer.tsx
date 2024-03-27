import { Github, Linkedin } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="h-32 border-t border-mystic-200 p-4 flex justify-between items-center">
            <div>
                <span className="font-semibold text-mystic-700">Created by <a className="hover:underline text-mystic-950" href="https://github.com/freddwithy/" target="_blank">Freddy Sanabria</a></span>  
            </div>
            <div className="flex gap-x-4">
                <a href="https://github.com/freddwithy/" target="_blank">
                    <Github />
                </a>
                <a href="https://freddsana.art/en" target="_blank">
                    <Linkedin />
                </a>
            </div>
        </footer>
    )
}