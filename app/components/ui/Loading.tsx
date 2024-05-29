import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
        <LoaderCircle className='animate-spin size-10 text-orange-500'/>
        <p className='text-sm text-gray-500'>Please wait, we&apos;re loading your cv...</p>
    </div>
  )
}

export default Loading