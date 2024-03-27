import { MapPin } from "lucide-react"
import Image from "next/image"

export const CVComponent = () => {
    return (
        <section className="p-10 border border-mystic-200 rounded-lg w-full bg-white shadow-md flex-col max-w-3xl">
            <div className="flex justify-between border-b border-mystic-200 pb-4 items-center">
                <div className="flex gap-y-2 flex-col max-w-md w-full">
                    <h3 className="text-3xl font-semibold">Freddy Sanabria</h3>
                    <p className="text-balance text-gray-700">Desarrollador web Frontend y Diseñador Gráfico, enfocado en crear aplicaciones webs que atraigan clientes y diseños cautivadores.</p>
                    <p className="text-sm font-semibold text-mystic-800 flex gap-x-1 items-center">
                        <MapPin size={20}/>
                        Ciudad Del Este, Paraguay
                    </p>
                </div>
                <div className="">
                    <Image src="/fredd.png" width={120} height={120} alt="Photo" className="rounded-lg"/>
                </div>
            </div>
            <div className="py-4 border-b border-mystic-200">
                <h4 className="text-xl font-semibold pb-4">Sobre mí</h4>
                <p className="text-pretty text-mystic-700">
                    Experimentado diseñador gráfico con más de 4 años de experiencia, especializado en el uso de Photoshop e Illustrator.
                    Apasionado por crear diseños visualmente impactantes y funcionales. Además, poseo conocimientos actuales como desarrollador frontend y backend, con experiencia en frameworks como Svelte, Angular, Next.js, Astro y otros lenguajes. Capaz de trabajar de manera colaborativa en equipo y gestionar proyectos de principio a fin.
                </p>
            </div>
            <div className="py-4 border-b border-mystic-200 space-y-4">
                <h4 className="text-xl font-semibold">Educación</h4>
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold text-mystic-950">
                            Universidad Privada Del Este
                        </p>
                        <span className="text-sm text-mystic-700">Ingenería Eléctromecanica</span>
                    </div>
                    <div>
                        <p className="font-semibold text-mystic-950">2019 - Actualmente</p>
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
                            Elimec S.R.L
                        </p>
                        <span className="text-sm text-mystic-700">Gerente Técnico</span>
                    </div>
                    <div>
                        <p className="font-semibold text-mystic-950">2021 - Actualmente</p>
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