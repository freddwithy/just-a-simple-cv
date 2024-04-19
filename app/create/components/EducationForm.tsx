'use client'

import Button from "@/app/components/ui/Button"
import Modal from "@/app/components/ui/Modal"
import useModal from "@/hooks/useModal"
import { Plus } from "lucide-react"
import InputField from "./ui/InputField"

const EducationForm = () => {
    const { open, openModal, closeModal } = useModal()
    return (
        <div className="flex gap-2 items-center w-full">
            <div className="space-y-2 bg-gray-200 rounded-lg p-2 w-full">
                <p className="font-semibold text-base">Maria Auxiliadora</p>
                <span className="text-sm">2016 - 2018</span>
            </div>
            <Button 
                className="flex items-center justify-center bg-gray-500 px-4 h-10"
                onSumbit={openModal}
            >
                <Plus />
                Add
            </Button>
            <Modal
                open={open}
                onCLose={closeModal}
            >
                <div className="px-2 py-2 flex-col flex min-w-96">
                    <p className="text-xl font-semibold mb-2">Add New Education</p>
                    <form action="" className="space-y-4">
                        <InputField 
                            label="School"
                            nameInput="school"
                            typeInput="text"
                        />
                        <InputField 
                            label="Career"
                            nameInput="career"
                            typeInput="text"
                        />
                        <InputField 
                            label="From"
                            nameInput="initDate"
                            typeInput="date"
                        />
                        <InputField 
                            label="To"
                            nameInput="endDate"
                            typeInput="date"
                        />
                        <Button 
                            text="Add new"
                            className="w-full"
                        />
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default EducationForm