'use client'
import { FileText, Plus } from "lucide-react"
import React, { useEffect, useState } from "react"

interface CvFormProps {
    sendData: any
}



export const CVFormComponent: React.FC<CvFormProps> = ({sendData}) => {
    const [data, setData] = useState({
        name: 'Freddy',
        lastName: 'Sanabria',
        location: 'Ciudad Del Este, Paraguay',
        aboutYou: 'Experimentado diseñador gráfico con más de 4 años de experiencia, especializado en el uso de Photoshop e Illustrator. Apasionado por crear diseños visualmente impactantes y funcionales. Además, poseo conocimientos actuales como desarrollador frontend y backend, con experiencia en frameworks como Svelte, Angular, Next.js, Astro y otros lenguajes. Capaz de trabajar de manera colaborativa en equipo y gestionar proyectos de principio a fin.',
        educationPlace: 'Universidad Privada Del Este',
        educationInitDate: '2019',
        educationEndDate: 'Actualmente',
        experiencePlace: 'Elimec S.R.L',
        experienceInitDate: '2021',
        experienceEndDate: 'Actualmente'
    })

    useEffect(() => {
        sendData(data)
    }, [data])

    const handleValues = (e: React.ChangeEvent<HTMLFormElement>) => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
    }


    return (
        <aside className="min-w-40 max-w-lg flex-grow">
            <nav className="flex flex-col w-full p-4 gap-y-4">
                <h2 className="text-3xl font-bold text-mystic-950 flex gap-x-2 items-center">
                    <FileText size={25} />
                    Crea tu curriculum
                </h2>
                <form className="flex flex-col gap-y-6" onChange={handleValues}>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-mystic-950">Principal</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Nombre</label>
                            <input  type="text" name="name" placeholder="Freddy" className="p-2 bg-mystic-100 rounded-lg"/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Apellido</label>
                            <input  type="text" name="lastName" placeholder="Sanabria" className="p-2 bg-mystic-100 rounded-lg"/>
                        </div> 
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Ubicación</label>
                            <input  type="text" name="location" placeholder="Ciudad Del Este" className="p-2 bg-mystic-100 rounded-lg"/>
                        </div> 
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-mystic-950">Sobre mi</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Habla acerca de ti</label>
                            <textarea placeholder="Experimentado diseñador gráfico con más de 4 años de experiencia..." className="p-2 bg-mystic-100 rounded-lg h-36 resize-none" name="aboutYou"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-mystic-950">Educación</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Lugar de Estudios</label>
                            <input type="text" name="educationPlace" placeholder="Colegio Salesiano Maria Auxiliadora" className="p-2 bg-mystic-100 rounded-lg"/>
                            <label htmlFor="" className="font-semibold text-mystic-700">Desde</label>
                            <input type="date" name="educationInitDate" className="p-2 bg-mystic-100 rounded-lg" />
                            <label htmlFor="" className="font-semibold text-mystic-700">Hasta</label>
                            <input type="date" name="educationEndDate" className="p-2 bg-mystic-100 rounded-lg" />
                        </div>
                        <button className="bg-mystic-600 hover:bg-mystic-500 text-white py-2 px-3 rounded-lg flex gap-x-2"><Plus />Añadir otro</button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-mystic-950">Experiencia</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-semibold text-mystic-700">Empresa</label>
                            <input type="text" name="experiencePlace" placeholder="Elimec S.R.L" className="p-2 bg-mystic-100 rounded-lg"/>
                            <label htmlFor="" className="font-semibold text-mystic-700">Desde</label>
                            <input type="date" name="experienceInitDate" className="p-2 bg-mystic-100 rounded-lg" />
                            <label htmlFor="" className="font-semibold text-mystic-700">Hasta</label>
                            <input type="date" name="experienceEndDate" className="p-2 bg-mystic-100 rounded-lg" />
                        </div>
                        <button className="bg-mystic-600 hover:bg-mystic-500 text-white py-2 px-3 rounded-lg flex gap-x-2"><Plus />Añadir otro</button>
                    </div>
                    <button className="bg-mystic-600 text-white font-semibold px-1 py-2 rounded-md">Enviar</button>               
                </form>
            </nav>
        </aside>
    )
}