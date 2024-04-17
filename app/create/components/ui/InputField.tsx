interface InputFieldProps {
    typeInput: string
    nameInput: string
    placeholder?: string
    className?: string
    label?: string
}

const InputField: React.FC<InputFieldProps> = ({
    typeInput,
    nameInput,
    className,
    placeholder,
    label
}) => {
  return (
    <div className="flex flex-col gap-y-2">
        <label htmlFor="" className="font-medium text-gray-600 text-sm">{label}</label>
        <input  type={typeInput} name={nameInput} placeholder={placeholder} className={`p-2 bg-gray-100 rounded-lg ${className}`}/>
    </div>
  )
}

export default InputField