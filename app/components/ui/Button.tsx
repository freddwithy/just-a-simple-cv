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
    <button onClick={onSumbit}  className={`text-mystic-950 border bg-mystic-300 border-mystic-400 hover:bg-mystic-400 transition-colors font-semibold text-sm px-1 py-2 rounded-md ${className}`}>{text}
    {children}</button> 
  )
}

export default Button