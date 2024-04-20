interface TextAreaFieldProps {
    nameInput: string
    placeholder?: string
    className?: string
    label?: string,
    maxLength?: number
    formHook?: any
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
    nameInput,
    className,
    placeholder,
    label,
    formHook
}) => {
  return (
    <div className="flex flex-col gap-y-2">
        <label htmlFor="" className="font-medium text-gray-700 text-sm">{label}</label>
        <textarea name={nameInput} placeholder={placeholder} className={`p-2 bg-gray-100 rounded-lg resize-none h-32 ${className} border border-gray-300`} {...formHook} />
    </div> 
  )
}

export default TextAreaField