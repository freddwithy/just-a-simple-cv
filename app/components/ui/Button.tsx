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
    <button onClick={onSumbit}  className={`text-white border bg-mystic-600 border-mystic-600 hover:bg-opacity-90 transition-all font-semibold px-1 py-2 rounded-md ${className}`}>{text}
    {children}</button> 
  )
}

export default Button