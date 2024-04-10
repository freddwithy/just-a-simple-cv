import Container from "./ui/Container"
import { Check } from "lucide-react"

const features = [
    "Easy to use",
    "Save it for later",
    "Customizable",
    "Totally free",
    "Fast Edit",
    "Simple and Pretty"
]

const Features = () => {
    return (
        <Container className="w-full max-w-xl flex justify-center ">
            <div className="grid grid-cols-3 grid-rows-2 w-full justify-center items-center gap-2">
                {
                    features.map((feat) => (
                        <span className="flex gap-2 w-full font-semibold text-start">
                            <Check className="text-orange-700" />
                            {feat}
                        </span>
                    ))
                }                
            </div>
        </Container>
    )
}

export default Features