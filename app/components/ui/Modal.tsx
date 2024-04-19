import { X } from "lucide-react"
import { ReactNode } from "react"

interface ModalProps {
    open: boolean
    onCLose: () => void
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ open, onCLose, children }) => {
  return (
    <div onClick={onCLose} className={
        `fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}`
    }>
        <div 
            onClick={(e) => e.stopPropagation()}
            className={`
            bg-white rounded-lg shadow-md p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}>
            <button 
                onClick={onCLose}
                className="absolute top-2 right-2 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                <X />
            </button>
            {children}
        </div>  
    </div>
  )
}

export default Modal