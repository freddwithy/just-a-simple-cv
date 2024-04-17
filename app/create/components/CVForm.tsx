import Button from "@/app/components/ui/Button"
import InputField from "./ui/InputField"
import TextAreaField from "./ui/TextAreaField"

export const CVFormComponent = ({
}) => {
    return (
        <aside className="min-w-40 max-w-md flex-grow max-h-screen overflow-y-scroll">
            <div className="flex flex-col w-full p-4 gap-y-4">
                <form className="flex flex-col gap-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-950">Main</h3>
                        <InputField 
                            typeInput="text"
                            nameInput="name"
                            placeholder="Fredd"
                            label="First Name"
                        />
                        <InputField 
                            typeInput="text"
                            nameInput="lastName"
                            placeholder="Sanabria"
                            label="Last Name"
                        />
                        <InputField 
                            typeInput="text"
                            nameInput="name"
                            placeholder="Fredd"
                            label="Nombre"
                        />
                        <TextAreaField 
                            nameInput="resume"
                            placeholder="Frontend web developer and Graphic Designer..."
                            label="About you"
                        />
                        <InputField 
                            typeInput="text"
                            nameInput="city"
                            placeholder="Ciudad del Este"
                            label="City"
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-950">About me</h3>
                        <TextAreaField 
                            nameInput="aboutme"
                            placeholder="Frontend web developer and Graphic Designer..."
                            label="Talk about you"
                            maxLength={500}
                        />
                    </div>
                    <Button 
                        text="Save"
                    />             
                </form>
            </div>
        </aside>
    )
}