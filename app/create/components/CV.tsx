'use client'

import { Education, Experience, Skills } from "@prisma/client"
import { LoaderCircle, MapPin, Printer } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import defaultData from "@/default/cv-default.json"
import ReactToPrint from "react-to-print"
import toast from "react-hot-toast"

type ResumeData = {
    name: string
    lastName: string;
    city: string;
    shortResume: string;
    aboutMe: string;
    education: Education[]
    experience: Experience[]
    skill: Skills[]
    image: string | undefined
}

export const CVComponent: React.FC<ResumeData> = ({
    name,
    lastName,
    city,
    shortResume,
    aboutMe,
    education,
    experience,
    skill,
    image,
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isPrinting, setIsPrinting] = useState(false)

    const componentRef = useRef(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const isExperience = experience.length > 0
    const isEducation = education.length > 0
    const isSkill = skill.length > 0

    const dfExperienceList = Array.isArray(defaultData.EXPERIENCE) ? defaultData.EXPERIENCE : [defaultData.EXPERIENCE]

    const dfEducationList = Array.isArray(defaultData.EDUCATION) ? defaultData.EDUCATION : [defaultData.EDUCATION]

    const dfSkillList = Array.isArray(defaultData.SKILLS) ? defaultData.SKILLS : [defaultData.SKILLS]

    return (
        <>
            <section className="p-10 rounded-lg w-full bg-white flex-col max-w-screen-sm md:max-w-3xl" ref={componentRef}>
            <div className="flex justify-between border-b border-gray-200 pb-4 items-center">
                <div className="flex gap-y-2 flex-col max-w-md w-full">
                        <h3 className="text-3xl font-semibold">{name} {lastName}</h3>
                    <p className="text-balance break-words text-gray-700">{shortResume}</p>
                    <p className="text-sm font-semibold text-gray-800 flex gap-x-1 items-center">
                        <MapPin size={20}/>
                        {city}
                    </p>
                </div>
                <div className="">
                    {
                        image && image !== '' 
                        ? <Image src={image} width={120} height={120} alt="Photo" className="rounded-lg object-cover size-full"/> 
                        : <Image src="/no-user.webp" width={120} height={120} alt="Photo" className="rounded-lg"/>
                    }
                </div>
            </div>
            <div className="py-4 border-b border-gray-200">
                <h4 className="text-xl font-semibold pb-4">About me</h4>
                <p className="text-gray-700 max-w-max text-pretty break-words">
                    {aboutMe}
                </p>
            </div>
            <div className="py-4 border-b border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">Experience</h4>
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
                <h4 className="text-xl font-semibold">Education</h4>
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
                <h4 className="text-xl font-semibold">Skills</h4>
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
            </section>
        </> 
    )
}