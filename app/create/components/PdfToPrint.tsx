/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Education, Experience, Resume, Skills } from '@prisma/client'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { defaultTemplate } from './Templates'

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

const styles = defaultTemplate

const PdfToPrint: React.FC<PdfToPrintProps> = ({ 
    resumeData,
    experience,
    education,
    skill,
    image
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
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
                <View style={styles.separator} />
                <View style={styles.aboutMeContainer}>
                    <Text style={styles.aboutMe}>
                        About Me
                    </Text>
                    <Text style={styles.aboutMeText}>
                        {resumeData.aboutMe}
                    </Text>
                </View>
                <View style={styles.separator} />
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
                <View style={styles.separator} />
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
                <View style={styles.separator} />
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