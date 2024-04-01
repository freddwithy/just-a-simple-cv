import { MapPin } from "lucide-react"
import Image from "next/image"
import React from "react"

interface CVProps {
    formDataToCV: {
        name: string,
        resume: string,
        lastName: string,
        location: string,
        aboutYou: string,
        educationPlace: string,
        educationInitDate: string,
        educationEndDate: string,
        experiencePlace: string,
        experienceInitDate: string,
        experienceEndDate: string
    }
}

export const CVComponent: React.FC<CVProps> = ({
    formDataToCV: {
        name,
        lastName,
        resume,
        aboutYou,
        educationEndDate,
        educationInitDate,
        educationPlace,
        experienceEndDate,
        experienceInitDate,
        experiencePlace,
        location
    }
}) => {
    return (
        <section className="p-10 border border-mystic-200 rounded-lg w-full bg-white shadow-md flex-col max-w-screen-sm md:max-w-3xl">
            <div className="flex justify-between border-b border-mystic-200 pb-4 items-center">
                <div className="flex gap-y-2 flex-col max-w-md w-full">
                        <h3 className="text-3xl font-semibold">{name} {lastName}</h3>
                    <p className="text-balance break-words text-gray-700">{resume}</p>
                    <p className="text-sm font-semibold text-mystic-800 flex gap-x-1 items-center">
                        <MapPin size={20}/>
                        {location}
                    </p>
                </div>
                <div className="">
                    <Image src="/fredd.png" width={120} height={120} alt="Photo" className="rounded-lg"/>
                </div>
            </div>
            <div className="py-4 border-b border-mystic-200">
                <h4 className="text-xl font-semibold pb-4">Sobre mí</h4>
                <p className="text-mystic-700 max-w-max text-pretty break-words">
                    {aboutYou}
                </p>
            </div>
            <div className="py-4 border-b border-mystic-200 space-y-4">
                <h4 className="text-xl font-semibold">Educación</h4>
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-mystic-950">
                            {educationPlace}
                        </p>
                        <span className="text-sm text-mystic-700">Ingenería Eléctromecanica</span>
                    </div>
                    <div>
                        <p className="font-semibold text-mystic-950">{educationInitDate} - {educationEndDate}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-mystic-950">
                            Colegio Técnico Salesiano María Auxiliadora
                        </p>
                        <span className="text-sm text-mystic-700">Técnico en Electrotécnia</span>
                    </div>
                    <div>
                        <p className="font-semibold text-mystic-950">2016 - 2018</p>
                    </div>
                </div>
            </div>
            <div className="py-4 border-b border-mystic-200 space-y-4">
                <h4 className="text-xl font-semibold">Experiencia</h4>
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-mystic-950">
                            {experiencePlace}
                        </p>
                        <span className="text-sm text-mystic-700">Gerente Técnico</span>
                    </div>
                    <div>
                        <p className="font-semibold text-mystic-950">{experienceInitDate} - {experienceEndDate}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-mystic-950">
                            Intech S.R.L
                        </p>
                        <span className="text-sm text-mystic-700">Técnico en Electrotécnia</span>
                    </div>
                    <div>
                        <p className="font-semibold text-mystic-950">2020 - 2021</p>
                    </div>
                </div>
            </div>
            <div className="py-4 border-mystic-200 space-y-4">
                <h4 className="text-xl font-semibold">Habilidades</h4>
                <div className="flex gap-2 flex-wrap">
                    <div className="py-1 px-2 border rounded-lg border-mystic-600">
                        <p>Adobe Photoshop</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-mystic-600">
                        <p>Adobe Premiere</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-mystic-600">
                        <p>JavaScript</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-mystic-600">
                        <p>CSS3</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-mystic-600">
                        <p>HTM5</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-mystic-600">
                        <p>ReactJS</p>
                    </div>
                    <div className="py-1 px-2 border rounded-lg border-mystic-600">
                        <p>NextJS</p>
                    </div>
                </div>
            </div>
        </section>
    )
}