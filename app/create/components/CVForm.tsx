import { FileText } from "lucide-react"

export const CVFormComponent = ({
}) => {
    return (
        <aside className="min-w-40 max-w-lg flex-grow max-h-screen overflow-y-scroll">
            <nav className="flex flex-col w-full p-4 gap-y-4">
                <h2 className="text-3xl font-bold text-mystic-950 flex gap-x-2 items-center">
                    <FileText size={25} />
                    Crea tu curriculum
                </h2>
                <form className="flex flex-col gap-y-6">
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
                            <label htmlFor="" className="font-semibold text-mystic-700">Resumen</label>
                            <textarea name="resume" placeholder='Desarrollador web Frontend y Diseñador Gráfico...' className="p-2 bg-mystic-100 rounded-lg resize-none h-32"/>
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
                            <textarea  maxLength={300} placeholder="Experimentado diseñador gráfico con más de 4 años de experiencia..." className="p-2 bg-mystic-100 rounded-lg h-36 resize-none" name="aboutYou"/>
                            <span className="text-sm text-mystic-600">{}/300</span>
                        </div>
                    </div>
                    <button className="bg-mystic-600 text-white font-semibold px-1 py-2 rounded-md">Enviar</button>               
                </form>
            </nav>
        </aside>
    )
}