'use client'
import { Education, Experience, Resume, Skills } from '@prisma/client'
import React from 'react'
import PdfToPrint from './PdfToPrint'
import dynamic from 'next/dynamic'

interface PdfLoaderProps {
    resumeData: Resume
    experience: Experience[]
    education: Education[]
    skill: Skills[]
}

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    },
  );

const PdfLoader: React.FC<PdfLoaderProps> = ({
    resumeData,
    experience,
    education,
    skill
}) => {
  return (
    <PDFViewer style={{ height: '100vh', width: '100vw' }}>
        <PdfToPrint 
            resumeData={resumeData}
            experience={experience}
            education={education}
            skill={skill}
        />
    </PDFViewer>
  )
}

export default PdfLoader