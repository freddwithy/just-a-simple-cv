'use client'

import Button from "@/app/components/ui/Button"
import Modal from "@/app/components/ui/Modal"
import useModal from "@/hooks/useModal"
import { Edit, LoaderCircle, Plus, Trash } from "lucide-react"
import { Education, Experience } from "@prisma/client"
import { useEffect, useState } from "react"
import EduForm from "./components/EduForm"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import ExpeForm from "./components/ExpeForm"

interface ExperienceFormProps {
    experienceData: Experience[]
    resumeId: string
}

const EducationForm: React.FC<ExperienceFormProps> = ({
    experienceData,
    resumeId
}) => {
    const { open, openModal, closeModal } = useModal()
    const deleteModal = useModal()
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState('')
    const [selectedData, setSelectedData] = useState<Experience>({
        company: '',
        initDate: '',
        endDate: '',
        position: '',
        id: '',
        resumeId: ''
    })

    const router = useRouter()

    const isData = experienceData.length > 0

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const onEdit = (data: Experience) => {
        openModal()
        setSelectedData(data)
    }

    const onClose = () => {
        closeModal()
        setSelectedData({
            company: '',
            initDate: '',
            endDate: '',
            position: '',
            id: '',
            resumeId: ''
        })
    }

    const onDelete = async (id: string) => {
        try {
            setIsLoading(true)
            const res = await fetch(`/api/${resumeId}/experience/${id}`, {
                method: 'DELETE'
            })
    
            if(res.ok) {
                setSelectedItemId('')
                deleteModal.closeModal()
                setIsLoading(false)
                toast.success('Education deleted successfully')
                router.refresh()
            }
        } catch (error) {
            setSelectedItemId('')
            deleteModal.closeModal()
            setIsLoading(false)
            toast.error('Something went wrong')
        }  
    }

    const onDeleteModal = (id: string) => {
        deleteModal.openModal()
        setSelectedItemId(id)
    }

    return (
        <div className="flex gap-2 items-center w-full flex-col">
            {
                isData ? experienceData.map((exp) => (
                    <div key={exp.id} className="justify-between bg-gray-200 rounded-lg p-2 w-full flex border border-gray-300 items-center">
                        <div className="flex flex-col">
                            <p className="font-normal text-gray-700 text-base">{exp.company}</p>
                            <span className="text-sm text-gray-700">{exp.initDate.slice(0, 4)} - {exp.endDate.slice(0, 4)}</span>
                        </div>
                        <div className="flex gap-x-1">
                            <button onClick={() => onEdit(exp)} className="text-gray-500 hover:bg-gray-300 font-normal rounded-full p-2">
                                <Edit className="size-5"/>
                            </button>
                            <button onClick={() => onDeleteModal(exp.id)} className="text-red-500 hover:bg-gray-300 font-normal rounded-full p-2">
                                {
                                    isLoading && selectedItemId === exp.id ? <LoaderCircle className="animate-spin"/> : <Trash className="size-5"/>
                                }
                            </button>
                        </div>
                    </div>
                    
                )) : (
                    <div className="space-y-2 bg-gray-200 rounded-lg p-2 w-full flex flex-col border border-gray-300">
                        <p className="font-normal text-gray-600 text-base">No experience added yet</p>
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
                <ExpeForm 
                    initialData={selectedData}
                    close={closeModal}
                    resumeId={resumeId}
                /> 
            </Modal>
            <Modal
                open={deleteModal.open}
                onCLose={deleteModal.closeModal}
            >
                <div className="flex p-2 flex-col gap-y-4 items-center justify-center">
                    <Trash className="size-10 text-red-500"/>
                    <p className="text-xl font-semibold text-balance w-60 text-center">Are you sure you want to delete this experience?</p>
                    <div className="flex gap-x-2 w-full">
                        <Button className="w-full bg-red-600 border-red-600" onSumbit={() => onDelete(selectedItemId)}>Yes</Button>
                        <Button className="w-full bg-gray-600 border-gray-600" onSumbit={deleteModal.closeModal}>No</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EducationForm