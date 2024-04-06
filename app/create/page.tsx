
import Container from "@/app/components/ui/Container"
import { CVComponent } from "./components/CV"
import { CVFormComponent } from "./components/CVForm"

export default async function CreatePage ({ 
} : {
    params: { resumeId: string }
}) {

    return (
        <Container>
            <div className="flex flex-col md:flex-row">
                <CVFormComponent  />
                <main className="border-l py-10 border-mystic-200 flex items-center bg-mystic-200 flex-col gap-y-8 flex-grow max-h-screen overflow-y-scroll">
                </main>
            </div> 
        </Container>
    )
}