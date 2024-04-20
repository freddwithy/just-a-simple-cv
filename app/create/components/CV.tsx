'use client'

import { Education } from "@prisma/client"
import { MapPin } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"

type ResumeData = {
    name: string
    lastName: string;
    city: string;
    shortResume: string;
    aboutMe: string;
    education: Education[]
}


export const CVComponent: React.FC<ResumeData> = ({
    name,
    lastName,
    city,
    shortResume,
    aboutMe,
    education
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <section className="p-10 border border-gray-200 rounded-lg w-full bg-white shadow-md flex-col max-w-screen-sm md:max-w-3xl">
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
                    <Image src="/fredd.png" width={120} height={120} alt="Photo" className="rounded-lg"/>
                </div>
            </div>
            <div className="py-4 border-b border-gray-200">
                <h4 className="text-xl font-semibold pb-4">About me</h4>
                <p className="text-gray-700 max-w-max text-pretty break-words">
                    {aboutMe}
                </p>
            </div>
            <div className="py-4 border-b border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">Education</h4>
                {
                    education.map((edu) => (
                        <div key={edu.id} className="flex justify-between">
                            <div>
                                <p className="font-semibold text-gray-950">
                                    {edu.certificate}
                                </p>
                                <span className="text-sm text-gray-700">{edu.entity}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-950">{edu.initDate} - {edu.endDate}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="py-4 border-b border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">Experiencia</h4>
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-gray-950">
                            {}
                        </p>
                        <span className="text-sm text-gray-700">Gerente Técnico</span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-950">{} - {}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-gray-950">
                            Intech S.R.L
                        </p>
                        <span className="text-sm text-gray-700">Técnico en Electrotécnia</span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-950">2020 - 2021</p>
                    </div>
                </div>
            </div>
            <div className="py-4 border-gray-200 space-y-4">
                <h4 className="text-xl font-semibold">Habilidades</h4>
                <div className="flex gap-2 flex-wrap">
                    <div className="py-1 px-2 border rounded-lg border-gray-600">
                        <p>Adobe Photoshop</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-gray-600">
                        <p>Adobe Premiere</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-gray-600">
                        <p>JavaScript</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-gray-600">
                        <p>CSS3</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-gray-600">
                        <p>HTM5</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-gray-600">
                        <p>ReactJS</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-gray-600">
                        <p>NextJS</p>
                    </div>
                </div>
            </div>
        </section>
    )
}