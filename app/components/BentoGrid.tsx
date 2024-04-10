import Container from "./ui/Container"

const BentoGrid = () => {
    return (
        <Container className="max-w-xl w-full">
            <div className="grid grid-rows-5 grid-cols-5 gap-4 py-10 w-full mx-auto">
                <div className="col-span-2 row-span-3 bg-gradient-to-tl from-mystic-700 to-mystic-500 border border-mystic-700 h-auto w-full rounded-lg p-4">
                    <span className="text-white font-bold text-xl">1.</span>
                    <p className="text-white text-pretty">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="col-span-3 row-span-3 bg-gradient-to-tl from-mystic-700 to-mystic-500 border border-mystic-700 h-auto w-full rounded-lg p-4">
                    <span className="text-white font-bold text-xl">2.</span>
                    <p className="text-white text-pretty">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="col-span-5 row-span-3 bg-gradient-to-tl from-mystic-700 to-mystic-500 border border-mystic-700 h-auto w-full rounded-lg p-4">
                <span className="text-white font-bold text-xl">3.</span>
                    <p className="text-white text-pretty">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi fugiat ipsum commodi quas harum nam numquam, repudiandae ut eaque assumenda explicabo debitis cum eum eveniet quisquam quod reprehenderit aut nisi.</p>
                </div>
            </div>
        </Container>       
    )
}

export default BentoGrid