/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Education, Experience, Resume, Skills } from '@prisma/client'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

Font.register({ 
    family: 'Roboto',
    fonts: [
        {
            src: '/fonts/roboto-latin-100-normal.ttf',
            fontWeight: 100,
        },
        {
            src: '/fonts/roboto-latin-300-normal.ttf',
            fontWeight: 300,
        },
        {
            src: '/fonts/roboto-latin-400-normal.ttf',
            fontWeight: 400,
        },
        {
            src: '/fonts/roboto-latin-500-normal.ttf',
            fontWeight: 500,
        },
        {
            src: '/fonts/roboto-latin-700-normal.ttf',
            fontWeight: 700,
        },
        {
            src: '/fonts/roboto-latin-900-normal.ttf',
            fontWeight: 900,
        },
    ]
})

interface PdfToPrintProps {
    resumeData: Resume
    experience: Experience[]
    education: Education[]
    skill: Skills[]
    image?: string
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        gap: 20,
        fontFamily: 'Roboto',
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    mainName: {
        fontSize: 25,
        fontWeight: 500,
    },
    shortResume: {
        color: 'rgb(55 65 81)',
        fontSize: 13,
        fontWeight: 400,
        maxWidth: '350px'
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
        fontWeight: 500,
        color: 'rgb(31 41 55)'
    },
    icon: {
        width: 15,
        height: 15
    },
    image: {
        width: 110,
        height: 110,
        objectFit: 'cover',
        borderRadius: 8
    },
    aboutMeContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    aboutMe: {
        fontSize: 14,
        fontWeight: 500,
    },
    aboutMeText: {
        fontWeight: 400,
        fontSize: 12,
        color: 'rgb(55 65 81)'
    },
    experienceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    experienceTitle: {
        fontSize: 14,
        fontWeight: 500,
    },
    experienceItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    experienceCompany: {
        fontSize: 12,
        fontWeight: 500,
        gap: 2,
        color: 'rgb(55 65 81)'
    },
    experiencePosition: {
        fontSize: 12,
        fontWeight: 300,
        color: 'rgb(55 65 81)'
    },
    experienceDate: {
        fontSize: 14,
        fontWeight: 500,
        gap: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'rgb(55 65 81)'
    },
    educationContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    educationTitle: {
        fontSize: 14,
        fontWeight: 500,
    },
    educationItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    educationCompany: {
        fontSize: 12,
        fontWeight: 500,
        gap: 2,
        color: 'rgb(55 65 81)'
    },
    educationPosition: {
        fontSize: 12,
        fontWeight: 300,
        color: 'rgb(55 65 81)'
    },
    educationDate: {
        fontSize: 14,
        fontWeight: 'semibold',
        color: 'rgb(55 65 81)',
        gap: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    skillContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    },
    skillTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(31 41 55)',
    },
    skillItem: {
        fontSize: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'rgb(55 65 81)',
        padding: 5,
        borderWidth: 1,
        color: 'rgb(55 65 81)',
    },
    skillBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    }
})

const PdfToPrint: React.FC<PdfToPrintProps> = ({ 
    resumeData,
    experience,
    education,
    skill,
    image
}) => {
    console.log(image)
    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.main}>
                    <View  style={styles.mainInfo}>
                        <Text style={styles.mainName}>{resumeData.name} {resumeData.lastName}</Text>
                        <Text style={styles.shortResume}>{resumeData.shortResume}</Text>
                        <View style={styles.cityContainer}>
                            <Image src='/map-pin.png' style={styles.icon}  />
                            <Text style={styles.city}>{resumeData.city}</Text>
                        </View>
                    </View>
                    <Image src={image} style={styles.image} />
                </View>
                <View style={styles.aboutMeContainer}>
                    <Text style={styles.aboutMe}>
                        About Me
                    </Text>
                    <Text style={styles.aboutMeText}>
                        {resumeData.aboutMe}
                    </Text>
                </View>
                <View style={styles.experienceContainer}>
                    <Text style={styles.experienceTitle}>Experience</Text>
                    {experience.map((exp) => (
                        <View key={exp.id} style={styles.experienceItem}>
                            <View style={styles.experienceCompany}>
                                <Text>{exp.company}</Text>
                                <Text style={styles.experiencePosition}>{exp.position}</Text>
                            </View>
                            <View style={styles.experienceDate}>
                                <Text>{exp.initDate.slice(0,4)} - {exp.endDate.slice(0,4)}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.educationContainer}>
                    <Text style={styles.educationTitle}>Education</Text>
                    {education.map((edu) => (
                        <View key={edu.id} style={styles.educationItem}>
                            <View style={styles.educationCompany}>
                                <Text>{edu.entity}</Text>
                                <Text style={styles.educationPosition}>{edu.certificate}</Text>
                            </View>
                            <View style={styles.educationDate}>
                                <Text>{edu.initDate.slice(0,4)} - {edu.endDate.slice(0,4)}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.skillContainer}>
                    <Text style={styles.skillTitle}>Skills</Text>
                    <View style={styles.skillBox}>
                        {skill.map((skill) => (
                            <View key={skill.id} style={styles.skillItem}>
                                <Text>{skill.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PdfToPrint