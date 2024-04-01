"use client"

import Container from "@/app/components/ui/Container"
import { CVComponent } from "./components/CV"
import { CVFormComponent } from "./components/CVForm"
import { useState } from "react"

export default function CreatePage () {
    const [data, setData] = useState({
        name: '',
        resume: '',
        lastName: '',
        location: '',
        aboutYou: '',
        educationPlace: '',
        educationInitDate: '',
        educationEndDate: '',
        experiencePlace: '',
        experienceInitDate: '',
        experienceEndDate: ''
    })

    const formData = (formDatas: any) => {
        setData(formDatas)
    }

    return (
        <Container>
            <div className="flex flex-col md:flex-row">
                <CVFormComponent sendData={formData} />
                <main className="border-l py-10 border-mystic-200 flex items-center bg-mystic-200 flex-col gap-y-8 flex-grow max-h-screen overflow-y-scroll">
                    <CVComponent formDataToCV={data} />
                </main>
            </div> 
        </Container>
    )
}