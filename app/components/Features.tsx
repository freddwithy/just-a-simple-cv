import Container from "./ui/Container"
import { Check } from "lucide-react"

const features = [
    "User-Frendly",
    "Save for Later",
    "Customizable",
    "Completely free",
    "Quick Editing",
    "Clean and Elegant"
]

const Features = () => {
    return (
        <Container className="w-full max-w-xl flex justify-center ">
            <div className="grid grid-cols-3 grid-rows-2 w-full justify-center items-center gap-2">
                {
                    features.map((feat, i) => (
                        <span key={i} className="flex gap-2 w-full font-semibold text-start">
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