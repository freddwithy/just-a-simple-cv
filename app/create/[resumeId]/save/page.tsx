import prismadb from "@/libs/prismadb";
import PdfLoader from "../../components/PdfLoader";

const SavePDF = async ({
    params
} : {
    params: { resumeId: string }
}) => {
    const resumeData = await prismadb.resume.findUnique({
        where: {
            id: params.resumeId
        }
    })

    const experience = await prismadb.experience.findMany({
        where: {
            resumeId: params.resumeId
        }
    })

    const education = await prismadb.education.findMany({
        where: {
            resumeId: params.resumeId
        }
    })

    const skill = await prismadb.skills.findMany({
        where: {
            resumeId: params.resumeId
        }
    })

    const image = await prismadb.image.findFirst({
        where: {
            resumeId: params.resumeId
        }
    })

    if(!resumeData) {
        return (
            <div>
                <p>Resume not found</p>
            </div>
        )
    }

    return (
        <PdfLoader 
            resumeData={resumeData}
            experience={experience}
            education={education}
            skill={skill}
            image={image?.url}
        />
    )
}

export default SavePDF