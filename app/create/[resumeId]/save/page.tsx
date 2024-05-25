'use client'
import { PDFViewer } from "@react-pdf/renderer"
import PdfToPrint from "../../components/PdfToPrint"
import { Resume } from "@prisma/client"

interface SavePDFProps {
    resumeData: Resume
}

const SavePDF: React.FC<SavePDFProps> = ({ resumeData }) => {
  return (
    <PDFViewer style={{ height: '100vh', width: '100vw' }}>
        <PdfToPrint resumeData={resumeData} />
    </PDFViewer>
  )
}

export default SavePDF