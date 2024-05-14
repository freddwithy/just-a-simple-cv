'use client'
import { CldUploadWidget } from 'next-cloudinary';

import { ImagePlusIcon, Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface UploadImageProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string
}

const UploadImage: React.FC<UploadImageProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if(!isMounted) return null

  return (
    <div className='flex gap-4'>
        <div className="mb-4 flex items-center gap-4">
          <div className="relative size-40 rounded-lg overflow-hidden">
            <div className="z-10 top-2 right-2 absolute">
              {
                value && value !== '' && 
                <button onClick={() => onRemove(value)}>
                  <Trash className="size-6 bg-white text-red-500 p-1 rounded-full"/>
                </button>
              }
            </div>
            <Image 
              src={value ? value : '/no-user.webp'}
              alt="image"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <CldUploadWidget
          onUpload={onUpload}
          uploadPreset="r6ocwhjn" 
        >
          {({ open }) => {
            const onClick = () => {
              open()
            }
            return (
              <button
                onClick={onClick}
                disabled={disabled}
                className="w-full flex items-center justify-center h-1/2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-md"
              >
                <ImagePlusIcon className="size-6 mr-2"/>
                Select image
              </button>
            )
          }}
        </CldUploadWidget>
    </div>
  )
}

export default UploadImage