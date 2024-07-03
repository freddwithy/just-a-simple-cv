'use client'

import Button from "@/app/components/ui/Button"
import Modal from "@/app/components/ui/Modal"
import useModal from "@/hooks/useModal"
import { Edit, LoaderCircle, Plus, Trash } from "lucide-react"
import { Skills } from "@prisma/client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import SkillForm from "./components/SkillForm"

interface SkillFormProps {
    skillData: Skills[]
    resumeId: string
}

const EducationForm: React.FC<SkillFormProps> = ({
    skillData,
    resumeId
}) => {
    const { open, openModal, closeModal } = useModal()
    const deleteModal = useModal()
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState('')
    const [selectedData, setSelectedData] = useState<Skills>({
        name: '',
        id: '',
        resumeId: ''
    })

    const router = useRouter()

    const isData = skillData.length > 0

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    const onEdit = (data: Skills) => {
        openModal()
        setSelectedData(data)
    }

    const onClose = () => {
        closeModal()
        setSelectedData({
            name: '',
            id: '',
            resumeId: ''
        })
    }

    const onDelete = async (id: string) => {
        try {
            setIsLoading(true)
            const res = await fetch(`/api/${resumeId}/skill/${id}`, {
                method: 'DELETE'
            })
    
            if(res.ok) {
                setSelectedItemId('')
                deleteModal.closeModal()
                setIsLoading(false)
                toast.success('Skill deleted successfully')
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
                isData ? skillData.map((sk) => (
                    <div key={sk.id} className="justify-between bg-gray-100 rounded-lg p-2 w-full flex items-center">
                        <div className="flex flex-col">
                            <p className="font-semibold text-gray-700 text-sm">{sk.name}</p>
                        </div>
                        <div className="flex gap-x-1">
                            <button onClick={() => onEdit(sk)} className="text-gray-500 font-normal rounded-full p-2 group flex items-center gap-x-2 text-sm hover:scale-105 transition-all">
                                <Edit className="size-5 text-gray-400 group-hover:text-gray-600"/>
                            </button>
                            <button onClick={() => onDeleteModal(sk.id)} className="text-red-500 font-normal rounded-full p-2 group transition-all hover:scale-105">
                                {
                                    isLoading && selectedItemId === sk.id ? <LoaderCircle className="animate-spin"/> : <Trash className="size-5 group-hover:text-red-600"/>
                                }
                            </button>
                        </div>
                    </div>
                    
                )) : (
                    <div className="space-y-2 bg-gray-200 rounded-lg p-2 w-full flex flex-col border border-gray-300">
                        <p className="font-normal text-gray-600 text-base">No skill added yet</p>
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
                <SkillForm 
                    resumeId={resumeId}
                    close={onClose}
                    initialData={selectedData}
                />
            </Modal>
            <Modal
                open={deleteModal.open}
                onCLose={deleteModal.closeModal}
            >
                <div className="flex p-2 flex-col gap-y-4 items-center justify-center">
                    <Trash className="size-8 text-red-500"/>
                    <p className="text-lg font-medium text-balance w-60 text-center">Are you sure you want to delete this skill?</p>
                    <div className="flex gap-x-2 w-full">
                        <button className="w-full hover:bg-red-600 bg-red-500 text-white rounded-md px-4 py-2 transition-all" onClick={() => onDelete(selectedItemId)}>Yes</button>
                        <button className="w-full hover:bg-gray-200 bg-white text-gray-950 rounded-md px-4 py-2 transition-all" onClick={deleteModal.closeModal}>No</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EducationForm