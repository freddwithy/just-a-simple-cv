import Image from 'next/image'
import Link from 'next/link'

interface LogoLinkProps {
    className?: string
}

const LogoLink: React.FC<LogoLinkProps> = ({
    className
}) => {
  return (
    <Link href="/" className={`flex gap-x-1 items-center justify-center ${className}`}>
        <Image src="/logo-green.png" width={30} height={30} alt="justaresume logo"/>
        <span className="font-bold text-xl ">Justaresume</span>
    </Link>
  )
}

export default LogoLink