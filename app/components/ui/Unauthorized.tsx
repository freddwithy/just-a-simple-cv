import React from 'react'

const Unauthorized = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
        <p className='text-xl text-red-500'>Unauthorized</p>
        <p className='text-sm text-gray-500'>You don&apos;t have permission to access this page.</p>
    </div>
  )
}

export default Unauthorized