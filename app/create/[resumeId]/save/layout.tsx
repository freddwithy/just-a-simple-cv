import { redirect } from "next/navigation"

const SaveLayout = async ({
    children,
    params
} : {
    children: React.ReactNode
    params: { resumeId: string }
}) => {
    if(!params.resumeId) {
        return (
            redirect('/create')
        )
    }
    
    return (
        <div>
            {children}
        </div>
    )
}

export default SaveLayout
