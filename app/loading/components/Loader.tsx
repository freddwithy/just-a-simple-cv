'use client'

import ActionButton from "@/app/components/ui/ActionButton"
import Button from "@/app/components/ui/Button"
import { Resume } from "@prisma/client"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import defaultData from "@/default/cv-default.json"

interface LoaderProps {
    resumeId: string | undefined | null
    name: string | undefined | null
    isData: boolean
}


const Loader: React.FC<LoaderProps> = ({ resumeId, name }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createResume = async () => {
    setIsLoading(true);

    const res = await fetch("/api/resumes", {
      method: "POST",
      body: JSON.stringify({
        name: defaultData.MAIN.NAME,
        lastName: defaultData.MAIN.LAST_NAME,
        city: defaultData.MAIN.CITY,
        shortResume: defaultData.MAIN.SHORT_RESUME,
        aboutMe: defaultData.MAIN.ABOUT_ME,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if(res.ok) {
        router.refresh()
        setIsLoading(false);
        toast.success("Your resume has been created");
    } else {
        setIsLoading(false);
        toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isLoading && !resumeId && (
        <div className="p-10 border border-gray-200 shadow-lg flex gap-x-8 items-center rounded-lg">
          <LoaderCircle className="animate-spin animate-infinite size-10 text-mystic-600" />
          <p className="text-2xl text-center font-medium text-pretty">
            Please wait, we&apos;re creating your cv...
          </p>
        </div>
      )}
      {resumeId && !isLoading && (
        <div className="p-10 border border-gray-200 shadow-lg flex gap-x-8 items-center rounded-lg">
          <p className="text-2xl text-center font-medium text-pretty">
            Your resume is ready!
          </p>
          <ActionButton link={`/create/${resumeId}`} title="Go to the creator" />
        </div>
      )}
      {!resumeId && !isLoading && (
        <div className="p-10 border border-gray-200 shadow-lg flex gap-y-8 items-center rounded-lg flex-col max-w-lg">
          <p className="text-2xl text-center font-medium text-pretty">
            Hi!{" "}
            <span className="text-mystic-700 font-bold">{name}</span>,
            would you like to create a resume?
          </p>
          <Button text="Create" onSumbit={createResume} className="w-80" />
        </div>
      )}
      {

      }
    </>
  );
};

export default Loader