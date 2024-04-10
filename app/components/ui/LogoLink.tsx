import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoLink = () => {
  return (
    <Link href="/" className="flex gap-x-2 items-center justify-center">
        <Image src="/logo.png" width={40} height={40} alt="justaresume logo"/>
        <span className="font-bold text-2xl">Justaresume</span>
    </Link>
  )
}

export default LogoLink