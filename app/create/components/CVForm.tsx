export const CVFormComponent = ({
}) => {
    return (
        <aside className="min-w-40 max-w-lg flex-grow max-h-screen overflow-y-scroll">
            <nav className="flex flex-col w-full p-4 gap-y-4">
                <form className="flex flex-col gap-y-6">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-gray-950">Principal</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-medium text-gray-600 text-sm">Nombre</label>
                            <input  type="text" name="name" placeholder="Freddy" className="p-2 bg-gray-100 rounded-lg"/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-medium text-gray-700 text-sm">Apellido</label>
                            <input  type="text" name="lastName" placeholder="Sanabria" className="p-2 bg-gray-100 rounded-lg"/>
                        </div> 
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-medium text-gray-700 text-sm">Resumen</label>
                            <textarea name="resume" placeholder='Desarrollador web Frontend y Diseñador Gráfico...' className="p-2 bg-gray-100 rounded-lg resize-none h-32"/>
                        </div> 
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-medium text-gray-700 text-sm">Ubicación</label>
                            <input  type="text" name="location" placeholder="Ciudad Del Este" className="p-2 bg-gray-100 rounded-lg"/>
                        </div> 
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-gray-950">Sobre mi</h3>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="" className="font-medium text-gray-700 text-sm">Habla acerca de ti</label>
                            <textarea  maxLength={300} placeholder="Experimentado diseñador gráfico con más de 4 años de experiencia..." className="p-2 bg-gray-100 rounded-lg h-36 resize-none" name="aboutYou"/>
                            <span className="text-sm text-gray-600">{}/300</span>
                        </div>
                    </div>
                    <button className="bg-mystic-700 hover:bg-opacity-90 transition-all text-white font-semibold px-1 py-2 rounded-md">Enviar</button>               
                </form>
            </nav>
        </aside>
    )
}