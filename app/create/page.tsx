"use client"

import Container from "@/app/components/ui/Container"
import { CVComponent } from "./components/CV"
import { CVFormComponent } from "./components/CVForm"
import { useState } from "react"

export default function CreatePage () {
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

    const formData = (formDatas: any) => {
        setData(formDatas)
    }

    return (
        <Container>
            <div className="flex flex-col md:flex-row">
                <CVFormComponent sendData={formData} />
                <main className="border-l border-mystic-200 h-auto flex items-center justify-center p-8 bg-mystic-200 flex-col gap-y-8 flex-grow">
                    <h2 className="text-4xl font-bold text-mystic-950">Vista previa</h2>
                    <CVComponent formDataToCV={data} />
                </main>
            </div> 
        </Container>
    )
}