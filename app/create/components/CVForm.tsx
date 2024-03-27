import { FileText } from "lucide-react"

export const CVFormComponent = () => {
    return (
        <aside className="min-w-40 max-w-lg flex-grow">
            <nav className="flex flex-col w-full p-4 gap-y-4">
                <h2 className="text-2xl font-bold text-mystic-950 flex gap-x-2 items-center">
                    <FileText size={25} />
                    Crea tu curriculum
                </h2>
                <form action="" className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="font-semibold">Nombre</label>
                        <input type="text" placeholder="Freddy" className="p-2 bg-mystic-100 rounded-lg"/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="font-semibold">Apellido</label>
                        <input type="text" placeholder="Sanabria" className="p-2 bg-mystic-100 rounded-lg"/>
                    </div> 
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="" className="font-semibold">Ubicación</label>
                        <input type="text" placeholder="Ciudad Del Este" className="p-2 bg-mystic-100 rounded-lg"/>
                    </div>       
                </form>
            </nav>
        </aside>
    )
}