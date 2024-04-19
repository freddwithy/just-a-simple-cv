import { ReactNode } from "react"

interface ButtonProps {
    text?: string
    className?: string
    onSumbit?: () => void
    children?: ReactNode
}

const Button: React.FC<ButtonProps> = ({
    text,
    className,
    onSumbit,
    children
}) => {
  return (
    <button onClick={onSumbit}  className={`bg-mystic-700 hover:bg-opacity-90 transition-all text-white font-semibold px-1 py-2 rounded-md ${className}`}>{text}
    {children}</button> 
  )
}

export default Button