'use client'
import { Education, Experience, Resume, Skills } from '@prisma/client'
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { MapPin } from 'lucide-react'

interface PdfToPrintProps {
    resumeData: Resume
    experience: Experience[]
    education: Education[]
    skill: Skills[]
}

const styles = StyleSheet.create({
    page: {
        margin: 20
    },
    main: {
        gap: 10,
    },
    mainName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    shortResume: {
        color: 'rgb(55 65 81)',
        fontSize: 13,
        fontWeight: 'light',
        maxWidth: '300px'
    },
    cityContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    city: {
        fontSize: 12,
        fontWeight: 'medium',
        color: 'rgb(31 41 55)'
    },
    icon: {
        width: 15,
        height: 15
    }
})

const PdfToPrint: React.FC<PdfToPrintProps> = ({ resumeData }) => {
  return (
    <Document>
        <Page size="A4" style={styles.page}>
            <View  style={styles.main}>
                <Text style={styles.mainName}>{resumeData.name} {resumeData.lastName}</Text>
                <Text style={styles.shortResume}>{resumeData.shortResume}</Text>
                <View style={styles.cityContainer}>
                    <Image src='/map-pin.png' style={styles.icon} />
                    <Text style={styles.city}>{resumeData.city}</Text>
                </View>
            </View>
        </Page>
    </Document>
  )
}

export default PdfToPrint