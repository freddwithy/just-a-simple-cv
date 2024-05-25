import Card from "./ui/Card"
import Container from "./ui/Container"

const Datas = [
    {
        id: 1,
        title: "1. Get Started",
        text: "Create an account to save your progress and build your personalized resume.",
        colRow: "md:col-span-2 md:row-span-3 col-span-1 row-span-1"
    },
    {
        id: 2,
        title: "2. Fill in Your Details",
        text: "Easily complete all the forms to showcase your skills, experience, and achievements.",
        colRow: "md:col-span-3 md:row-span-3 col-span-1 row-span-1"
    },
    {
        id: 3,
        title: "3. That's It!",
        text: "Once your resume is ready, save it for future use, print it, or download it in various formats like CSV, PDF, or even as an image.",
        colRow: "md:col-span-5 md:row-span-3 col-span-1 row-span-1"
    }
];
const BentoGrid = () => {
    return (
        <Container className="max-w-xs sm:max-w-xs md:max-w-xl w-full">
            <div className="grid grid-cols-1 grid-rows-3 md:grid-rows-5 md:grid-cols-5 gap-4 w-full mx-auto">
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