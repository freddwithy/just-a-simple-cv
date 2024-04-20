import LogoLink from "./ui/LogoLink"
import Profile from "./Profile"

export const Header = () => {
    return (
        <header className="flex justify-between p-4 items-center border-b border-gray-200">
            <div>
                <LogoLink />
            </div>
            <div className="flex gap-x-2">
                <Profile />
            </div>
        </header>
    )
}

