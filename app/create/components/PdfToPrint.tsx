'use client'
import { Resume } from '@prisma/client'
import { Document, Page, Text, View } from '@react-pdf/renderer'

interface PdfToPrintProps {
    resumeData: Resume
}

const PdfToPrint: React.FC<PdfToPrintProps> = ({ resumeData }) => {
  return (
    <Document>
        <Page size="A4" style={{ margin: 20 }}>
            <View  style={{ margin: 0 }}>
                <Text>Hello World</Text>
            </View>
        </Page>
    </Document>
  )
}

export default PdfToPrint