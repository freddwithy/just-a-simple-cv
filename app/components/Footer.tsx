import { Github, Linkedin } from "lucide-react"

interface FooterProps {
    className?: string
}

export const Footer: React.FC<FooterProps> = ({
    className
}) => {
    return (
        <footer className={`h-12 md:h-16 w-full gap-y-4 mx-auto md:border-t border-gray-300 p-4 flex flex-col-reverse md:flex-row md:justify-between items-center mt-8 md:mt-0 ${className}`}>
            <div className="flex items-center gap-x-2">
                <p className="font-bold">Justaresume 2024 &copy;</p>
                <p className="font-semibold text-gray-700 text-sm">By <a className="hover:underline text-mystic-950" href="https://fredd.netlify.app/en" target="_blank">Fredd</a></p>  
            </div>
            <div className="flex gap-x-4 text-gray-400">
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