'use client'

import Button from "@/app/components/ui/Button"
import Modal from "@/app/components/ui/Modal"
import useModal from "@/hooks/useModal"
import { Delete, Edit, Plus, Trash } from "lucide-react"
import { Education } from "@prisma/client"
import { useEffect, useState } from "react"
import EduForm from "./components/EduForm"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface EducationFormProps {
    educationData: Education[]
    resumeId: string
}

type ResumeInputs = {
    id: string;
    resumeId: string;
    certificate: string;
    entity: string;
    initDate: string;
    endDate: string;
}

const EducationForm: React.FC<EducationFormProps> = ({
    educationData,
    resumeId
}) => {
    const { open, openModal, closeModal } = useModal()
    const [isMounted, setIsMounted] = useState(false)
    const [selectedData, setSelectedData] = useState<Education>({
        entity: '',
        initDate: '',
        endDate: '',
        certificate: '',
        id: '',
        resumeId: ''
    })

    const router = useRouter()

    const isData = educationData.length > 0

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const onEdit = (data: ResumeInputs) => {
        openModal()
        setSelectedData(data)
    }

    const onClose = () => {
        closeModal()
        setSelectedData({
            entity: '',
            initDate: '',
            endDate: '',
            certificate: '',
            id: '',
            resumeId: ''
        })
    }

    const onDelete = async (id: string) => {
        const res = await fetch(`/api/${resumeId}/education/${id}`, {
            method: 'DELETE'
        })

        if(res.ok) {
            toast.success('Education deleted successfully')
            router.refresh()
        }
    }

    return (
        <div className="flex gap-2 items-center w-full flex-col">
            {
                isData ? educationData.map((edu) => (
                    <div key={edu.id} className="justify-between bg-gray-200 rounded-lg p-2 w-full flex border border-gray-300 items-center">
                        <div className="flex flex-col">
                            <p className="font-normal text-gray-700 text-base">{edu.entity}</p>
                            <span className="text-sm text-gray-700">{edu.initDate.slice(0, 4)} - {edu.endDate.slice(0, 4)}</span>
                        </div>
                        <button onClick={() => onEdit(edu)} className="text-gray-500 hover:bg-gray-300 font-normal rounded-full p-2">
                            <Edit className="size-5"/>
                        </button>
                        <button onClick={() => onDelete(edu.id)} className="text-red-500 hover:bg-gray-300 font-normal rounded-full p-2">
                            <Trash className="size-5" />
                        </button>
                    </div>
                )) : (
                    <div className="space-y-2 bg-gray-200 rounded-lg p-2 w-full flex flex-col border border-gray-300">
                        <p className="font-normal text-gray-600 text-base">No education added yet</p>
                    </div>
                )
            }
            <Button 
                className="flex items-center justify-center bg-mystic-300 px-4 h-10 w-full text-gray-900"
                onSumbit={openModal}
            >
                <Plus className="size-5"/>
                Add
            </Button>
            <Modal
                open={open}
                onCLose={onClose}
            >
                <EduForm 
                    initialData={selectedData}
                    close={closeModal}
                    resumeId={resumeId}
                />
            </Modal>
        </div>
    )
}

export default EducationForm