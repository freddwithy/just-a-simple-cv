'use client'
import LogoLink from "./ui/LogoLink"
import Profile from "./Profile"
import PdfToPrint from "../create/components/PdfToPrint"
import { Education, Experience, Image, Resume, Skills } from "@prisma/client"
import dynamic from "next/dynamic"
import ActionButton from "./ui/ActionButton"
import { Download, LoaderCircle } from "lucide-react"

interface HeaderProps {
    resume: Resume
    experience: Experience[]
    education: Education[]
    skill: Skills[]
    image?: string
}

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => <div className="flex items-center justify-center bg-orange-200 p-2 rounded-lg border border-orange-500 text-sm font-medium hover:border-orange-400 transition-colors">
        <LoaderCircle className="animate-spin size-4"/>
      </div>,
    },
  );

export const Header: React.FC<HeaderProps> = ({
    resume,
    experience,
    education,
    skill,
    image
 }) => {
    return (
        <header className="flex justify-between p-2 items-center border-b border-gray-200">
            <div>
                <LogoLink />
            </div>
            <div className="flex gap-x-2">
                <PDFDownloadLink 
                    document={<PdfToPrint  
                        resumeData={resume}
                        experience={experience}
                        education={education}
                        skill={skill}
                        image={image}
                    />
                }
                    fileName={`${resume.name} ${resume.lastName} CV - ${new Date().toLocaleDateString()}.pdf`}
                >
                    <button className='flex items-center gap-x-1 justify-center bg-orange-200 p-2 rounded-lg border border-orange-500 text-sm font-semibold hover:border-orange-400 transition-colors'>
                        <Download  className="size-4"/>
                        Download PDF
                    </button>
                </PDFDownloadLink>
                <Profile />
            </div>
        </header>
    )
}

