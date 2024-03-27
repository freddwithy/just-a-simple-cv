import Container from "@/app/components/ui/Container"
import { CVComponent } from "./components/CV"
import { CVFormComponent } from "./components/CVForm"

export default function CreatePage () {
    return (
        <Container>
            <div className="flex">
                <CVFormComponent />
                <main className="border-l border-mystic-200 h-full flex items-center justify-center p-8 bg-mystic-200 flex-col gap-y-8 flex-grow">
                    <h2 className="text-4xl font-bold text-mystic-950">Vista previa</h2>
                    <CVComponent />
                </main>
            </div> 
        </Container>
    )
}