import Card from "./ui/Card"
import Container from "./ui/Container"

const Datas = [
    {
        id: 1,
        title: "1.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        colRow: "col-span-2 row-span-3"
    },
    {
        id: 2,
        title: "2.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        colRow: "col-span-3 row-span-3"
    },
    {
        id: 3,
        title: "3.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam corrupti ratione commodi. Eaque sunt vero id neque totam eos minus aut pariatur asperiores magni error quisquam delectus velit, iusto dolore!  ",
        colRow: "col-span-5 row-span-3"
    }
]

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