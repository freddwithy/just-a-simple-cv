'use client'

import { Education, Experience, Language, Skills } from "@prisma/client"
import { MailIcon, MapPin, Phone, PhoneIcon } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import defaultData from "@/default/cv-default.json"

type ResumeData = {
    name: string
    lastName: string;
    city: string;
    email: string;
    phone: string;
    shortResume: string;
    aboutMe: string;
    language: string
    education: Education[]
    experience: Experience[]
    skill: Skills[]
    languageSkill: Language[]	
    image?: string
}

export const CVComponent: React.FC<ResumeData> = ({
    name,
    lastName,
    city,
    shortResume,
    aboutMe,
    language,
    education,
    experience,
    skill,
    image,
    email,
    phone,
    languageSkill
}) => {
    const [isMounted, setIsMounted] = useState(false)

    const componentRef = useRef(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const isExperience = experience.length > 0
    const isEducation = education.length > 0
    const isSkill = skill.length > 0
    const isLanguage = languageSkill.length > 0

    const dfExperienceList = Array.isArray(defaultData.EXPERIENCE) ? defaultData.EXPERIENCE : [defaultData.EXPERIENCE]

    const dfEducationList = Array.isArray(defaultData.EDUCATION) ? defaultData.EDUCATION : [defaultData.EDUCATION]

    const dfSkillList = Array.isArray(defaultData.SKILLS) ? defaultData.SKILLS : [defaultData.SKILLS]

    const dfLanguageList = Array.isArray(defaultData.LANGUAGES) ? defaultData.LANGUAGES : [defaultData.LANGUAGES]

    const titlesEn = {
        aboutme: 'About me',
        education: 'Education',
        experience: 'Experience',
        skills: 'Skills',
        language: 'Language'
    }

    const titlesEs = {
        aboutme: 'Acerca de mi',
        education: 'Educación',
        experience: 'Experiencia',
        skills: 'Habilidades',
        language: 'Idiomas'
    }

    return (
        <>
            <section className="p-10 rounded-lg w-full bg-white flex-col max-w-screen-sm md:max-w-3xl" ref={componentRef}>
            <div className="flex justify-between border-b border-gray-200 pb-4 items-center">
                <div className="flex gap-y-2 flex-col max-w-md w-full">
                        <h3 className="text-3xl font-semibold">{name} {lastName}</h3>
                    <p className="text-balance break-words text-gray-700">{shortResume}</p>
                    <span className="text-sm font-semibold text-gray-800 flex gap-x-2 items-center">
                        <PhoneIcon size={20}/>
                        {phone}
                    </span>
                    <span className="text-sm font-semibold text-gray-800 flex gap-x-2 items-center">
                        <MailIcon size={20}/>
                        {email}
                    </span>
                    <span className="text-sm font-semibold text-gray-800 flex gap-x-2 items-center">
                        <MapPin size={20}/>
                        {city}
                    </span>
                </div>
                <div className="size-32 object-cover overflow-hidden rounded-lg">
                    {
                        image && image !== '' 
                        ? <Image src={image} width={130} height={130} alt="Photo" className="rounded-lg object-cover"/>
                        : <Image src="/no-user.webp" width={130} height={130} alt="no-user" className="rounded-lg"/>
                    }
                </div>
            </div>
            <div className="py-4 border-b border-gray-200">
                <h4 className="text-xl font-semibold pb-4">{language === 'es' ? titlesEs.aboutme : titlesEn.aboutme}</h4>
                <p className="text-gray-700 max-w-max text-pretty break-words">
                    {aboutMe}
                </p>
            </div>
            <div className="py-4 border-b border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">{language === 'es' ? 'Experiencia' : 'Experience'}</h4>
                {
                    !isExperience && dfExperienceList.map((exp, i) => (
                        <div key={i} className="flex justify-between">
                            <div>
                                <p className="font-semibold text-gray-950">
                                    {exp.JOB}
                                </p>
                                <span className="text-sm text-gray-700">{exp.COMPANY}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-950">{exp.FROM.slice(0, 4)} - {exp.TO.slice(0, 4)}</p>
                            </div>
                        </div>
                    ))
                }
                {
                    isExperience && experience.map((exp, i) => (
                        <div key={i} className="flex justify-between">
                            <div>
                                <p className="font-semibold text-gray-950">
                                    {exp.position}
                                </p>
                                <span className="text-sm text-gray-700">{exp.company}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-950">{exp.initDate.slice(0, 4)} - {exp.endDate.slice(0, 4)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="py-4 border-b border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">{language === 'es' ? 'Educación' : 'Education'}</h4>
                {
                    !isEducation && dfEducationList.map((edu, i) => (
                        <div key={i} className="flex justify-between">
                            <div>
                                <p className="font-semibold text-gray-950">
                                    {edu.COURSE}
                                </p>
                                <span className="text-sm text-gray-700">{edu.INSTITUTION}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-950">{edu.FROM.slice(0, 4)} - {edu.TO.slice(0, 4)}</p>
                            </div>
                        </div>
                    ))
                }
                {
                    isEducation && education.map((edu) => (
                        <div key={edu.id} className="flex justify-between">
                            <div>
                                <p className="font-semibold text-gray-950">
                                    {edu.certificate}
                                </p>
                                <span className="text-sm text-gray-700">{edu.entity}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-950">{edu.initDate.slice(0, 4)} - {edu.endDate.slice(0, 4)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="py-4 border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">{language === 'es' ? 'Habilidades' : 'Skills'}</h4>
                <div className="flex gap-2 flex-wrap">
                    {
                        !isSkill && dfSkillList.map((skill, i) => (
                            <p key={i} className="text-gray-700 border border-gray-500 px-3 py-1 rounded-lg">{skill.SKILL}</p>
                        ))
                    }
                    {
                        isSkill && skill.map((skill, i) => (
                            <p key={i} className="text-gray-900 font-medium border border-gray-700 px-3 py-1 rounded-lg">{skill.name}</p>
                        ))
                    }               
                </div>
            </div>
            <div className="py-4 border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">{language === 'es' ? 'Idiomas' : 'Languages'}</h4>
                <div className="flex gap-x-10">
                    {
                        !isLanguage && dfLanguageList.map((language, i) => (
                            <div key={i}>
                                <p className="text-gray-950 font-semibold">{language.LANGUAGE}</p>
                                <span className="text-sm text-gray-700">{language.LEVEL}</span>
                            </div>            
                        ))
                    }
                    {
                        isLanguage && languageSkill.map((language, i) => (
                            <div key={i}>
                                <p className="text-gray-950 font-semibold">{language.name}</p>
                                <span className="text-sm text-gray-700">{language.level}</span>
                            </div>            
                        ))
                    }             
                </div>
            </div>
            </section>
        </> 
    )
}