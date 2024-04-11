import Card from "./ui/Card"
import Container from "./ui/Container"

const Datas = [
    {
        id: 1,
        title: "1. Get Started",
        text: "Create an account to save your progress and build your personalized resume.",
        colRow: "col-span-2 row-span-3"
    },
    {
        id: 2,
        title: "2. Fill in Your Details",
        text: "Easily complete all the forms to showcase your skills, experience, and achievements.",
        colRow: "col-span-3 row-span-3"
    },
    {
        id: 3,
        title: "3. That's It!",
        text: "Once your resume is ready, save it for future use, print it, or download it in various formats like CSV, PDF, or even as an image.",
        colRow: "col-span-5 row-span-3"
    }
];
const BentoGrid = () => {
    return (
        <Container className="max-w-xl w-full">
            <div className="grid grid-rows-5 grid-cols-5 gap-4 w-full mx-auto">
                {
                    Datas.map(({ title, text, colRow, id }) => (
                        <Card key={id} className={colRow} title={title} content={text}/>
                    )) 
                }  
            </div>
        </Container>     
    )
}

export default BentoGrid