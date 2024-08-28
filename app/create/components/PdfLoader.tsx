'use client'
import { Education, Experience, Language, Resume, Skills } from '@prisma/client'
import React from 'react'
import PdfToPrint from './PdfToPrint'
import dynamic from 'next/dynamic'
import Loading from '@/app/components/ui/Loading'

interface PdfLoaderProps {
    resumeData: Resume
    experience: Experience[]
    education: Education[]
    skill: Skills[]
    image?: string
    languages?: Language[]
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
    image,
    languages
}) => {
  return (
    <PDFViewer style={{ height: '100vh', width: '100vw' }}>
        <PdfToPrint 
            resumeData={resumeData}
            experience={experience}
            education={education}
            skill={skill}
            image={image}
            languages={languages}
        />
    </PDFViewer>
  )
}

export default PdfLoader