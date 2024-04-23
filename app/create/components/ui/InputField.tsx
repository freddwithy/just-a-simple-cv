interface InputFieldProps {
    typeInput: string
    nameInput: string
    placeholder?: string
    className?: string
    label?: string
    formHook?: any
    value?: string
}

const InputField: React.FC<InputFieldProps> = ({
    typeInput,
    nameInput,
    className,
    placeholder,
    label,
    formHook,
    value
}) => {
  return (
    <div className="flex flex-col gap-y-2 ">
        <label htmlFor="" className="font-medium text-gray-600 text-sm">{label}</label>
        <input value={value}  type={typeInput} name={nameInput} placeholder={placeholder} className={`p-2 bg-gray-100 rounded-lg ${className} border border-gray-300`} {...formHook}/>
    </div>
  )
}

export default InputField