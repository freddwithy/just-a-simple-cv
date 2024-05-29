'use client'
import { Education, Experience, Resume, Skills } from '@prisma/client'
import React from 'react'
import PdfToPrint from './PdfToPrint'
import dynamic from 'next/dynamic'
import { LoaderCircle } from 'lucide-react'
import Loading from '@/app/components/ui/Loading'

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
      loading: () => <Loading />
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