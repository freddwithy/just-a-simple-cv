import Container from "./ui/Container"
import LogoLink from "./ui/LogoLink"
import ActionButton from "./ui/ActionButton"

export const Hero = () => {
    return (
        <Container>
            <LogoLink />
            <div className="flex justify-center items-center flex-col gap-y-4 text-center mt-10">
                <div className="flex justify-center flex-col gap-y-4 items-center">
                    <h1 className="text-6xl font-bold text-balance text-black">Craft Your CV Faster Than Ever</h1>
                    <p className="text-pretty text-xl text-gray-600"><span className="text-orange-500 font-semibold">Stop wasting time</span> with complicated templates, make your resume the fastest and easiest way possible <span className="text-mystic-700 font-semibold">for free.</span></p>
                    <ActionButton link="/create" title="Create your Resume - It's Free!" />
                </div>
            </div>
        </Container>
    )
}