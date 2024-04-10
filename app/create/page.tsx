import { CVFormComponent } from "./components/CVForm"
import { Header } from "../components/Header"

const navLinks = [
    {
        linkTo: "/Save",
        name: "Save",
    },
]


export default async function CreatePage () {
    return (
        <>
            <Header navLinks={navLinks} />

                <div className="flex flex-col md:flex-row">
                    <CVFormComponent  />
                    <main className="border-l py-10 border-mystic-200 flex items-center bg-mystic-200 flex-col gap-y-8 flex-grow max-h-screen overflow-y-scroll">
                    </main>
                </div> 
        </>
        
    )
}