'use client'
import LogoLink from "./ui/LogoLink"
import Profile from "./Profile"
import PdfToPrint from "../create/components/PdfToPrint"
import { Education, Experience, Image, Resume, Skills } from "@prisma/client"
import dynamic from "next/dynamic"
import { Download, LoaderCircle } from "lucide-react"
import useModal from "@/hooks/useModal"
import Modal from "./ui/Modal"

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
    const modal = useModal()
    return (
        <header className="flex justify-between p-2 items-center border-b border-gray-200">
            <div>
                <LogoLink />
            </div>
            <div className="flex gap-x-2">
                <button onClick={() => modal.openModal()} className='flex items-center gap-x-1 justify-center bg-green-200 p-2 rounded-lg border border-green-500 text-sm font-semibold hover:border-green-400 transition-colors text-green-950'>
                    <Download  className="size-4"/>
                    <div className="flex gap-x-1"><p className="hidden md:block">Save</p>PDF</div>
                </button>   
                <Modal
                    open={modal.open}
                    onCLose={modal.closeModal}
                >
                    <div className="flex p-2 flex-col gap-y-4 items-center justify-center w-80">
                        <p className="text-xl font-semibold text-center">Are you sure you want to download this resume?</p>
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
                            <button className='flex items-center gap-x-1 justify-center bg-orange-200 p-2 rounded-lg border border-orange-500 text-sm font-semibold hover:border-orange-400 transition-colors text-orange-950'>
                                <Download  className="size-4"/>
                                <p className="">Download PDF</p>
                            </button>
                        </PDFDownloadLink>
                    </div>
                </Modal>  
                <Profile />
            </div>
        </header>
    )
}

