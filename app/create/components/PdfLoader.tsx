'use client'
import { Education, Experience, Resume, Skills } from '@prisma/client'
import React from 'react'
import PdfToPrint from './PdfToPrint'
import dynamic from 'next/dynamic'
import { LoaderCircle } from 'lucide-react'

interface PdfLoaderProps {
    resumeData: Resume
    experience: Experience[]
    education: Education[]
    skill: Skills[]
    image?: string
}

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <div className='flex flex-col items-center justify-center h-screen gap-2'>
      <LoaderCircle className='animate-spin size-10'/>
      <p className='text-xl text-center font-medium text-pretty'>
        Please wait, we&apos;re loading your cv...
      </p>
  </div>,
    },
  );

const PdfLoader: React.FC<PdfLoaderProps> = ({
    resumeData,
    experience,
    education,
    skill,
    image
}) => {
  return (
    <PDFViewer style={{ height: '100vh', width: '100vw' }}>
        <PdfToPrint 
            resumeData={resumeData}
            experience={experience}
            education={education}
            skill={skill}
            image={image}
        />
    </PDFViewer>
  )
}

export default PdfLoader