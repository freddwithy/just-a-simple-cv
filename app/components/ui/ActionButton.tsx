import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ActionButtonProps {
    link: string
    title: string
}

const ActionButton: React.FC<ActionButtonProps> = ({
    link,
    title
}) => {
  return (
    <Link href={link} className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-orange-600 px-6 font-medium text-white"><span>{title}</span><div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
      <ArrowRight className='size-6' />  
    </div></Link>
  )
}

export default ActionButton