
interface InputProps{
    value:string
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void
    type?:string
    name?:string 
    placeholder?:string
}

export const Input:React.FC<InputProps> = ({value,onChange,type,name,placeholder}) => {
    return(
        <input value={value}  
        onChange={onChange} 
        type={type} 
        name={name} 
        placeholder={placeholder}    
        />
    )
}